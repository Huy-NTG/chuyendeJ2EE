// frontend/src/components/Booking/BookingList.jsx

import React from 'react';
// ✅ Đổi tên import: Giả sử file vật lý là BookingTourItem.jsx nhưng tên component bên trong là TourBookingItem
// HOẶC: Thay thế BookingTourItem bằng TourBookingItem
// Tôi sẽ giả định bạn muốn giữ tên file là BookingTourItem.jsx nhưng dùng tên biến ngắn hơn
import BookingTourItem from "./BookingTourItem"; 
import BookingFlightItem from "./BookingFlightItem";
import BookingHotelItem from "./BookingHotelItem";

// Dữ liệu mẫu (Giữ nguyên)
const mockBookings = [
    { 
        id: 1, 
        type: 'Tour', 
        tourName: "Khám phá Vịnh Hạ Long", 
        date: "2025-12-15", 
        status: "Đã xác nhận", 
        total: 5500000 
    },
    { 
        id: 2, 
        type: 'Flight', 
        airline: "Vietnam Airlines",
        route: "HAN - SGN", 
        date: "2025-11-20", 
        status: "Đã hoàn thành", 
        total: 3200000 
    },
    { 
        id: 3, 
        type: 'Hotel', 
        hotelName: "Khách sạn Dalat Palace",
        checkIn: "2026-01-05", 
        status: "Chờ thanh toán", 
        total: 4100000 
    },
];

// Hàm chọn component con dựa trên loại booking (type)
const getBookingComponent = (type) => {
    switch (type) {
        case 'Tour':
            return BookingTourItem; // ✅ Đã sửa thành BookingTourItem
        case 'Flight':
            return BookingFlightItem; // ✅ Đã sửa thành BookingFlightItem
        case 'Hotel':
            return BookingHotelItem; // ✅ Đã sửa thành BookingHotelItem
        default:
            return ({ booking }) => 
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    Lỗi: Loại booking "{booking.type}" không xác định.
                </div>;
    }
};

export default function BookingList() {
    
    const bookings = mockBookings;
    
    if (!bookings || bookings.length === 0) {
        return (
            <div className="w-full md:w-1/2 p-4 md:pl-8">
                <h3 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Lịch sử Đặt dịch vụ</h3>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <p className="text-gray-600">Bạn chưa có đặt dịch vụ nào.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full md:w-1/2 p-4 md:pl-8"> 
            <h3 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Lịch sử Đặt dịch vụ</h3>
            
            <div className="space-y-4">
                {bookings.map((booking) => {
                    const SpecificBookingComponent = getBookingComponent(booking.type);
                    
                    return (
                        <SpecificBookingComponent 
                            key={booking.id} 
                            booking={booking} 
                        /> 
                    );
                })}
            </div>
        </div>
    );
}