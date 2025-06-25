"use client";

import { Box } from "@mui/material";
import logo from "../assets/icon/Logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderIcon() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        height: "100px",
        cursor: "pointer",
      }}
      onClick={goBack}
    >
      <Image src={logo} alt="Logo" width={100} />
    </Box>
  );
}
