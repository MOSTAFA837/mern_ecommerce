import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CreateCate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const handleRemove = async (slug) => {
    if (window.confirm("Sure you want delete ?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`"${res.data.name}" category deleted!`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" Category has been created.`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          <div className="admin_heading_wrapper flex">
            {loading ? (
              <Loader />
            ) : (
              <h4 className="admin_heading">
                Categories ({categories.length})
              </h4>
            )}
          </div>

          <div className="admin_components card_compo">
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {categories.filter(searched(keyword)).map((c) => (
              <div className="admin_products_wrapper">
                <div className="product_item flex" key={c._id}>
                  <h3>{c.name}</h3>

                  <div className="product_item_actions flex">
                    <Link to={`/admin/category/${c.slug}`}>
                      <span className="action_delete action_item green">
                        <EditOutlined />
                      </span>
                    </Link>

                    <span className="action_update action_item crimson">
                      <DeleteOutlined
                        onClick={() => handleRemove(c.slug)}
                        className=""
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCate;
