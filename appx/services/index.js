import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem('token')
const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Basic ${token ? token : ''}`
  },
});

export default apiClient;