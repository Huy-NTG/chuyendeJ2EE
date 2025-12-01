import React, { useState } from "react";
import styles from "./SearchBarTour.module.scss";
import classNames from "classnames/bind";
import AddTourForm from "../ToursAddForm/AddTourForm";
import { FiPlus, FiSearch } from "react-icons/fi";

const cx = classNames.bind(styles);

const SearchBarTour = ({ onSearch, onAddClick }) => {
  const [keyword, setKeyword] = useState("");
  // const [showForm, setShowForm] = useState(false);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={cx("search-bar-container")}>
      <FiSearch size={18} color="#555" />
      <input
        type="text"
        placeholder="Tìm kiếm tour..."
        value={keyword}
        onChange={handleSearch}
        className={cx("search-input")}
      />
      <button onClick={onAddClick} className={cx("add-button")}>
        <FiPlus /> Thêm Tour
      </button>

      {/* {showForm && <AddTourForm onClose={() => setShowForm(false)} />} */}
    </div>
  );
};

export default SearchBarTour;
