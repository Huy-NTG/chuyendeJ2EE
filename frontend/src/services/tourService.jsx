import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api/tours",
});

export const getAllTours = () => API.get("");
export const getTourById = (id) => API.get(`/${id}`);
export const createTour = (data) => API.post("/", data);
export const updateTour = (id, data) => API.put(`/${id}`, data);
export const deleteTour = (id) => API.delete(`/${id}`);
export const searchTours = (location) => API.get(`/search/${location}`);