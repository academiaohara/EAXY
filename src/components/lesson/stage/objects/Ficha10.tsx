import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

type Ficha10Props = {
  className?: string;
  label?: string;
};

export function Ficha10({ className, label = "10" }: Ficha10Props) {
  return (
    <svg
      viewBox="0 0 56 40"
      className={objectSize(cn("h-10 w-14 sm:h-12 sm:w-16", className))}
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="48"
        height="32"
        rx="8"
        className="fill-emerald-400 stroke-emerald-700/35"
        strokeWidth="2"
      />
      <text
        x="28"
        y="26"
        textAnchor="middle"
        className="fill-emerald-950 font-bold"
        style={{ fontSize: 14, fontWeight: 700 }}
      >
        {label}
      </text>
    </svg>
  );
}
