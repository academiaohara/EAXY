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
  const answered = revealPlayed && Boolean(selectedChoiceId);

  return (
    <div className="space-y-4" data-testid="jerarquia-ana-leo" role="group" aria-label="Dos formas de calcular el ticket">
      <div className="rounded-2xl bg-slate-900 px-4 py-4 text-white">
        <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-white/60">Ticket de la cafetería</p>
        <p className="mt-2 text-center text-sm">1 bebida de 4 € y 3 bocadillos de 2 € cada uno</p>
      <div role="group" className="mt-3 flex flex-wrap items-center justify-center gap-2" aria-label="Una bebida y tres bocadillos">
          <span className="rounded-lg bg-violet-300/20 px-3 py-2 text-sm font-bold">Bebida · 4 €</span>
          <span aria-hidden="true" className="text-white/50">+</span>
          {[0, 1, 2].map((item) => (
            <span key={item} className="flex size-10 items-center justify-center rounded-full bg-amber-400 font-black text-slate-900" aria-label={`Bocadillo ${item + 1}, 2 euros`}>
              2 €
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <section
          className={cn(
            "rounded-xl border-2 p-4",
            answered && selectedChoiceId === "a" ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white",
          )}
          aria-labelledby="ana-interpretacion"
        >
          <h3 id="ana-interpretacion" className="font-bold text-ink">Ana · suma antes</h3>
          <p className="mt-1 text-xs text-ink-muted">Lee la cuenta de izquierda a derecha, sin prioridad.</p>
          <p className="mt-3 text-center font-mono text-lg font-bold tabular-nums text-ink">4 + 3 = 7 → 7 × 2 = 14 €</p>
        </section>
        <section
          className={cn(
            "rounded-xl border-2 p-4",
            answered && selectedChoiceId === "l" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white",
          )}
          aria-labelledby="leo-interpretacion"
        >
          <h3 id="leo-interpretacion" className="font-bold text-ink">Leo · multiplica antes</h3>
          <p className="mt-1 text-xs text-ink-muted">Calcula primero el precio de los tres bocadillos.</p>
          <p className="mt-3 text-center font-mono text-lg font-bold tabular-nums text-ink">3 × 2 = 6 → 4 + 6 = 10 €</p>
        </section>
      </div>

      {answered ? (
        <div className="space-y-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3" aria-live="polite">
          <p className={cn("text-center text-sm font-bold", isCorrect ? "text-emerald-800" : "text-orange-700")} role="status">
            {isCorrect
              ? "Leo tiene razón: cada bocadillo cuesta 2 €, así que multiplicamos antes de sumar la bebida."
              : selectedChoiceId === "b"
                ? "Solo puede haber un total: el ticket suma 4 € de bebida y 3 × 2 € de bocadillos."
                : "Compara el ticket con las dos cuentas: los tres bocadillos cuestan 3 × 2 €, y luego se añade la bebida."}
          </p>
          <p className="text-center font-mono text-sm font-semibold text-emerald-950">
            4 + 3 × 2 → 4 + 6 → 10 €
          </p>
        </div>
      ) : (
        <p className="text-center text-xs text-ink-muted">
          Compara las dos interpretaciones y elige cuál respeta el precio real del ticket.
        </p>
      )}
    </div>
  );
}
