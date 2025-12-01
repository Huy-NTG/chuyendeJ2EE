<<<<<<< HEAD
import React from 'react'
import HotelItem from "../HotelItem/HotelItem";
import styles from "./HotelList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HotelList = ({ hotels, loading }) => {
=======
import React, {useState, useEffect} from 'react'
import HotelItem from "../HotelItem/HotelItem";
import HotelUpdateForm from "../HotelUpdateForm/HotelUpdateForm";
import styles from "./HotelList.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
const cx = classNames.bind(styles);

const HotelList = ({ hotels, loading, onToggleStatus }) => {
  const [editingHotel, setEditingHotel] = useState(null);

  const openEditForm = (hotel) => {
    setEditingHotel(hotel);
  };

  const closeEditForm = () => {
    setEditingHotel(null);
  };

  const handleSave = async (id, form) => {
    try {
      await axios.put(`http://localhost:8080/api/hotels/${id}`, form);
      alert("Cập nhật thành công!");

      closeEditForm();

      window.location.reload(); // tạm reload để cập nhật lại danh sách
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi cập nhật");
    }
  };

>>>>>>> origin/master
  if (loading) return <p className={cx("loading")}>Đang tải...</p>;

  if (hotels.length === 0)
    return <p className={cx("no-data")}>Không có khách sạn nào.</p>;

  return (
<<<<<<< HEAD
    <div className={cx("hotel-list")}>
      {hotels.map((hotel) => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
=======
     <div className={cx("hotel-list")}>
      {hotels.map((hotel) => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
          onEdit={openEditForm}
          onToggleStatus={onToggleStatus}
        />
      ))}

      {editingHotel && (
        <HotelUpdateForm
          hotel={editingHotel}
          onClose={closeEditForm}
          onSave={handleSave}
        />
      )}
>>>>>>> origin/master
    </div>
  );
};

export default HotelList