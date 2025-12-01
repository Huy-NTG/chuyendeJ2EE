/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import styles from './AdminFlights.module.scss'
import classNames from "classnames/bind";
import FlightList from '../../../components/flight/FlightList/FlightList';
import SearchBarFlight from '../../../components/flight/SearchBarFlight/SearchBarFlight';
import FlightAddForm from '../../../components/flight/FlightAddForm/FlightAddForm';
import FlightUpdateForm from '../../../components/flight/FlightUpdateForm/FlightUpdateForm';
const cx = classNames.bind(styles);
const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080/api/flights";
      if (keyword.trim() !== "") {
        url = `http://localhost:8080/api/flights/search?airline=${encodeURIComponent(keyword)}`;
      }
      const res = await axios.get(url);
      setFlights(res.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
    } finally {
      setLoading(false);
    }
  };
  // Gọi API khi keyword thay đổi
   useEffect(() => {
       fetchFlights();
   }, [keyword]);

  const handleCancelFlight = async (id) => {
  if (!window.confirm("Bạn có chắc muốn hủy chuyến bay?")) return;

  try {
    await axios.put(`http://localhost:8080/api/flights/${id}/cancel`);
    fetchFlights(); // load lại danh sách
  } catch (error) {
    console.error("Lỗi khi hủy chuyến bay:", error);
    alert("Không thể hủy chuyến bay!");
  }
};

  return (
    <div className={cx("admin-flights-container")}>
      <h2 className={cx("title")}>Quản lý chuyến bay</h2>
      <SearchBarFlight onSearch={setKeyword} onAddClick={() => setShowAddForm(true)} />
      <FlightList flights={flights} onViewDetail={setSelectedFlightId} onCancel={handleCancelFlight} />
      {showAddForm && (
      <FlightAddForm
        onClose={() => setShowAddForm(false)}
        onSuccess={() => {
          fetchFlights();
          setShowAddForm(false);
        }}
      />
      )}
      {selectedFlightId && (
      <FlightUpdateForm
        flightId={selectedFlightId}
        onClose={() => setSelectedFlightId(null)}
        onSuccess={() => {
          fetchFlights();
          setSelectedFlightId(null);
        }}
      />
      )}
    </div>
  )
}

<<<<<<< HEAD
export default AdminFlights
=======
export default AdminFlights
>>>>>>> origin/master
