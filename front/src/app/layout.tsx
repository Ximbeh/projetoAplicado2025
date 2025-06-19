// src/app/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { makeServer } from "@/mirage/server";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { SnackbarProvider } from "notistack";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let server: any = null;
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      !server
    ) {
      server = makeServer();
    }
  }, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
