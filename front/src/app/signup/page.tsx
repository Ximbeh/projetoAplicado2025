"use client";

import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import PhaseOne from "../../components/signup/phases/PhaseOne";
import PhaseThree from "../../components/signup/phases/PhaseThree";
import PhaseFour from "../../components/signup/phases/PhaseFour";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import LongButton from "@/components/ui/LongButton";
import PhaseTwo from "../../components/signup/phases/PhaseTwo";
import { usePostUsuario } from "@/hooks/pedidos/usuarios/useGetUsuarios";
import { Usuario } from "@/types/usuario";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const mutation = usePostUsuario();

  const methods = useForm<Usuario>({
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      tipoVeiculo: "",
      placa: "",
      chassi: "",
      cnh: "",
      email: "",
      senha: "",
      tipo: "",
    },
  });

  const next = async () => {
    if (step === 4) {
      const isValid = await methods.trigger();
      if (!isValid) return;
      const data = methods.getValues();

      try {
        await mutation.mutateAsync(data);
        setStep(5);
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
      }
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 1));
  const goToLogin = () => router.push("/login");

  return (
    <FormProvider {...methods}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Stack spacing={4} alignItems="center" width="100%">
          <Logo />

          {step === 1 && <PhaseOne onNext={next} onLogin={goToLogin} />}

          {step === 2 && (
            <PhaseTwo
              onEntregador={() => setStep(3)}
              onCliente={() => setStep(4)}
              onBack={back}
            />
          )}

          {step === 3 && <PhaseThree onNext={next} onBack={back} />}

          {step === 4 && <PhaseFour onNext={next} onBack={back} />}

          {step === 5 && (
            <Stack spacing={2} alignItems="center" width="100%">
              <Typography variant="h6">
                Cadastro realizado com sucesso!
              </Typography>
              <LongButton label={"Finalizar"} />
            </Stack>
          )}
        </Stack>
      </Container>
    </FormProvider>
  );
}
