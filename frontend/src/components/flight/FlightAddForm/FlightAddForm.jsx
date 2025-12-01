import React, { useState } from "react";
import axios from "axios";
import styles from "./FlightAddForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const FlightAddForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    airline: "",
    fromLocation: "",
    toLocation: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seats: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/flights", form);
      alert("Thêm chuyến bay thành công!");
      onSuccess();
    } catch (error) {
      console.error("Lỗi thêm chuyến bay:", error);
      alert("Thêm chuyến bay thất bại!");
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <h3 className={cx("title")}>Thêm chuyến bay mới</h3>

        <form onSubmit={handleSubmit} className={cx("form")}>
          <input
            type="text"
            name="airline"
            placeholder="Hãng bay"
            value={form.airline}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="fromLocation"
            placeholder="Điểm đi"
            value={form.fromLocation}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="toLocation"
            placeholder="Điểm đến"
            value={form.toLocation}
            onChange={handleChange}
            required
          />

          <label>Thời gian khởi hành:</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={form.departureTime}
            onChange={handleChange}
            required
          />

          <label>Thời gian hạ cánh:</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={form.arrivalTime}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Giá vé"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Số ghế"
            value={form.seats}
            onChange={handleChange}
            required
          />

          <div className={cx("btn-group")}>
            <button type="submit" className={cx("btn-save")}>Lưu</button>
            <button type="button" className={cx("btn-cancel")} onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightAddForm;
