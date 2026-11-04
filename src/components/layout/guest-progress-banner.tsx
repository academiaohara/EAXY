import Link from "next/link";
import { CloudOffIcon } from "lucide-react";

export function GuestProgressBanner() {
  return (
    <div
      className="flex h-9 items-center justify-center gap-2 border-b border-[#e5d5a2] bg-[#fff4c9]/95 px-4 text-xs text-ink backdrop-blur sm:text-[13px]"
      data-testid="guest-progress-banner"
    >
      <CloudOffIcon className="hidden size-3.5 shrink-0 text-[#a56a22] sm:block" aria-hidden />
      <p className="truncate">
        <span className="sm:hidden">Progreso guardado solo en este navegador. </span>
        <span className="hidden sm:inline">
          Sin cuenta, tu progreso se guarda solo en este navegador.{" "}
        </span>
        <Link
          href="/registro"
          className="font-semibold text-ink underline underline-offset-4 hover:text-[#a55439]"
        >
          Crea una cuenta
        </Link>
        <span className="hidden sm:inline"> para no perderlo.</span>
      </p>
    </div>
  );
}
