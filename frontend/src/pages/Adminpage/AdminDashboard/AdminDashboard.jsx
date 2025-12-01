import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.scss";
import classNames from "classnames/bind";
import { FaRoute, FaUser, FaClipboardList, FaHotel } from "react-icons/fa";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import StatCard from "../../../components/StatCard/StatCard";

const cx = classNames.bind(styles);

const AdminDashboard = () => {
  const [tourCount, setTourCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  useEffect(() => {
      const fetchCounts = async () => {
        try {
          // Gọi API đếm tour
          const tourRes = await axios.get("http://localhost:8080/api/tours/count");
          setTourCount(tourRes.data);

          // Gọi API đếm hotel
          const hotelRes = await axios.get("http://localhost:8080/api/hotels/count");
          setHotelCount(hotelRes.data);
          // Gọi API đếm user
          const userRes = await axios.get("http://localhost:8080/api/users/count");
          setUserCount(userRes.data);
          // Gọi API đếm booking
          const bookingRes = await axios.get("http://localhost:8080/api/bookings/count");
          setBookingCount(bookingRes.data);
          // Gọi API đếm flight
          const flightRes = await axios.get("http://localhost:8080/api/flights/count");
          setFlightCount(flightRes.data);
        } catch (error) {
          console.error("Lỗi khi lấy số lượng:", error);
        }
      };

      fetchCounts();
    }, []);

  return (
    <div className={cx("dashboard-container")}>
      <h2 className={cx("title")}>📊 Admin Dashboard</h2>

      <div className={cx("stats")}>
        <StatCard title="Tổng số Tour" value={tourCount} icon={<FaRoute />} color="#007bff" />
        <StatCard title="Tổng số Booking" value={bookingCount} icon={<FaClipboardList />} color="#28a745" />
        <StatCard title="Tổng số User" value={userCount} icon={<FaUser />} color="#ffc107" />
        <StatCard title="Tổng số Khách sạn" value={hotelCount} icon={<FaHotel />} color="#dc3545" />
        <StatCard title="Tổng số chuyến bay" value={flightCount} icon={<MdOutlineFlightTakeoff />} color="#dc3545" />
      </div>
    </div>
  );
};

export default AdminDashboard;
