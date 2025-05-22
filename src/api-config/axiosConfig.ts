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
  console.log("token:::",token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;  
});

export { axiosConfig };
