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
  const response = await api.get("/pedidos");
  console.log(response.data);
  return response.data.data;
}

export function useGetPedidos() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["pedidos"],
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
