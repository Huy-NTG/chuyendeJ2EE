import React from 'react'
import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
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
    </div>
  )
}

export default AdminPage
