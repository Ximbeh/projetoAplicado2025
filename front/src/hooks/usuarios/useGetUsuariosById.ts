"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pedido } from "../../types/pedidos";
import { Usuario } from "@/types/usuario";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

async function fetchUsuarioById(userId: number): Promise<Usuario> {
  const response = await api.get(`/usuarios/${userId}`);
  return response.data.data;
}

export function useGetUsuarioById(userId: number) {
  return useQuery({
    queryKey: ["userId", userId],
    queryFn: () => fetchUsuarioById(userId),
    enabled: !!userId,
  });
}
