export default function BookingHotelItem({booking}){
    // ... (logic hiển thị Hotel, sử dụng booking.hotelName, booking.checkIn)
    return (
        <div className="bg-white p-4 border-l-4 border-purple-500 rounded-lg shadow-sm">
            <p className="font-bold text-lg">{booking.hotelName}</p>
            <p className="text-sm text-gray-600">Loại: Khách sạn | Check-in: {booking.checkIn}</p>
            {/* ... (các chi tiết khác) */}
        </div>
    );
}