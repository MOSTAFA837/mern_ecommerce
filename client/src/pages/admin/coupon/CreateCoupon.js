import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import AdminNav from "../../../components/nav/AdminNav";
import Loader from "../../../components/loader/Loader";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="admin_dashboard">
      <div className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper flex">
              <h4 className="admin_heading">Coupons ({coupons.length})</h4>
            </div>
          )}

          <div className="admin_components card_compo">
            <h3 style={{color: "crimson"}}>New copoun</h3>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                />
              </div>

              <div className="form_group">
                <label>Discount %</label>
                <input
                  type="text"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                />
              </div>

              <div className="form_group">
                <label>Expiry</label>
                <br />
                <DatePicker
                  selected={new Date()}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                />
              </div>

              <button className="btn">Save</button>
            </form>

            <br />

            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                    <td>{c.discount}%</td>
                    <td className="product_item_actions">
                      <div
                        onClick={() => handleRemove(c._id)}
                        className="action_delete action_item crimson"
                        style={{fontSize: "1.2rem"}}
                      >
                        <DeleteOutlined />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
