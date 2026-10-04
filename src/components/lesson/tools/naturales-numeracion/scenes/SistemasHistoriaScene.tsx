"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  EgyptianNumeralIcon,
  egyptianSymbolsToInt,
  type EgyptianSymbolId,
} from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";
import { TallyMarksView } from "@/components/lesson/tools/naturales-numeracion/scenes/TallyMarksView";
import { romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";
import { cn } from "@/lib/utils";

type TabId = "tally" | "egypt" | "roman";

const TABS: { id: TabId; label: string; subtitle: string }[] = [
  { id: "tally", label: "El hombre primitivo", subtitle: "Marcas en un hueso" },
  { id: "egypt", label: "Los egipcios", subtitle: "Símbolos que se suman" },
  { id: "roman", label: "Los romanos", subtitle: "Letras con reglas de resta" },
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
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaScene({ onReadyChange }: SistemasHistoriaSceneProps) {
  const [tab, setTab] = useState<TabId>("tally");
  const [tallyCount, setTallyCount] = useState(0);
  const [egyptSymbols, setEgyptSymbols] = useState<EgyptianSymbolId[]>([]);
  const [romanStr, setRomanStr] = useState("");

  const egyptValue = useMemo(() => egyptianSymbolsToInt(egyptSymbols), [egyptSymbols]);
  const romanValue = useMemo(() => romanToInt(romanStr), [romanStr]);

  const done = {
    tally: tallyCount >= TARGETS.tally,
    egypt: egyptValue === TARGETS.egypt,
    roman: romanValue === TARGETS.roman,
  };

  const allDone = done.tally && done.egypt && done.roman;

  useEffect(() => {
    onReadyChange(allDone);
  }, [allDone, onReadyChange]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-muted">
        Tres sistemas <strong>aditivos</strong> (se suman signos). Más adelante verás el decimal, donde importa
        la <strong>posición</strong> de cada cifra.
      </p>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sistemas de numeración">
        {TABS.map((item) => (
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
            Cada objeto deja una marca. Al quinto, se tacha en diagonal el grupo de cuatro. Llega a{" "}
            <strong className="text-ink">{TARGETS.tally}</strong> marcas.
          </p>
          <TallyMarksView count={tallyCount} />
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
        </div>
      ) : null}

      {tab === "egypt" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Forma <strong className="text-ink">{TARGETS.egypt}</strong> con símbolos egipcios. Cada pulso añade un
            signo; el número es la <strong>suma</strong> de todos (como las letras romanas, pero sin restas).
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {EGYPT_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() => setEgyptSymbols((s) => [...s, sym.id])}
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
              <p className="text-3xl font-bold tabular-nums text-amber-950">{egyptValue}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="sm:col-span-2 sm:justify-self-end"
              onClick={() => setEgyptSymbols([])}
            >
              Borrar
            </Button>
          </div>
        </div>
      ) : null}

      {tab === "roman" ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Forma <strong className="text-ink">{TARGETS.roman}</strong> con letras romanas. Si una letra pequeña
            va a la izquierda de una mayor, resta (como en <strong>XIV</strong>).
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {ROMAN_KEYS.map(({ key, value }) => (
              <button
                key={key}
                type="button"
                onClick={() => setRomanStr((s) => s + key)}
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
              <p className="text-3xl font-bold tabular-nums text-violet-900">{romanValue}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="sm:col-span-2 sm:justify-self-end"
              onClick={() => setRomanStr("")}
            >
              Borrar
            </Button>
          </div>
        </div>
      ) : null}

      {!allDone ? (
        <p className="text-xs text-ink-muted">Completa los tres retos (✓ en cada pestaña) para continuar.</p>
      ) : null}
    </div>
  );
}
