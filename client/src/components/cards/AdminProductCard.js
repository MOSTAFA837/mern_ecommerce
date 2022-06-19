import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, images, slug } = product;

  return (
    <div className="product_item flex">
      <div className="product_item_img">
        <img src={images && images.length && images[0].url} alt="" />
      </div>

      <h3>{title}</h3>

      <div className="product_item_actions flex">
        <Link to={`/admin/product/${slug}`}>
          <span className="action_update action_item green">
            <EditOutlined />
          </span>
        </Link>

        <div
          onClick={() => handleRemove(slug)}
          className="action_delete action_item crimson"
        >
          <DeleteOutlined />
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
