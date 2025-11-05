import React from 'react'
import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; // ✅ thêm dòng này
import Sidebar from '../../components/sidebar/Sidebar';
import styles from "./AdminPage.module.scss";
const cx = classNames.bind(styles);
const AdminPage = () => {
  return (
    <div className={cx("admin-container")}>
      <Sidebar />
      <div className={cx("main-content")}>
        <Outlet />
      </div>
      {/* ✅ Bắt buộc có ToastContainer để hiện thông báo */}
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  )
}

export default AdminPage
