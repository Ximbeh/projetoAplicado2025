import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

type LoginData = {
  username: string;
  password: string;
};

async function postLogin(data: LoginData) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Credenciais inválidas");

  return res.json();
}

export function useLogin() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      enqueueSnackbar("Login bem-sucedido!", { variant: "success" });

      switch (data.usuario.category) {
        case "cliente":
          router.push("/dashboard/cliente");
          break;
        case "motoboy":
          router.push("/dashboard/motoboy");
          break;
        case "admin":
          router.push("/dashboard/admin");
          break;
        default:
          enqueueSnackbar("Categoria desconhecida!", { variant: "error" });
      }
    },
    onError: (err: Error) => {
      enqueueSnackbar("Erro ao logar: " + err.message, { variant: "error" });
    },
  });
}
