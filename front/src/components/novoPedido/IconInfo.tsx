import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Link,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function InfoIconWithModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="small" onClick={handleOpen} color="primary">
        <InfoIcon fontSize="small" sx={{ fontSize: 15 }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Informação
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography color="primary" variant="h6" gutterBottom>
            Como calculamos o preço?
          </Typography>

          <Typography color="text.secondary" fontSize={12} paragraph>
            O valor do frete é calculado pela soma do peso, distância e tempo.
          </Typography>

          <Typography color="grey.900" paragraph sx={{ mb: 0 }}>
            Peso:
          </Typography>
          <Typography color="text.secondary" fontSize={12}>
            Menos de 1kg: R$3,00
            <br />
            Entre de 1kg e 3kg: R$5,00
            <br />
            Entre de 3kg e 8kg: R$9,00
            <br />
            Entre de 8kg e 12kg: R$12,00
            <br />
            Não transportamos acima de 12kg.
          </Typography>

          <Typography color="grey.900" paragraph sx={{ mt: 2, mb: 0 }}>
            Distância:
          </Typography>
          <Typography color="text.secondary" fontSize={12}>
            1 Km = 50 centavos
          </Typography>

          <Typography color="grey.900" paragraph sx={{ mt: 2, mb: 0 }}>
            Tempo:
          </Typography>
          <Typography color="text.secondary" fontSize={12}>
            Utilizamos o Google Maps para calcular um tempo provável baseado nas
            rotas e horário do dia, no entanto, o tempo final pode ser adiantado
            ou atrasado, mudando o preço final. Confira nossa&nbsp;
            <Link href="/politica-de-entrega" target="_blank" rel="noopener">
              política de entrega
            </Link>
            .
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
