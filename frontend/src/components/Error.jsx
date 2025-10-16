import React from "react";

export default function Error() {
  return (
    <div className="fixed top-6 right-6">
      <div className="error flex items-center gap-3 rounded-xl p-4 bg-red-600 shadow-md shadow-red-300/40">
        <div className="error__icon text-white text-3xl">
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className="error__text">
          <h2 className="text-white text-lg font-semibold">Thất bại</h2>
          <p className="text-white/90 text-sm">
            Đã xảy ra lỗi khi thực hiện hành động.
          </p>
        </div>
      </div>
    </div>
  );
}
