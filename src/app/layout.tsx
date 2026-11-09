import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { TRPCProvider } from "@/trpc/client";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "EmpresTI",
  description: "Empréstimo interno de equipamentos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={openSans.variable}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
