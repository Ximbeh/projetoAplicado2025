import { Stack, Typography } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import LongButton from "@/components/ui/LongButton";

interface PhaseOneProps {
  onNext: () => void;
  onLogin: () => void;
}

export default function PhaseOne({ onNext, onLogin }: PhaseOneProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput label="Nome" type="text" name="nome" />
      <LongInput label="CPF" type="text" name="cpf" />
      <LongInput label="Telefone" type="tel" name="telefone" />

      <LongButton label="Continuar" onClick={onNext} />

      <Typography
        variant="body2"
        sx={{ color: "primary.main", cursor: "pointer" }}
        onClick={onLogin}
      >
        Já possui uma conta? Faça o login
      </Typography>
    </Stack>
  );
}
