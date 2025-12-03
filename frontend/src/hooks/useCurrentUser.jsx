// frontend/src/hooks/useCurrentUser.js (Ví dụ)

import { useState, useEffect, useCallback } from "react";
import { getUserById } from "../services/userService";

export const useCurrentUser = () => {
    const [currentUser, setCurrrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Thêm hàm logout
    const logout = useCallback(() => {
        // Xóa dữ liệu khỏi Session Storage
        sessionStorage.removeItem('user');
        
        // Cập nhật trạng thái local
        setCurrrentUser(null);
        
        // Bạn có thể thêm logic chuyển hướng hoặc reload trang tại đây nếu cần
        // Ví dụ: window.location.href = '/'; 
    }, []);

    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        
        if (userJson) {
            const fetchUser = async () => {
                try {
                    const userObject = JSON.parse(userJson);
                    // Giả định userObject chứa id hợp lệ
                    const response = await getUserById(userObject.id);
                    setCurrrentUser(response.data);
                } catch (e) {
                    console.error("Lỗi khi tải hoặc phân tích cú pháp user data:", e);
                    // Xóa dữ liệu lỗi và đặt user thành null
                    sessionStorage.removeItem('user');
                    setCurrrentUser(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUser();
        } else {
            // Nếu không có 'user', kết thúc quá trình tải ngay lập tức
            setIsLoading(false);
        }
    }, []); 

    // 2. Trả về hàm logout
    return { currentUser, isLoading, logout };
}