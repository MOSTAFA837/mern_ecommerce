import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

import "./category.css";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex" style={{ flexDirection: "column" }}>
      <div className="category_heading_wrapper">
        <div className="category_heading">
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <h4>
              {products.length} Products in "{category.name}"
            </h4>
          )}
        </div>
      </div>

      <div className="product_grid">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
