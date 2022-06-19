import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";

const SliderContent = ({ activeIndex, imageSlider }) => {
  // console.log(banners[0]);
  return (
    <section className="slider-section">
      {imageSlider.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <div className="img-wrapper">
            <img src={slide.imgUrl} className="slide-image" alt="" />
          </div>

          <h2 className="category">{slide.category}</h2>
          {/* <div className="text-container">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="buyNow">Shop Now</p>
          </div> */}
        </div>
      ))}
    </section>
  );
};

export default SliderContent;
