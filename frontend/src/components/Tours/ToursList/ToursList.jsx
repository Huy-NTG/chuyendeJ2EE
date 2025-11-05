/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ToursList.module.scss';
import classNames from 'classnames/bind';
import ToursItem from '../ToursItem/ToursItem';
const cx = classNames.bind(styles);
const ToursList = ({ tours, onViewDetail, onDelete }) => {
 if (!tours || tours.length === 0) {
    return <p className={cx("no-data")}>Không có tour nào để hiển thị.</p>;
  }
  return (
    <div className={cx("tours-list")}>
      {tours.map((tour) => (
        <ToursItem key={tour.id} tour={tour} onViewDetail={onViewDetail} onDelete={onDelete}/>
      ))}
    </div>
  );
};
export default ToursList;