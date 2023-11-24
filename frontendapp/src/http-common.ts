import axios from "axios";

export const API_URL = 'http://localhost:3050/api'

const token = localStorage.getItem("token");

const httpAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
httpAxios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpAxios;
