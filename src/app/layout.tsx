import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simulado AWS Cloud Practitioner",
  description: "Estude para o exame AWS Cloud Practitioner (CLF-C02) com este simulado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
