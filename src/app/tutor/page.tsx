import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { TutorShowcase } from "@/components/tutor/tutor-showcase";

export const metadata: Metadata = {
  title: "El tutor",
  description: "Estados y animaciones del tutor de Eaxy.",
};

export default function TutorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <header className="mb-10 space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            El tutor
          </h1>
          <p className="max-w-2xl text-ink-muted">
            Acompaña al estudiante durante las lecciones: reacciona a cada
            respuesta, sigue el puntero con la mirada y parpadea mientras
            espera.
          </p>
        </header>

        <TutorShowcase />
      </main>
    </div>
  );
}
