"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pedido } from "../../types/pedidos";

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

async function fetchPedidos(): Promise<Pedido[]> {
  const response = await api.get("/pedidos/motoboy/historico");
  return response.data.data;
}

export function useGetHistoricoMotoboy() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["pedidos-historico"],
    queryFn: fetchPedidos,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
