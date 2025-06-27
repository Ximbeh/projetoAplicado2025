"use client";

import { useState } from "react";
import HeaderIcon from "@/components/HeaderIcon";
import Title from "@/components/ui/Title";
import { useGetPedidos } from "@/hooks/pedidos/useGetPedidos";
import { Container, Stack, Typography, CircularProgress } from "@mui/material";
import PedidoList from "@/components/pedidos/PedidoList";
import PaginationControls from "@/components/PaginationControlls";
import { PedidoStatus } from "@/types/pedidos";
import { useGetPedidosAndamentoMotoboy } from "@/hooks/pedidos/useGetPedidosAtivosMotoboy";

const ITEMS_PER_PAGE = 3;

export default function PedidosAtivos() {
  const {
    data: pedidos,
    isLoading,
    isError,
    error,
  } = useGetPedidosAndamentoMotoboy();

  const pedidosList = pedidos ?? [];

  const usuarioLogado =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuarioLogado") || "null")
      : null;

  const idUsuario = Number(usuarioLogado?.id);

  const pedidosFiltrados = pedidosList.filter((pedido) => {
    const pedidoUsuario = pedido.motoboy_id == idUsuario;
    const pedidoNaoTerminado = pedido.status !== PedidoStatus.Entregue;

    return pedidoUsuario && pedidoNaoTerminado;
  });
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(pedidosFiltrados.length / ITEMS_PER_PAGE);

  const pedidosAtuais = pedidosFiltrados.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));

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
          <Title string={"Pedidos ativos"} />

          {isLoading && <CircularProgress />}

          {isError && (
            <Typography color="error">
              Erro ao carregar pedidos:{" "}
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </Typography>
          )}

          {!isLoading && pedidosFiltrados.length === 0 && (
            <Typography>Nenhum pedido ativo.</Typography>
          )}

          {pedidosAtuais.length > 0 && (
            <PedidoList
              pedidos={pedidosAtuais}
              statusRemover={true}
              statusFiltrar={PedidoStatus.Entregue}
            />
          )}

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </Stack>
      </Container>
    </>
  );
}
