import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/rooms",
});

export const createRoom = (roomData) => API.post('', roomData);
export const getRoomsByHotel = (hotelId) => API.get(`/hotel/${hotelId}`);
export const updateRoom = (id, roomData) => API.put(`/${id}`, roomData);
export const deleteRoom = (id) => API.delete(`/${id}`);
export const getRoomById = (id) => API.get(`/${id}`);