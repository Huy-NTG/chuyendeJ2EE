import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/hotels",
});

export const getAllHotels = () => API.get("");
export const getHotelById = (id) => API.get(`/${id}`);
export const createHotel = (data) => API.post("/", data);
export const updateHotel = (id, data) => API.put(`/${id}`, data);
export const deleteHotel = (id) => API.delete(`/${id}`);
