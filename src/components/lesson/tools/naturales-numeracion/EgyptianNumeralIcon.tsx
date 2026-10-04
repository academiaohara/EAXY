import { cn } from "@/lib/utils";

/** Símbolos del temario (1, 10, 100, 1000) en public/lesson/numeracion/egypt/{id}.svg */
export type EgyptianSymbolId = "1" | "10" | "100" | "1000";

const SYMBOL_SRC: Record<EgyptianSymbolId, string> = {
  "1": "/lesson/numeracion/egypt/1.svg",
  "10": "/lesson/numeracion/egypt/10.svg",
  "100": "/lesson/numeracion/egypt/100.svg",
  "1000": "/lesson/numeracion/egypt/1000.svg",
};

type EgyptianNumeralIconProps = {
  id: EgyptianSymbolId;
  className?: string;
};

export function EgyptianNumeralIcon({ id, className }: EgyptianNumeralIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG del temario, sin optimización
    <img
      src={SYMBOL_SRC[id]}
      alt=""
      aria-hidden
      className={cn("h-10 w-auto object-contain", className)}
      draggable={false}
    />
  );
}

export function egyptianSymbolsToInt(symbols: EgyptianSymbolId[]): number {
  const values: Record<EgyptianSymbolId, number> = {
    "1": 1,
    "10": 10,
    "100": 100,
    "1000": 1000,
  };
  return symbols.reduce((sum, id) => sum + values[id], 0);
}
