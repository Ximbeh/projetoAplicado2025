import { Usuario } from "@/types/usuario";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";

async function postUsuario(data: Usuario): Promise<AxiosResponse<any>> {
  return axios.post("http://localhost:3333/api/signup", data);
}

export function usePostUsuario() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<AxiosResponse<any>, Error, Usuario>({
    mutationFn: postUsuario,
    onSuccess: (data) => {
      const usuario = data.data.usuario;
      enqueueSnackbar("Cadastro bem-sucedido!", { variant: "success" });
      console.log("Usuário cadastrado:", usuario);
    },
    onError: (err: any) => {
      console.log(err);

      enqueueSnackbar("Erro ao cadastrar: " + err.response.data.erro, {
        variant: "error",
      });
    },
  });
}
