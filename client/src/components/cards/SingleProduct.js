import React from "react";
import { Tabs } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { showAverage } from "../../functions/rating";
import ProductListItem from "../cards/ProductListItem";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description } = product;

  return (
    <>
      <div className="single_product_carousel">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
        </Carousel>

        <Tabs type="card">
          <TabPane tab="description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 0123456789 for more
          </TabPane>
        </Tabs>
      </div>

      <div className="single_product_info">
        <h1 className="product_info_heading">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="product_info_noRating">No rating yet</div>
        )}

        <ProductListItem product={product} />
      </div>
    </>
  );
};

export default SingleProduct;
