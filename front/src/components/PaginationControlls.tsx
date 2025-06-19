import { Stack, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <Stack direction="row" spacing={2} marginTop={2} alignItems="center">
      <IconButton
        onClick={onPrev}
        disabled={page === 1}
        sx={{ width: 40, height: 40, border: "1px solid", borderRadius: 1 }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Typography>{page}</Typography>

      <IconButton
        onClick={onNext}
        disabled={page === totalPages}
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
          borderRadius: 1,
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
}
