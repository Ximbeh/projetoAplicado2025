"use client";

import { Stack } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import DualButton from "@/components/ui/DualButton";

interface PhaseFourProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseFour({ onNext, onBack }: PhaseFourProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput label="E-mail" type="email" name="email" />
      <LongInput label="Senha" type="password" name="senha" />
      <LongInput label="Confirmar senha" type="password" name="senha" />
      <DualButton onNext={onNext} onBack={onBack} />
    </Stack>
  );
}
