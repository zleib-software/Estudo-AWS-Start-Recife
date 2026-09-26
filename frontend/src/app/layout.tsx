import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awsstartrecife.vercel.app"),
  title: "Simulado AWS",
  description:
    "Simulador preparatório completo para a certificação AWS Certified Cloud Practitioner (CLF-C02). Pratique com mais de 150 questões comentadas, cronômetro de exame oficial e acompanhamento de desempenho por domínio.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "Simulado AWS",
    description:
      "Simulador preparatório completo para a certificação AWS Certified Cloud Practitioner (CLF-C02) com questões reais comentadas e métricas por domínio.",
    url: "https://awsstartrecife.vercel.app",
    siteName: "Simulado AWS",
    images: [
      {
        url: "/og-image.png",
        width: 635,
        height: 626,
        alt: "Simulado AWS - Formação AWS",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Simulado AWS",
    description:
      "Simulador preparatório completo para a certificação AWS Certified Cloud Practitioner (CLF-C02).",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
