import React from 'react'
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import { FaTachometerAlt, FaPlane, FaHotel, FaUser, FaClipboardList, FaChartBar, FaRoute } from "react-icons/fa";
import styles from './Sidebar.module.scss'
const cx = classNames.bind(styles);
const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Tours", icon: <FaRoute />, path: "/admin/tours" },
    { name: "Flights", icon: <FaPlane />, path: "/admin/flights" },
    { name: "Hotels", icon: <FaHotel />, path: "/admin/hotels" },
    { name: "Users", icon: <FaUser />, path: "/admin/users" },
    { name: "Bookings", icon: <FaClipboardList />, path: "/admin/bookings" },
    
  ];
  return (
    <div className={cx("sidebar")}>
      <div className={cx("logo")}>Admin Panel</div>
      <ul className={cx("menu")}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cx("menu-item", { active: isActive })
              }
            >
              <span className={cx("icon")}>{item.icon}</span>
              <span className={cx("text")}>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
