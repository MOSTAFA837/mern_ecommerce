import React from "react";

import NavItem from "./NavItem";

const AdminNav = () => {
  return (
    <ul className="admin_nav_wrapper flex">
      <NavItem path="/" item="ecommerce" />
      <NavItem path="/admin/dashboard" item="Orders" />
      {/* <NavItem path="/admin/product" item="Product" /> */}
      <NavItem path="/admin/products" item="Products" />
      <NavItem path="/admin/category" item="Categories" />
      <NavItem path="/admin/sub" item="Brands" />
      {/* <NavItem path="/admin/banner" item="Banner" /> */}
      <NavItem path="/admin/coupon" item="Coupon" />
      <NavItem path="/admin/password" item="Password" />
    </ul>
  );
};

export default AdminNav;
