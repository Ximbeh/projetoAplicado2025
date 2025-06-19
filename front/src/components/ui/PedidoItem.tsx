import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Pedido } from "../../types/pedidos";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface PedidoProps {
  pedido: Pedido;
}

export default function PedidoItem({ pedido }: PedidoProps) {
  const router = useRouter();
  const handleViewClick = () => {
    router.push(`/pedido/${pedido.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 0,
        py: 1,
        px: 2,
        textTransform: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography color="grey.600" fontSize={8}>
          {dayjs(pedido.data_criacao).format("DD/MM/YYYY HH:mm")}
        </Typography>
        <Typography fontSize={12}>{pedido.conteudo}</Typography>
        <Typography color="grey.600" fontSize={8}>
          {pedido.status}
        </Typography>
      </Box>

      <IconButton
        onClick={handleViewClick}
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: "5px",
          padding: "4px",
          color: "primary.main",
        }}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
