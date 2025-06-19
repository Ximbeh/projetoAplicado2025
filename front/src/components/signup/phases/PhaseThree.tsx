"use client";

import { Stack, Typography } from "@mui/material";
import LongInput from "@/components/ui/LongInput";
import DualButton from "@/components/ui/DualButton";

interface PhaseThreeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseThree({ onNext, onBack }: PhaseThreeProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <LongInput label="Tipo de veículo" type="text" />
      <LongInput label="Placa do veículo" type="text" />
      <LongInput label="Chassi do veículo" type="text" />
      <LongInput label="CNH" type="text" />
      <DualButton onNext={onNext} onBack={onBack} />
    </Stack>
  );
}
