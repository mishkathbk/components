import axios from "axios";
import { getToken } from "./tokenManager";

const axiosConfig = axios.create({
  baseURL: "https://your-api.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosConfig.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;  
});

// axiosConfig.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       clearTokens();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosConfig };
