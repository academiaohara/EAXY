"use client";

import { useEffect, useMemo } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { Button } from "@/components/ui/button";
import {
  EgyptianNumeralIcon,
  egyptianSymbolsToInt,
  type EgyptianSymbolId,
} from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";
import { TallyMarksView } from "@/components/lesson/tools/naturales-numeracion/scenes/TallyMarksView";
import { romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";
import {
  createDefaultSistemasHistoriaState,
  type SistemasHistoriaTabId,
} from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-state";
import { cn } from "@/lib/utils";

type TabId = SistemasHistoriaTabId;

const TABS: { id: TabId; label: string; subtitle: string }[] = [
  { id: "tally", label: "Marcas", subtitle: "Agrupar de cinco en cinco" },
  { id: "egypt", label: "Egipcio", subtitle: "Cada símbolo suma su valor" },
  { id: "roman", label: "Romano", subtitle: "Algunas posiciones restan" },
];

const EGYPT_SYMBOLS: {
  id: EgyptianSymbolId;
  value: number;
  name: string;
}[] = [
  { id: "1", value: 1, name: "Unidad" },
  { id: "10", value: 10, name: "Decena" },
  { id: "100", value: 100, name: "Centena" },
  { id: "1000", value: 1_000, name: "Millar" },
];

const ROMAN_KEYS: { key: string; value: number }[] = [
  { key: "M", value: 1000 },
  { key: "D", value: 500 },
  { key: "C", value: 100 },
  { key: "L", value: 50 },
  { key: "X", value: 10 },
  { key: "V", value: 5 },
  { key: "I", value: 1 },
];

const TARGETS: Record<TabId, number> = {
  tally: 9,
  egypt: 47,
  roman: 14,
};

type SistemasHistoriaSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaScene({ stepId, onReadyChange }: SistemasHistoriaSceneProps) {
  const [state, setState] = usePersistedLessonToolState(
    stepId,
    createDefaultSistemasHistoriaState,
  );
  const { tab, tallyCount, egyptSymbols, romanStr } = state;

  const egyptValue = useMemo(() => egyptianSymbolsToInt(egyptSymbols), [egyptSymbols]);
  const romanValue = useMemo(() => romanToInt(romanStr), [romanStr]);

  const done = {
    tally: tallyCount >= TARGETS.tally,
    egypt: egyptValue === TARGETS.egypt,
    roman: romanValue === TARGETS.roman,
  };

  const allDone = done.tally && done.egypt && done.roman;
  const completedCount = Object.values(done).filter(Boolean).length;

  useEffect(() => {
    onReadyChange(allDone);
  }, [allDone, onReadyChange]);

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-ink-muted">
        El mismo reto —representar una cantidad— puede resolverse de distintas maneras: agrupar marcas, sumar símbolos o
        usar la posición de las cifras.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Elige un sistema de numeración">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setState((prev) => ({ ...prev, tab: item.id }))}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4",
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
            Cada objeto deja una marca. Cada cinco se agrupan con una raya diagonal. Representa{" "}
            <strong className="text-ink">{TARGETS.tally}</strong> marcas.
          </p>
          <TallyMarksView count={tallyCount} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-2xl font-bold tabular-nums text-ink" aria-live="polite">{tallyCount}</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setState((prev) => ({ ...prev, tallyCount: Math.max(0, prev.tallyCount - 1) }))
                }
                disabled={tallyCount === 0}
              >
                Quitar
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, tallyCount: prev.tallyCount + 1 }))}
              >
                Contar uno
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {tab === "egypt" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Forma <strong className="text-ink">{TARGETS.egypt}</strong>: usa cuatro símbolos de diez y siete de uno.
            Cada símbolo añade su valor, así que aquí solo tienes que <strong className="text-ink">sumarlos</strong>.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {EGYPT_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() =>
                  setState((prev) => ({ ...prev, egyptSymbols: [...prev.egyptSymbols, sym.id] }))
                }
                className="flex flex-col items-center gap-2 rounded-xl border border-amber-200/80 bg-gradient-to-b from-amber-50 to-white px-3 py-4 text-center shadow-sm transition hover:border-amber-400 hover:shadow-md"
              >
                <EgyptianNumeralIcon id={sym.id} className="h-12" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                  {sym.name}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-bold tabular-nums text-amber-950">
                  {sym.value.toLocaleString("es-ES")}
                </span>
              </button>
            ))}
          </div>
          <div className="grid gap-3 rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div
              className="flex min-h-14 flex-wrap items-center justify-center gap-1.5 sm:justify-start"
              aria-live="polite"
            >
              {egyptSymbols.length === 0 ? (
                <span className="text-2xl text-amber-900/40">—</span>
              ) : (
                egyptSymbols.map((id, index) => (
                  <EgyptianNumeralIcon key={`${id}-${index}`} id={id} className="h-11" />
                ))
              )}
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs uppercase tracking-wide text-amber-800">Valor decimal</p>
              <p className="text-3xl font-bold tabular-nums text-amber-950" aria-live="polite">{egyptValue}</p>
            </div>
            <div className="flex justify-center gap-2 sm:col-span-2 sm:justify-self-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, egyptSymbols: prev.egyptSymbols.slice(0, -1) }))}
                disabled={egyptSymbols.length === 0}
              >
                Deshacer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, egyptSymbols: [] }))}
                disabled={egyptSymbols.length === 0}
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {tab === "roman" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Escribe <strong className="text-ink">{TARGETS.roman}</strong> como <strong>XIV</strong>. La I va antes de V,
            así que resta: <strong>X + (V − I) = 10 + 4</strong>.
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {ROMAN_KEYS.map(({ key, value }) => (
              <button
                key={key}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, romanStr: prev.romanStr + key }))}
                className="flex flex-col items-center rounded-xl border border-violet-200 bg-violet-50/50 py-3 transition hover:border-violet-400 hover:bg-violet-100/70"
              >
                <span className="font-serif text-2xl font-bold text-violet-900">{key}</span>
                <span className="text-[10px] font-semibold tabular-nums text-violet-700">{value}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-3 rounded-xl border border-violet-200 bg-violet-50/40 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <span className="text-center font-serif text-4xl tracking-[0.2em] text-violet-950 sm:text-left">
              {romanStr || "—"}
            </span>
            <div className="text-center sm:text-right">
              <p className="text-xs uppercase tracking-wide text-violet-700">Valor decimal</p>
              <p className="text-3xl font-bold tabular-nums text-violet-900" aria-live="polite">{romanValue}</p>
            </div>
            <div className="flex justify-center gap-2 sm:col-span-2 sm:justify-self-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, romanStr: prev.romanStr.slice(0, -1) }))}
                disabled={romanStr.length === 0}
              >
                Deshacer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setState((prev) => ({ ...prev, romanStr: "" }))}
                disabled={romanStr.length === 0}
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-2" aria-label={`${completedCount} de 3 sistemas completados`}>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="Sistemas explorados" aria-valuemin={0} aria-valuemax={3} aria-valuenow={completedCount}>
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(completedCount / 3) * 100}%` }} />
        </div>
        <p className="text-xs text-ink-muted" aria-live="polite">
          {allDone ? "Has probado los tres sistemas. En el decimal, en cambio, cada posición cambia el valor." : `${completedCount} de 3 sistemas explorados. Completa cada reto para continuar.`}
        </p>
      </div>
    </div>
  );
}
