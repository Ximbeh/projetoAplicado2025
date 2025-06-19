import { Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Whatsapp() {
  return (
    <Box
      position={"absolute"}
      bottom={0}
      display={"flex"}
      gap={1}
      margin={2}
      right={0}
      alignItems={"center"}
    >
      <Typography
        textAlign={"center"}
        color="primary"
        fontWeight={400}
        fontSize={10}
      >
        Esta com dúvida?<br></br>Fale conosco!
      </Typography>
      <WhatsAppIcon color="primary" />
    </Box>
  );
}
