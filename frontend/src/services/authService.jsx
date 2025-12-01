import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

// Đăng ký
export const register = async (data) => {
  try {
    const res = await API.post("/register", data);
    const userResponse = res.data;

    if (userResponse?.token) {
      localStorage.setItem("authToken", userResponse.token); // lưu token
      const userWithoutToken = { ...userResponse };
      delete userWithoutToken.token;
      localStorage.setItem("user", JSON.stringify(userWithoutToken));
    }

    return userResponse;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Đăng ký thất bại";
    throw new Error(errorMessage);
  }
};

// Đăng nhập
export const login = async (data) => {
  try {
    const res = await API.post("/login", data);
    const userResponse = res.data;

    if (!userResponse?.token) throw new Error("Không nhận được token");

    localStorage.setItem("authToken", userResponse.token);
    const userWithoutToken = { ...userResponse };
    delete userWithoutToken.token;
    localStorage.setItem("user", JSON.stringify(userWithoutToken));

    return userResponse;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Đăng nhập thất bại";
    throw new Error(errorMessage);
  }
};
