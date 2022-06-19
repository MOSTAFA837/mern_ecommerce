import React, { useState, useEffect } from "react";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, getRelated, productStar } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import RelatedProducts from "../components/cards/RelatedProducts";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";
import RatingModal from "../components/modal/RatingModal";
import { addToWishlist } from "../functions/user";
import _ from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import "../components/cards/singleProduct.css";

const Product = ({ match }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();
  let history = useHistory();

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      // single product
      setProduct(res.data);

      // related products
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      loadSingleProduct();
    });
  };

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

      // show tooltip
      setTooltip("Added to your cart");

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <div className="single_product">
      <div className="single_product_wrapper flex">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="product_actions flex">
        <a onClick={handleAddToCart} className="btn-animate single_pro_action">
          <ShoppingCartOutlined />
          <span>Add to Cart</span>
        </a>

        <a
          onClick={handleAddToWishlist}
          className="btn-animate single_pro_action"
        >
          <HeartOutlined /> <span>Add to Wishlist</span>
        </a>

        <RatingModal>
          <StarRating
            name={product._id}
            numberOfStars={5}
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="crimson"
            starHoverColor="crimson"
          />
        </RatingModal>
      </div>

      <RelatedProducts related={related} />
    </div>
  );
};

export default Product;
