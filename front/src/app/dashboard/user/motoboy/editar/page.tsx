"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";

import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function UserMotoboyPageEdit() {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      nome: "João Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 91234-5678",
      email: "joao@email.com",
      tipoVeiculo: "Moto",
      placaVeiculo: "ABC-1234",
      chassiVeiculo: "9BWZZZ377VT004251",
      cnh: "12345678900",
    },
  });

  const handleEditar = () => {
    const data = methods.getValues();
    console.log("Dados editados:", data);
    // Aqui você pode enviar os dados para a API
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
            name="tipoVeiculo"
            type="text"
            disabled
          />
          <LongInput
            label="Placa do veículo"
            name="placaVeiculo"
            type="text"
            disabled
          />
          <LongInput
            label="Chassi do veículo"
            name="chassiVeiculo"
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
