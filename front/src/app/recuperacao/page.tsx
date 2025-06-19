"use client";

import { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import LongInput from "@/components/ui/LongInput";
import LongButton from "@/components/ui/LongButton";

export default function RecuperacaoPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      senha: "",
      novaSenha: "",
    },
  });

  const next = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const goToLogin = () => router.push("/");

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

          {step === 1 && <FaseEmail onNext={next} />}
          {step === 2 && <FaseNovaSenha onNext={next} />}
          {step === 3 && <FaseFinal onLogin={goToLogin} />}
        </Stack>
      </Container>
    </FormProvider>
  );
}

interface FaseProps {
  onNext: () => void;
}

function FaseEmail({ onNext }: FaseProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger("email");
    if (valid) {
      onNext();
    }
  };

  return (
    <Stack spacing={2} paddingX={2} alignItems="center" width="100%">
      <Typography color={"primary"} variant="h5">
        Recuperar senha
      </Typography>
      <Typography variant="body2" fontSize={12} textAlign="center">
        Escreva abaixo seu e-mail para enviarmos uma confirmação de autenticação
      </Typography>

      <LongInput
        label="E-mail"
        type="email"
        {...register("email", {
          required: "O e-mail é obrigatório.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de e-mail inválido.",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message as string}
      />

      <LongButton label="Continuar" onClick={handleNext} />
    </Stack>
  );
}

function FaseNovaSenha({ onNext }: FaseProps) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext();

  const handleNext = async () => {
    const valid = await trigger(["senha", "novaSenha"]);
    const values = getValues();

    if (!valid) return;

    if (values.senha !== values.novaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    onNext();
  };

  return (
    <Stack spacing={2} paddingX={2} alignItems="center" width="100%">
      <Typography color={"primary"} variant="h5">
        Recuperar senha
      </Typography>
      <Typography variant="body2" fontSize={12} textAlign="center">
        Escolha sua nova senha
      </Typography>

      <LongInput
        label="Nova Senha"
        type="password"
        {...register("senha", { required: "A senha é obrigatória." })}
        error={!!errors.senha}
        helperText={errors.senha?.message as string}
      />

      <LongInput
        label="Repetir Nova Senha"
        type="password"
        {...register("novaSenha", { required: "Repita a nova senha." })}
        error={!!errors.novaSenha}
        helperText={errors.novaSenha?.message as string}
      />

      <LongButton label="Continuar" onClick={handleNext} />
    </Stack>
  );
}

interface FaseFinalProps {
  onLogin: () => void;
}

function FaseFinal({ onLogin }: FaseFinalProps) {
  const { getValues } = useFormContext();
  const email = getValues("email");

  return (
    <Stack spacing={2} paddingX={2} alignItems="center" width="100%">
      <Typography variant="h6" fontSize={12} textAlign="center">
        Um e-mail foi enviado para <strong>{email}</strong> para finalizar a
        mudança de senha
      </Typography>
      <LongButton label="Finalizar" onClick={onLogin} />
    </Stack>
  );
}
