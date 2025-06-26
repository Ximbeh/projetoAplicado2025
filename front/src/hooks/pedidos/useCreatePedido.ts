"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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

// Tipagem dos dados esperados para criar um pedido
type NovoPedido = {
  id_usuario: number;
  conteudo: string;
  peso: number;
  cep_origem: string;
  logradouro_origem: string;
  numero_origem: string;
  complemento_origem: string;
  cep_destino: string;
  logradouro_destino: string;
  numero_destino: string;
  complemento_destino: string;
  preco: number;
};

export function useCreatePedido() {
  return useMutation({
    mutationFn: async (pedido: NovoPedido) => {
      const response = await api.post("/pedidos", pedido);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar("Pedido criado com sucesso!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar("Erro ao criar o pedido.", { variant: "error" });
    },
  });
}
