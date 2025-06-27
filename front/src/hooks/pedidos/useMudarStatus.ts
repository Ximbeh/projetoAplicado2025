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

export function useMudarStatus() {
  const router = useRouter();
  return useMutation<Pedido[], Error, { pedido_id: string; status: string }>({
    mutationFn: async ({ pedido_id, status }) => {
      const response = await api.put("/pedidos/motoboy/status", {
        pedido_id,
        status,
      });
      return response.data.data;
    },
    onSuccess: () => {
      enqueueSnackbar("Status mudado com sucesso!", { variant: "success" });
      router.push("/dashboard/motoboy");
    },
    onError: (error) => {
      enqueueSnackbar("Erro ao mudar status.", { variant: "error" });
    },
  });
}
