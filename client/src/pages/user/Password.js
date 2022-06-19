import React, { useState } from "react";
import { toast } from "react-toastify";

import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";

import "./user-dashboard.css";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password Updated");
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit} className="user-form flex">
      <div style={{ width: "100%" }}>
        <label htmlFor="newPassword">Your password</label>

        <div className="input-container">
          <input
            type="text"
            id="newPassword"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
            disabled={loading}
            value={password}
          />
        </div>

        <button
          className="btn-animate user-btn"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="dashboard">
      <div className="dashboard-wrapper flex">
        <div className="user-nav">
          <UserNav />
        </div>

        <div className="user-dashboard-main">
          {loading ? (
            <h4 className="heading">Loading...</h4>
          ) : (
            <h4 className="heading">Password Update</h4>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
