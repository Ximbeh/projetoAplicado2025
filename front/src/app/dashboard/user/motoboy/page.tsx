"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";
import { useGetUsuarioById } from "@/hooks/usuarios/useGetUsuariosById";
import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function UserMotoboyPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuarioLogado");
    if (usuarioLocal) {
      const parsed = JSON.parse(usuarioLocal);
      setUserId(parsed?.id || null);
    }
  }, []);

  const { data: usuario, isLoading } = useGetUsuarioById(userId as number);
  console.log(usuario);

  const methods = useForm({
    defaultValues: {
      nome: "",
      cpf: "1",
      telefone: "",
      email: "",
      tipo_veiculo: "",
      placa_moto: "",
      chassi: "",
      cnh: "",
    },
  });

  useEffect(() => {
    if (usuario) {
      methods.reset({
        nome: usuario.nome || "",
        cpf: usuario.cpf || "",
        telefone: usuario.telefone || "",
        email: usuario.email || "",
        tipo_veiculo: usuario.tipo_veiculo || "",
        placa_moto: usuario.placa_moto || "",
        chassi: usuario.chassi || "",
        cnh: usuario.cnh || "",
      });
    }
  }, [usuario, methods]);

  const handleClickEditar = () => {
    if (!usuario) return;

    const queryParams = new URLSearchParams({
      nome: usuario.nome || "",
      cpf: usuario.cpf || "",
      telefone: usuario.telefone || "",
      email: usuario.email || "",
      tipo_veiculo: usuario.tipo_veiculo || "",
      placa_moto: usuario.placa_moto || "",
      chassi: usuario.chassi || "",
      cnh: usuario.cnh || "",
    });

    router.push(`motoboy/editar?${queryParams.toString()}`);
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
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Title string={"Detalhes do Motoboy"} />

          <LongInput label="Nome" name="nome" type="text" disabled />
          <LongInput label="CPF" name="cpf" type="text" disabled />
          <LongInput label="Telefone" name="telefone" type="tel" disabled />
          <LongInput label="Email" name="email" type="email" disabled />
          <LongInput
            label="Tipo do veículo"
            name="tipo_veiculo"
            type="text"
            disabled
          />
          <LongInput
            label="Placa do veículo"
            name="placa_moto"
            type="text"
            disabled
          />
          <LongInput
            label="Chassi do veículo"
            name="chassi"
            type="text"
            disabled
          />
          <LongInput label="CNH" name="cnh" type="text" disabled />

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
