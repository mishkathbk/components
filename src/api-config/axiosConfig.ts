import axios from "axios";
import {
  getToken,
  isTokenExpired,
  refreshTokens,
  clearTokens,
} from "./tokenManager";

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
    if (isTokenExpired(token)) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        clearTokens();
        window.location.href = "/login";
        return config;
      }
      config.headers.Authorization = `Bearer ${getToken()}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
