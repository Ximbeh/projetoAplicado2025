// hooks/usuarios/useEditarUsuario.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

// Aplica token no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dados esperados para atualizar
type EditarUsuarioData = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco?: string;
  tipo_veiculo?: string;
  cnh?: string;
  placa_moto?: string;
  tipoVeiculo?: string;
  chassi?: string;
};

export function useEditarUsuario() {
  return useMutation({
    mutationFn: async (data: EditarUsuarioData) => {
      const { id, ...payload } = data;

      // Remove campos vazios, null ou undefined
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        )
      );

      const response = await api.put(`/usuarios/${id}`, cleanedPayload);
      return response.data;
    },
  });
}
