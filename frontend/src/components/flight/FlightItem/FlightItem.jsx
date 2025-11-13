import React from "react";
import styles from "./FlightItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FlightItem = ({ flight }) => {
  return (
    <div className={cx("flight-card")}>
      <div className={cx("flight-header")}>
        <h3>{flight.airline}</h3>
        <span className={cx("price")}>
          {flight.price?.toLocaleString()} VND
        </span>
      </div>
      <div className={cx("flight-body")}>
        <div className={cx("locations")}>
          <span>{flight.fromLocation}</span> ✈ <span>{flight.toLocation}</span>
        </div>
        <div className={cx("times")}>
          <p>
            <strong>Khởi hành:</strong>{" "}
            {new Date(flight.departureTime).toLocaleString()}
          </p>
          <p>
            <strong>Đến nơi:</strong>{" "}
            {new Date(flight.arrivalTime).toLocaleString()}
          </p>
        </div>
      </div>
      <div className={cx("flight-footer")}>
        <span>Số ghế: {flight.seats}</span>
        <span className={cx("created")}>
          Ngày tạo: {new Date(flight.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default FlightItem;
