"use client";

import { Stack, Typography } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import DualButton from "@/components/ui/DualButton";

interface PhaseFourProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseFour({ onNext, onBack }: PhaseFourProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput label="E-mail" type="email" />
      <LongInput label="Senha" type="password" />
      <LongInput label="Confirmar senha" type="password" />
      <DualButton onNext={onNext} onBack={onBack} />
    </Stack>
  );
}
