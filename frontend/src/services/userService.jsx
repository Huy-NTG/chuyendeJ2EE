import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/users",
});

export const getAllUsers = () => API.get("/");
export const getUserById = (id_user) => API.get(`/${id_user}`);
export const createUser = (data) => API.post("/", data);
export const updateUser = (id_user, data) => API.put(`/${id_user}`, data);
export const deleteUser = (id_user) => API.delete(`/${id_user}`);
export const searchUsers = (username) => API.get(`/search?username=${username}`);
export const countUsers = () => API.get("/count");
