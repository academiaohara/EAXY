import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

export function Manzana({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 52"
      className={objectSize(cn("h-12 w-11 sm:h-14 sm:w-12", className))}
      aria-hidden
    >
      <path
        d="M24 8 C18 8 10 16 10 28 C10 40 16 46 24 46 C32 46 38 40 38 28 C38 16 30 8 24 8 Z"
        className="fill-rose-400 stroke-rose-600/35"
        strokeWidth="2"
      />
      <path d="M24 8 L26 2" className="stroke-emerald-700" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="30" cy="6" rx="5" ry="3" className="fill-emerald-500" />
    </svg>
  );
}
