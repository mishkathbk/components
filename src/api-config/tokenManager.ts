import { LoginApi } from "@/services/login/authServices";

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}
const getTokenExpiryTime = (token: string | null): number | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch {
    return null;
  }
};

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
export const refreshTokens = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await LoginApi.login({
      userName: "hruser",
      password: "hr123",
      refreshToken,
    });

    if (response.status === 200) {
      setTokens(
        response.result.tokenModel.token,
        response.result.tokenModel.refreshToken
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Refresh failed:", error);
    return false;
  }
};

let refreshTimeout: NodeJS.Timeout | null = null;
export const scheduleTokenRefresh = (): void => {
  if (refreshTimeout) clearTimeout(refreshTimeout);

  const token = getToken();
  const expiryTime = getTokenExpiryTime(token);

  if (!token || !expiryTime) return;

  const refreshTime = expiryTime - Date.now() - 60000; 

  if (refreshTime <= 0) {
    refreshTokens();
    return;
  }

  refreshTimeout = setTimeout(async () => {
    await refreshTokens();
    scheduleTokenRefresh(); // Reschedule for new token
  }, refreshTime);
};
