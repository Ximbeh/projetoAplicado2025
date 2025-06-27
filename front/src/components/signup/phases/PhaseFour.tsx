"use client";

import { Stack } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import DualButton from "@/components/ui/DualButton";
import { useFormContext } from "react-hook-form";

interface PhaseFourProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseFour({ onNext, onBack }: PhaseFourProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const email = watch("email") || "";
  const senha = watch("senha") || "";
  const confirmarSenha = watch("confirmarSenha") || "";

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isSenhaValida = senha.trim().length > 0;
  const isConfirmacaoValida = confirmarSenha.trim().length > 0;
  const senhasIguais = senha === confirmarSenha;

  const isFormValid =
    isEmailValid && isSenhaValida && isConfirmacaoValida && senhasIguais;

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput
        label="E-mail"
        type="email"
        {...register("email", {
          required: "E-mail é obrigatório",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "E-mail inválido",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <LongInput
        label="Senha"
        type="password"
        {...register("senha", {
          required: "Senha é obrigatória",
        })}
        error={!!errors.senha}
        helperText={errors.senha?.message as string}
      />

      <LongInput
        label="Confirmar senha"
        type="password"
        {...register("confirmarSenha", {
          required: "Confirmação de senha é obrigatória",
          validate: (value) => value === senha || "As senhas não coincidem",
        })}
        error={!!errors.confirmarSenha}
        helperText={errors.confirmarSenha?.message as string}
      />

      <DualButton onNext={onNext} onBack={onBack} disabledNext={!isFormValid} />
    </Stack>
  );
}
