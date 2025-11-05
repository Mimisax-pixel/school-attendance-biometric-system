import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // set in .env
  withCredentials: true, // VERY IMPORTANT for HTTP-only cookie auth
});

export default api;
