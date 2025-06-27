"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";
import { useEditarUsuario } from "@/hooks/usuarios/useEditarUsuario";

import { Button, Container, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function UserClientePageEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editarUsuario = useEditarUsuario();
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  const methods = useForm({
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    },
  });
  useEffect(() => {
    const nome = searchParams.get("nome") || "";
    const cpf = searchParams.get("cpf") || "";
    const telefone = searchParams.get("telefone") || "";
    const email = searchParams.get("email") || "";

    methods.reset({ nome, cpf, telefone, email });
  }, [searchParams]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    if (user) {
      setUsuarioLogado(user);
      methods.reset({
        nome: user.nome,
        cpf: user.cpf,
        telefone: user.telefone,
        email: user.email,
      });
    }
  }, []);

  const handleEditar = async () => {
    const values = methods.getValues();
    console.log(usuarioLogado);

    if (!usuarioLogado?.id) {
      enqueueSnackbar("Usuário não identificado", { variant: "error" });
      return;
    }

    try {
      await editarUsuario.mutateAsync({
        id: usuarioLogado.id,
        nome: values.nome,
        telefone: values.telefone,
        email: values.email,
      });

      enqueueSnackbar("Perfil atualizado com sucesso", { variant: "success" });
      router.back();
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar o perfil", { variant: "error" });
      console.error(error);
    }
  };

  const onBack = () => {
    router.back();
  };

  return (
    <FormProvider {...methods}>
      <HeaderIcon />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          marginTop: "-100px",
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Title string={"Editar Cliente"} />

          <LongInput label="Nome" name="nome" type="text" />
          <LongInput label="CPF" name="cpf" type="text" />
          <LongInput label="Telefone" name="telefone" type="tel" />
          <LongInput label="Email" name="email" type="email" />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              width: "80%",
              maxWidth: 300,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={onBack}
              fullWidth
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditar}
              fullWidth
            >
              Editar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </FormProvider>
  );
}
