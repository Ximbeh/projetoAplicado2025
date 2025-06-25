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
  preco: string;
};
export function useCalculatePrice() {
  return useMutation<CalcularPrecoResponse, Error, CalcularPrecoPayload>({
    mutationFn: async ({ origem, destino, peso }) => {
      const origemPos = await api.post("/calcularPosicao", origem);
      const destinoPos = await api.post("/calcularPosicao", destino);

      const origemCoords = origemPos.data;
      const destinoCoords = destinoPos.data;

      const tempoRes = await api.post("/calcularTempo", {
        origem: origemCoords,
        destino: destinoCoords,
      });

      const { tempo, distancia } = tempoRes.data;

      const precoRes = await api.post("/calcularPreco", {
        peso,
        distancia,
        tempo,
      });

      return precoRes.data;
    },
  });
}
