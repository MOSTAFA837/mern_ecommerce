import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form_group flex">
      <input
        type="text"
        id="craetecategory"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
        placeholder="new category.."
      />

      <br />

      <button className="btn">Save</button>
    </div>
  </form>
);

export default CategoryForm;
