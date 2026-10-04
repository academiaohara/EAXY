import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

type Ficha100Props = {
  className?: string;
  label?: string;
};

export function Ficha100({ className, label = "100" }: Ficha100Props) {
  return (
    <svg
      viewBox="0 0 72 44"
      className={objectSize(cn("h-11 w-[4.5rem] sm:h-12 sm:w-20", className))}
      aria-hidden
    >
      <rect
        x="4"
        y="4"
        width="64"
        height="36"
        rx="10"
        className="fill-cobalt stroke-cobalt/50"
        strokeWidth="2"
      />
      <text
        x="36"
        y="28"
        textAnchor="middle"
        className="fill-white font-bold"
        style={{ fontSize: 15, fontWeight: 700 }}
      >
        {label}
      </text>
    </svg>
  );
}
