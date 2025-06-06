import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
});

export default axiosClient;
