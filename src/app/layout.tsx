import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AssineCar",
  description:
    "Carro por assinatura com seguro, manutenção, documentação e assistência inclusos.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
