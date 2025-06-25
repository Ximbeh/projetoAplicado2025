"use client";

import { ReactNode, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "@/theme/theme";
//import { makeServer } from "@/mirage";

let server: any = null;

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
   /* if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      !server
    ) {
      server = makeServer();
    } */
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
