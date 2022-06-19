import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper flex">
        <div className="user-nav">
          <UserNav />
        </div>

        <div className="user-dashboard-main">
          <h4 className="heading">Wishlist</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="wishlist flex">
              <Link to={`/product/${p.slug}`} className="wishlist-title">
                {p.title}
              </Link>

              <span
                onClick={() => handleRemove(p._id)}
                className="wishlist-delete flex"
              >
                <DeleteOutlined className="" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
