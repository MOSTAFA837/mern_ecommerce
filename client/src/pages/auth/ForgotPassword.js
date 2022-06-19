import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { auth } from "../../firebase";
import Loader from "../../components/loader/Loader";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="user-container flex" style={{width: "50%", margin: "auto"}}>
      {loading ? <Loader /> : <h4 className="heading">Forgot Password</h4>}

      <form onSubmit={handleSubmit} className="user-form flex">
        <div className="input-container">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            autoFocus
          />
        </div>

        <button disabled={!email} className="btn-animate user-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
