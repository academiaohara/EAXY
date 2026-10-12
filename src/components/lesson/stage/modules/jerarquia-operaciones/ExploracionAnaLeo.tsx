"use client";

import { cn } from "@/lib/utils";

type ExploracionAnaLeoProps = {
  revealPlayed?: boolean;
  selectedChoiceId?: string;
  isCorrect?: boolean;
};

export function ExploracionAnaLeo({
  revealPlayed = false,
  selectedChoiceId,
  isCorrect,
}: ExploracionAnaLeoProps) {
  const showTicket = revealPlayed && Boolean(selectedChoiceId);

  return (
    <div
      className="mx-auto w-full max-w-lg space-y-3"
      data-testid="jerarquia-ana-leo"
      aria-label="Ticket de la cafetería"
    >
      <div className="rounded-2xl bg-slate-900 px-4 py-5 text-white">
        <p className="mb-3 text-center text-sm opacity-80">Una bebida de 4 € y 3 bocadillos de 2 €</p>
        <div
          className={cn(
            "flex min-h-14 flex-wrap items-center justify-center gap-2 text-xl font-extrabold",
            showTicket && "animate-in fade-in duration-500",
          )}
        >
          {showTicket ? (
            <>
              <span>4 €</span>
              <span>+</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="flex h-11 w-11 animate-in zoom-in-95 items-center justify-center rounded-full bg-amber-400 text-slate-900 duration-500 fill-mode-both"
                  style={{ animationDelay: `${i * 180}ms` }}
                >
                  2
                </span>
              ))}
              <span>= 10 €</span>
            </>
          ) : (
            <span className="text-sm font-medium text-white/60">Elige una respuesta para ver el ticket.</span>
          )}
        </div>
      </div>
      {revealPlayed && selectedChoiceId ? (
        <p
          className={cn(
            "text-center text-sm font-bold",
            isCorrect ? "text-emerald-700" : "text-orange-600",
          )}
          role="status"
        >
          {isCorrect
            ? "Leo. 3 × 2 son tres grupos de 2: se calcula antes de sumar. Hace falta un orden acordado."
            : "Mira el ticket: ¿cuánto pagas de verdad?"}
        </p>
      ) : null}
    </div>
  );
}
