import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { getUserOrders } from "../../functions/user";
import UserNav from "../../components/nav/UserNav";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

import "./user-dashboard.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table" style={{ width: "100%" }}>
      <thead className="thead" style={{ textAlign: "center" }}>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody style={{ textAlign: "center" }}>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showOrderInMobile = (order) => (
    <div className="order_mobile">
      {order.products.map((p, i) => (
        <div key={i}>
          <b>
            <small>title:</small> <br />
            {p.product.title}
          </b>

          <h3>
            <small>price:</small> {p.product.price}
          </h3>
          <h3>
            <small>brand:</small> {p.product.brand}
          </h3>
          <h3>
            <small>color:</small> {p.color}
          </h3>
          <h3>
            {" "}
            <small>count:</small>
            {p.count}
          </h3>
          {/* <h3>
            shipping: 
            {p.product.shipping === "Yes" ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}
          </h3> */}
        </div>
      ))}
    </div>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="order-wrapper">
        <ShowPaymentInfo order={order} />

        {/* {showOrderInTable(order)} */}
        {showOrderInMobile(order)}
        <div className="order-item" style={{ margin: "1rem" }}>
          <div>{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper flex">
        <nav className="user-nav">
          <UserNav />
        </nav>

        <div className="user-dashboard-main">
          <h4 className="heading">
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>

          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
