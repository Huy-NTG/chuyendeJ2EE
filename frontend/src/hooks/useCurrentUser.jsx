import { useState, useEffect } from "react";
import { getUserById } from "../services/userService";
export const useCurrentUser = () => {
    const [currentUser, setCurrrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            const fetchUser = async () => {
                try {
                    const userObject = JSON.parse(userJson);
                    const response = await getUserById(userObject.id);
                    setCurrrentUser(response.data);
                } catch (e) {
                    console.error("Lỗi khi phân tích cú pháp user data:", e);
                    // Nếu lỗi (ví dụ: token hết hạn), xóa dữ liệu local và đặt user thành null
                    sessionStorage.removeItem('user');
                    setCurrrentUser(null);
                } finally {
                    // Dù thành công hay thất bại, quá trình tải đã kết thúc
                    setIsLoading(false);
                }
            };
            fetchUser();
        }  else {
            // Nếu không có 'user' trong localStorage, kết thúc quá trình tải ngay lập tức
            setIsLoading(false);
        }
    }, []); 
    return { currentUser, isLoading };
}