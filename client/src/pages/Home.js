import React from "react";
import CategoryAndSub from "../components/home/CategoryAndSub";
import ProductsBySorting from "../components/home/ProductsBySorting";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import Slider from "../components/slider/Slider";

const Home = () => {
  return (
    <>
      <Slider />

      <ProductsBySorting
        sort="createdAt"
        order="desc"
        textHeading="New Arrivals"
      />

      <ProductsBySorting sort="sold" order="desc" textHeading="Best Sellers" />

      <CategoryAndSub title="Categories" component={<CategoryList />} />
      <CategoryAndSub title="Sub Categories" component={<SubList />} />
    </>
  );
};

export default Home;
