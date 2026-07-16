import axios from 'axios'

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: "https://chat-application-backend-y4h1.onrender.com/",
  withCredentials: true,
});

export default api;