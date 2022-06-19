import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

import "./search.css";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/shop?${text}`);
    dispatch({
      type: "SET_SEARCH_VISIBLE",
      payload: false,
    });

    dispatch({
      type: "SET_MENU_VISIBLE",
      payload: false,
    });
  };

  return (
    <form className="menu_search_form" style={{ marginBottom: "0px" }} onSubmit={handleSubmit}>
      <input
        type="search"
        className="search "
        placeholder="Search"
        value={text}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
