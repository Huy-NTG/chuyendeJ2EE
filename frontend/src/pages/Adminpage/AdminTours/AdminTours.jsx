import React, { useEffect, useState } from "react";
import axios from "axios";
import ToursList from "../../../components/Tours/ToursList/ToursList";
import SearchBarTour from "../../../components/Tours/SearchBarTour/SearchBarTour";
import AddTourForm from "../../../components/Tours/ToursAddForm/AddTourForm";
import TourUpdateForm from "../../../components/Tours/ToursUpdateForm/ToursUpdateForm";
import styles from './AdminTours.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AdminTours = () => {
  const [keyword, setKeyword] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);
   // 🔁 Hàm fetch danh sách tour
  const fetchTours = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080/api/tours";
      if (keyword.trim() !== "") {
        url = `http://localhost:8080/api/tours/search?name=${encodeURIComponent(keyword)}`;
      }
      const res = await axios.get(url);
      setTours(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách tour:", error);
    } finally {
      setLoading(false);
    }
  };
  // Gọi API khi keyword thay đổi
  useEffect(() => {
      fetchTours();
  }, [keyword]);
  // Khi thêm tour thành công → reload lại danh sách
  const handleAddSuccess = () => {
    fetchTours();
    setShowAddForm(false);
  };
  // Khi cập nhật tour thành công → reload lại danh sách
  const handleUpdateSuccess = () => {
  fetchTours();
  setSelectedTourId(null);
  };
  return (
     <div className={cx("admin-tours")}>
      <h2>Quản lý Tour</h2>
      <SearchBarTour onSearch={setKeyword} onAddClick={() => setShowAddForm(true)} />
      <ToursList tours={tours} onViewDetail={setSelectedTourId} />
      {/* Form thêm tour */}
      {showAddForm && (
        <AddTourForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
        />
      )}
      {/* Form cập nhật tour */}
      {selectedTourId && (
      <TourUpdateForm
        tourId={selectedTourId}
        onClose={() => setSelectedTourId(null)}
        onSuccess={handleUpdateSuccess}
      />
    )}
    </div>
  )
}

export default AdminTours
