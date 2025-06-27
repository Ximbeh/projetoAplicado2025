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

// Função que busca um pedido por ID
async function fetchPedidoById({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<Pedido> {
  const [, pedidoId] = queryKey;
  const response = await api.get(`/pedidos/${pedidoId}`);
  console.log(response.data);
  return response.data.data;
}

// Hook que usa essa função
export function useGetPedidoById(pedidoId: number) {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["pedido", pedidoId],
    queryFn: fetchPedidoById,
    enabled: !!pedidoId, // só faz a requisição se tiver um id válido
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
