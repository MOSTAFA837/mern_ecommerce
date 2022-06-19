import React from "react";
import NavItem from "./NavItem";

const UserNav = () => {
  return (
    <ul className="user-nav-wrapper">
      <NavItem path="/user/history" item="History" />
      <NavItem path="/user/password" item="Password" />
      <NavItem path="/user/wishlist" item="Wishlist" />
    </ul>
  );
};

export default UserNav;
