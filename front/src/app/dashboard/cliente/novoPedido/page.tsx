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
import { useCreatePedido } from "@/hooks/pedidos/useCreatePedido";
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
  const { mutate: createPedido, isPending: isLoadingCreatePedido } =
    useCreatePedido();

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
    methods.reset();
    setStep(1);
  };

  const acompanhar = () => {
    console.log("acompanhar");
  };

  const usuarioLogado =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuarioLogado") || "null")
      : null;

  const idUsuario = usuarioLogado?.id;

  const onNext = async () => {
    if (step === 5) {
      const isValid = await methods.trigger();
      if (!isValid) return;

      const data = methods.getValues();

      createPedido(
        {
          id_usuario: idUsuario,
          conteudo: data.conteudo,
          peso: parseFloat(data.pesoPedido),
          cep_origem: data.cepOrigem,
          logradouro_origem: data.logradouroOrigem,
          numero_origem: data.numeroOrigem,
          complemento_origem: data.complementoOrigem,
          cep_destino: data.cepDestino,
          logradouro_destino: data.logradouroDestino,
          numero_destino: data.numeroDestino,
          complemento_destino: data.complementoDestino,
          preco: Number(data.preco),
        },
        {
          onSuccess: () => {
            setStep(6);
          },
        }
      );
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
          enqueueSnackbar(
            `Preço calculado com sucesso: R$ ${data.preco_estimado}`,
            {
              variant: "success",
            }
          );
          methods.setValue("preco", data.preco_estimado);
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
                onNextLoading={isLoadingCreatePedido}
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
