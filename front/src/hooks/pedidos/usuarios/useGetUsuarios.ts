import { useMutation } from "react-query";
import { api } from "@/services/api"; // <- import do novo axios configurado
import { Usuario } from "@/types/usuario";

export const usePostUsuario = () => {
  return useMutation((data: Usuario) =>
    api.post("/login/usuario", data)
  );
};