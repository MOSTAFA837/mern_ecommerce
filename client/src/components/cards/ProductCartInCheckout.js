import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import initialState from "../../pages/admin/product/initialState";

const ProductCartInCheckout = ({ product }) => {
  const { title, price, brand, color, count, images, _id, shipping, quantity } =
    product;
  const { colors } = initialState;

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    // console.log(e.target.value);

    let cart = [];

    let cartItems = localStorage.getItem("cart");
    if (typeof window !== undefined) {
      if (cartItems) {
        cart = JSON.parse(cartItems);
      }

      cart.map((item, i) => {
        if (item._id === _id) {
          cart[i].color = e.target.value;
        }
      });

      // console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > quantity) {
      toast.error(`Max available quantity: ${quantity}`);
      return;
    }

    let cart = [];

    let cartItems = localStorage.getItem("cart");
    if (typeof window !== undefined) {
      if (cartItems) {
        cart = JSON.parse(cartItems);
      }

      cart.map((item, i) => {
        if (item._id == _id) {
          cart[i].count = count;
        }
      });

      // console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];

    let cartItems = localStorage.getItem("cart");
    if (typeof window !== undefined) {
      if (cartItems) {
        cart = JSON.parse(cartItems);
      }

      cart.map((item, i) => {
        if (item._id === _id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr style={{height: "100%", padding: ".5rem"}}>
        <td className="flex cart-item-desc" style={{ padding: ".5rem"}}>
          <div style={{ width: "50px", height: "50px", margin: "auto" }}>
            {images.length && (
              <ModalImage small={images[0].url} large={images[0].url} />
            )}
          </div>
          <h5>{title}</h5>
        </td>
        <td>{price}</td>
        <td>{brand}</td>
        {/* <td>
          <select
            name="color"
            className="form-control"
            onChange={handleColorChange}
            style={{
              border: "none",
              outline: "none,",
              background: "#e5e5e5",
              padding: "5px"
            }}
          >
            {color ? (
              <option value={color}>{color}</option>
            ) : (
              <option>select</option>
            )}
            {colors
              .filter((c) => c !== color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
          </select>
        </td> */}
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleQuantityChange}
            style={{
              width: "5rem",
              border: "none",
              outline: "none",
              textAlign: "center",
            }}
          />
        </td>
        {/* <td className="text-center">
          {shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td> */}
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartInCheckout;
