import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/rooms",
});

export const getRoomsByHotel = (hotelId) => API.get(`/hotel/${hotelId}`);