import React from "react";

const CategoryAndSub = ({ title, component }) => {
  return (
    <>
      <div className="heading">
        <h4 style={{ margin: "2rem auto" }}>{title}</h4>
      </div>

      {component}
    </>
  );
};

export default CategoryAndSub;
