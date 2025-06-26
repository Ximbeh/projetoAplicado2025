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
import DialogMudarStatus from "@/components/pedidos/DialogMudarStatus";
import { useRecusarPedido } from "@/hooks/pedidos/useRecusarPedido";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useAceitarPedido } from "@/hooks/pedidos/useAceitarPedido";

export default function PedidoPage() {
  const router = useRouter();
  const params = useParams();
  const pedidoId = params?.id;
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: pedidos,
    isLoading: isLoadingGetPedido,
    isError: isErrorGetPedido,
    error: errorGetPedido,
  } = useGetPedidos(pedidoId as unknown as number);
  const { mutate: mutateRecusar, isPending: isPendingRecusar } =
    useRecusarPedido();

  const { mutate: mutateAceitar, isPending: isPendingAceitar } =
    useAceitarPedido();

  const usuario =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuarioLogado") || "null")
      : null;

  if (isLoadingGetPedido)
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );

  if (isErrorGetPedido)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">
          Erro ao carregar pedidos: {`${errorGetPedido}`}
        </Typography>
      </Container>
    );

  if (!pedidoId)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>ID do pedido não fornecido.</Typography>
      </Container>
    );

  const pedido = pedidos?.find((p) => String(p.id_pedido) === pedidoId);

  if (!pedido)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Pedido não encontrado.</Typography>
      </Container>
    );

  console.log(pedido);

  const handleRepetir = () => {
    console.log("repetir");
  };

  const handleCancelar = () => {
    router.push("/dashboard");
  };

  const handleAceitar = () => {
    if (!pedidoId || !usuario?.id) return;
    mutateAceitar({ pedidoId: pedidoId as string, idMotoboy: usuario.id });
  };

  const handleRecusar = () => {
    if (!pedidoId || !usuario?.id) return;
    mutateRecusar({ pedidoId: pedidoId as string, idMotoboy: usuario.id });
  };

  const handleExcluir = () => {
    // lógica de excluir pedido
  };

  const handleChangeStatus = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

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

          {usuario?.tipo === "cliente" && (
            <>
              <DualButton
                onNext={handleRepetir}
                onBack={onBack}
                nextLabel={"Repetir"}
              />
              {pedido.status === PedidoStatus.Entregue && (
                <LongButton label="Cancelar" onClick={handleCancelar} />
              )}
            </>
          )}

          {usuario?.tipo === "motoboy" && (
            <>
              {pedido.status === PedidoStatus.Entregue ? (
                <LongButton label="Voltar" onClick={onBack} />
              ) : (
                <>
                  {pedido.motoboy_id !== undefined ? (
                    <>
                      <LongButton
                        label="Voltar"
                        onClick={onBack}
                        color={"secondary"}
                      />
                      <LongButton
                        label="Mudar Status"
                        onClick={handleChangeStatus}
                      />
                    </>
                  ) : (
                    <>
                      <DualButton
                        onNext={handleAceitar}
                        onBack={onBack}
                        nextLabel={"Aceitar"}
                        disabledNext={isPendingRecusar}
                        loadingNext={isPendingAceitar}
                      />
                      <LongButton
                        label="Recusar"
                        onClick={handleRecusar}
                        disabled={isPendingAceitar}
                        loading={isPendingRecusar}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}

          {usuario?.tipo === "admin" && (
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
      <DialogMudarStatus
        open={dialogOpen}
        onClose={handleCloseDialog}
        pedidoId={pedidoId as string}
      />
    </>
  );
}
