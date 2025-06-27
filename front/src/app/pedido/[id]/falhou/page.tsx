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
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { PedidoStatus } from "@/types/pedidos";
import { enqueueSnackbar } from "notistack";
import { useConcluirPedido } from "@/hooks/pedidos/useConcluirPedido";

export default function FalhouPedido() {
  const { mutate, isPending } = useConcluirPedido();
  const router = useRouter();
  const params = useParams();
  const pedidoId = params?.id;

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

    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    try {
      const imagemBase64 = await toBase64(imagem);
      mutate({
        pedido_id: pedidoId as string,
        imagemBase64,
        observacao,
        status: PedidoStatus.Falhou as string,
      });
    } catch (error) {
      enqueueSnackbar("Erro ao converter imagem.", { variant: "error" });
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
          <Title string={"Tentativa falha"} />

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
            {imagem ? imagem.name : "Clique ou arraste para enviar evidências"}
            <input
              id="upload-imagem"
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              hidden
            />
          </Box>

          <TextField
            label="Motivo & Observações"
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
