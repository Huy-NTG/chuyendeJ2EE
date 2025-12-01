import React from "react";
import styles from "./FlightItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FlightItem = ({ flight, onViewDetail, onCancel }) => {
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
      <div className={cx("btn-group")}>
            <button
              className={cx("detail-btn")}
              onClick={() => onViewDetail && onViewDetail(flight.id)}
            >
              Xem chi tiết
            </button>

            {/* Nếu flight đang ACTIVE → Cho phép hủy */}
            {flight.status === "ACTIVE" && (
              <button
                className={cx("cancel-btn")}
                onClick={() => onCancel && onCancel(flight.id)}
              >
                ❌ Hủy chuyến bay
              </button>
            )}

            {/* Nếu flight đã CANCELLED → nút disabled */}
            {flight.status === "CANCELLED" && (
              <button className={cx("cancelled-btn")} disabled>
                Đã hủy
              </button>
            )}

            {/* Nếu đã hoàn thành */}
            {flight.status === "FINISHED" && (
              <button className={cx("finished-btn")} disabled>
                Đã hoàn thành
              </button>
            )}
          </div>
    </div>
  );
};

export default FlightItem;
