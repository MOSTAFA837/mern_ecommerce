import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  createCashOrderForUser,
} from "../functions/user";

import "./checkout.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => ({ ...state.coupon }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove cart from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // remove cart from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    // remove cart from DB
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Your cart has been emptied.");
    });
  };

  const saveAddressToDB = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);

        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);

        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      // console.log("USER CASH ORDER CREATED RES ", res);

      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");

        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });

        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });

        // mepty cart from backend
        emptyUserCart(user.token);

        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />

      <button className="btn-animate checkout-btn" onClick={saveAddressToDB}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
      />
      <button onClick={applyDiscountCoupon} className="btn-animate checkout-btn">
        Apply
      </button>
    </>
  );

  return (
    <div className="checkout flex">
      <div className="checkout_address">
        <h4 className="checkout_heading">Delivery Address</h4>

        {showAddress()}

        <h4 className="coupon_heading">Got Coupon?</h4>

        {showApplyCoupon()}

        {discountError && <p className="discountError">{discountError}</p>}
      </div>

      <div className="checkout_summary">
        <h4 className="checkout_heading">Order Summary</h4>
        <p> {products.length} Products</p>
        {showProductSummary()}
        <p className="total">Cart Total: ${total} </p>

        {totalAfterDiscount > 0 && (
          <p className="copoun">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        {COD ? (
          <button
            className="btn-animate checkout-btn"
            disabled={!addressSaved || !products.length}
            onClick={createCashOrder}
          >
            Place Order
          </button>
        ) : (
          <button
            className="btn-animate checkout-btn"
            disabled={!addressSaved || !products.length}
            onClick={() => history.push("/payment")}
          >
            Place Order
          </button>
        )}

        <button
          disabled={!products.length}
          onClick={emptyCart}
          className="btn-animate checkout-btn"
        >
          Empty Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
