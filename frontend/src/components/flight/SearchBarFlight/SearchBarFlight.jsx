import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SearchBarFlight.module.scss";

const cx = classNames.bind(styles);

const SearchBarFlight = ({ onSearch, onAddClick }) => {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value); // gửi keyword về AdminFlights
  };

  return (
    <div className={cx("searchbar-container")}>
      <input
        type="text"
        className={cx("search-input")}
        placeholder="Tìm kiếm chuyến bay..."
        value={keyword}
        onChange={handleInputChange}
      />

      <button className={cx("add-btn")} onClick={onAddClick}>
        + Thêm chuyến bay
      </button>
    </div>
  );
};

export default SearchBarFlight;
