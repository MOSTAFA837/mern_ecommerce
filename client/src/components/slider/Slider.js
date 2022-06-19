import React, { useState, useEffect } from "react";
import SliderContent from "./SliderContent";

import imageSlider from "./data";
import Dots from "./Dots";
import "./slide.css";
import { getBanners } from "../../functions/banner";
import { getCategories } from "../../functions/category";

const len = imageSlider.length - 1;

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getBanners().then((res) => setBanners(res.data));
  }, []);

  // console.log(banners);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={`slider-container `}>
      <SliderContent activeIndex={activeIndex} imageSlider={imageSlider} />

      <Dots
        activeIndex={activeIndex}
        imageSlider={imageSlider}
        onClick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
};

export default Slider;
