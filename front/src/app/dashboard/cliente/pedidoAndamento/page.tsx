"use client";

import { useState } from "react";
import HeaderIcon from "@/components/HeaderIcon";
import Title from "@/components/ui/Title";
import { Container, Stack, Typography, CircularProgress } from "@mui/material";
import PedidoList from "@/components/pedidos/PedidoList";
import PaginationControls from "@/components/PaginationControlls";
import { useGetPedidosAndamento } from "@/hooks/pedidos/useGetPedidosAndamento";

const ITEMS_PER_PAGE = 3;

export default function PedidoAndamento() {
  const { data: pedidos, isLoading, isError, error } = useGetPedidosAndamento();

  const pedidosList = pedidos ?? [];

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(pedidosList.length / ITEMS_PER_PAGE);

  const pedidosAtuais = pedidosList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  console.log(pedidos);

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
          <Title string={"Pedido em andamento"} />

          {isLoading && <CircularProgress />}

          {isError && (
            <Typography color="error">
              Erro ao carregar pedidos:{" "}
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </Typography>
          )}

          {!isLoading && pedidosList.length === 0 && (
            <Typography>Nenhum pedido em andamento.</Typography>
          )}

          {pedidosAtuais.length > 0 && (
            <PedidoList pedidos={pedidosAtuais} statusRemover={true} />
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
