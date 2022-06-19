import React from "react";
import Footer from "./footer/Footer";
import Header from "./nav/Header";

import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>

      <div className="content">{children}</div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
