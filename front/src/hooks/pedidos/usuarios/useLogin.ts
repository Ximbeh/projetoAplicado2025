import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

type LoginData = {
  email: string;
  senha: string;
};

async function postLogin(data: LoginData) {
  console.log(data);

  const res = await fetch("http://localhost:3333/api/login/usuario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Credenciais inválidas");
  }

  return res.json();
}

export function useLogin() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      const usuario = data.usuario;
      const token = data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      enqueueSnackbar("Login bem-sucedido!", { variant: "success" });

      // Redireciona com base no tipo
      if (usuario.tipo === "motoboy") {
        router.push("/dashboard/motoboy");
      } else {
        switch (usuario.tipo) {
          case "cliente":
            router.push("/dashboard/cliente");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          default:
            enqueueSnackbar("Tipo de usuário desconhecido!", {
              variant: "error",
            });
        }
      }
    },
    onError: (err: Error) => {
      enqueueSnackbar("Erro ao logar: " + err.message, { variant: "error" });
    },
  });
}
