import React from 'react'
import styles from "./HotelItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const HotelItem = ({ hotel, onEdit = () => {}, onToggleStatus = () => {} }) => {
  const firstImage = hotel.images?.length > 0 ? hotel.images[0].imgUrl : null;
  const isActive = hotel.status === "ACTIVE"; // ✔ FIX
  return (
    <div className={cx("hotel-card")}>
      <img
        src={
          firstImage
            ? `http://localhost:8080/uploads/${firstImage}`
            : "/no-image.png"  
        }
        alt={hotel.name}
        className={cx("hotel-image")}
      />

      <div className={cx("hotel-info")}>
        <h3>{hotel.name}</h3>
        <p className={cx("location")}>{hotel.location}</p>
        <p className={cx("description")}>{hotel.description}</p>
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
      </div>
    </div>
  );
};
export default HotelItem
