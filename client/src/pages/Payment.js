import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="checkout">
      <h4 className="checkout_heading">Complete your purchase</h4>
      <Elements stripe={promise}>
        <div>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
