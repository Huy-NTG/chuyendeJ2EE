import React from 'react';

export default function PersonalInformation({ user }) {
    if (!user) {
        return (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-lg text-red-600 font-semibold">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-4">Hồ sơ của tôi</h3>
            
            <InfoRow label="Họ và Tên" value={user.name || 'Chưa cung cấp'} />
            <InfoRow label="Email" value={user.email || 'Chưa cung cấp'} />
            <InfoRow label="Số điện thoại" value={user.phone || 'Chưa cung cấp'} />
            <InfoRow label="Vai trò" value={user.role || 'USER'} />
            
            <div className="pt-6">
                <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    onClick={() => alert('Chức năng chỉnh sửa đang phát triển!')}
                >
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
}

// Component phụ trợ
const InfoRow = ({ label, value }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-b last:border-b-0">
        <span className="font-medium text-gray-500 w-1/3 text-left">{label}:</span>
        <span className="font-semibold text-gray-800 w-2/3 text-left md:text-right">{value}</span>
    </div>
);