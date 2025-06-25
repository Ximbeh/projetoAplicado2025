"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LoadingPhase from "@/components/novoPedido/LoadingPhase";
import PhaseFiveNovoPedido from "@/components/novoPedido/phaseFive";
import PhaseFourNovoPedido from "@/components/novoPedido/phaseFour";
import PhaseOneNovoPedido from "@/components/novoPedido/phaseOne";
import PhaseThreeNovoPedido from "@/components/novoPedido/phaseThree";
import PhaseTwoNovoPedido from "@/components/novoPedido/phaseTwo";
import Title from "@/components/ui/Title";
import { useCalculatePrice } from "@/hooks/pedidos/useCalculatePrice";
import { Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function NovoPedido() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { mutate, isError: isErrorCalculatePrice } = useCalculatePrice();

  const methods = useForm({
    defaultValues: {
      conteudo: "",
      pesoPedido: "",
      cepOrigem: "",
      logradouroOrigem: "",
      numeroOrigem: "",
      complementoOrigem: "",
      cepDestino: "",
      logradouroDestino: "",
      numeroDestino: "",
      complementoDestino: "",
      preco: "",
    },
  });

  const goToMenu = () => {
    router.push("/dashboard/cliente");
  };
  const goToNewPedido = () => {
    router.push("/dashboard/cliente/novoPedido");
  };
  const acompanhar = () => {
    console.log("acompanhar");
  };

  const onNext = async () => {
    if (step === 5) {
      const isValid = await methods.trigger();
      if (!isValid) return;

      const data = methods.getValues();

      try {
        await axios.post("http://localhost:3333/api/login/usuario", data);
        setStep(6); // Sucesso
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };
  const goBack = () => {
    router.back();
  };
  const onBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const calculatePrice = () => {
    const data = methods.getValues();

    mutate(
      {
        origem: {
          cep: data.cepOrigem,
          logradouro: data.logradouroOrigem,
          numero: data.numeroOrigem,
        },
        destino: {
          cep: data.cepDestino,
          logradouro: data.logradouroDestino,
          numero: data.numeroDestino,
        },
        peso: data.pesoPedido,
      },
      {
        onSuccess: (data) => {
          enqueueSnackbar(`Preço calculado com sucesso: R$ ${data.preco}`, {
            variant: "success",
          });
          methods.setValue("preco", data.preco);
          setStep(5);
        },
        onError: () => {
          enqueueSnackbar("Erro ao calcular o preço.", { variant: "error" });
        },
      }
    );
  };

  const handlePhaseThreeNext = () => {
    setStep(4);
    calculatePrice();
  };

  return (
    <>
      <HeaderIcon />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          marginTop: "-100px",
        }}
      >
        <FormProvider {...methods}>
          <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Title string={"Novo Pedido"} />

            {step === 1 && (
              <PhaseOneNovoPedido
                register={methods.register}
                watch={methods.watch}
                onNext={onNext}
                onBack={goBack}
              />
            )}

            {step === 2 && (
              <PhaseTwoNovoPedido
                register={methods.register}
                watch={methods.watch}
                onNext={onNext}
                onBack={onBack}
              />
            )}

            {step === 3 && (
              <PhaseThreeNovoPedido
                register={methods.register}
                watch={methods.watch}
                onNext={handlePhaseThreeNext}
                onBack={onBack}
              />
            )}

            {step === 4 && (
              <LoadingPhase onRetry={goToMenu} error={isErrorCalculatePrice} />
            )}

            {step === 5 && (
              <PhaseFourNovoPedido
                onNext={onNext}
                onBack={onBack}
                onCancel={goToMenu}
                methods={methods}
              />
            )}

            {step === 6 && (
              <PhaseFiveNovoPedido
                onNext={goToNewPedido}
                onBack={goToMenu}
                onMenu={acompanhar}
              />
            )}
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
