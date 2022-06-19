import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartInCheckout from "../components/cards/ProductCartInCheckout";
import { userCart } from "../functions/user";

import "./cart.css";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((curr, next) => {
      return curr + next.count * next.price;
    }, 0);
  };

  const saveOrderToDB = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log(err));
  };

  const saveCashOrderToDB = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div className="cart flex">
      <div className="cart_products">
        <h4>Cart / {cart.length} Products</h4>

        {!cart.length ? (
          <h4>
            NO Products in your cart <Link to="/shop">Go Shopping.</Link>
          </h4>
        ) : (
          <table className="table">
            <thead className="thead">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                {/* <th scope="col">Color</th> */}
                <th scope="col">Count</th>
                {/* <th scope="col">Shipping</th> */}
                <th scope="col">Remove</th>
              </tr>
            </thead>

            {cart.map((product) => (
              <ProductCartInCheckout key={product._id} product={product} />
            ))}
          </table>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart_summary">
          <h4>Order Summary</h4>
          {cart.map(({ title, count, price }, i) => (
            <div key={i}>
              <p className="summary_product">
                {count} x {title} <br /> <span>${price * count}</span>
              </p>
            </div>
          ))}
          <div className="total">
            Total: <b>${getTotal()}</b>
          </div>
          {user ? (
            <>
              <button
                className="btn-animate cart-btn"
                onClick={saveOrderToDB}
                disabled={!cart.length}
              >
                proceed to Checkout
              </button>

              <br />
              <button
                onClick={saveCashOrderToDB}
                className="btn-animate cart-btn"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn-animate cart-btn">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
