import React from "react";
import FlightItem from "../FlightItem/FlightItem";
import styles from "./FlightList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FlightList = ({ flights, onViewDetail, onCancel }) => {
  if (flights.length === 0) {
    return <p className={cx("no-data")}>Không có chuyến bay nào.</p>;
  }
  return (
    <div className={cx("flight-list")}>
      {flights.map((flight) => (
        <FlightItem 
          key={flight.id} 
          flight={flight} 
          onViewDetail={onViewDetail}
          onCancel={onCancel} 
        />
      ))}
    </div>
  );
};
export default FlightList;