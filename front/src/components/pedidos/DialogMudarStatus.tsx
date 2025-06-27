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
import { useMudarStatus } from "@/hooks/pedidos/useMudarStatus";

type Props = {
  open: boolean;
  onClose: () => void;
  pedidoId: string;
};

function formatarStatus(status: string): string {
  return status.replace(/([A-Z])/g, (match, p1, offset) =>
    offset === 0 ? p1 : ` ${p1}`
  );
}

export default function DialogMudarStatus({ open, onClose, pedidoId }: Props) {
  const { mutate, isPending } = useMudarStatus();
  const [novoStatus, setNovoStatus] = useState<PedidoStatus | "">("");
  const router = useRouter();

  function handleMudarStatus(pedidoId: string, novoStatus: string) {
    mutate({ pedido_id: pedidoId, status: novoStatus });
    onClose();
    router.refresh();
  }

  const handleConfirmar = () => {
    if (novoStatus === PedidoStatus.Falhou) {
      router.push(`/pedido/${pedidoId}/falhou`);
    } else if (novoStatus === PedidoStatus.Entregue) {
      router.push(`/pedido/${pedidoId}/concluir`);
    } else {
      handleMudarStatus(pedidoId as string, novoStatus as string);
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
            {Object.values(PedidoStatus)
              .filter(
                (status) =>
                  status !== PedidoStatus.Criado &&
                  status !== PedidoStatus.Cancelado
              )
              .map((status) => (
                <MenuItem key={status} value={status}>
                  {formatarStatus(status)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmar}
          disabled={!novoStatus}
          loading={isPending}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
