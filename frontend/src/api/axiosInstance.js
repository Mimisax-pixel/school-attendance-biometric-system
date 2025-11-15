import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1", // set in .env
  withCredentials: true, // VERY IMPORTANT for HTTP-only cookie auth
});

export function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

api.defaults.headers.common["Authorization"] = "Bearer " + getCookie("token");

export default api;
