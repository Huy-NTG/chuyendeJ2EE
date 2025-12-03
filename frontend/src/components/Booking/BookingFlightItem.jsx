export default function BookingFlightItem({booking}){
    // ... (logic hiển thị Flight, sử dụng booking.airline, booking.route)
    return (
        <div className="bg-white p-4 border-l-4 border-green-500 rounded-lg shadow-sm">
            <p className="font-bold text-lg">{booking.airline} - {booking.route}</p>
            <p className="text-sm text-gray-600">Loại: Chuyến bay | Tổng tiền: {booking.total.toLocaleString()} VNĐ</p>
            {/* ... (các chi tiết khác) */}
        </div>
    );
}