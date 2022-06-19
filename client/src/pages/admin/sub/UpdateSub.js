import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import CategoryForm from "../../../components/forms/CategoryForm";
import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import UpdateSubForm from "../../../components/forms/UpdateSubForm";

const UpdateSub = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.sub.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" Sub Category has been updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
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
              <Link to="/admin/sub">Back to brands</Link>
              <h4 className="admin_heading">Update Brand</h4>
            </div>
          )}

          <div
            className="admin_components card_compo"
            style={{ padding: "1.2rem" }}
          >
            <div className="form_group">
              <label htmlFor="categoryOptions">
                <select
                  name="category"
                  id="categoryOptions"
                  className="form-control"
                  onChange={(e) => setParent(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option
                        value={c._id}
                        key={c._id}
                        defaultValue={c._id === parent}
                      >
                        {c.name}
                      </option>
                    ))}
                </select>
              </label>

              <UpdateSubForm
                name={name}
                setName={setName}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSub;
