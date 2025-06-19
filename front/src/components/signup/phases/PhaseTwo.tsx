"use client";

import { Box, Stack } from "@mui/material";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import DualButton from "@/components/ui/DualButton";
import LongButton from "@/components/ui/LongButton";

interface PhaseTwoProps {
  onEntregador: () => void;
  onCliente: () => void;
  onBack: () => void;
}

export default function PhaseTwo({
  onEntregador,
  onCliente,
  onBack,
}: PhaseTwoProps) {
  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <Box display="flex" flexDirection="row" gap={2}>
        <ButtonIcon
          label="Entregador"
          icon={<SportsMotorsportsIcon fontSize="large" />}
          onClick={onEntregador}
        />

        <ButtonIcon
          label="Cliente"
          icon={<PersonAddIcon fontSize="large" />}
          onClick={onCliente}
        />
      </Box>

      <LongButton onClick={onBack} label={"Voltar"} />
    </Stack>
  );
}
