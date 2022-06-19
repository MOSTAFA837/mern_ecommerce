import React, { useState } from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { showAverage } from "../../functions/rating";
import casePc from "../../images/case.png";

import "./productCard.css";

const ProductCard = ({ product }) => {
  const { images, slug, quantity, title } = product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];

    if (typeof window !== undefined) {
      // get cart items from local storage
      let cartItems = localStorage.getItem("cart");
      if (cartItems) {
        cart = JSON.parse(cartItems);
      }

      // add new product to cart
      cart.push({ ...product, count: 1 });

      // remove duplicated products from cart
      let uniqueProducts = _.uniqWith(cart, _.isEqual);

      // save cart to local storage
      console.log("cart", uniqueProducts);
      localStorage.setItem("cart", JSON.stringify(uniqueProducts));

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: uniqueProducts,
      });

      // show side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="img-container">
          <Link to={`/product/${slug}`} onClick={() => window.scrollTo(0, 0)}>
            <img
              src={images && images.length ? images[0].url : casePc}
              className="img"
            />
          </Link>
        </div>

        <div className="title">
          <p>{title}</p>
        </div>

        <div className="product-actions">
          <a
            onClick={handleAddToCart}
            className="btn-animate flex"
            disabled={quantity < 1}
          >
            <ShoppingCartOutlined />
            <br />
            {quantity < 1 ? (
              <span>Out of stock</span>
            ) : (
              <span>Add to Cart</span>
            )}
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
