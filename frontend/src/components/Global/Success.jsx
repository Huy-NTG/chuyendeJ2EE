import React from "react";

export default function Success() {
  return (
    <div className="fixed top-6 right-6">
      <div className="success flex items-center gap-3 rounded-xl p-4 bg-green-600 shadow-md shadow-red-300/40">
        <div className="success__icon text-white text-3xl">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <div className="success__text">
          <h2 className="text-white text-lg font-semibold">Thành công</h2>
          <p className="text-white/90 text-sm">
          Hành động đã được thực hiện thành công.
          </p>
        </div>
      </div>
    </div>
  );
}
