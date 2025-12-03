export default function BookingTourItem({booking}){
    // ... (logic hiển thị Tour, sử dụng booking.tourName, booking.date)
    return (
        <div className="bg-white p-4 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <p className="font-bold text-lg">{booking.tourName}</p>
            <p className="text-sm text-gray-600">Loại: Tour | Ngày khởi hành: {booking.date}</p>
            {/* ... (các chi tiết khác) */}
        </div>
    );
}