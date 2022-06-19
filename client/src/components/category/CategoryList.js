import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

import "./categoryAndSubList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((category) => {
      setCategories(category.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="categoryContainer">
      <div className="wrapper flex">
        {loading ? (
          <h4 className="">Loading...</h4>
        ) : (
          categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              key={category._id}
              className="category-item"
            >
              {category.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
