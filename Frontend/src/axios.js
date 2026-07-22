import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3002";
console.log("API URL:", BASE);

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

export default api;