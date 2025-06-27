"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";
import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetUsuarioById } from "@/hooks/usuarios/useGetUsuariosById";

export default function UserClientePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);

  // Lê o ID do localStorage apenas uma vez
  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuarioLogado");
    if (usuarioLocal) {
      const parsed = JSON.parse(usuarioLocal);
      setUserId(parsed?.id || null);
    }
  }, []);

  const { data: usuario, isLoading } = useGetUsuarioById(userId as number);

  const methods = useForm({
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    },
  });

  // Preenche o formulário assim que os dados chegam
  useEffect(() => {
    if (usuario) {
      methods.reset({
        nome: usuario.nome || "",
        cpf: usuario.cpf || "",
        telefone: usuario.telefone || "",
        email: usuario.email || "",
      });
    }
  }, [usuario, methods]);

  const handleClickEditar = () => {
    router.push(
      `cliente/editar?nome=${usuario?.nome}&cpf=${usuario?.cpf}&telefone=${usuario?.telefone}&email=${usuario?.email}`
    );
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
          <Title string={"Detalhes do Cliente"} />

          <LongInput label="Nome" name="nome" type="text" disabled />
          <LongInput label="CPF" name="cpf" type="text" disabled />
          <LongInput label="Telefone" name="telefone" type="tel" disabled />
          <LongInput label="Email" name="email" type="email" disabled />

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
              onClick={handleClickEditar}
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
