import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import styles from './AdminFlights.module.scss'
import classNames from "classnames/bind";
import FlightList from '../../../components/flight/FlightList/FlightList';
const cx = classNames.bind(styles);
const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/flights");
        setFlights(res.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);
  return (
    <div className={cx("admin-flights-container")}>
      <h2 className={cx("title")}>Quản lý chuyến bay</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  )
}

export default AdminFlights
