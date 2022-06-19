import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Select } from "antd";

import CreateProductForm from "../../../components/forms/CreateProductForm";
import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { createProduct } from "../../../functions/product";
import FileUpload from "../../../components/forms/FileUpload";
import initialState from "./initialState";
import { Link } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSub, setShowSub] = useState(false);

  const {
    title,
    description,
    price,
    categories,
    subs,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
    shippOptions,
  } = values;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
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
    // console.log(e.target.name, e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_section">
        <div className="admin_main" style={{ margin: "auto" }}>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper">
              <Link to="/admin/products">Back to dashboard</Link>
              <h4 className="admin_heading">New Product</h4>
            </div>
          )}

          <div
            className="admin_components card_compo"
            style={{ padding: "1.2rem" }}
          >
            <div className="upload flex">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <CreateProductForm
                title="title"
                value={title}
                handleChange={handleChange}
              />
              <CreateProductForm
                title="description"
                value={description}
                handleChange={handleChange}
              />
              <CreateProductForm
                title="price"
                type="number"
                value={price}
                handleChange={handleChange}
              />
              <CreateProductForm
                title="quantity"
                type="number"
                value={quantity}
                handleChange={handleChange}
              />
              <CreateProductForm
                select
                title="shipping"
                value={shipping}
                options={shippOptions}
                handleChange={handleChange}
              />
              <CreateProductForm
                select
                options={colors}
                title="color"
                value={color}
                handleChange={handleChange}
              />
              <CreateProductForm
                select
                options={brands}
                title="brand"
                value={brand}
                handleChange={handleChange}
              />

              <div className="form_group">
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

              <div className="form_group">
                <label>Sub Category</label>
                {showSub && subOptions.length > 0 ? (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                  >
                    {subOptions.length &&
                      subOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                          {s.name}
                        </Option>
                      ))}
                  </Select>
                ) : (
                  <p>No Sub Categories</p>
                )}
              </div>

              <button className="btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
