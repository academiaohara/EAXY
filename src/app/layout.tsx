import type { Metadata } from "next";
import { Caveat, IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { DesktopOnlyGate } from "@/components/layout/desktop-only-gate";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Eaxy — Matemáticas adaptativas",
    template: "%s — Eaxy",
  },
  description:
    "Plataforma de aprendizaje adaptativo de matemáticas para ESO. Practica a tu ritmo o gestiona aulas con seguimiento del progreso.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${inter.variable} ${ibmPlexMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <DesktopOnlyGate>{children}</DesktopOnlyGate>
      </body>
    </html>
  );
}
