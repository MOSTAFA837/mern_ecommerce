import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LocalSearch from "../../../components/forms/LocalSearch";

import Loader from "../../../components/loader/Loader";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";

import "../adminDashboard.css";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast(`${res.data.title} has been deleted!`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  // const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const searched = (keyword) => (p) => p.title.toLowerCase().includes(keyword);

  return (
    <div className="admin_dashboard">
      <section className="admin_section flex">
        <nav className="admin_nav card_compo">
          <AdminNav />
        </nav>

        <div className="admin_main">
          {loading ? (
            <Loader />
          ) : (
            <div className="admin_heading_wrapper flex">
              <h4 className="admin_heading">Products ({products.length})</h4>

              <Link className="" to="/admin/product">
                + New Product
              </Link>
            </div>
          )}

          <div className="admin_components card_compo">
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {products.filter(searched(keyword)).map((product) => (
              <div key={product._id} className="admin_products_wrapper">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
