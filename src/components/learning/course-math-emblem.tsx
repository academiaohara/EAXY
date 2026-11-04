import { cn } from "@/lib/utils";

/**
 * Sello decorativo del curso: una retícula de símbolos matemáticos. Sustituye a
 * la mascota en la cabecera para que el curso se reconozca por su materia.
 */
const SYMBOLS = ["∑", "π", "√", "∫", "≠", "∞", "×", "θ", "÷"] as const;

/** El centro manda: los símbolos de la diagonal pesan más que el resto. */
const ACCENTS = new Set([0, 4, 8]);

type CourseMathEmblemProps = {
  className?: string;
};

export function CourseMathEmblem({ className }: CourseMathEmblemProps) {
  return (
    <div
      className={cn(
        "grid size-36 rotate-3 grid-cols-3 place-items-center gap-1 rounded-[2rem] bg-white/8 p-3 ring-1 ring-white/15 sm:size-40",
        className,
      )}
      role="img"
      aria-label="Símbolos matemáticos"
      data-testid="course-math-emblem"
    >
      {SYMBOLS.map((symbol, index) => (
        <span
          key={symbol}
          className={cn(
            "font-heading leading-none",
            ACCENTS.has(index)
              ? "text-2xl font-semibold text-sun sm:text-[1.75rem]"
              : "text-xl text-white/45 sm:text-2xl",
          )}
          aria-hidden
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
