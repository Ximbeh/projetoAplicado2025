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

export default function PhaseThreeNovoPedido({
  register,
  watch,
  onNext,
  onBack,
}: Props) {
  const cep = watch("cepDestino") || "";
  const logradouro = watch("logradouroDestino") || "";
  const numero = watch("numeroDestino") || "";
  const complemento = watch("complementoDestino") || "";

  const isCepValid = /^\d{5}-?\d{3}$/.test(cep);

  const isDisabled =
    !cep || !logradouro || !numero || !complemento || !isCepValid;

  return (
    <>
      <MegaTitle string={"Destino"} />

      <LongInput
        label="CEP"
        type="text"
        {...register("cepDestino")}
        error={!!cep && !isCepValid}
        helperText={
          !!cep && !isCepValid ? "CEP inválido. Use 00000-000" : undefined
        }
      />

      <LongInput
        label="Logradouro"
        type="text"
        {...register("logradouroDestino")}
      />

      <LongInput label="Número" type="text" {...register("numeroDestino")} />

      <LongInput
        label="Complemento"
        type="text"
        {...register("complementoDestino")}
      />

      <DualButton
        onNext={onNext}
        onBack={onBack}
        nextLabel="Conferir"
        disabledNext={isDisabled}
      />
    </>
  );
}
