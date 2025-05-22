import { LoginApi } from "@/services/login/authServices";

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

export function getToken() {
  const token = window.localStorage.getItem("accessToken");
  return token;
}

export function getRefreshToken() {
  return window.localStorage.getItem("refreshToken");
}

export function setTokens(accessToken: string, refreshToken: string) {
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
}

export function clearTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}

// export function attachAuthInterceptor(axiosInstance: any) {
//   axiosInstance.interceptors.request.use((config: any) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });
// }

export function startTokenRefreshInterval() {
  setInterval(async () => {
    console.log("working...");
    const token = getToken();
    if (!token) return;
    // if (!isTokenExpired(token)) return;

    const refreshToken = getRefreshToken();
    if (!refreshToken) return;

    try {
      const response = await LoginApi.login({
        userName: "hruser",
        password: "hr123",
        refreshToken: refreshToken,
      });
      const accessToken = response.result.tokenModel.token;
      const newRefreshToken = response.result.tokenModel.refreshToken;

      setTokens(accessToken, newRefreshToken);

      console.log("Token refreshed successfully");
    } catch (error) {
      console.error("Refresh failed. Logging out.");
      clearTokens();
      window.location.href = "/login";
    }
  }, 60 * 1000);
}
