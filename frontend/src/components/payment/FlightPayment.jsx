import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { getFlightById } from '../../services/flightService';
import { getUserById  } from "../../services/userService";

const calculateDuration = (departureTime, arrivalTime) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    const durationMs = arrivalDate.getTime() - departureDate.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${durationHours}h ${durationMinutes}m`;
};

const formatFlightTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};
const formatFlightDate = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString('vi-VN');
};
const isArrivalNextDay = (departureTime, arrivalTime) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);
    return departureDate.getDate() !== arrivalDate.getDate();
}

export default function FlightPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrrentUser] = useState(null);
    
    
    const params = new URLSearchParams(location.search);
    const flightId = params.get('flightId');
    const guests = parseInt(params.get('guests')) || 1; 


    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState( '');
    const [customerPhone, setCustomerPhone] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const fetchFlightData = async () => {
            try {
                const response = await getFlightById(flightId);
                console.log(response.data);
                setFlightData(response.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFlightData();
    }, [flightId]);

    if (loading) 
        return <div className="p-10 text-center text-gray-600">Đang tải thông tin thanh toán chuyến bay...</div>;

    if (!flightData) 
        return <div className="p-10 text-center text-red-500 font-bold">Lỗi: Không tìm thấy chuyến bay (ID: {flightId}).</div>;

    const ticketPrice = flightData.price;
    const bookingFee = 50000; 
    const subTotal = ticketPrice * guests;
    const totalPrice = subTotal + bookingFee;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!customerName || !customerEmail || !customerPhone) {
            alert("Vui lòng nhập đầy đủ thông tin liên hệ.");
            return;
        }

        const bookingDetails = {
            customerName, customerEmail, customerPhone,
            flightId: flightData.id,
            guests,
            subTotal,
            bookingFee,
            totalPrice,
            flightDetails: {
                departureTime: flightData.departureTime,
                arrivalTime: flightData.arrivalTime,
                fromLocation: flightData.fromLocation,
                toLocation: flightData.toLocation,
                airline: flightData.airline,
            }
        };
        console.log("Chi tiết đặt vé máy bay:", bookingDetails);
        alert(`Đang tiến hành thanh toán cho chuyến bay ${flightData.flightNumber} của ${flightData.airline}. Tổng tiền: ${formatCurrency(totalPrice)}`);
        
    };

    const formattedDepartureTime = formatFlightTime(flightData.departureTime);
    const formattedArrivalTime = formatFlightTime(flightData.arrivalTime);
    const formattedDepartureDate = formatFlightDate(flightData.departureTime);
    const formattedDuration = calculateDuration(flightData.departureTime, flightData.arrivalTime);
    const isNextDay = isArrivalNextDay(flightData.departureTime, flightData.arrivalTime);
    const arrivalDateStr = formatFlightDate(flightData.arrivalTime);

    return (
        <div className="payment-flight--wrapper grid grid-cols-1 md:grid-cols-3 gap-10 p-5 md:p-10">
            <div className="booking-info col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-3">Thanh toán Đặt vé Máy bay</h2>
                <div className="mb-8 p-5 border border-blue-100 rounded-lg bg-blue-50">
                    <h2 className="text-xl font-bold text-blue-700 mb-3 flex justify-between items-center">
                        <i className="fa-solid fa-plane-departure mr-2"></i> {flightData.airline} - {flightData.flightNumber}
                    </h2>
                    <div className="flex justify-between items-center text-center">
                        <div>
                            <p className="text-3xl font-extrabold text-blue-700">{formattedDepartureTime}</p>
                            <p className="font-semibold text-gray-700 text-2xl">{flightData.fromLocation}</p>
                            <p className="text-xl text-gray-500">{formattedDepartureDate}</p>
                        </div>
                        <div className="flex flex-col items-center mx-4 text-xl">
                            <p className="text-gray-500 font-semibold">{formattedDuration}</p>
                            <span className="text-gray-400">----- Bay thẳng -----</span>
                            {isNextDay && <p className="text-xs text-red-500 font-semibold mt-1">Đến ngày hôm sau</p>}
                        </div>

                        <div>
                            <p className="text-3xl font-extrabold text-blue-700">{formattedArrivalTime}</p>
                            <p className="font-semibold text-gray-700 text-2xl">{flightData.toLocation}</p>
                            <p className="text-xl text-gray-500">{isNextDay ? arrivalDateStr : ''}</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 border-b pb-2">Thông tin Liên hệ (Đại diện đặt vé)</h3>
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
                        <div className="flex justify-between text-xl">
                            <p>Vé người lớn (x{guests}):</p>
                            <p className="font-semibold text-gray-700">{formatCurrency(ticketPrice)}</p>
                        </div>
                           <div className="flex justify-between text-xl">
                            <p>Tổng tiền vé:</p>
                            <p className="font-semibold text-gray-700">{formatCurrency(subTotal)}</p>
                        </div>
                        <div className="flex justify-between text-xl">
                            <p>Phí dịch vụ:</p>
                            <p className="font-semibold text-gray-700">{formatCurrency(bookingFee)}</p>
                        </div>

                        <div className="flex justify-between text-2xl font-bold pt-2 border-t mt-3">
                            <p>TỔNG THANH TOÁN</p>
                            <p className="text-red-600">{formatCurrency(totalPrice)}</p>
                        </div>
                    </div>
                    <div className="payment-method mb-4">
                        <h4 className="font-bold text-2xl mb-3">Chọn Phương thức Thanh toán</h4>
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
                        disabled={!customerName || !customerEmail || !customerPhone}
                        className='text-white bg-red-600 w-full font-bold text-2xl p-3 rounded-xl hover:bg-red-700 disabled:bg-gray-400 transition duration-300'
                    >
                        THANH TOÁN & ĐẶT VÉ
                    </button>
                    <p className='text-sm text-center text-gray-500 mt-3'>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.</p>
                </div>
            </div>
        </div>
    );
}