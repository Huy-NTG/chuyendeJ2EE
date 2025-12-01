import React from 'react'
import styles from "./HotelItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
<<<<<<< HEAD
const HotelItem = ({ hotel }) => {
  const firstImage = hotel.images?.length > 0 ? hotel.images[0].imageUrl : null;

=======
const HotelItem = ({ hotel, onEdit = () => {}, onToggleStatus = () => {} }) => {
  const firstImage = hotel.images?.length > 0 ? hotel.images[0].imgUrl : null;
  const isActive = hotel.status === "ACTIVE"; // ✔ FIX
>>>>>>> origin/master
  return (
    <div className={cx("hotel-card")}>
      <img
        src={
          firstImage
<<<<<<< HEAD
            ? `http://localhost:8080/uploads/hotels/${firstImage}`
=======
            ? `http://localhost:8080/uploads/${firstImage}`
>>>>>>> origin/master
            : "/no-image.png"  
        }
        alt={hotel.name}
        className={cx("hotel-image")}
      />

      <div className={cx("hotel-info")}>
        <h3>{hotel.name}</h3>
        <p className={cx("location")}>{hotel.location}</p>
        <p className={cx("description")}>{hotel.description}</p>
<<<<<<< HEAD
=======
        <p>
          Trạng thái:{" "}
          <strong style={{ color: isActive ? "green" : "orange" }}>
            {hotel.status}
          </strong>
        </p>
        <div className={cx("hotel-actions")}>
          <button
            className={cx("btn", "btn-edit")}
            onClick={() => onEdit(hotel)}
          >
            Xem chi tiết / Sửa
          </button>

          <button
            className={cx("btn", isActive ? "btn-hide" : "btn-show")}
            onClick={() => onToggleStatus(hotel.id)}
          >
            {isActive ? "Ẩn khách sạn" : "Hiện khách sạn"}
          </button>
        </div>
>>>>>>> origin/master
      </div>
    </div>
  );
};
<<<<<<< HEAD


export default HotelItem
=======
export default HotelItem
>>>>>>> origin/master
