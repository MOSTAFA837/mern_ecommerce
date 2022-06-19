import React from "react";
import { Link } from "react-router-dom";

const AdminUnit = ({ title, count, bg, link }) => {
  return (
    <Link to={link} className={`admin-unit`}>
      <h2 className={bg}>{title}</h2>
      <p>{count}</p>
    </Link>
  );
};

export default AdminUnit;
