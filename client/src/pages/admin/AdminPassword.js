import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase";

import Loader from "../../components/loader/Loader";
import AdminNav from "../../components/nav/AdminNav";

import "./adminDashboard.css";

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
    <div className="admin_components card_compo">
      <form onSubmit={handleSubmit}>
        <div style={{ width: "100%" }} className="form_group">
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
            className="btn"
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="admin_dashboard">
      <section className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper flex">
              <h4 className="admin_heading">Password</h4>
            </div>
          )}

          {passwordUpdateForm()}
        </div>
      </section>
    </div>
  );
};

export default Password;
