import { Stack } from "@mui/material";
import DualButton from "../ui/DualButton";
import { UseFormReturn } from "react-hook-form";
import MegaTitle from "../ui/MegaTitle";
import InfoDoubleText from "../ui/InfoDoubleText";
import LongButton from "../ui/LongButton";

interface Props {
  onNext: () => void;
  onBack: () => void;
  onMenu: () => void;
}

export default function PhaseFiveNovoPedido({ onNext, onBack, onMenu }: Props) {
  return (
    <>
      <MegaTitle string={"Entregue"} />
      <Stack paddingX={4}>
        <InfoDoubleText
          title={"Seu pedido foi enviado!"}
          info={
            "Um entregador irá aceitar, receber e enviar seu pedido em breve, fique atento as notificações e acompanhe o progresso."
          }
        />
      </Stack>

      <DualButton
        onNext={onNext}
        onBack={onBack}
        backLabel="Menu"
        nextLabel="Novo Pedido"
      />
      {/* to-do: Botao acompanhar */}
      {/* <LongButton label="Acompanhar" onClick={onMenu} /> */}
    </>
  );
}
