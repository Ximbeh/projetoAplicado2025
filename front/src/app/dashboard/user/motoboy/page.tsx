"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";
import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function UserMotoboyPage() {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      nome: "João Motoboy",
      cpf: "123.456.789-00",
      telefone: "(11) 91234-5678",
      email: "joao@email.com",
      tipo_veiculo: "Moto",
      placa_moto: "ABC-1234",
      chassiVeiculo: "9BWZZZ377VT004251",
      cnh: "12345678900",
    },
  });

  const handleClickEditar = () => {
    router.push("motoboy/editar");
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
