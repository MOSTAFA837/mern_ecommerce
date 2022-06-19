import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import CreateProductForm from "../../../components/forms/CreateProductForm";
import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../functions/category";
import {
  createBanner,
  getBanners,
  removeBanner,
} from "../../../functions/banner";
import FileUpload from "../../../components/forms/FileUpload";
import initialState from "../product/initialState";
import { Link } from "react-router-dom";

const CreateBanner = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const { category, categories, images, title } = values;

  useEffect(() => {
    loadCategories();
    loadAllBanners();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const loadAllBanners = () => {
    setLoading(true);
    getBanners()
      .then((res) => {
        setBanners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createBanner(values, user.token)
      .then((res) => {
        console.log(res.data);
        // toast.success(`"${res.data.title}" has been created`);
        window.alert(`"${res.data.title}" has been created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
  };

  const handleRemove = (id) => {
    if (window.confirm("Delete?")) {
      removeBanner(id, user.token)
        .then((res) => {
          loadAllBanners();
          toast.success(`${res.data.title} has been deleted!`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 fixed">
          <AdminNav />
        </div>

        <div className="col pt-5">
          {loading ? <Loader /> : <h4>New Banner</h4>}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <CreateProductForm
              title="title"
              value={title}
              handleChange={handleChange}
            />

            <div className="form-group">
              <label htmlFor="categoryOptions">CATEGORY</label>
              <select
                name="category"
                id="categoryOptions"
                className="form-control"
                onChange={handleCategoryChange}
              >
                <option>Select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form>

          <div className="col">
            {banners.map((item) => (
              <div className="banner" key={item._id}>
                <h2>{item.title}</h2>

                <div className="actions">
                  <Link to={`/admin/banner/${item._id}`}>
                    <input type="button" value="update" />
                  </Link>

                  <input
                    type="button"
                    value="delete"
                    onClick={() => handleRemove(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
