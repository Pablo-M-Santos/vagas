import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vagas-Hub — vagas de TI júnior e estágio sem caça manual",
    template: "%s · Vagas-Hub",
  },
  description:
    "Coletor automático de vagas de TI para nível júnior e estágio: filtramos seniores, consultorias e spam, e entregamos só o que faz sentido para você.",
  openGraph: {
    title: "Vagas-Hub",
    description:
      "Vagas de TI júnior e estágio, filtradas automaticamente e atualizadas a cada 2 horas.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
