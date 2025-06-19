import { Typography } from "@mui/material";
import DualButton from "../ui/DualButton";
import LongInput from "../ui/LongInput";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import MegaTitle from "../ui/MegaTitle";

interface Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  onNext: () => void;
  onBack: () => void;
}

export default function PhaseTwoNovoPedido({
  register,
  watch,
  onNext,
  onBack,
}: Props) {
  const cep = watch("cepOrigem") || "";
  const logradouro = watch("logradouroOrigem") || "";
  const numero = watch("numeroOrigem") || "";
  const complemento = watch("complementoOrigem") || "";

  const isCepValid = /^\d{5}-?\d{3}$/.test(cep);

  const isDisabled =
    !cep || !logradouro || !numero || !complemento || !isCepValid;

  return (
    <>
      <MegaTitle string={"Origem"} />

      <LongInput
        label="CEP"
        type="text"
        {...register("cepOrigem")}
        error={!!cep && !isCepValid}
        helperText={
          !!cep && !isCepValid ? "CEP inválido. Use 00000-000" : undefined
        }
      />

      <LongInput
        label="Logradouro"
        type="text"
        {...register("logradouroOrigem")}
      />
      <LongInput label="Número" type="text" {...register("numeroOrigem")} />
      <LongInput
        label="Complemento"
        type="text"
        {...register("complementoOrigem")}
      />

      <DualButton onNext={onNext} onBack={onBack} disabledNext={isDisabled} />
    </>
  );
}
