import { CircularProgress, Stack, Typography, Button } from "@mui/material";

interface Props {
  onRetry: () => void;
  error: boolean;
}

export default function LoadingPhase({ onRetry, error }: Props) {
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center">
      {error ? (
        <>
          <Typography variant="h6" color="error">
            Ocorreu um erro ao calcular.
          </Typography>
          <Button variant="outlined" onClick={onRetry}>
            Menu
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Calculando informações...</Typography>
          <CircularProgress />
        </>
      )}
    </Stack>
  );
}
