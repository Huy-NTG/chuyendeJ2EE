import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/users",
});

export const getAllUsers = () => API.get("/");
export const getUserById = (id) => API.get(`/${id}`);
export const createUser = (data) => API.post("/", data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);
