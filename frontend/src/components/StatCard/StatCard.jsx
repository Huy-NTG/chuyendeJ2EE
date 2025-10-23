import React from "react";
import classNames from "classnames/bind";
import styles from "./StatCard.module.scss";

const cx = classNames.bind(styles);

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={cx("card")} style={{ borderLeft: `5px solid ${color || "#007bff"}` }}>
      <div className={cx("icon")}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p className={cx("number")}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
