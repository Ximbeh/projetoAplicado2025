"use client";

import HeaderIcon from "@/components/HeaderIcon";
import { Stack, Box, Container } from "@mui/material";
import Image from "next/image";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

import novoPedido from "../../../assets/icon/novoPedido.svg";
import pedidoAndamento from "../../../assets/icon/pedidoAndamento.svg";
import historicoPedido from "../../../assets/icon/historicoPedido.svg";
import perfilUsuario from "../../../assets/icon/perfilUsuario.svg";
import Whatsapp from "@/components/Whatsapp";
import { useRouter } from "next/navigation";

export default function DashboardMotoboy() {
  const router = useRouter();

  const handleNovosPedidos = () => {
    router.push("motoboy/novosPedidos");
  };
  const handlePedidosAtivos = () => {
    console.log("pedidos ativos");
  };
  const handleHistorico = () => {
    router.push("motoboy/historicoPedidos");
  };
  const handlePerfil = () => {
    router.push("user/motoboy");
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
              label="Novos Pedidos"
              icon={
                <Image
                  src={novoPedido}
                  alt="Novos pedidos"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleNovosPedidos}
            />

            <ButtonIcon
              label="Pedidos ativos"
              icon={
                <Image
                  src={pedidoAndamento}
                  alt="Pedidos ativos"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handlePedidosAtivos}
            />

            <ButtonIcon
              label="Histórico de pedidos"
              icon={
                <Image
                  src={historicoPedido}
                  alt="Histórico de pedidos"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleHistorico}
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
