import { Stack, Typography } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import LongButton from "@/components/ui/LongButton";
import { useFormContext } from "react-hook-form";

interface PhaseOneProps {
  onNext: () => void;
  onLogin: () => void;
}

export default function PhaseOne({ onNext, onLogin }: PhaseOneProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const nome = watch("nome") || "";
  const cpf = watch("cpf") || "";
  const telefone = watch("telefone") || "";

  const isCPFValid = cpf.replace(/\D/g, "").length === 11;
  const isTelefoneValid = /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(telefone);
  const isNomeValid = nome.trim().length > 0;

  const isFormValid = isNomeValid && isCPFValid && isTelefoneValid;

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput
        label="Nome"
        type="text"
        {...register("nome", { required: "Nome é obrigatório" })}
        error={!!errors.nome}
        helperText={errors.nome?.message as string}
      />

      <LongInput
        label="CPF"
        type="text"
        {...register("cpf", {
          required: "CPF é obrigatório",
          validate: () => isCPFValid || "CPF inválido. Use 000.000.000-00",
        })}
        error={!!cpf && !isCPFValid}
        helperText={
          !!cpf && !isCPFValid ? "CPF inválido. Use 000.000.000-00" : undefined
        }
      />

      <LongInput
        label="Telefone"
        type="tel"
        {...register("telefone", {
          required: "Telefone é obrigatório",
          validate: () =>
            isTelefoneValid || "Telefone inválido. Use (00) 00000-0000",
        })}
        error={!!telefone && !isTelefoneValid}
        helperText={
          !!telefone && !isTelefoneValid
            ? "Telefone inválido. Use (00)00000-0000"
            : undefined
        }
      />

      <LongButton label="Continuar" onClick={onNext} disabled={!isFormValid} />

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
