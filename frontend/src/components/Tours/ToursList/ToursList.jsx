import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ToursList.module.scss';
import classNames from 'classnames/bind';
import ToursItem from '../ToursItem/ToursItem';

const cx = classNames.bind(styles);

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/tours');
        setTours(res.data);
      } catch (err) {
        setError('Lỗi khi tải danh sách tour');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  if (error) return <div className={cx("error")}>{error}</div>;

  return (
    <div className={cx("tours-list")}>
      {tours.length === 0 ? (
        <p className={cx("no-data")}>Không có tour nào để hiển thị.</p>
      ) : (
        tours.map((tour) => (
          <ToursItem key={tour.id} tour={tour} />
        ))
      )}
    </div>
  );
};

export default ToursList;
