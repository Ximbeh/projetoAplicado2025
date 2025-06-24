import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";

type LongInputProps = TextFieldProps & {
  label: string;
  type: string;
  name: string;
  helperText?: ReactNode;
};

const LongInput = ({
  label,
  type,
  name,
  helperText,
  ...rest
}: LongInputProps) => {
  const { register } = useFormContext();

  return (
    <TextField
      {...register(name)}
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
