"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import logo from "../../assets/icon/Logo.png";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Image src={logo} alt="Logo" />
    </Box>
  );
}
