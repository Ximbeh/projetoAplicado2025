"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";

import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UserAdminPageEdit() {
  const router = useRouter();
  const handleEditar = () => {
    console.log("editou");
  };
  const onBack = () => {
    router.back();
  };
  return (
    <>
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
          <Title string={"Novo Pedido"} />
          <LongInput label="Nome" type="name" />
          <LongInput label="CPF" type="cpf" />
          <LongInput label="Telefone" type="telefone" />
          <LongInput label="Email" type="email" />
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
    </>
  );
}
