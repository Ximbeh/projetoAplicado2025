"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pedido } from "../../types/pedidos";

async function fetchPedidos(): Promise<Pedido[]> {
  const { data } = await axios.get<{ pedidos: Pedido[] }>("http://localhost:3333/api");
  return data.pedidos;
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
