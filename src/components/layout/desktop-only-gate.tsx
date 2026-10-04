import type { ReactNode } from "react";
import { DESKTOP_MIN_WIDTH_PX } from "@/lib/layout/desktop-only";

type DesktopOnlyGateProps = {
  children: ReactNode;
};

/**
 * Oculta la aplicación en viewports estrechos (móvil/tablet pequeña).
 * Solo escritorio: ver AGENTS.md y `.cursor/rules/desktop-only.mdc`.
 */
export function DesktopOnlyGate({ children }: DesktopOnlyGateProps) {
  return (
    <>
      <div
        role="alert"
        aria-live="polite"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-paper px-8 text-center md:hidden"
        data-testid="desktop-only-blocker"
      >
        <p className="font-display text-2xl font-bold tracking-tight text-ink">Solo ordenador</p>
        <p className="max-w-md text-base text-ink-muted">
          Eaxy no está disponible en móvil ni en pantallas pequeñas. Abre la web en un ordenador o
          amplía la ventana del navegador (mínimo {DESKTOP_MIN_WIDTH_PX}px de ancho).
        </p>
      </div>
      <div className="hidden min-h-full flex-col md:flex">{children}</div>
    </>
  );
}
