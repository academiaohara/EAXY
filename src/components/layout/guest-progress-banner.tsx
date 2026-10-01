import Link from "next/link";
import { CloudOffIcon } from "lucide-react";

export function GuestProgressBanner() {
  return (
    <div
      className="flex h-9 items-center justify-center gap-2 border-b border-amber-200/70 bg-amber-50/95 px-4 text-xs text-amber-950 backdrop-blur sm:text-[13px]"
      data-testid="guest-progress-banner"
    >
      <CloudOffIcon className="hidden size-3.5 shrink-0 text-amber-600 sm:block" aria-hidden />
      <p className="truncate">
        <span className="sm:hidden">Progreso guardado solo en este navegador. </span>
        <span className="hidden sm:inline">
          Sin cuenta, tu progreso se guarda solo en este navegador.{" "}
        </span>
        <Link
          href="/registro"
          className="font-semibold text-cobalt underline-offset-4 hover:underline"
        >
          Crea una cuenta
        </Link>
        <span className="hidden sm:inline"> para no perderlo.</span>
      </p>
    </div>
  );
}
