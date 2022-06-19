import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, changeStatus } from "../../functions/admin";

import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";

import "./adminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="admin_dashboard">
      <section className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          <div className="admin_heading_wrapper">
            <h4 className="admin_heading">Orders ({orders.length})</h4>
          </div>

          <div className="admin_components card_compo flex">
            <div className="admin_main_component flex">
              <Orders orders={orders} handleStatusChange={handleStatusChange} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
