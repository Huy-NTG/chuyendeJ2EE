// frontend/src/components/Booking/BookingItem.jsx

import React from 'react';

const getStatusColor = (status) => {
    switch (status) {
        case "Đã xác nhận":
            return "bg-green-100 text-green-700";
        case "Đã hoàn thành":
            return "bg-blue-100 text-blue-700";
        case "Chờ thanh toán":
            return "bg-yellow-100 text-yellow-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function BookingItem({ booking }) {
    const { tourName, date, status, total } = booking;

    const statusClasses = getStatusColor(status);

    return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">{tourName}</h4>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses}`}>
                    {status}
                </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-1">
                Ngày đi: <span className="font-medium">{date}</span>
            </p>
            <p className="text-sm text-gray-600">
                Tổng tiền: <span className="font-bold text-lg text-red-500">{total.toLocaleString()} VNĐ</span>
            </p>
        </div>
    );
}