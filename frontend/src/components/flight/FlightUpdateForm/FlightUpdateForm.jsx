import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from "./FlightUpdateForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const FlightUpdateForm = ({ flightId, onClose, onSuccess }) => {
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    airline: "",
    fromLocation: "",
    toLocation: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seats: ""
  });

  // 🔁 Fetch dữ liệu chi tiết flight
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/flights/${flightId}`);
        setFlight(res.data);
        setFormData({
          airline: res.data.airline,
          fromLocation: res.data.fromLocation,
          toLocation: res.data.toLocation,
          departureTime: res.data.departureTime,
          arrivalTime: res.data.arrivalTime,
          price: res.data.price,
          seats: res.data.seats
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  // 🔁 On change input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔄 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/flights/${flightId}`, formData);
      alert("Cập nhật thành công!");
      onSuccess();
    } catch (err) {
      alert("Cập nhật thất bại!");
      console.error(err);
    }
  };

  if (loading) return <div className={cx("loading")}>Đang tải dữ liệu...</div>;

  return (
    <div className={cx("overlay")}>
      <div className={cx("form-container")}>
        <h2 className={cx("title")}>Cập nhật chuyến bay</h2>

        <form onSubmit={handleSubmit} className={cx("form")}>

          <label>Hãng bay</label>
          <input
            type="text"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
          />

          <label>Điểm đi</label>
          <input
            type="text"
            name="fromLocation"
            value={formData.fromLocation}
            onChange={handleChange}
            required
          />

          <label>Điểm đến</label>
          <input
            type="text"
            name="toLocation"
            value={formData.toLocation}
            onChange={handleChange}
            required
          />

          <label>Thời gian khởi hành</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            required
          />

          <label>Thời gian đến nơi</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            required
          />

          <label>Giá vé</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Số ghế</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
          />

          <div className={cx("btn-group")}>
            <button type="submit" className={cx("save-btn")}>Lưu thay đổi</button>
            <button type="button" className={cx("close-btn")} onClick={onClose}>
              Đóng
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FlightUpdateForm
