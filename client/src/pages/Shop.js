import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../functions/product";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Checkbox, Menu, Slider, Radio } from "antd";

import ProductCard from "../components/cards/ProductCard";
import { getCategories } from "../functions/category";
import Star from "../components/forms/Star";
import { getSubs } from "../functions/sub";
import "./shop.css";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Gigabyte",
    "Acer",
    "MSI Optix",
    "BenQ",
    "ASUS ROG",
    "ASUS TUF",
    "Palit GeForce",
    "AMD",
    "Intel",
    "AORUS",
    "HyperX ",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Red",
    "silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  useEffect(() => {
    if (star === "") loadAllProducts();
  }, [star]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page loads
  const loadAllProducts = () => {
    getProductsByCount(15).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });

      if (!text) {
        loadAllProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  // // 3. load products based on price range
  useEffect(() => {
    // if (price === [0, 0]) {
    //   loadAllProducts();
    //   return;
    // }

    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);

    if (price === [0, 0] || []) {
      loadAllProducts();
      return;
    }
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} style={{ marginBottom: "6px" }}>
        <Checkbox
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
          onChange={handleCheck}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    let inTheState = [...categoryIds];
    let checked = e.target.value;
    let isFoundInTheState = inTheState.indexOf(checked); // index / -1

    if (isFoundInTheState === -1) {
      inTheState.push(checked);
    } else {
      inTheState.splice(isFoundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        className=""
        key={s._id}
        onClick={() => handleSub(s)}
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b, i) => (
      <Radio
        key={i}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setSub("");
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  // const showColors = () =>
  //   colors.map((c, i) => (
  //     <Radio
  //       key={i}
  //       value={c}
  //       name={c}
  //       checked={c === color}
  //       onChange={handleColor}
  //       className="pb-1 pl-4 pr-4"
  //     >
  //       {c}
  //     </Radio>
  //   ));

  // const handleColor = (e) => {
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setSub("");
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setBrand("");
  //   setShipping("");

  //   setColor(e.target.value);
  //   fetchProducts({ color: e.target.value });
  // };

  // 9. show products based on shipping yes/no
  // const showShipping = () => (
  //   <>
  //     <Checkbox
  //       className="pb-2 pl-4 pr-4"
  //       onChange={handleShippingchange}
  //       value="Yes"
  //       checked={shipping === "Yes"}
  //     >
  //       Yes
  //     </Checkbox>

  //     <Checkbox
  //       className="pb-2 pl-4 pr-4"
  //       onChange={handleShippingchange}
  //       value="No"
  //       checked={shipping === "No"}
  //     >
  //       No
  //     </Checkbox>
  //   </>
  // );

  // const handleShippingchange = (e) => {
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setSub("");
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setBrand("");
  //   setColor("");

  //   setShipping(e.target.value);
  //   fetchProducts({ shipping: e.target.value });
  // };

  return (
    <div className="shop flex">
      <div className="shop_filters">
        <h4>Search / Filters</h4>

        <Menu
          defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          mode="inline"
        >
          {/* price */}
          <SubMenu
            key="1"
            title={
              <span className="h6">
                <DollarOutlined /> Price
              </span>
            }
          >
            <div style={{ marginTop: "-10px", padding: "15px" }}>
              <Slider
                className=""
                tipFormatter={(v) => `$${v}`}
                range
                value={price}
                onChange={handleSlider}
                max="4999"
              />
            </div>
          </SubMenu>

          {/* category */}
          <SubMenu
            key="2"
            title={
              <span className="">
                <DownSquareOutlined /> Categories
              </span>
            }
          >
            <div style={{ marginTop: "-10px", padding: "15px" }}>
              {showCategories()}{" "}
            </div>
          </SubMenu>

          {/* stars */}
          <SubMenu
            key="3"
            title={
              <span className="">
                <StarOutlined /> Rating
              </span>
            }
          >
            <div style={{ marginTop: "-10px", padding: "15px" }}>
              {showStars()}{" "}
            </div>
          </SubMenu>

          {/* sub Category */}
          {/* <SubMenu
            key="4"
            title={
              <span className="h6">
                <DownSquareOutlined /> Sub Categories
              </span>
            }
          >
            <div style={{ marginTop: "-10px" }}>{showSubs()} </div>
          </SubMenu> */}

          {/* brands */}
          {/* <SubMenu
            key="5"
            title={
              <span className="">
                <DownSquareOutlined /> Brands
              </span>
            }
          >
            <div style={{ maringTop: "-10px" }} className="">
              {showBrands()}
            </div>
          </SubMenu> */}

          {/* colors */}
          {/* <SubMenu
            key="6"
            title={
              <span className="h6">
                <DownSquareOutlined /> Colors
              </span>
            }
          >
            <div style={{ maringTop: "-10px" }} className="pr-5">
              {showColors()}
            </div>
          </SubMenu> */}

          {/* shipping */}
          {/* <SubMenu
            key="7"
            title={
              <span className="h6">
                <DownSquareOutlined /> Shipping
              </span>
            }
          >
            <div style={{ maringTop: "-10px" }} className="pr-5">
              {showShipping()}
            </div>
          </SubMenu> */}
        </Menu>
      </div>
      <div className="shop_products">
        {loading ? (
          <h4 className="heading">Loading...</h4>
        ) : (
          <h4 className="heading">Products</h4>
        )}

        {products.length < 1 && <p className="heading">No Products Found</p>}

        <div className="product_grid_filter">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
