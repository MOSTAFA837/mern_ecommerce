import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ path, item }) => {
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <li className={pathMatchRoute(`${path}`) ? "active item " : "item "}>
      <Link to={path}>{item}</Link>
    </li>
  );
};

export default NavItem;
