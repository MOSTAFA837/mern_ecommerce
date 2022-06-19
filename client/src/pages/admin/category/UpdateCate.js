import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateCategoryForm from "../../../components/forms/UpdateCategoryForm";
import Loader from "../../../components/loader/Loader";

import { getCategory, updateCategory } from "../../../functions/category";

const UpdateCate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.category.name));

  useEffect(() => {
    loadCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName(res.data);
        toast.success(`"${res.data.name}" Category has been UPDATED`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_section">
        <div className="admin_main" style={{ margin: "auto" }}>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper">
              <Link to="/admin/category">Back to dashboard</Link>
              <h4 className="admin_heading">Update Category</h4>
            </div>
          )}

          <div className="admin_components card_compo">
            <UpdateCategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCate;
