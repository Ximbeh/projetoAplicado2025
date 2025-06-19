import { Stack } from "@mui/material";
import DualButton from "../ui/DualButton";
import { UseFormReturn } from "react-hook-form";
import MegaTitle from "../ui/MegaTitle";
import InfoDoubleText from "../ui/InfoDoubleText";
import LongButton from "../ui/LongButton";
import InfoIconWithModal from "./IconInfo";

interface Props {
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
  methods: UseFormReturn<any>;
}

export default function PhaseFourNovoPedido({
  onNext,
  onBack,
  onCancel,
  methods,
}: Props) {
  return (
    <>
      <MegaTitle string={"Origem"} />
      <ResumoPedido methods={methods} />
      <DualButton onNext={onNext} onBack={onBack} nextLabel="Concluir" />
      <LongButton label="Cancelar" onClick={onCancel} />
    </>
  );
}

interface ResumoPedidoProps {
  methods: UseFormReturn<any>;
}

function ResumoPedido({ methods }: ResumoPedidoProps) {
  const values = methods.getValues();

  return (
    <Stack spacing={1} width="100%" paddingX={2}>
      <InfoDoubleText title={"Conteúdo:"} info={values.conteudo} />
      <InfoDoubleText title={"Peso:"} info={`${values.pesoPedido} kg`} />
      <InfoDoubleText
        title={"Origem:"}
        info={`${values.logradouroOrigem}, ${values.complementoOrigem}${" "}
        ${values.numeroOrigem}, ${values.cepOrigem}`}
      />
      <InfoDoubleText
        title={"Destino:"}
        info={`${values.logradouroDestino}, ${values.complementoDestino}${" "}
        ${values.numeroDestino}, ${values.cepDestino}`}
      />
      <InfoDoubleText
        title={"Preço final estimado:"}
        info={"R$29,00"}
        bigInfo={true}
        extra={<InfoIconWithModal />}
      />
    </Stack>
  );
}
