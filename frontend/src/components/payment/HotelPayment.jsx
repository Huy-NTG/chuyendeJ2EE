import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { getHotelById } from '../../services/hotelService';
import { getRoomById } from '../../services/roomService';
import { getUserById  } from "../../services/userService";

const calculateNights = (checkInStr, checkOutStr) => {
    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const msInDay = 1000 * 60 * 60 * 24;
    return Math.round(timeDifference / msInDay); 
}

export default function HotelPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrrentUser] = useState(null);
    
    const params = new URLSearchParams(location.search);
    const hotelId = params.get('hotelId');
    const roomId = params.get('roomId');

    const initialCheckInDateStr = params.get('checkInDate');
    const initialCheckOutDateStr = params.get('checkOutDate');
    const guests = parseInt(params.get('guests')) || 1;

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [checkInDate, setCheckInDate] = useState(initialCheckInDateStr || '');
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDateStr || '');

    const [hotelLoaded, setHotelLoaded] = useState(false);
    const [roomLoaded, setRoomLoaded] = useState(false);

    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            const fetchUser = async () => {
                try {
                    const userObject = JSON.parse(userJson);
                    const response = await getUserById(userObject.id);
                    setCurrrentUser(response.data);
                    setCustomerName(response.data.name || ''); 
                    setCustomerEmail(response.data.email || ''); 
                    setCustomerPhone(response.data.phone || '');
                } catch (e) {
                    console.error("Lỗi khi phân tích cú pháp user data:", e);
                }
            };
            fetchUser();
        }
    }, []); 

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await getHotelById(hotelId);
                setHotelData(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hotel: ",error);
            } finally {
                setHotelLoaded(true); // ✅ Đánh dấu đã tải xong
            }
        };
        fetchHotel();
    },[hotelId]);
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await getRoomById(roomId);
                setRoomData(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hotel: ",error);
            } finally {
                setRoomLoaded(true); // ✅ Đánh dấu đã tải xong
            }
        };
        fetchRoom();
    },[roomId]);
    useEffect(() => {
        if (hotelLoaded && roomLoaded) {
            setLoading(false);
        }
    }, [hotelLoaded, roomLoaded]);

    if (loading) 
        return <div className="p-10 text-center text-gray-600">Đang tải thông tin thanh toán...</div>;
    if (!hotelData || !roomData) 
        return <div className="p-10 text-center text-red-500 font-bold">Lỗi: Không tìm thấy dữ liệu khách sạn/phòng.</div>;

    const numberOfNights = calculateNights(checkInDate, checkOutDate);
    const totalPrice = roomData?.price * numberOfNights;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkInDate || !checkOutDate) {
            alert("Vui lòng chọn ngày nhận và trả phòng.");
            return;
        }
        if (numberOfNights <= 0) {
            alert("Ngày check-out phải sau ngày check-in.");
            return;
        }
    };

    return (
    <div className="payment-hotel--wrapper grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-10">
        <div className="description col-span-full flex justify-center"> 
            <div className="w-full max-w-6xl rounded-2xl shadow-[0__0_5px_1px_gray] p-5"> 
                <h2 className="text-blue-800 font-semibold text-xl mb-2">Thông tin khách sạn:</h2>
                <div className="flex flex-wrap justify-between items-center text-xl gap-4">
                    <div className='flex items-center space-x-2'>
                        <p><i className="fa-solid fa-calendar-check"></i> Ngày nhận phòng:</p>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                            className="p-1 border border-gray-300 rounded text-base"
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <p><i className="fa-solid fa-calendar"></i> Ngày trả phòng:</p>
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                            className="p-1 border border-gray-300 rounded text-base"
                        />
                    </div>
                    <p className='ml-auto'><i className="fa-solid fa-people-group"></i> Số người: {guests}</p>
                </div>
            </div>
        </div>
        <div className="booking-info col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-3">Chi tiết Đặt phòng Khách sạn</h2>
            <div className="mb-8 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <h2 className="text-xl font-bold text-blue-700">{hotelData.name}</h2>
                <p className="text-gray-600 mb-3 text-xl"><i className="fa-solid fa-map-marker-alt mr-2"></i> {hotelData.address}</p>
                <div className="grid grid-cols-2 gap-y-1 text-xl">
                     <p>Phòng đặt:</p> <p className="font-semibold text-gray-800">{roomData.type} ({roomData.roomNumber})</p>
                     <p>Số khách:</p> <p className="font-semibold text-gray-800">{guests} người</p>
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 border-b pb-2">Thông tin Người đại diện Đặt phòng</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Họ tên người đại diện"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email liên hệ"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button type="submit" className='hidden'></button>
            </form>
        </div>
        <div className="summary col-span-1">
            <div className="sticky top-10 bg-white p-6 rounded-xl shadow-lg border border-red-200">
                <h3 className="text-3xl font-bold mb-4 text-center text-red-700">TỔNG CỘNG THANH TOÁN</h3>
                <div className="space-y-3 mb-6 border-b pb-4">
                    <div className="flex justify-between text-lg">
                        <p>Check-in:</p>
                        <p className="font-semibold text-gray-700">{checkInDate}</p>
                    </div>
                    <div className="flex justify-between text-lg">
                        <p>Check-out:</p>
                        <p className="font-semibold text-gray-700">{checkOutDate}</p>
                    </div>
                     <div className="flex justify-between text-lg">
                        <p>Số đêm:</p>
                        <p className="font-semibold text-gray-700">{numberOfNights} đêm</p>
                    </div>
                    <div className="flex justify-between text-lg">
                        <p>Giá / đêm:</p>
                        <p className="font-semibold text-gray-700">{formatCurrency(roomData.price)}</p>
                    </div>
                    <div className="flex justify-between text-2xl font-bold pt-2 border-t mt-3">
                        <p>TỔNG TIỀN</p>
                        <p className="text-red-600">{formatCurrency(totalPrice)}</p>
                    </div>
                </div>
                <div className="payment-method mb-4">
                    <h4 className="font-bold mb-3 text-2xl">Chọn Phương thức Thanh toán</h4>
                    <label className="flex items-center mb-2 text-xl">
                        <input type="radio" name="payment" value="bank" defaultChecked className="mr-2" />
                        Chuyển khoản Ngân hàng
                    </label>
                    <label className="flex items-center text-xl">
                        <input type="radio" name="payment" value="vnpay" disabled className="mr-2" />
                        Thanh toán qua VNPAY (Sắp có)
                    </label>
                </div>
                <button
                    onClick={handleSubmit} // Kích hoạt form submit
                    disabled={!customerName || !customerEmail || !customerPhone || numberOfNights <= 0}
                    className='text-white bg-red-600 w-full font-bold text-2xl p-3 rounded-xl hover:bg-red-700 disabled:bg-gray-400 transition duration-300'
                >
                    THANH TOÁN & ĐẶT PHÒNG
                </button>
                <p className='text-sm text-center text-gray-500 mt-3'>Đặt phòng tuân thủ Quy định Hủy phòng của Khách sạn.</p>
            </div>
        </div>
    </div>
);
}