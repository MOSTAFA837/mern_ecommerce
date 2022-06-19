import React from "react";

const CreateProductForm = ({
  options,
  select,
  type,
  title,
  value,
  handleChange,
}) => {
  return (
    <div className="form_group">
      <label htmlFor={title}>{title.toUpperCase()}</label>
      {select ? (
        <select name={title} onChange={handleChange}>
          <option>Please select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          name={title}
          id={title}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default CreateProductForm;
