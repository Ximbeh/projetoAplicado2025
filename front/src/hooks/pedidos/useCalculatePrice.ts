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

type Endereco = {
  cep: string;
  logradouro: string;
  numero: string;
};

type CalcularPrecoPayload = {
  origem: Endereco;
  destino: Endereco;
  peso: string;
};

type CalcularPrecoResponse = {
  preco_estimado: string;
  distancia_km: number;
  tempo_estimado: number;
};

export function useCalculatePrice() {
  return useMutation<CalcularPrecoResponse, Error, CalcularPrecoPayload>({
    mutationFn: async ({ origem, destino, peso }) => {
      const response = await api.post("/pedidos/calcular", {
        peso,
        cep_origem: origem.cep,
        logradouro_origem: origem.logradouro,
        numero_origem: origem.numero,
        cep_destino: destino.cep,
        logradouro_destino: destino.logradouro,
        numero_destino: destino.numero,
      });

      return response.data;
    },
    onError: () => {
      enqueueSnackbar("Erro ao calcular valor do pedido.", { variant: "error" });
    },
  });
}
