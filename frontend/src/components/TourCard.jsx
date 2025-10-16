import React from "react";

export default function TourCard({tour}){
    // Hàm format tiền tệ Việt Nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount).replace('₫', ' ₫'); // Thêm khoảng trắng
    };
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
            <div className="relative">
                {/* 1. Hình ảnh Tour */}
                <img 
                    className="w-full h-48 object-cover" 
                    src={tour.image} 
                    alt={tour.name} 
                />
                
                {/* Hiển thị nhãn Giờ Chót (nếu có) */}
                {tour.isFlashSale && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Giờ chót
                    </div>
                )}
            </div>

            <div className="p-4">
                {/* 2. Tiêu đề Tour */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 min-h-[50px] line-clamp-2 hover:text-blue-600 transition">
                    <a href={`/tour/${tour.id}`}>{tour.name}</a>
                    {/* <span>{tour.name}</span> */}
                </h3>

                {/* 3. Thông tin chi tiết */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        <span className="font-semibold">Khởi hành:</span> {tour.startLocation}
                    </p>
                    <p>
                        <span className="font-semibold">Ngày đi:</span> {tour.startDate}
                        <span className="mx-2">|</span>
                        <span className="font-semibold">Thời gian:</span> {tour.duration}
                    </p>
                    <p>
                        <span className="font-semibold text-red-600">Còn:</span> {tour.remainingSlots} chỗ
                    </p>
                </div>
            </div>

            {/* 4. Giá và Nút Đặt */}
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
                <div>
                    {/* Giá gốc (nếu có giảm giá) */}
                    {tour.discountedPrice && (
                        <p className="text-sm text-gray-500 line-through">
                            {formatCurrency(tour.price)}
                        </p>
                    )}
                    {/* Giá chính thức */}
                    <p className="text-xl font-extrabold text-orange-600">
                        {formatCurrency(tour.discountedPrice || tour.price)}
                    </p>
                </div>
                
                <button 
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => console.log('Đặt tour', tour.id)} // Logic đặt tour
                >
                    Đặt ngay
                </button>
            </div>
        </div>
    )
}