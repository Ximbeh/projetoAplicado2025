import { UseFormRegister, UseFormWatch, useFormContext } from "react-hook-form";
import DualButton from "../ui/DualButton";
import LongInput from "../ui/LongInput";

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
  const {
    formState: { errors },
  } = useFormContext();

  const conteudo = watch("conteudo");
  const pesoPedido = watch("pesoPedido");

  const pesoInvalid = pesoPedido > 12 || pesoPedido <= 0;

  const isDisabled = !conteudo || !pesoPedido || pesoInvalid;

  return (
    <>
      <LongInput
        label="Conteúdo do pedido"
        type="text"
        {...register("conteudo", { required: "Conteúdo é obrigatório" })}
        error={!!errors.conteudo}
        helperText={errors.conteudo?.message as string | undefined}
      />
      <LongInput
        label="Peso do pedido (kg)"
        type="number"
        {...register("pesoPedido")}
        error={!!pesoPedido && pesoInvalid}
        helperText={
          !!pesoPedido && pesoInvalid
            ? "O pedido deve ser mais pesado que 0kg e mais leve que 12kg"
            : undefined
        }
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
