import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Tự động attach token từ localStorage
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosAuth;
