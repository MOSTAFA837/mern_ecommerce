import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import CategoryForm from "../../../components/forms/CategoryForm";
import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import LocalSearch from "../../../components/forms/LocalSearch";
import { getCategories } from "../../../functions/category";

const CreateSub = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSubs = () => getSubs().then((res) => setSubs(res.data));

  const handleRemove = async (slug) => {
    if (window.confirm("Sure you want delete ?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`"${res.data.name}" Sub category deleted!`);
          loadSubs();
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

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" Sub Category has been created`);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        loadSubs();
      });
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper flex">
              <h4 className="admin_heading">Brands ({subs.length})</h4>
            </div>
          )}

          <div className="admin_components card_compo">
            <div className="form_group">
              <label htmlFor="categoryOptions">Parent category</label>
              <select
                name="category"
                id="categoryOptions"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              name={name}
              setName={setName}
              handleSubmit={handleSubmit}
            />

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {subs.filter(searched(keyword)).map((s) => (
              <div className="admin_products_wrapper" key={s._id}>
                <div className="product_item flex">
                  <h3>{s.name}</h3>

                  <div className="product_item_actions flex">
                    <Link to={`/admin/sub/${s.slug}`}>
                      <span className="action_update action_item green">
                        <EditOutlined />
                      </span>
                    </Link>

                    <div
                      onClick={() => handleRemove(s.slug)}
                      className="action_delete action_item crimson"
                    >
                      <DeleteOutlined />
                    </div>
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

export default CreateSub;
