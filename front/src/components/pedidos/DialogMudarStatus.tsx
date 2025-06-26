"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { PedidoStatus } from "@/types/pedidos";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

type Props = {
  open: boolean;
  onClose: () => void;
  pedidoId: string;
};

async function mudarStatus(pedido_id: string, status: PedidoStatus) {
  const res = await api.put("/pedidos/motoboy/status", {
    pedido_id,
    status,
  });

  if (!res.data.success) {
    throw new Error(res.data.message || "Erro ao atualizar status");
  }

  return res.data;
}

function formatarStatus(status: string): string {
  return status.replace(/([A-Z])/g, (match, p1, offset) =>
    offset === 0 ? p1 : ` ${p1}`
  );
}

export default function DialogMudarStatus({ open, onClose, pedidoId }: Props) {
  const [novoStatus, setNovoStatus] = useState<PedidoStatus | "">("");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => mudarStatus(pedidoId, novoStatus as PedidoStatus),
    onSuccess: () => {
      enqueueSnackbar("Status atualizado com sucesso!", { variant: "success" });
      onClose();
      router.refresh(); // atualiza a página se necessário
    },
    onError: (error: Error) => {
      enqueueSnackbar("Erro: " + error.message, { variant: "error" });
    },
  });

  const handleConfirmar = () => {
    if (novoStatus === PedidoStatus.Falhou) {
      router.push(`/pedido/${pedidoId}/falhou`);
    } else if (novoStatus === PedidoStatus.Concluido) {
      router.push(`/pedido/${pedidoId}/concluir`);
    } else {
      mutation.mutate();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle color="primary">Qual o novo status?</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Novo status</InputLabel>
          <Select
            value={novoStatus}
            label="Novo status"
            onChange={(e) => setNovoStatus(e.target.value as PedidoStatus)}
          >
            {Object.values(PedidoStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {formatarStatus(status)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirmar} disabled={!novoStatus}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
