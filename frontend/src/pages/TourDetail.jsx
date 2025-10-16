// src/pages/TourDetail.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockTours } from '../assets/data';

// Hàm format tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', currency: 'VND' 
    }).format(amount).replace('₫', ' ₫');
};

// --- COMPONENT TRƯỜNG ĐẶT TOUR (ĐỊNH NGHĨA NGOÀI) ---
// Component này nhận tour làm props để truy cập dữ liệu
const BookingSidebar = ({ tour, formatCurrency }) => (
    <div className="sticky top-6 lg:top-20 p-6 border rounded-lg shadow-xl bg-white">
        <h3 className="text-2xl font-bold text-orange-600 mb-4">
            Giá từ: {formatCurrency(tour.discountedPrice || tour.price)}
        </h3>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(`Đã đặt ${tour.name}! (Giả lập)`); }}>
            {/* Ngày khởi hành */}
            <div className="border p-3 rounded-lg bg-blue-50">
                <p className="text-sm text-gray-600">Ngày khởi hành:</p>
                <p className="font-bold text-lg">{tour.startDate} ({tour.duration})</p>
            </div>
            
            {/* Form nhập liệu */}
            <input type="number" placeholder="Số lượng Người lớn (tối thiểu 1)" className="w-full p-3 border rounded-lg focus:ring-blue-500" required min="1" />
            <input type="number" placeholder="Số lượng Trẻ em (nếu có)" className="w-full p-3 border rounded-lg focus:ring-blue-500" min="0" defaultValue="0" />
            
            {/* Nút Đặt Tour */}
            <button type="submit" className="w-full bg-red-600 text-white font-bold p-3 rounded-lg hover:bg-red-700 transition">
                ĐẶT TOUR NGAY
            </button>
            
            {/* 👈 LƯU Ý: Thẻ đóng của div cha đã được đặt ở cuối */}
            <p className="text-center text-sm text-gray-500 mt-2">Mã Tour: {tour.code}</p>
        </form> 
    </div>
);


// --- MAIN COMPONENT: TourDetail ---
export default function TourDetail() {
    const { id } = useParams();
    const tour = mockTours.find(t => t.id === parseInt(id)); 

    if (!tour) {
        return <p className="text-center p-20 text-xl font-semibold">❌ Không tìm thấy thông tin tour!</p>;
    }
    
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
                {/* Tiêu đề & Thông tin cơ bản */}
                <h1 className="text-4xl font-extrabold text-blue-700 mb-3">{tour.name}</h1>
                <p className="text-gray-500 mb-8">
                    Khởi hành từ **{tour.startLocation || 'TP.HCM'}** | Thời gian: **{tour.duration}**
                </p>

                {/* Cấu trúc 2 cột chính */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cột 1: Chi tiết Tour (2/3 chiều rộng) */}
                    <div className="lg:col-span-2">
                        
                        {/* 1. Gallery Hình ảnh/Video */}
                        {/* ... (Giữ nguyên) ... */}
                        
                        {/* 2. Lịch trình chi tiết */}
                        {/* ... (Giữ nguyên) ... */}

                        {/* 3. Chính sách & Bao gồm */}
                        {/* ... (Giữ nguyên) ... */}

                    </div>
                    
                    {/* Cột 2: Form Đặt Tour (1/3 chiều rộng) */}
                    <div className="lg:col-span-1">
                        {/* 👈 CÁCH GỌI COMPONENT ĐÃ SỬA: Truyền tour và formatCurrency */}
                        <BookingSidebar tour={tour} formatCurrency={formatCurrency} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}