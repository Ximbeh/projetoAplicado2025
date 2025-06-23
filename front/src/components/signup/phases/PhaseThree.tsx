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
      <LongInput label="Tipo de veículo" type="text" name="tipoVeiculo" />
      <LongInput label="Placa do veículo" type="text" name="placa" />
      <LongInput label="Chassi do veículo" type="text" name="chassi" />
      <LongInput label="CNH" type="text" name="cnh" />
      <DualButton onNext={onNext} onBack={onBack} />
    </Stack>
  );
}
