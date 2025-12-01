import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { getUserById  } from "../../services/userService";


export default function TourPayment() {
    const location = useLocation();
    const { tourData } = location.state || {}; 
    const [currentUser, setCurrrentUser] = useState(null);
    

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        const userJson = localStorage.getItem('user');
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

    if (!tourData) 
        return <div className="p-10 text-center text-red-500 font-bold">Không tìm thấy thông tin tour. Vui lòng quay lại trang chi tiết tour.</div>;

    const maxSeats = tourData.seats || 20; 
    const totalGuests = adults + children;
    const totalPrice = tourData.price * adults + (tourData.price * 0.5 * children);

    const handleAdultsChange = (value) => {
        const newAdults = Math.max(1, parseInt(value) || 1);
        if (newAdults + children > maxSeats) {
            const newChildren = maxSeats - newAdults;
            setChildren(Math.max(0, newChildren)); 
            setAdults(newAdults);
        } else {
            setAdults(newAdults);
        }
    };
    const handleChildrenChange = (value) => {
        const newChildren = Math.max(0, parseInt(value) || 0);
        if (adults + newChildren > maxSeats) {
             const newAdults = maxSeats - newChildren;
             setAdults(Math.max(1, newAdults)); // Đảm bảo luôn có ít nhất 1 người lớn
        } else {
            setChildren(newChildren);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Đang tiến hành thanh toán cho ${tourData.name} với tổng cộng ${adults} người lớn và ${children} trẻ em. Tổng tiền: ${formatCurrency(totalPrice)}`);
    };

    return (
        <div className="payment-tour--wrapper grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="tour-info col-span-2 bg-gray-50 p-6 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-3">Chi tiết Tour</h2>
                <div className="flex items-center mb-4">
                    <img src={tourData.imageUrl} alt={tourData.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                    <div>
                        <h4 className="text-xl font-bold">{tourData.name}</h4>
                        <p className="text-xl text-gray-500">Mã tour: {tourData.id}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xl">
                    <p className="font-semibold"><i className='fa-solid fa-location-dot text-red-500 mr-2'></i> Địa điểm:</p> <p className="text-blue-600 font-medium">{tourData.locationText || 'N/A'}</p>
                    <p className="font-semibold"><i className='fa-solid fa-plane-departure text-red-500 mr-2'></i> Ngày Bắt đầu:</p> <p className="text-blue-600 font-medium">{tourData.startDate || 'N/A'}</p> 
                    <p className="font-semibold"><i className='fa-solid fa-clock text-red-500 mr-2'></i> Ngày kết thúc:</p> <p className="text-blue-600 font-medium">{tourData.endDate || 'N/A'}</p>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Thông tin Khách hàng</h2>
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
                        <h4 className="text-2xl font-bold pt-2 border-t">Số lượng Khách</h4>
                        <p className='text-xl text-gray-500'>Tổng số chỗ tối đa: {maxSeats} | Hiện tại: {totalGuests} người</p>
                        <div className="flex gap-4 text-xl">
                            <div className="flex-1">
                                <label className="block font-medium text-gray-700 mb-1">Số lượng Người lớn</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={maxSeats} 
                                    value={adults}
                                    onChange={(e) => handleAdultsChange(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-medium text-gray-700 mb-1">Số lượng Trẻ em (Dưới 12 tuổi, 50% giá)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={maxSeats}
                                    value={children}
                                    onChange={(e) => handleChildrenChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <button
                            type="submit" 
                            disabled={!customerName || !customerEmail || !customerPhone || adults === 0}
                            className='hidden' 
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <div className="summary col-span-1">
                <div className="sticky top-10 bg-white p-6 rounded-xl shadow-lg border border-blue-200">
                    <h3 className="text-3xl font-bold mb-4 text-center text-blue-700">TỔNG KẾT ĐẶT TOUR</h3>
                    <div className="space-y-3 mb-6 border-b pb-4">
                        <div className="flex justify-between text-xl">
                            <p>Giá vé (Người lớn x {adults})</p>
                            <p className="font-semibold text-red-600">{formatCurrency(tourData.price * adults)}</p>
                        </div>
                        <div className="flex justify-between text-xl">
                            <p>Giá vé (Trẻ em x {children} 50%)</p>
                            <p className="font-semibold text-red-600">{formatCurrency(tourData.price * 0.5 * children)}</p>
                        </div>
                        <div className="flex justify-between text-2xl font-bold pt-2 border-t mt-3">
                            <p>TỔNG CỘNG</p>
                            <p className="text-red-600">{formatCurrency(totalPrice)}</p>
                        </div>
                    </div>
                    <div className="payment-method mb-4">
                        <h4 className="font-bold text-2xl mb-3">Chọn Phương thức Thanh toán</h4>
                        <label className="flex items-center mb-2 text-xl">
                            <input type="radio" name="payment" value="bank" defaultChecked className="mr-2" />
                            Chuyển khoản Ngân hàng (Miễn phí)
                        </label>
                        <label className="flex items-center text-xl">
                            <input type="radio" name="payment" value="vnpay" disabled className="mr-2" />
                            Thanh toán qua VNPAY (Sắp có)
                        </label>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={!customerName || !customerEmail || !customerPhone || adults === 0}
                        className='text-white bg-green-600 w-full font-bold text-2xl p-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400 transition duration-300'
                    >
                        HOÀN TẤT ĐẶT TOUR
                    </button>
                    <p className='text-sm text-center text-gray-500 mt-3'>Bằng việc đặt tour, bạn đã đồng ý với các Điều khoản & Điều kiện.</p>
                </div>
            </div>
        </div>
    );
}