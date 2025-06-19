"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UserAdminPage() {
  const router = useRouter();
  const handleClickEditar = () => {
    router.push("admin/editar");
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
    </>
  );
}
