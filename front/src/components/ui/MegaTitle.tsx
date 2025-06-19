import { Typography } from "@mui/material";

interface MegaTitleProps {
  string: string;
}

export default function MegaTitle({ string }: MegaTitleProps) {
  return (
    <Typography color={"secondary"} variant="h4">
      {string}
    </Typography>
  );
}
