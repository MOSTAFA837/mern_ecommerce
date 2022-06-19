import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="categoryContainer">
      <div className="wrapper flex">
        {loading ? (
          <h4 className="">Loading...</h4>
        ) : (
          subs.map((sub) => (
            <Link
              key={sub._id}
              to={`/sub/${sub.slug}`}
              className="category-item"
            >
              {sub.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SubList;
