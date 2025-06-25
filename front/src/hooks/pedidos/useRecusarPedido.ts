"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pedido } from "../../types/pedidos";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

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

//to-do: typar
export function useRecusarPedido() {
  const router = useRouter();
  return useMutation<Pedido[], Error, { pedidoId: string; idMotoboy: string }>({
    mutationFn: async ({ pedidoId, idMotoboy }) => {
      const response = await api.post("/pedidos/recusar", {
        pedidoId,
        idMotoboy,
      });
      return response.data.data;
    },
    onSuccess: () => {
      enqueueSnackbar("Pedido recusado com sucesso!", { variant: "success" });
      router.push("/dashboard/motoby");
    },
    onError: (error) => {
      enqueueSnackbar("Erro ao recusar o pedido.", { variant: "error" });
    },
  });
}
