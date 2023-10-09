import axios from "axios";
export const privetRoute = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
  withCredentials: true,
});
export const publicRoute = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
});

privetRoute.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401 && !error?.config?.isChecking) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
