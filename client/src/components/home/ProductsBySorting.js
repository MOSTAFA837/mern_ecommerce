import React, { useEffect, useState } from "react";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";
import { Pagination } from "antd";

import "./productSorting.css"

const ProductsBySorting = ({ sort, order, textHeading }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  });

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts(sort, order, page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="product-section">
      <div className="heading">
        <h4>
          {textHeading}
        </h4>
      </div>

      <div className="products-wrapper">
        {loading ? (
          <LoadingCard count={products.length} />
        ) : (
          <div className="products">
            {products.map((product) => (
              <div className="product-item" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pagination">
        <Pagination
          current={page}
          total={(productsCount / 4) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ProductsBySorting;
