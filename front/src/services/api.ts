import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api", // ajuste se necessário
});

// Interceptor para adicionar token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});