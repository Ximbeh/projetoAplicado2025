import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Providers from "./providers/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Seu App",
  description: "Descrição do seu app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
        <style>
          {`
            nextjs-portal {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `}
        </style>
      </body>
    </html>
  );
}
