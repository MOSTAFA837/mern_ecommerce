import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import UpdateProductForm from "../../../components/forms/UpdateProductForm";
import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { getBanner, updateBanner } from "../../../functions/banner";
import { getCategories } from "../../../functions/category";
import initialState from "../product/initialState";
import FileUpload from "../../../components/forms/FileUpload";

const UpdateProduct = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadBanner();
    loadCategories();
  }, []);

  const loadBanner = () => {
    getBanner(id).then((res) => {
      setValues({ ...values, ...res.data });
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.category = selectedCategory ? selectedCategory : values.category;

    updateBanner(id, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" has been updated!`);
        history.push("/admin/banner");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    setSelectedCategory(e.target.value);

    if (values.category._id === e.target.value) {
      loadBanner();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 fixed">
          <AdminNav />
        </div>

        <div className="col pt-5">
          {loading ? <Loader /> : <h4>Update Product</h4>}

          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleCategoryChange}
                value={
                  selectedCategory ? selectedCategory : values.category._id
                }
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <br />
            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
