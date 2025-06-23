"use client";

import { Container, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Logo from "@/components/ui/Logo";
import LongInput from "@/components/ui/LongInput";
import LongButton from "@/components/ui/LongButton";
import Link from "next/link";
import { useLogin } from "@/hooks/pedidos/usuarios/useLogin";

type LoginFormData = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<LoginFormData>();

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: login } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email, senha: data.senha });
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  return (
    <FormProvider {...methods}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack spacing={4} alignItems="center" width="100%">
            <Logo />

            <Stack spacing={2} alignItems="center" width="100%">
              <LongInput
                label="E-mail"
                type="text"
                name="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <LongInput
                label="Senha"
                type="password"
                name="senha"
                error={!!errors.senha}
                helperText={errors.senha?.message}
              />

              {/* <Link href="/recuperacao">
                <Typography
                  fontSize={12}
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    alignSelf: "flex-start",
                  }}
                >
                  Esqueceu a senha?
                </Typography>
              </Link> */}

              <LongButton label="Entrar" type="submit" />

              <Typography
                variant="body2"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={handleSignupRedirect}
              >
                Não tem conta? Cadastre-se!
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Container>
    </FormProvider>
  );
}
