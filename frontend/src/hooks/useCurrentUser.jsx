import { useState, useEffect } from "react";
import { getUserById } from "../services/userService";
export const useCurrentUser = () => {
    const [currentUser, setCurrrentUser] = useState(null);
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const fetchUser = async () => {
                try {
                    const userObject = JSON.parse(userJson);
                    const response = await getUserById(userObject.id);
                    setCurrrentUser(response.data);
                } catch (e) {
                    console.error("Lỗi khi phân tích cú pháp user data:", e);
                }
            };
            fetchUser();
        }
    }, []); 
    return currentUser;
}