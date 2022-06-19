import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyles = {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  };

  return (
    <Drawer
      className=""
      title={`Cart / ${cart.length} Products`}
      placement="right"
      closable={false}
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
    >
      {cart.map(({ _id, images, title, count }) => (
        <div key={_id} className="side-cart-wrapper">
          {images[0] && (
            <div className="side-cart flex">
              <img src={images[0].url} alt={title} style={imageStyles} />
              <div>
                <p style={{ color: "var(--primary-color)" }}>{title}</p>
                <p style={{ color: "crimson" }}>Qty: x {count}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="btn-warpper">
        <Link
          to="/cart"
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="btn-animate"
        >
          Go To Cart
        </Link>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
