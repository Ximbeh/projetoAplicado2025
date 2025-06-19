import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface InfoDoubleTextProps {
  title: string;
  info: string;
  bigInfo?: boolean;
  extra?: ReactNode;
}

export default function InfoDoubleText({
  title,
  info,
  bigInfo,
  extra,
}: InfoDoubleTextProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="primary" sx={{ mb: 0 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          color={bigInfo ? "secondary" : theme.palette.grey[700]}
          fontSize={bigInfo ? 24 : 12}
          sx={{ mt: 0 }}
        >
          {info}
        </Typography>
        {extra}
      </Box>
    </Box>
  );
}
