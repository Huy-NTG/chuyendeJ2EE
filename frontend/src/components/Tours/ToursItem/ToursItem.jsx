import React from 'react';
import styles from './ToursItem.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ToursItem = ({ tour, onViewDetail }) => {
  return (
    <div className={cx("tour-card")}>
      {/* Ảnh tour */}
      <div className={cx("image-wrapper")}>
        <img
          src={`http://localhost:8080/uploads/${tour.imageUrl}`}
          alt={tour.name}
          className={cx("tour-image")}
        />
      </div>

      {/* Nội dung */}
      <div className={cx("tour-content")}>
        <h3 className={cx("tour-name")}>{tour.name}</h3>
        <p className={cx("tour-location")}>📍 {tour.location}</p>
        <p className={cx("tour-description")}>{tour.description}</p>

        <div className={cx("tour-info")}>
          <span className={cx("tour-date")}>
            🗓 {tour.startDate} → {tour.endDate}
          </span>
          <span className={cx("tour-seats")}>
            🧍‍♂️ {tour.seats} chỗ
          </span>
        </div>

        <div className={cx("tour-footer")}>
          <span className={cx("tour-price")}>
            {tour.price?.toLocaleString()} ₫
          </span>
          <button
            className={cx("detail-btn")}
            onClick={() => onViewDetail && onViewDetail(tour.id)}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToursItem;
