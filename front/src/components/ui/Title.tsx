import { Typography } from "@mui/material";

interface TitleProps {
  string: string;
}

export default function Title({ string }: TitleProps) {
  return (
    <Typography color={"primary"} variant="h5">
      {string}
    </Typography>
  );
}
