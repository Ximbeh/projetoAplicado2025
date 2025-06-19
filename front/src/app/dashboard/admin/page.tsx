"use client";

import HeaderIcon from "@/components/HeaderIcon";
import { Stack, Box, Container } from "@mui/material";
import Image from "next/image";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

import relatorio from "../../../assets/icon/relatorio.svg";
import gerenciamentoPerfis from "../../../assets/icon/gerenciamentoPerfis.svg";
import gerenciamentoPedidos from "../../../assets/icon/gerenciamentoPedidos.svg";
import perfilUsuario from "../../../assets/icon/perfilUsuario.svg";
import Whatsapp from "@/components/Whatsapp";
import { useRouter } from "next/navigation";

export default function DashboardAdmin() {
  const router = useRouter();

  const handleRelatorios = () => {
    console.log("Relatórios");
  };
  const HandleGerenciamentoPerfis = () => {
    console.log("Gerenciamento de perfis");
  };
  const handleGerenciamentoPedidos = () => {
    console.log("Gerenciamento de pedidos");
  };
  const handlePerfil = () => {
    router.push("user/admin");
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
              width: "100%",
              rowGap: 4,
            }}
          >
            <ButtonIcon
              label="Relatórios"
              icon={
                <Image
                  src={relatorio}
                  alt="Relatórios"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleRelatorios}
            />

            <ButtonIcon
              label="Gerenciamento de perfis"
              icon={
                <Image
                  src={gerenciamentoPerfis}
                  alt="Gerenciamento de perfis"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={HandleGerenciamentoPerfis}
            />

            <ButtonIcon
              label="Gerenciamento de pedidos"
              icon={
                <Image
                  src={gerenciamentoPedidos}
                  alt="Gerenciamento de pedidos"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleGerenciamentoPedidos}
            />

            <ButtonIcon
              label="Perfil do usuário"
              icon={
                <Image
                  src={perfilUsuario}
                  alt="Perfil do usuário"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handlePerfil}
            />
          </Box>
        </Stack>
      </Container>
      <Whatsapp />
    </>
  );
}
