"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";

import { Button, Container, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function UserAdminPageEdit() {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
    },
  });

  const handleEditar = () => {
    const data = methods.getValues();
    console.log("Dados editados:", data);
    // Aqui você pode fazer a requisição para editar o usuário
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
          <Title string={"Editar Usuário"} />

          <LongInput label="Nome" type="text" name="nome" />
          <LongInput label="CPF" type="text" name="cpf" />
          <LongInput label="Telefone" type="tel" name="telefone" />
          <LongInput label="Email" type="email" name="email" />

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
