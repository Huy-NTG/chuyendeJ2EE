import React, { useEffect, useState } from "react";
import ToursList from "../../../components/Tours/ToursList/ToursList";
import styles from './AdminTours.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AdminTours = () => {
  return (
    <div className={cx("tours-list")}>
      <h2>Quản lý Tour</h2>
      <ToursList />
    </div>
  )
}

export default AdminTours
