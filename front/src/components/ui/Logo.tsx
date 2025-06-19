import { Box } from "@mui/material";
import logo from "../../assets/icon/Logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={logo} alt="Logo" />
    </Box>
  );
}
