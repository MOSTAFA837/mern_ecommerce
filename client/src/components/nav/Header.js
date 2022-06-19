import React, { useState } from "react";
import { Badge, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

import "./header.css";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [settings, setSettings] = useState(false);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const showMenu = () => {
    // show search drawer
    dispatch({
      type: "SET_MENU_VISIBLE",
      payload: true,
    });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <div className="header">
      <div className="left">
        <Link to="/" className="item">
          Home
        </Link>

        {user && user.role === "subscriber" && (
          <Link to="/shop" className="item">
            Shop
          </Link>
        )}

        {user && user.role === "subscriber" && (
          <Link to="/cart" className="cart item">
            <ShoppingCartOutlined />
            <span className="cart-length">{cart.length}</span>
          </Link>
        )}
      </div>

      <div className="desktop-wrapper">
        {user && user.role === "subscriber" && (
          <div className="search-wrapper" style={{ marginRight: "2rem" }}>
            <Search />
            <SearchOutlined />
          </div>
        )}

        {!user && (
          <Link to="/login" className="user flex">
            <UserOutlined className="userBtn" />
          </Link>
        )}

        {user && user.role === "subscriber" && (
          <Link to="/user/history" className="item">
            {user.email && user.email.split("@")[0]}
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin/dashboard" className="item">
            {user.email && user.email.split("@")[0]}
          </Link>
        )}

        {user && (
          <Link to="/login" className="flex user" onClick={logout}>
            <LogoutOutlined className="userBtn" />
          </Link>
        )}
      </div>

      <div className="mobile-wrapper">
        <MenuOutlined onClick={showMenu} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Header;
