"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";
import { cn } from "@/lib/utils";

type TabId = "tally" | "egypt" | "roman";

const TABS: { id: TabId; label: string; subtitle: string }[] = [
  { id: "tally", label: "El hombre primitivo", subtitle: "Marcas en un hueso" },
  { id: "egypt", label: "Los egipcios", subtitle: "Símbolos que se suman" },
  { id: "roman", label: "Los romanos", subtitle: "Letras con reglas de resta" },
];

const EGYPT_SYMBOLS = [
  { value: 1, name: "Unidad", mark: "|" },
  { value: 10, name: "Decena", mark: "∩" },
  { value: 100, name: "Centena", mark: "◎" },
  { value: 1_000, name: "Millar", mark: "❀" },
  { value: 10_000, name: "Decena de millar", mark: "☝" },
  { value: 100_000, name: "Centena de millar", mark: "🐸" },
  { value: 1_000_000, name: "Millón", mark: "∞" },
] as const;

const ROMAN_KEYS = ["I", "V", "X", "L", "C", "D", "M"] as const;

const TARGETS: Record<TabId, number> = {
  tally: 9,
  egypt: 47,
  roman: 14,
};

function TallyMarks({ count }: { count: number }) {
  const groups = Math.ceil(count / 5);
  const marks: boolean[] = [];
  for (let g = 0; g < groups; g += 1) {
    const inGroup = Math.min(5, count - g * 5);
    for (let i = 0; i < inGroup; i += 1) {
      marks.push(i === 4 && inGroup === 5);
    }
  }

  return (
    <div className="flex min-h-[4rem] flex-wrap items-end justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-5">
      {marks.length === 0 ? (
        <span className="text-sm text-ink-muted">Pulsa «Contar uno» para dejar la primera marca.</span>
      ) : (
        marks.map((diagonal, index) => (
          <span
            key={index}
            className={cn(
              "relative inline-block h-10 w-1 rounded-full bg-slate-800",
              diagonal && "after:absolute after:left-1/2 after:top-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-[115deg] after:rounded-full after:bg-slate-800 after:content-['']",
            )}
            aria-hidden
          />
        ))
      )}
    </div>
  );
}

type SistemasHistoriaSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaScene({ onReadyChange }: SistemasHistoriaSceneProps) {
  const [tab, setTab] = useState<TabId>("tally");
  const [tallyCount, setTallyCount] = useState(0);
  const [egyptTotal, setEgyptTotal] = useState(0);
  const [romanStr, setRomanStr] = useState("");

  const romanValue = useMemo(() => romanToInt(romanStr), [romanStr]);

  const done = {
    tally: tallyCount >= TARGETS.tally,
    egypt: egyptTotal === TARGETS.egypt,
    roman: romanValue === TARGETS.roman,
  };

  const allDone = done.tally && done.egypt && done.roman;

  useEffect(() => {
    onReadyChange(allDone);
  }, [allDone, onReadyChange]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sistemas de numeración">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-left text-sm font-semibold transition-colors sm:px-4",
              tab === item.id
                ? "border-cobalt bg-cobalt text-white shadow-sm"
                : "border-slate-200 bg-white text-ink hover:border-cobalt/40",
              done[item.id] && tab !== item.id && "ring-2 ring-emerald-400/60",
            )}
          >
            {item.label}
            {done[item.id] ? " ✓" : null}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium text-cobalt">{TABS.find((t) => t.id === tab)?.subtitle}</p>

      {tab === "tally" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Cada objeto contado deja una marca. Agrupa de cinco en cinco. Llega a{" "}
            <strong className="text-ink">{TARGETS.tally}</strong> marcas.
          </p>
          <TallyMarks count={tallyCount} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-2xl font-bold tabular-nums text-ink">{tallyCount}</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTallyCount((n) => Math.max(0, n - 1))}
                disabled={tallyCount === 0}
              >
                Quitar
              </Button>
              <Button type="button" size="sm" onClick={() => setTallyCount((n) => n + 1)}>
                Contar uno
              </Button>
            </div>
          </div>
          {done.tally ? (
            <p className="text-sm font-medium text-emerald-700">¡Listo! Así contaban sin cifras escritas.</p>
          ) : null}
        </div>
      ) : null}

      {tab === "egypt" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Sistema <strong>aditivo</strong>: pulsas símbolos y sus valores se suman. Construye exactamente{" "}
            <strong className="text-ink">{TARGETS.egypt}</strong>.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {EGYPT_SYMBOLS.map((sym) => (
              <button
                key={sym.value}
                type="button"
                onClick={() => setEgyptTotal((t) => t + sym.value)}
                className="flex flex-col items-center gap-1 rounded-xl border border-amber-200 bg-amber-50/60 px-2 py-3 text-center transition hover:border-amber-400 hover:bg-amber-100/80"
              >
                <span className="text-2xl leading-none" aria-hidden>
                  {sym.mark}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                  {sym.name}
                </span>
                <span className="text-xs tabular-nums text-amber-900">{sym.value.toLocaleString("es-ES")}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-sm text-ink-muted">Total egipcio</span>
            <span className="text-2xl font-bold tabular-nums text-ink">{egyptTotal}</span>
            <Button type="button" variant="outline" size="sm" onClick={() => setEgyptTotal(0)}>
              Empezar de cero
            </Button>
          </div>
          {done.egypt ? (
            <p className="text-sm font-medium text-emerald-700">Correcto: 47 como suma de símbolos.</p>
          ) : null}
        </div>
      ) : null}

      {tab === "roman" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            También es aditivo, con restas como <strong>IV</strong> o <strong>XC</strong>. Forma el número{" "}
            <strong className="text-ink">{TARGETS.roman}</strong> (pista: XIV).
          </p>
          <div className="flex flex-wrap gap-2">
            {ROMAN_KEYS.map((key) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                className="min-w-[2.5rem] font-serif text-lg"
                onClick={() => setRomanStr((s) => s + key)}
              >
                {key}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-3">
            <span className="font-serif text-3xl tracking-widest text-violet-900">{romanStr || "—"}</span>
            <span className="text-sm text-violet-800">
              Vale <strong className="text-lg tabular-nums">{romanValue}</strong> en decimal
            </span>
            <Button type="button" variant="outline" size="sm" onClick={() => setRomanStr("")}>
              Borrar
            </Button>
          </div>
          {done.roman ? (
            <p className="text-sm font-medium text-emerald-700">XIV = 10 + (5 − 1) = 14.</p>
          ) : null}
        </div>
      ) : null}

      {!allDone ? (
        <p className="text-xs text-ink-muted">
          Completa los tres retos (marca ✓ en cada pestaña) para continuar.
        </p>
      ) : null}
    </div>
  );
}
