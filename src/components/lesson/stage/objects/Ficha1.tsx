import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

type Ficha1Props = {
  className?: string;
  label?: string;
};

export function Ficha1({ className, label = "1" }: Ficha1Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={objectSize(cn("h-12 w-12 sm:h-14 sm:w-14", className))}
      aria-hidden
    >
      <circle cx="24" cy="24" r="20" className="fill-amber-400 stroke-amber-600/40" strokeWidth="2" />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        className="fill-amber-950 text-[15px] font-bold"
        style={{ fontSize: 15, fontWeight: 700 }}
      >
        {label}
      </text>
    </svg>
  );
}
