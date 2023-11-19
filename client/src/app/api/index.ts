import axios from "axios";
import { environment } from "src/environments/environment";

export const axiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers["authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async ({ login, password }) => {
  const res = await axiosInstance.post("/auth", { login, password });
  if (res && res.data) {
    if (res.data.data?.token) {
      localStorage.setItem("token", res.data.data?.token);
    }
    return res.data;
  }
};

export const getPackages = async () => {
  const res = await axiosInstance.get("/api/package");
  if (res && res.data) {
    return res.data;
  }
};

export const getDeliveries = async () => {
  const res = await axiosInstance.get("/api/delivery");
  if (res && res.data) {
    return res.data;
  }
};

export const createPackage = async (data) => {
  const res = await axiosInstance.post("/api/package", data);
  if (res && res.data) {
    return res.data;
  }
};

export const createDelivery = async (data) => {
  const res = await axiosInstance.post("/api/delivery", data);
  if (res && res.data) {
    return res.data;
  }
};
