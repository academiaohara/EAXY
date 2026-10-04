import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

type ArticuloId = "bici" | "casco" | "maillot" | "culotte";

export function CiclistaArticulo({
  id,
  className,
}: {
  id: ArticuloId | string;
  className?: string;
}) {
  const common = cn("h-14 w-16 sm:h-16 sm:w-[4.5rem]", className);
  switch (id) {
    case "bici":
      return (
        <svg viewBox="0 0 80 48" className={objectSize(common)} aria-hidden>
          <circle cx="18" cy="34" r="11" className="fill-cobalt stroke-cobalt/60" strokeWidth="2" />
          <circle cx="62" cy="34" r="11" className="fill-cobalt stroke-cobalt/60" strokeWidth="2" />
          <path
            d="M18 34 L34 14 L48 22 L62 34"
            fill="none"
            className="stroke-cobalt"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M34 14 L42 34" className="stroke-emerald-500" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "casco":
      return (
        <svg viewBox="0 0 64 48" className={objectSize(common)} aria-hidden>
          <path
            d="M10 30 Q32 6 54 30 L54 38 Q32 44 10 38 Z"
            className="fill-emerald-400 stroke-emerald-700/40"
            strokeWidth="2"
          />
        </svg>
      );
    case "maillot":
      return (
        <svg viewBox="0 0 56 56" className={objectSize(common)} aria-hidden>
          <path
            d="M14 16 L28 8 L42 16 L38 48 L18 48 Z"
            className="fill-rose-400 stroke-rose-600/35"
            strokeWidth="2"
          />
          <path d="M14 16 L28 28 L42 16" className="stroke-white/50" strokeWidth="2" fill="none" />
        </svg>
      );
    case "culotte":
      return (
        <svg viewBox="0 0 56 40" className={objectSize(common)} aria-hidden>
          <path
            d="M12 10 H44 L40 34 Q28 40 16 34 Z"
            className="fill-amber-400 stroke-amber-700/35"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
}
