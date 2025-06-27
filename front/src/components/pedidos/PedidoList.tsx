import { Stack } from "@mui/material";
import PedidoItem from "@/components/ui/PedidoItem";
import { Pedido, PedidoStatus } from "@/types/pedidos";

interface PedidoListProps {
  pedidos: Pedido[];
  statusRemover: boolean;
  statusFiltrar?: PedidoStatus;
}

export default function PedidoList({ pedidos }: PedidoListProps) {
  console.log(pedidos);

  return (
    <Stack width="100%" spacing={1}>
      {pedidos.map((pedido) => (
        <PedidoItem key={pedido.id_pedido} pedido={pedido} />
      ))}
    </Stack>
  );
}
