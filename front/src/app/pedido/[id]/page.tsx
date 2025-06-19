"use client";

import { useRouter, useParams } from "next/navigation";
import HeaderIcon from "@/components/HeaderIcon";
import InfoIconWithModal from "@/components/novoPedido/IconInfo";
import DualButton from "@/components/ui/DualButton";
import InfoDoubleText from "@/components/ui/InfoDoubleText";
import LongButton from "@/components/ui/LongButton";
import { PedidoStatus } from "@/types/pedidos";
import {
  Container,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useGetPedidos } from "@/hooks/pedidos/useGetPedidos";

export default function PedidoPage() {
  const router = useRouter();
  const params = useParams();
  const pedidoId = params?.id;

  const { data: pedidos, isLoading, isError, error } = useGetPedidos();
  const usuario =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuarioLogado") || "null")
      : null;

  if (isLoading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">
          Erro ao carregar pedidos: {`${error}`}
        </Typography>
      </Container>
    );

  if (!pedidoId)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>ID do pedido não fornecido.</Typography>
      </Container>
    );

  const pedido = pedidos?.find((p) => String(p.id) === pedidoId);

  if (!pedido)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Pedido não encontrado.</Typography>
      </Container>
    );

  const handleRepetir = () => {
    console.log("repetir");
  };

  const handleCancelar = () => {
    router.push("/dashboard");
  };

  const handleAceitar = () => {
    // lógica de recusar pedido
  };

  const handleRecusar = () => {
    // lógica de recusar pedido
  };

  const handleExcluir = () => {
    // lógica de excluir pedido
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
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Box padding={2} margin={0} width={"100%"}>
            <InfoDoubleText title={"Conteúdo:"} info={pedido.conteudo} />
            <InfoDoubleText title={"Peso:"} info={`${pedido.peso} kg`} />
            <InfoDoubleText
              title={"Origem:"}
              info={`${pedido.logradouro_origem}, ${pedido.complemento_origem} ${pedido.numero_origem}, ${pedido.cep_origem}`}
            />
            <InfoDoubleText
              title={"Destino:"}
              info={`${pedido.logradouro_destino}, ${pedido.complemento_destino} ${pedido.numero_destino}, ${pedido.cep_destino}`}
            />
            <InfoDoubleText title={"Status:"} info={pedido.status} />
            <InfoDoubleText
              title={"Preço final estimado:"}
              info={"R$29,00"}
              bigInfo={true}
              extra={<InfoIconWithModal />}
            />
          </Box>

          {usuario?.category === "cliente" && (
            <>
              <DualButton
                onNext={handleRepetir}
                onBack={onBack}
                nextLabel={"Repetir"}
              />
              {pedido.status === PedidoStatus.Concluido && (
                <LongButton label="Cancelar" onClick={handleCancelar} />
              )}
            </>
          )}

          {usuario?.category === "motoboy" && (
            <>
              {pedido.status === PedidoStatus.Concluido ? (
                <LongButton label="Voltar" onClick={onBack} />
              ) : (
                <>
                  <DualButton
                    onNext={handleAceitar}
                    onBack={onBack}
                    nextLabel={"Aceitar"}
                  />
                  <LongButton label="Recusar" onClick={handleRecusar} />
                </>
              )}
            </>
          )}

          {usuario?.category === "admin" && (
            <>
              <DualButton
                onNext={handleExcluir}
                onBack={onBack}
                nextLabel={"Excluir"}
              />
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}
