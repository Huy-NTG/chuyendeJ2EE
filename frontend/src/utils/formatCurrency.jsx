    // Hàm format tiền tệ Việt Nam
export const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount).replace('₫', ' ₫'); // Thêm khoảng trắng
    };