import React, { useState, useCallback, useEffect } from 'react';

// Component phụ trợ để hiển thị một hàng thông tin
const InfoRow = ({ label, value }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 border-b last:border-b-0">
        <span className="font-medium text-gray-500 w-1/3 text-left">{label}:</span>
        <span className="font-semibold text-gray-800 w-2/3 text-left md:text-right">{value}</span>
    </div>
);

// Component phụ trợ để hiển thị trường nhập liệu (cho chế độ chỉnh sửa)
const FormInput = ({ label, id, value, onChange, type = 'text', readOnly = false }) => (
    <div className="flex flex-col md:flex-row items-start md:items-center py-3 border-b">
        <label htmlFor={id} className="font-medium text-gray-500 w-1/3 text-left mb-1 md:mb-0">{label}:</label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full md:w-2/3 p-2 border ${readOnly ? 'bg-gray-100' : 'bg-white border-blue-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
        />
    </div>
);


export default function PersonalInformation({ user }) {
    
    // ✅ 1. KHỞI TẠO HOOKS Ở CẤP CAO NHẤT
    const [isEditing, setIsEditing] = useState(false);
    
    // Khởi tạo trạng thái form, sử dụng Optional Chaining (?) để tránh lỗi nếu user là null/undefined
    const [formData, setFormData] = useState({
        username: user?.username || '',
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '', // Mật khẩu luôn rỗng khi khởi tạo/chỉnh sửa
        role: user?.role || 'USER',
    });
    
    // 💡 SỬ DỤNG useEffect ĐỂ ĐỒNG BỘ DỮ LIỆU TỪ PROP user
    // Khắc phục lỗi không thể nhập liệu khi user thay đổi sau lần render đầu
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '', // Luôn reset password về rỗng khi prop user thay đổi
                role: user.role || 'USER',
            });
            // Thoát chế độ chỉnh sửa khi dữ liệu user được tải lại
            setIsEditing(false); 
        }
    }, [user]); 

    // 2. Hàm xử lý thay đổi input
    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }, []);

    // 3. Hàm xử lý cập nhật thông tin
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // --- LOGIC GỌI API ĐỂ CẬP NHẬT DỮ LIỆU ---
        
        // TẠI ĐÂY: GỌI API BACKEND (POST/PUT) VỚI ĐỐI TƯỢNG formData
        // Ví dụ: axios.put('/api/users/profile', formData)
        
        console.log("Dữ liệu gửi đi:", formData);
        
        alert('Đã gửi yêu cầu cập nhật thông tin. (Kiểm tra console)');
        
        // Giả lập thành công:
        // Sau khi API thành công, bạn có thể cần gọi hàm để cập nhật lại prop user
        setIsEditing(false); // Tắt chế độ chỉnh sửa
    };

    // -------------------------------------------------------------------
    // ❌ 4. CÂU LỆNH ĐIỀU KIỆN (Return sớm) ĐƯỢC ĐẶT SAU CÁC HOOK
    if (!user) {
        return (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-lg text-red-600 font-semibold">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
            </div>
        );
    }
    
    // -------------------------------------------------------------------
    // CHẾ ĐỘ CHỈNH SỬA
    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className="space-y-6 w-96 mt-5">
                <h3 className="text-3xl font-bold text-blue-600 border-b pb-4 mb-4">Chỉnh sửa Hồ sơ</h3>
                
                {/* Tên tài khoản (Chỉ đọc) */}
                <FormInput 
                    label="Tên tài khoản" 
                    id="username" 
                    value={formData.username} 
                    onChange={handleChange}
                    readOnly={true} 
                />
                
                {/* CÁC TRƯỜNG CÓ THỂ CHỈNH SỬA (Không có readOnly) */}
                <FormInput label="Họ và Tên" id="name" value={formData.name} onChange={handleChange} />
                <FormInput label="Email" id="email" value={formData.email} onChange={handleChange} type="email" />
                <FormInput label="Số điện thoại" id="phone" value={formData.phone} onChange={handleChange} type="tel" />

                {/* Mật khẩu mới (Chỉ điền khi muốn thay đổi) */}
                <FormInput 
                    label="Mật khẩu mới" 
                    id="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    type="password"
                />
                <span className="text-sm text-gray-500 block -mt-4">
                    Để trống nếu không muốn thay đổi mật khẩu.
                </span>
                
                {/* Vai trò (Chỉ đọc) */}
                <FormInput label="Vai trò" id="role" value={formData.role} readOnly={true} />

                <div className="pt-6 flex gap-4">
                    <button 
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    >
                        Lưu Thay Đổi
                    </button>
                    <button 
                        type="button"
                        onClick={() => {
                            // Reset formData về giá trị ban đầu (từ prop user) và thoát chế độ
                            setFormData({
                                username: user.username || '', name: user.name || '',
                                email: user.email || '', phone: user.phone || '',
                                password: '', role: user.role || 'USER',
                            });
                            setIsEditing(false);
                        }}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        );
    }

    // -------------------------------------------------------------------
    // CHẾ ĐỘ HIỂN THỊ (Mặc định)
    return (
        <div className="space-y-6 w-96 mt-5">
            <h3 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-4">Hồ sơ của tôi</h3>
            
            <InfoRow label="Tên tài khoản" value={user.username || 'Chưa cung cấp'} /> 
            <InfoRow label="Họ và Tên" value={user.name || 'Chưa cung cấp'} />
            <InfoRow label="Email" value={user.email || 'Chưa cung cấp'} />
            <InfoRow label="Số điện thoại" value={user.phone || 'Chưa cung cấp'} />
            <InfoRow label="Vai trò" value={user.role || 'USER'} />
            <InfoRow label="Mật khẩu" value="********" /> 
            
            <div className="pt-6">
                <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    onClick={() => setIsEditing(true)} // Chuyển sang chế độ chỉnh sửa
                >
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
}