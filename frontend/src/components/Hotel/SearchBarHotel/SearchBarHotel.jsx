import React, { useState } from "react";
import styles from "./SearchBarHotel.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const SearchBarHotel = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className={cx("search-bar")}>
      <input
        type="text"
        placeholder="Tìm kiếm khách sạn..."
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBarHotel
