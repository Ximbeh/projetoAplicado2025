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
  onNextLoading?: boolean;
}

export default function PhaseFourNovoPedido({
  onNext,
  onBack,
  onCancel,
  methods,
  onNextLoading,
}: Props) {
  return (
    <>
      <MegaTitle string={"Origem"} />
      <ResumoPedido methods={methods} />
      <DualButton
        onNext={onNext}
        onBack={onBack}
        nextLabel="Concluir"
        loadingNext={onNextLoading}
      />
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
        info={`R$${values.preco}`}
        bigInfo={true}
        extra={<InfoIconWithModal />}
      />
    </Stack>
  );
}
