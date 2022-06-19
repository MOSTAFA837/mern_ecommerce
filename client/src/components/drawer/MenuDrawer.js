import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

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
import Background from "../../images/back-gradient.png";

import "./menuDrawer.css";
import { getCategories, getCategory } from "../../functions/category";
import { Link } from "react-router-dom";

const MenuDrawer = () => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const { menuDrawer, user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const closeMenuDrawer = () => {
    dispatch({
      type: "SET_MENU_VISIBLE",
      payload: false,
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
    <Drawer
      className="text-center"
      placement="right"
      visible={menuDrawer}
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_MENU_VISIBLE",
          payload: false,
        });
      }}
    >
      <div className="menu flex">
        <div className="search-wrapper">
          {/* <SearchOutlined /> */}
          <Search />
        </div>

        {!user && (
          <Link onClick={closeMenuDrawer} to="/login" className="user">
            <UserOutlined className="userBtn" />
          </Link>
        )}

        {user && user.role === "subscriber" && (
          <Link to="/user/history" onClick={closeMenuDrawer} className="item">
            {user.email && user.email.split("@")[0]}
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link
            to="/admin/dashboard"
            onClick={closeMenuDrawer}
            className="item"
          >
            {user.email && user.email.split("@")[0]}
          </Link>
        )}

        <div onClick={closeMenuDrawer}>
          {user && (
            <Link to="/login" className="user item flex" onClick={logout}>
              <LogoutOutlined className="userBtn" />
              <span>Logout</span>
            </Link>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
