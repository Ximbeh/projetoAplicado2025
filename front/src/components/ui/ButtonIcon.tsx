"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { ReactNode } from "react";

interface ButtonIconProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function ButtonIcon({ label, icon, onClick }: ButtonIconProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={"124px"}
    >
      <IconButton
        color="primary"
        sx={{
          borderRadius: "5px",
          border: "1px solid",
          padding: "24px",
          width: "auto",
          height: "auto",
        }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
      <Typography
        variant="body2"
        textAlign="center"
        color="primary"
        sx={{ marginTop: "4px" }}
      >
        {label}
      </Typography>
    </Box>
  );
}
