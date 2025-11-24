import React from 'react'
import HotelItem from "../HotelItem/HotelItem";
import styles from "./HotelList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HotelList = ({ hotels, loading }) => {
  if (loading) return <p className={cx("loading")}>Đang tải...</p>;

  if (hotels.length === 0)
    return <p className={cx("no-data")}>Không có khách sạn nào.</p>;

  return (
    <div className={cx("hotel-list")}>
      {hotels.map((hotel) => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList