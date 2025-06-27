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

export default function UserMotoboyPageEdit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editarUsuario = useEditarUsuario();
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

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
    const nome = searchParams.get("nome") || "";
    const cpf = searchParams.get("cpf") || "";
    const telefone = searchParams.get("telefone") || "";
    const email = searchParams.get("email") || "";
    const tipo_veiculo = searchParams.get("tipo_veiculo") || "";
    const placa_moto = searchParams.get("placa_moto") || "";
    const chassi = searchParams.get("chassi") || "";
    const cnh = searchParams.get("cnh") || "";

    methods.reset({
      nome,
      cpf,
      telefone,
      email,
      tipo_veiculo,
      placa_moto,
      chassi,
      cnh,
    });
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
        tipo_veiculo: user.tipo_veiculo,
        placa_moto: user.placa_moto,
        chassi: user.chassi,
        cnh: user.cnh,
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
        tipo_veiculo: values.tipo_veiculo,
        placa_moto: values.placa_moto,
        chassi: values.chassi,
        cnh: values.cnh,
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
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Title string={"Editar Dados do Motoboy"} />

          <LongInput label="Nome" name="nome" type="text" />
          <LongInput label="CPF" name="cpf" type="text" />
          <LongInput label="Telefone" name="telefone" type="tel" />
          <LongInput label="Email" name="email" type="email" />
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
