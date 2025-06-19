import DualButton from "../ui/DualButton";
import LongInput from "../ui/LongInput";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseOneNovoPedido({
  register,
  watch,
  onNext,
  onBack,
}: Props) {
  const conteudo = watch("conteudo");
  const pesoPedido = watch("pesoPedido");

  const isDisabled = !conteudo || !pesoPedido;

  return (
    <>
      <LongInput
        label="Conteúdo do pedido"
        type="text"
        {...register("conteudo")}
      />
      <LongInput
        label="Peso do pedido (kg)"
        type="number"
        {...register("pesoPedido")}
      />
      <DualButton
        onNext={onNext}
        onBack={onBack}
        backLabel="Cancelar"
        disabledNext={isDisabled}
      />
    </>
  );
}
