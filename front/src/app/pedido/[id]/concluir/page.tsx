"use client";

import HeaderIcon from "@/components/HeaderIcon";
import DualButton from "@/components/ui/DualButton";
import Title from "@/components/ui/Title";
import {
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { PedidoStatus } from "@/types/pedidos";
import { enqueueSnackbar } from "notistack";

export default function ConcluirPedido() {
  const router = useRouter();

  const [imagem, setImagem] = useState<File | null>(null);
  const [observacao, setObservacao] = useState("");

  const onBack = () => {
    router.back();
  };

  const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagem(file);
    }
  };

  const handleConcluir = async () => {
    if (!imagem) {
      enqueueSnackbar("Por favor, envie uma imagem do local.", {
        variant: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imagem);
    formData.append("observacao", observacao);
    formData.append("status", PedidoStatus.Entregue);

    try {
      const response = await fetch("/api/pedidos/concluirPedido", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        enqueueSnackbar("Pedido concluído com sucesso!", {
          variant: "success",
        });
        router.push("/dashboard/motoboy");
      } else {
        enqueueSnackbar("Erro ao concluir pedido.", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Erro ao enviar dados.", {
        variant: "error",
      });
    }
  };

  const isValid = imagem !== null && observacao.trim().length > 0;

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
          <Title string={"Concluir pedido"} />

          <Box
            component="label"
            htmlFor="upload-imagem"
            width={"100%"}
            sx={{
              border: "2px dashed gray",
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            {imagem
              ? imagem.name
              : "Clique ou arraste para enviar imagem do local"}
            <input
              id="upload-imagem"
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              hidden
            />
          </Box>

          <TextField
            label="Observações"
            multiline
            rows={3}
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            fullWidth
            color="primary"
          />

          <DualButton
            onBack={onBack}
            onNext={handleConcluir}
            nextLabel="Concluir"
            disabledNext={!isValid}
          />
        </Stack>
      </Container>
    </>
  );
}
