import React from 'react'
import styles from "./HotelItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const HotelItem = ({ hotel }) => {
  const firstImage = hotel.images?.length > 0 ? hotel.images[0].imageUrl : null;

  return (
    <div className={cx("hotel-card")}>
      <img
        src={
          firstImage
            ? `http://localhost:8080/uploads/hotels/${firstImage}`
            : "/no-image.png"  
        }
        alt={hotel.name}
        className={cx("hotel-image")}
      />

      <div className={cx("hotel-info")}>
        <h3>{hotel.name}</h3>
        <p className={cx("location")}>{hotel.location}</p>
        <p className={cx("description")}>{hotel.description}</p>
      </div>
    </div>
  );
};


export default HotelItem
