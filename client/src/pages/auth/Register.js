import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";

import { auth } from "../../firebase";
import { useSelector } from "react-redux";

import "./user.css"

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email was sent to ${email}. Click the link to complete your registeration`
    );

    window.localStorage.setItem("emailForRegisteration", email);

    setEmail("");
  };

  return (
    <div className="user-container flex" style={{width: "50%", margin: "auto"}}>
      <h4 className="heading">Register</h4>

      <form onSubmit={handleSubmit} className="user-form flex">
        <div className="input-container">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Your Email"
          />
        </div>

        <button type="submit" className="btn-animate user-btn">
          register
        </button>
      </form>
    </div>
  );
};

export default Register;
