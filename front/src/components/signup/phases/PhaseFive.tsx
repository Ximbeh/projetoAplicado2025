"use client";

import { Stack } from "@mui/material";
import DualButton from "@/components/ui/DualButton";

interface PhaseFiveProps {
  onBack: () => void;
}

export default function PhaseFive({ onBack }: PhaseFiveProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <DualButton onBack={onBack} />
    </Stack>
  );
}
