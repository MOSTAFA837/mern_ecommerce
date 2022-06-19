import React from "react";
import { Select } from "antd";

const { Option } = Select;

const UpdateProductForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div className="form_group">
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleChange} />
      </div>

      <div className="form_group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form_group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form_group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form_group"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form_group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form_group">
        <label>Color</label>
        <select value={color} name="color" onChange={handleChange}>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form_group">
        <label>Brand</label>
        <select value={brand} name="brand" onChange={handleChange}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form_group">
        <label>Category</label>
        <select
          name="category"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form_group">
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default UpdateProductForm;
