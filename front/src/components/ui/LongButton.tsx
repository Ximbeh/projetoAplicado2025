"use client";

import { Button, ButtonProps } from "@mui/material";

type LongButtonProps = {
  label: string;
  onClick?: () => void;
} & ButtonProps;

export default function LongButton({
  label,
  onClick,
  ...rest
}: LongButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        width: "80%",
        maxWidth: 300,
      }}
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  );
}
