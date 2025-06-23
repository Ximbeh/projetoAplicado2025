import { Usuario } from "@/types/usuario";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

async function postUsuario(data: Usuario): Promise<AxiosResponse<any>> {
  return axios.post("http://localhost:3333/api/signup", data);
}

export function usePostUsuario() {
  return useMutation<AxiosResponse<any>, unknown, Usuario>({
    mutationFn: postUsuario,
  });
}
