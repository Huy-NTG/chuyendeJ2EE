import { useState } from "react"
import { formatCurrency } from "../../utils/formatCurrency"
import { Link } from "react-router-dom"

export default function RoomCard({room,hotelId,checkInDate,checkOutDate,guests}){ 
    const [showCancelRoom, setShowCancelRoom] = useState(false);
    // ✅ 1. CHUYỂN CẢ SỐ LƯỢNG KHÁCH VÀ SỨC CHỨA SANG DẠNG SỐ ĐỂ SO SÁNH
    const guestCount = parseInt(guests);
    const roomCapacity = room.capacity; 
    
    // ✅ 2. KIỂM TRA ĐIỀU KIỆN: guests có lớn hơn capacity không?
    const isOverCapacity = guestCount > roomCapacity;
    const queryString = new URLSearchParams({
        hotelId: hotelId,
        roomId: room.id, // ✅ ID của phòng cần đặt
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: guests
    }).toString();
    const BookingButton = () => {
        if (isOverCapacity) {
            return (
                <button 
                    className="bg-gray-400 text-white font-semibold text-xl h-10 w-72 rounded-md cursor-not-allowed"
                    disabled
                >
                    Quá Tải (Tối đa: {roomCapacity} người)
                </button>
            );
        }
        
        return (
            <Link to={`/payment/hotel?${queryString}`}>
                <button 
                    className="bg-red-600 text-white font-semibold text-2xl h-10 w-72 rounded-md hover:bg-red-800"
                >
                    ĐẶT PHÒNG
                </button>
            </Link>
        );
    };
    return (
         <div className="h-[280px] w-[1250px] rounded-3xl border border-blue-100 p-5 hover:border-blue-800 relative">
            <div className=" bg-gray-100 w-full h-full flex justify-between rounded-2xl">
                <div className="h-full rounded-2xl overflow-hidden">
                    <img alt={room.roomNumber} src={room.imageUrl} className="object-cover w-[360px] h-full"></img>
                </div>
                <div className="w-80 py-2.5 ">
                    <p><i className="fa-solid fa-door-open"></i> Số phòng: {room.roomNumber}</p>
                    <p><i className="fa-solid fa-people-group"></i> Số nguời: {room.capacity}</p>
                    {room.available ? <p className="italic text-red-600">Còn trống</p> : ""}
                    <span className="block h-0.5 w-[400px] bg-gray-200 my-2.5"></span>
                    <div className="grid grid-cols-2 grid-rows-4 gap-x-2.5 gap-y-2">
                        <p className="border-2 border-gray-400 text-gray-600 flex justify-center items-center rounded-3xl italic w-fit px-6 h-8">Bữa sáng</p>
                        <p className="border-2 border-gray-400 text-gray-600 flex justify-center items-center rounded-3xl italic w-fit px-6 h-8">Wifi miễn phí</p>
                        <p className="border-2 border-gray-400 text-gray-600 flex justify-center items-center rounded-3xl italic w-fit px-6 h-8">Phòng tập</p>
                        <p className="border-2 border-gray-400 text-gray-600 flex justify-center items-center rounded-3xl italic w-fit px-6 h-8">Cà phê & trà</p>
                        <p className="border-2 border-gray-400 text-gray-600 flex justify-center items-center rounded-3xl italic w-fit px-6 h-8">Hồ bơi</p>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-x-8">
                    <span className="w-0.5 h-44 bg-gray-200"></span>
                    <div className="pr-2.5">
                        <p className="font-bold text-red-600 flex justify-center text-xl">{formatCurrency(room.price)} <span className="text-black">/đêm</span></p>
                        <BookingButton />
                        <p
                         onClick={() => setShowCancelRoom(true)}
                         className="italic text-blue-500 text-[14px] flex justify-center hover:cursor-pointer hover:underline">Quy định hủy phòng</p>
                    </div>
                </div>
                {showCancelRoom &&
                <div className=" absolute flex justify-center items-center -top-16 -right-16 h-64 w-96 p-1 bg-white rounded-2xl shadow-[0_0_5px_1px_gray]">
                    <div className="p-1">
                        <h2 className="font-bold flex justify-between items-center">QUY ĐỊNH HỦY PHÒNG <span
                            onClick={() => setShowCancelRoom(false)}
                            className="hover:cursor-pointer">X</span></h2>
                        <span className="block h-0.5 w-12/12 bg-gray-200 my-2"></span>
                        <p>Đơn đặt phòng này không hoàn tiền và không thể nào thay đổi hoặc chỉnh sửa được. Không đến khách sạn hoặc chỗ nghỉ sẽ được giải quyết như là Vắng Mặt và sẽ phải trả một khoản tiền là 100% giá trị đặt phòng (Quy định của khách sạn).</p>
                        <p className="font-bold text-red-500">Lưu ý: Thời gian hủy phòng được tính theo múi giờ tại địa phương của khách sạn</p>
                    </div>
                </div>
                }
            </div>
         </div>
    )
}