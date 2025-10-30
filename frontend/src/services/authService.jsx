import axios from "axios";

// Đặt baseURL theo port backend đang chạy (ví dụ: 8081)
const API = axios.create({
  baseURL: "http://localhost:8081/api/auth",
});

// Đăng ký người dùng mới
export const register = async (data) => {
  try {
    // 1. Gọi API: SỬA endpoint từ "/register" thành "/auth/register" (dựa trên cấu hình SecurityConfig)
    const res = await API.post("/register", data); 
    // Dữ liệu trả về (res.data) khớp với UserResponse DTO: { id, username, email, role, token }
    const userResponse = res.data; 
    // 2. LƯU TOKEN: Lưu JWT token vào sessionStorage để tự động đăng nhập (token tồn tại đến khi đóng tab/browser)
    if (userResponse && userResponse.token) {
        // Thay đổi tại đây: sessionStorage thay vì localStorage
        sessionStorage.setItem("authToken", userResponse.token); 
        console.log("Đăng ký thành công và đã lưu token vào sessionStorage.");
    } else {
         console.warn("Đăng ký thành công nhưng không nhận được token.");
    }
    // Trả về toàn bộ dữ liệu người dùng (bao gồm token)
    return userResponse; 
  } catch (err) {
    // 3. XỬ LÝ LỖI: Cải thiện xử lý lỗi từ backend (ví dụ: "Username already taken")
    const errorMessage = err.response?.data?.message || "Đăng ký thất bại do lỗi không xác định.";
    console.error("Register error:", err);
    // Ném ra lỗi với thông báo dễ hiểu cho frontend hiển thị
    throw new Error(`Đăng ký thất bại: ${errorMessage}`); 
  }
};

// Đăng nhập người dùng
export const login = async (data) => {
  try {
    // Gọi API POST đến /login (baseURL/login)
    const res = await API.post("/login", data);
    // Dữ liệu trả về (res.data) khớp với UserResponse DTO: { id, username, email, role, token }
    const userResponse = res.data; 
    // 🔑 1. LƯU TOKEN: Lưu JWT token vào sessionStorage 
    if (userResponse && userResponse.token) {
      sessionStorage.setItem("authToken", userResponse.token); 
      // 🔑 2. LƯU THÔNG TIN USER: Lưu user info (trừ token) vào sessionStorage
      const userWithoutToken = { ...userResponse };
      delete userWithoutToken.token;
      sessionStorage.setItem("user", JSON.stringify(userWithoutToken));
      console.log("Đăng nhập thành công và đã lưu token vào sessionStorage.");
    } else {
      console.warn("Đăng nhập thành công nhưng không nhận được token.");
    }
    // Trả về toàn bộ dữ liệu người dùng
    return userResponse; 
  } catch (err) {
    // 🔑 3. XỬ LÝ LỖI: Axios tự động ném lỗi nếu status >= 400.
    // Backend ném RuntimeException("Invalid password") sẽ trả về status 500 hoặc 400
    const errorMessage = err.response?.data?.message || `Đăng nhập thất bại. Mã lỗi: ${err.response?.status || 'Không xác định'}.`;
    console.error("Login error:", err);
    console.log("API URL đang dùng:", API.defaults.baseURL + "/login");
    // Ném ra lỗi với thông báo cụ thể để component gọi hiển thị
    throw new Error(errorMessage); 
  }
};
