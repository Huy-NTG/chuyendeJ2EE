import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/flights",
});

export const getAllFlights = () => API.get("");
export const getFlightById = (id_flight) => API.get(`/${id_flight}`);
export const cancelFlight = (id_flight) => API.put(`/${id_flight}/cancel`);
export const searchFlights = () => API.get("/search");
