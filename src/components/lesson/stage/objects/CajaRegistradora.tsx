import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

export function CajaRegistradora({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 72"
      className={objectSize(cn("h-16 w-24 sm:h-20 sm:w-28", className))}
      aria-hidden
    >
      <rect x="8" y="20" width="80" height="44" rx="12" className="fill-slate-700 stroke-slate-900/30" strokeWidth="2" />
      <rect x="16" y="28" width="48" height="16" rx="4" className="fill-emerald-300" />
      <rect x="68" y="28" width="12" height="28" rx="3" className="fill-rose-400" />
      <rect x="20" y="8" width="56" height="16" rx="6" className="fill-cobalt/90" />
    </svg>
  );
}
