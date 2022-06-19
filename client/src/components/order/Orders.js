import React, { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
// import { getAllUsers } from "../../functions/user";
// import { useSelector } from "react-redux";

const Orders = ({ orders, handleStatusChange }) => {
  // const [ourUser, setOurUser] = useState("");
  // const [users, setUsers] = useState([]);
  // const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   getAllUsers(user.token).then((res) => setUsers(res.data));
  // }, []);

  const showOrderInTable = (order) => (
    // <table className="table">
    //   <thead className="thead">
    //     <tr>
    //       <th scope="col">Title</th>
    //       <th scope="col">Price</th>
    //       <th scope="col">Brand</th>
    //       <th scope="col">Color</th>
    //       <th scope="col">Count</th>
    //       <th scope="col">Shipping</th>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     {order.products.map((p, i) => (
    //       <tr key={i}>
    //         <td>
    //           <b>{p.product.title}</b>
    //         </td>
    //         <td>{p.product.price}</td>
    //         <td>{p.product.brand}</td>
    //         <td>{p.color}</td>
    //         <td>{p.count}</td>
    //         <td>
    //           {p.product.shipping === "Yes" ? (
    //             <CheckCircleOutlined style={{ color: "green" }} />
    //           ) : (
    //             <CloseCircleOutlined style={{ color: "red" }} />
    //           )}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>

    <div className="order_item_main">
      {order.products.map((p, i) => (
        <div>
          <div>
            <span style={{color: "crimson"}}>Title</span>
            <p>
              <b>{p.product.title}</b>
            </p>
          </div>

          <div className="flex">
            <div>
              <span style={{color: "crimson"}}>Price</span>
              <p>{p.product.price}</p>
            </div>
            <div>
              <span style={{color: "crimson"}}>Brand</span>
              <p>{p.product.brand}</p>
            </div>
            <div>
              <span style={{color: "crimson"}}>Color</span>
              <p>{p.color}</p>
            </div>
            <div>
              <span style={{color: "crimson"}}>Count</span>
              <p>{p.count}</p>
            </div>
          </div>

          {/* <div>
            <span>Shipping</span>
            <p>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="order_item">
          <div className="order_item_details">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="status">
              <div className="status__heading">Delivery Status</div>

              <div className="status__content">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="select"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
