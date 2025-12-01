import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/locations",
});
export const getAllLocations = () => API.get("");
export const getLocationById = (id) => API.get(`/${id}`);
export const createLocation = (data) => API.post("", data);
export const updateLocation = (id, data) => API.put(`/${id}`, data);
export const deleteLocation = (id) => API.delete(`/${id}`);
export const searchLocations = (keyword) => API.get(`/search?keyword=${keyword}`);
export const getLocationByName = (name) => API.get(`/name?name=${name}`);