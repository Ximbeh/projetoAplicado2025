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
  Button,
} from "@mui/material";
import DialogMudarStatus from "@/components/pedidos/DialogMudarStatus";
import { useRecusarPedido } from "@/hooks/pedidos/useRecusarPedido";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useAceitarPedido } from "@/hooks/pedidos/useAceitarPedido";
import { useGetPedidoById } from "@/hooks/pedidos/useGetPedidoById";
import { useCancelarPedido } from "@/hooks/pedidos/useCancelarStatus";

export default function PedidoPage() {
  const router = useRouter();
  const params = useParams();
  const pedidoId = params?.id;
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: pedido,
    isLoading: isLoadingGetPedido,
    isError: isErrorGetPedido,
    error: errorGetPedido,
  } = useGetPedidoById(pedidoId as unknown as number);
  const { mutate: mutateRecusar, isPending: isPendingRecusar } =
    useRecusarPedido();

  const { mutate: mutateAceitar, isPending: isPendingAceitar } =
    useAceitarPedido();

  const { mutate: mutateCancelar, isPending: isPendingCancelar } =
    useCancelarPedido();

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
    mutateCancelar({ pedido_id: pedidoId as string });
  };

  const handleAceitar = () => {
    if (!pedidoId || !usuario?.id) return;
    mutateAceitar({ pedido_id: pedidoId as string, motoboy_id: usuario.id });
  };

  const handleRecusar = () => {
    if (!pedidoId || !usuario?.id) return;
    mutateRecusar({ pedido_id: pedidoId as string, motoboy_id: usuario.id });
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
              info={pedido.preco}
              bigInfo={true}
              extra={<InfoIconWithModal />}
            />
          </Box>

          {usuario?.tipo === "cliente" && (
            <>
              <Button onClick={onBack}>Voltar</Button>

              {pedido.status !== PedidoStatus.Entregue &&
                pedido.status !== PedidoStatus.Cancelado &&
                pedido.status !== PedidoStatus.Falhou && (
                  <LongButton
                    label="Cancelar"
                    onClick={handleCancelar}
                    loading={isPendingCancelar}
                  />
                )}
            </>
          )}

          {usuario?.tipo === "motoboy" && (
            <>
              {pedido.status === PedidoStatus.Entregue ? (
                <LongButton label="Voltar" onClick={onBack} />
              ) : (
                <>
                  {pedido.motoboy_id !== null ? (
                    <>
                      <LongButton
                        label="Voltar"
                        onClick={onBack}
                        color={"secondary"}
                      />
                      {pedido.status !== PedidoStatus.Cancelado &&
                        pedido.status !== PedidoStatus.Falhou && (
                          <LongButton
                            label="Mudar Status"
                            onClick={handleChangeStatus}
                          />
                        )}
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
