import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

type BolsaProps = {
  className?: string;
  count?: number;
};

export function Bolsa({ className, count }: BolsaProps) {
  return (
    <svg
      viewBox="0 0 56 64"
      className={objectSize(cn("h-14 w-12 sm:h-16 sm:w-14", className))}
      aria-hidden
    >
      <path
        d="M14 22 C14 14 42 14 42 22 L46 58 C46 62 10 62 10 58 Z"
        className="fill-amber-200 stroke-amber-700/40"
        strokeWidth="2"
      />
      <path
        d="M18 22 Q28 14 38 22"
        fill="none"
        className="stroke-amber-800/50"
        strokeWidth="2.5"
      />
      {count !== undefined ? (
        <text
          x="28"
          y="44"
          textAnchor="middle"
          className="fill-amber-950 font-bold"
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          {count}
        </text>
      ) : null}
    </svg>
  );
}
