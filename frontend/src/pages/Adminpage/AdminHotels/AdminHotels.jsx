import React, { useEffect, useState } from 'react'
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./AdminHotels.module.scss";
import SearchBarHotel from '../../../components/Hotel/SearchBarHotel/SearchBarHotel';
import HotelList from '../../../components/Hotel/HotelList/HotelList';
const cx = classNames.bind(styles);
const AdminHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    const fetchHotels = async () => {
        setLoading(true);
        try {
        let url = "http://localhost:8080/api/hotels";

        if (keyword.trim() !== "") {
            url = `http://localhost:8080/api/hotels/search?name=${encodeURIComponent(keyword)}`;
        }

        const res = await axios.get(url);
        setHotels(res.data);
        } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách sạn:", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, [keyword]);
  return (
    <div className={cx("admin-hotels-container")}>
      <h2 className={cx("title")}>Quản lý khách sạn</h2>

      <SearchBarHotel onSearch={setKeyword} />

      <HotelList hotels={hotels} loading={loading} />
    </div>
  )
}

export default AdminHotels