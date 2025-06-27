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
export function useAceitarPedido() {
  const router = useRouter();
  return useMutation<
    Pedido[],
    Error,
    { pedido_id: string; motoboy_id: string }
  >({
    mutationFn: async ({ pedido_id, motoboy_id }) => {
      const response = await api.post("/pedidos/aceitar", {
        pedido_id,
        motoboy_id,
      });
      return response.data.data;
    },
    onSuccess: () => {
      enqueueSnackbar("Pedido Aceito com sucesso!", { variant: "success" });
      router.push("/dashboard/motoboy");
    },
    onError: (error) => {
      enqueueSnackbar("Erro ao aceitar o pedido.", { variant: "error" });
    },
  });
}
