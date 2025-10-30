import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({tour}){
    // Hàm format tiền tệ Việt Nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount).replace('₫', ' ₫'); // Thêm khoảng trắng
    };
    return (
        <Link to={`/tours/${tour.id}`}>
            <div className="tour-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="tour-card__image relative">
                    <img 
                        className="w-full h-48 object-cover" 
                        src={tour.imageUrl} 
                        alt={tour.name} 
                    />
                    {/* Hiển thị nhãn Giờ Chót (nếu có) */}
                    {tour.isFlashSale && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Giờ chót
                        </div>
                    )}
                </div>
                <div className="tour-card__titlep-4 px-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 min-h-[50px] line-clamp-2 transition">
                        {tour.name}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>
                            <span className="font-semibold">Địa điểm:</span> {tour.location}
                        </p>
                        <p>
                            <span className="font-semibold">Ngày khởi hành:</span> {tour.startDate}<br/>
                            <span className="font-semibold">Ngày kết thúc:</span> {tour.endDate}
                        </p>
                        <p>
                            <span className="font-semibold text-red-600">Còn:</span> {tour.seats} chỗ
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
                    <div>
                        {/* Giá gốc (nếu có giảm giá) */}
                        {tour.price && (
                            <p className="text-sm text-gray-500 line-through">
                                {formatCurrency(tour.price)}
                            </p>
                        )}
                        {/* Giá chính thức */}
                        <p className="text-xl font-extrabold text-orange-600">
                            {formatCurrency(tour.price || tour.price)}
                        </p>
                    </div>
                    <button 
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={() => console.log('Đặt tour', tour.id)} // Logic đặt tour
                    >
                        Đặt ngay
                    </button>
                </div>
            </div>
        </Link>
    )
}