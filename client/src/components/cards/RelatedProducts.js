import React from "react";
import ProductCard from "../cards/ProductCard";

const RelatedProducts = ({ related }) => {
  return (
    <section className="related_section">
      <div className="related_heading">
        <h4>You may also like</h4>
      </div>

      <div className="product_grid">
        {related.length ? (
          related.map((product) => (
            <div key={product._id} className="related_main_item">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="noRelated">No Products Found</div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
