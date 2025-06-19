import { TextField, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";

type LongInputProps = TextFieldProps & {
  label: string;
  type: string;
  helperText?: ReactNode;
};

const LongInput = ({ label, type, helperText, ...rest }: LongInputProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{
        width: "80%",
        maxWidth: 300,
      }}
      label={label}
      type={type}
      helperText={helperText}
      {...rest}
    />
  );
};

export default LongInput;
