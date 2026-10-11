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
import {
  SISTEMAS_HISTORIA_STATE_KEY,
  SISTEMAS_HISTORIA_TABS,
  SISTEMAS_HISTORIA_TARGETS,
  STAGE_PANEL,
  STAGE_SYMBOL_BUTTON,
  STAGE_SYMBOL_BUTTON_EGYPT,
} from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-shared";
import { cn } from "@/lib/utils";

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

type SistemasHistoriaJuegoSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaJuegoScene({ onReadyChange }: SistemasHistoriaJuegoSceneProps) {
  const [state, setState] = usePersistedLessonToolState(
    SISTEMAS_HISTORIA_STATE_KEY,
    createDefaultSistemasHistoriaState,
  );
  const { tab, tallyCount, egyptSymbols, romanStr } = state;

  const egyptValue = useMemo(() => egyptianSymbolsToInt(egyptSymbols), [egyptSymbols]);
  const romanValue = useMemo(() => romanToInt(romanStr), [romanStr]);

  const done = {
    tally: tallyCount >= SISTEMAS_HISTORIA_TARGETS.tally,
    egypt: egyptValue === SISTEMAS_HISTORIA_TARGETS.egypt,
    roman: romanValue === SISTEMAS_HISTORIA_TARGETS.roman,
  };

  const allDone = done.tally && done.egypt && done.roman;

  useEffect(() => {
    onReadyChange(allDone);
  }, [allDone, onReadyChange]);

  const setTab = (nextTab: SistemasHistoriaTabId) => {
    setState((prev) => ({ ...prev, tab: nextTab }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sistemas de numeración">
        {SISTEMAS_HISTORIA_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4",
              tab === item.id
                ? "border-cobalt bg-cobalt text-white shadow-sm"
                : "border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45",
              done[item.id] && tab !== item.id && "ring-2 ring-emerald-400/60",
            )}
          >
            {item.label}
            {done[item.id] ? " ✓" : null}
          </button>
        ))}
      </div>

      <p className="text-sm font-medium text-[color:var(--stage-accent,#58c4dd)]">
        {SISTEMAS_HISTORIA_TABS.find((t) => t.id === tab)?.subtitle}
      </p>

      {tab === "tally" ? (
        <div className="space-y-4">
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Cada objeto deja una marca. Al quinto, se tacha en diagonal el grupo de cuatro. Llega a{" "}
            <strong className="text-[color:var(--stage-ink,#e8edf5)]">{SISTEMAS_HISTORIA_TARGETS.tally}</strong>{" "}
            marcas.
          </p>
          <TallyMarksView count={tallyCount} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-2xl font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
              {tallyCount}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45"
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
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Forma{" "}
            <strong className="text-[color:var(--stage-ink,#e8edf5)]">{SISTEMAS_HISTORIA_TARGETS.egypt}</strong> con
            símbolos egipcios. Cada pulso añade un signo; el número es la <strong>suma</strong> de todos (como las
            letras romanas, pero sin restas).
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {EGYPT_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() =>
                  setState((prev) => ({ ...prev, egyptSymbols: [...prev.egyptSymbols, sym.id] }))
                }
                className={cn(STAGE_SYMBOL_BUTTON_EGYPT, "px-3")}
              >
                <EgyptianNumeralIcon id={sym.id} className="h-12" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/90">
                  {sym.name}
                </span>
                <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-sm font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
                  {sym.value.toLocaleString("es-ES")}
                </span>
              </button>
            ))}
          </div>
          <div className={cn(STAGE_PANEL, "grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center")}>
            <div
              className="flex min-h-14 flex-wrap items-center justify-center gap-1.5 sm:justify-start"
              aria-live="polite"
            >
              {egyptSymbols.length === 0 ? (
                <span className="text-2xl text-[color:var(--stage-muted,#94a3b8)]/50">—</span>
              ) : (
                egyptSymbols.map((id, index) => (
                  <EgyptianNumeralIcon key={`${id}-${index}`} id={id} className="h-11" />
                ))
              )}
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs uppercase tracking-wide text-[color:var(--stage-muted,#94a3b8)]">
                Valor decimal
              </p>
              <p className="text-3xl font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
                {egyptValue}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45 sm:col-span-2 sm:justify-self-end"
              onClick={() => setState((prev) => ({ ...prev, egyptSymbols: [] }))}
            >
              Borrar
            </Button>
          </div>
        </div>
      ) : null}

      {tab === "roman" ? (
        <div className="space-y-4">
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Forma{" "}
            <strong className="text-[color:var(--stage-ink,#e8edf5)]">{SISTEMAS_HISTORIA_TARGETS.roman}</strong> con
            letras romanas. Si una letra pequeña va a la izquierda de una mayor, resta (como en <strong>XIV</strong>).
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {ROMAN_KEYS.map(({ key, value }) => (
              <button
                key={key}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, romanStr: prev.romanStr + key }))}
                className={STAGE_SYMBOL_BUTTON}
              >
                <span className="font-serif text-2xl font-bold text-[color:var(--stage-ink,#e8edf5)]">{key}</span>
                <span className="text-[10px] font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
                  {value}
                </span>
              </button>
            ))}
          </div>
          <div className={cn(STAGE_PANEL, "grid gap-3 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center")}>
            <span className="text-center font-serif text-4xl tracking-[0.2em] text-[color:var(--stage-ink,#e8edf5)] sm:text-left">
              {romanStr || "—"}
            </span>
            <div className="text-center sm:text-right">
              <p className="text-xs uppercase tracking-wide text-[color:var(--stage-muted,#94a3b8)]">
                Valor decimal
              </p>
              <p className="text-3xl font-bold tabular-nums text-[color:var(--stage-accent,#58c4dd)]">
                {romanValue}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45 sm:col-span-2 sm:justify-self-end"
              onClick={() => setState((prev) => ({ ...prev, romanStr: "" }))}
            >
              Borrar
            </Button>
          </div>
        </div>
      ) : null}

      {!allDone ? (
        <p className="text-xs text-[color:var(--stage-muted,#94a3b8)]">
          Completa los tres retos (✓ en cada pestaña) para continuar.
        </p>
      ) : null}
    </div>
  );
}
