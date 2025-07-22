import axios from "axios";
import Cookies from "js-cookie";

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// قبل از هر درخواست، access_token رو به header اضافه کن
axiosAuth.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// هندل کردن خطاهای پاسخ
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // فقط برای خطای 401 و زمانی که قبلاً تلاش مجدد نکردیم
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");

      // 🔐 اگر refresh_token نداریم، اصلاً تلاش نکنیم
      if (!refreshToken) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.dispatchEvent(new Event("unauthorized"));
        return Promise.reject(error);
      }

      try {
        // تلاش برای گرفتن access_token جدید
        const response = await axios.post(
          "http://localhost:6500/auth/refresh-token",
          {
            refreshToken,
          }
        );

        const newAccessToken = response.data.accessToken;

        // ذخیره access_token جدید
        Cookies.set("access_token", newAccessToken, { expires: 30 });

        // درخواست قبلی رو با توکن جدید بفرست
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        // اگر refresh هم شکست خورد، dispatch و پاک‌سازی
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.dispatchEvent(new Event("unauthorized"));
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
