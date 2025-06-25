"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LoadingPhase from "@/components/novoPedido/LoadingPhase";
import PhaseFiveNovoPedido from "@/components/novoPedido/phaseFive";
import PhaseFourNovoPedido from "@/components/novoPedido/phaseFour";
import PhaseOneNovoPedido from "@/components/novoPedido/phaseOne";
import PhaseThreeNovoPedido from "@/components/novoPedido/phaseThree";
import PhaseTwoNovoPedido from "@/components/novoPedido/phaseTwo";
import Title from "@/components/ui/Title";
import { Container, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function NovoPedido() {
  const [step, setStep] = useState(1);
  const [loadingError, setLoadingError] = useState(false);
  const router = useRouter();

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

  const onBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const calculatePrice = async () => {
    try {
      setLoadingError(false);
      await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts/1"),
        axios.get("https://jsonplaceholder.typicode.com/posts/2"),
      ]);
      setStep(5);
    } catch (err) {
      console.error("Erro ao calcular:", err);
      setLoadingError(true);
    }
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
                onBack={onBack}
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
              <LoadingPhase onRetry={goToMenu} error={loadingError} />
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
