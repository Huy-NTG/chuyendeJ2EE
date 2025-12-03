import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
});

export const register = async (data) => {
  try {
    const res = await API.post("/register", data); 
    const userResponse = res.data; 
    if (userResponse && userResponse.token) {
        sessionStorage.setItem("authToken", userResponse.token); 
        console.log("Đăng ký thành công và đã lưu token vào sessionStorage.");
    } else {
         console.warn("Đăng ký thành công nhưng không nhận được token.");
    }
    return userResponse; 
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Đăng ký thất bại do lỗi không xác định.";
    console.error("Register error:", err);
    throw new Error(`Đăng ký thất bại: ${errorMessage}`); 
  }
};

export const login = async (data) => {
  try {
    const res = await API.post("/login", data);
    const userResponse = res.data; 

    if (userResponse && userResponse.token) {
      sessionStorage.setItem("authToken", userResponse.token); 
      console.log(userResponse.token);
      // localStorage.setItem("authToken", userResponse.token); 
      const userWithoutToken = { ...userResponse };
      delete userWithoutToken.token;
      sessionStorage.setItem("user", JSON.stringify(userWithoutToken));
      // localStorage.setItem("user", JSON.stringify(userWithoutToken));
      console.log("Đăng nhập thành công và đã lưu token vào sessionStorage.");
    } else {
      console.warn("Đăng nhập thành công nhưng không nhận được token.");
    }
    return userResponse; 
  } catch (err) {
    const errorMessage = err.response?.data?.message || `Đăng nhập thất bại. Mã lỗi: ${err.response?.status || 'Không xác định'}.`;
    console.error("Login error:", err);
    console.log("API URL đang dùng:", API.defaults.baseURL + "/login");
    throw new Error(errorMessage); 
  }
};
