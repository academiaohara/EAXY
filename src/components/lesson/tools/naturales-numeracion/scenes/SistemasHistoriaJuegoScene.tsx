"use client";

import { CheckIcon, DeleteIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useMemo, type ReactNode } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  EgyptianNumeralIcon,
  egyptianSymbolsToInt,
  minEgyptianSymbolCount,
  type EgyptianSymbolId,
} from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";
import { intToRoman, romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";
import { TallyMarksView } from "@/components/lesson/tools/naturales-numeracion/scenes/TallyMarksView";
import { createDefaultSistemasHistoriaState } from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-state";
import {
  SISTEMAS_HISTORIA_STATE_KEY,
  SISTEMAS_HISTORIA_TARGET,
  sistemasHistoriaChallengeStatus,
  type SistemasHistoriaChallengeStatus,
} from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-shared";
import { cn } from "@/lib/utils";

const EGYPT_SYMBOLS: { id: EgyptianSymbolId; value: number; name: string }[] = [
  { id: "1", value: 1, name: "uno" },
  { id: "10", value: 10, name: "diez" },
  { id: "100", value: 100, name: "cien" },
  { id: "1000", value: 1_000, name: "mil" },
];

const ROMAN_KEYS: { key: string; value: number }[] = [
  { key: "I", value: 1 },
  { key: "V", value: 5 },
  { key: "X", value: 10 },
  { key: "L", value: 50 },
  { key: "C", value: 100 },
  { key: "D", value: 500 },
  { key: "M", value: 1000 },
];

const KEY_BUTTON =
  "flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] transition hover:-translate-y-0.5 hover:border-[color:var(--stage-accent,#58c4dd)] hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

type CardProps = {
  title: string;
  rule: string;
  color: string;
  done: boolean;
  value: number;
  status: SistemasHistoriaChallengeStatus;
  message: string | null;
  children: ReactNode;
  footer: ReactNode;
  testId: string;
};

function ChallengeCard({ title, rule, color, done, value, status, message, children, footer, testId }: CardProps) {
  return (
    <section
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border-2 bg-black/20 transition-colors duration-300"
      style={{ borderColor: done ? "#83c167" : "rgba(255,255,255,0.14)" }}
      data-testid={testId}
      data-done={done}
    >
      <header className="flex items-start justify-between gap-3 px-5 pb-3 pt-4" style={{ borderTop: `4px solid ${color}` }}>
        <div>
          <h4 className="text-lg font-bold" style={{ color }}>
            {title}
          </h4>
          <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{rule}</p>
        </div>
        {done ? (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#83c167] text-[#1a2332]" aria-label="Reto superado">
            <CheckIcon className="size-4" />
          </span>
        ) : null}
      </header>
      <div className="flex min-h-[8.5rem] flex-1 flex-col justify-center px-5 py-2">{children}</div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-5 py-3">
        <p
          className={cn(
            "text-3xl font-bold tabular-nums",
            status === "success" && "text-[#83c167]",
            status === "over" && "text-[#fc6255]",
            status === "idle" && "text-[color:var(--stage-ink,#fff)]",
          )}
          aria-live="polite"
        >
          {value}
        </p>
        <div className="flex gap-2">{footer}</div>
      </div>
      <p className="min-h-[2.75rem] px-5 pb-3 text-sm leading-snug text-[color:var(--stage-muted,#b8c2d0)]" aria-live="polite">
        {message}
      </p>
    </section>
  );
}

type SistemasHistoriaJuegoSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaJuegoScene({ onReadyChange }: SistemasHistoriaJuegoSceneProps) {
  const [state, setState] = usePersistedLessonToolState(
    SISTEMAS_HISTORIA_STATE_KEY,
    createDefaultSistemasHistoriaState,
  );
  const { tallyCount, egyptSymbols, romanStr } = state;
  const target = SISTEMAS_HISTORIA_TARGET;

  const egyptValue = useMemo(() => egyptianSymbolsToInt(egyptSymbols), [egyptSymbols]);
  const romanValue = useMemo(() => romanToInt(romanStr), [romanStr]);
  const egyptMin = minEgyptianSymbolCount(target);
  const romanCanonical = intToRoman(target);

  const tallyStatus = sistemasHistoriaChallengeStatus(tallyCount, target);
  const egyptStatus = sistemasHistoriaChallengeStatus(egyptValue, target);
  const romanStatus = sistemasHistoriaChallengeStatus(romanValue, target);

  const done = {
    tally: tallyStatus === "success",
    egypt: egyptStatus === "success" && egyptSymbols.length === egyptMin,
    roman: romanStatus === "success" && romanStr === romanCanonical,
  };
  const allDone = done.tally && done.egypt && done.roman;

  useEffect(() => {
    onReadyChange(allDone);
  }, [allDone, onReadyChange]);

  const egyptMessage = done.egypt
    ? `${egyptMin} símbolos: dos de diez y cuatro de uno.`
    : egyptStatus === "success"
      ? `Suma ${target}, pero con ${egyptSymbols.length} símbolos. Usa los de mayor valor: bastan ${egyptMin}.`
      : egyptStatus === "over"
        ? `Te has pasado de ${target}. Quita símbolos.`
        : "Cada símbolo suma su valor; el orden no importa.";

  const romanMessage = done.roman
    ? `${romanCanonical} = 10 + 10 + (5 − 1).`
    : romanStatus === "success"
      ? `Vale ${target}, pero no puede haber cuatro letras iguales seguidas. Usa una resta.`
      : romanStatus === "over"
        ? `Te has pasado de ${target}. Borra letras.`
        : "Una letra menor delante de una mayor resta.";

  const tallyMessage = done.tally
    ? "Cuatro grupos de cinco y cuatro marcas sueltas."
    : tallyStatus === "over"
      ? `Te has pasado de ${target}. Quita marcas.`
      : "Al llegar a la quinta, se tacha el grupo.";

  return (
    <div className="flex flex-col gap-5" data-testid="sistemas-historia-juego">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-3">
        <span className="flex size-14 items-center justify-center rounded-xl bg-[#ffd866] text-3xl font-extrabold tabular-nums text-[#1a2332]">
          {target}
        </span>
        <p className="text-[1.05rem] text-[color:var(--stage-ink,#fff)]">
          Escribe el <strong>{target}</strong> en los tres sistemas. Cada uno tiene su regla.
        </p>
        <span className="ml-auto text-sm font-semibold text-[color:var(--stage-muted,#b8c2d0)]">
          {Object.values(done).filter(Boolean).length}/3
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChallengeCard
          testId="reto-marcas"
          title="Marcas"
          rule="Una marca por objeto"
          color="#ffd866"
          done={done.tally}
          value={tallyCount}
          status={tallyStatus}
          message={tallyMessage}
          footer={
            <>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Quitar una marca"
                disabled={tallyCount === 0}
                onClick={() => setState((prev) => ({ ...prev, tallyCount: Math.max(0, prev.tallyCount - 1) }))}
              >
                −1
              </button>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Añadir una marca"
                onClick={() => setState((prev) => ({ ...prev, tallyCount: prev.tallyCount + 1 }))}
              >
                +1
              </button>
              <button
                type="button"
                className={cn(KEY_BUTTON, "border-[#ffd866]/50 bg-[#ffd866]/15 text-[#ffd866]")}
                aria-label="Añadir un grupo de cinco marcas"
                onClick={() => setState((prev) => ({ ...prev, tallyCount: prev.tallyCount + 5 }))}
              >
                +5
              </button>
            </>
          }
        >
          <TallyMarksView count={tallyCount} className="border-0 bg-transparent px-0" />
        </ChallengeCard>

        <ChallengeCard
          testId="reto-egipcio"
          title="Egipto"
          rule="Los símbolos se suman"
          color="#ff862f"
          done={done.egypt}
          value={egyptValue}
          status={egyptStatus}
          message={egyptMessage}
          footer={
            <>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Quitar el último símbolo"
                disabled={egyptSymbols.length === 0}
                onClick={() => setState((prev) => ({ ...prev, egyptSymbols: prev.egyptSymbols.slice(0, -1) }))}
              >
                <DeleteIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Borrar todo"
                disabled={egyptSymbols.length === 0}
                onClick={() => setState((prev) => ({ ...prev, egyptSymbols: [] }))}
              >
                <RotateCcwIcon className="size-4" aria-hidden />
              </button>
            </>
          }
        >
          <div className="mb-3 grid grid-cols-4 gap-2">
            {EGYPT_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                aria-label={`Añadir ${sym.name} (${sym.value})`}
                className={cn(KEY_BUTTON, "flex-col gap-1 px-1 py-2")}
                onClick={() => setState((prev) => ({ ...prev, egyptSymbols: [...prev.egyptSymbols, sym.id] }))}
              >
                <EgyptianNumeralIcon id={sym.id} className="h-9" />
                <span className="text-xs tabular-nums text-[color:var(--stage-muted,#b8c2d0)]">{sym.value}</span>
              </button>
            ))}
          </div>
          <div className="flex min-h-12 flex-wrap items-center gap-1" aria-label="Símbolos colocados">
            {egyptSymbols.length === 0 ? (
              <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]/60">Toca un símbolo para añadirlo</span>
            ) : (
              egyptSymbols.map((id, index) => <EgyptianNumeralIcon key={`${id}-${index}`} id={id} className="h-8" />)
            )}
          </div>
        </ChallengeCard>

        <ChallengeCard
          testId="reto-romano"
          title="Roma"
          rule="Suma, y a veces resta"
          color="#c59bd6"
          done={done.roman}
          value={romanValue}
          status={romanStatus}
          message={romanMessage}
          footer={
            <>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Borrar la última letra"
                disabled={romanStr.length === 0}
                onClick={() => setState((prev) => ({ ...prev, romanStr: prev.romanStr.slice(0, -1) }))}
              >
                <DeleteIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                className={KEY_BUTTON}
                aria-label="Borrar todo"
                disabled={romanStr.length === 0}
                onClick={() => setState((prev) => ({ ...prev, romanStr: "" }))}
              >
                <RotateCcwIcon className="size-4" aria-hidden />
              </button>
            </>
          }
        >
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {ROMAN_KEYS.map(({ key, value }) => (
              <button
                key={key}
                type="button"
                aria-label={`Añadir ${key} (${value})`}
                className={cn(KEY_BUTTON, "flex-col gap-0 px-0 py-1.5")}
                onClick={() => setState((prev) => ({ ...prev, romanStr: prev.romanStr + key }))}
              >
                <span className="font-serif text-xl font-bold">{key}</span>
                <span className="text-[10px] tabular-nums text-[color:var(--stage-muted,#b8c2d0)]">{value}</span>
              </button>
            ))}
          </div>
          <p className="min-h-12 font-serif text-4xl font-semibold tracking-[0.18em] text-[color:var(--stage-ink,#fff)]">
            {romanStr || <span className="text-sm font-sans tracking-normal text-[color:var(--stage-muted,#b8c2d0)]/60">Toca las letras</span>}
          </p>
        </ChallengeCard>
      </div>

      {!allDone ? (
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Completa los tres retos para continuar.</p>
      ) : null}
    </div>
  );
}
