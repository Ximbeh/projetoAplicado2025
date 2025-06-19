import { Box } from "@mui/material";
import logo from "../assets/icon/Logo.png";
import Image from "next/image";

export default function HeaderIcon() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        height: "100px",
      }}
    >
      <Image src={logo} alt="Logo" width={100} />
    </Box>
  );
}
