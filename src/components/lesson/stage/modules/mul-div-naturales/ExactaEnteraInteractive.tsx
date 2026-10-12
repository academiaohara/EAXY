"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const ASSETS = {
  bombones: "/lesson/mul-div-naturales/bombones.png",
  cajabombones: "/lesson/mul-div-naturales/cajabombones.png",
} as const;

const BOXES = 6;
const START = 150;
const MIN_TOTAL = 144;
const MAX_TOTAL = 162;

const COLOR_BOX = "#a78bfa";
const COLOR_EACH = "#7dd3fc";
const COLOR_LOOSE = "#fbbf24";

function Caja({ each }: { each: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={ASSETS.cajabombones}
        alt=""
        width={72}
        height={62}
        className="h-14 w-[4.5rem] object-contain"
        aria-hidden
      />
      <span
        className="rounded-md border-2 border-white/20 bg-slate-900/40 px-2 py-0.5 font-mono text-sm font-bold"
        style={{ color: COLOR_EACH }}
      >
        {each}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">caja</span>
    </div>
  );
}

export function ExactaEnteraInteractive({
  onReadyChange,
}: {
  onReadyChange?: (ready: boolean) => void;
}) {
  const [total, setTotal] = useState(START);
  const perBox = Math.floor(total / BOXES);
  const remainder = total % BOXES;
  const exact = remainder === 0;

  const showRoundRule = total >= 156 && exact && total === 156;

  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  const note = useMemo(() => {
    if (exact) {
      return remainder === 0 && total === START ? "no sobra nada" : showRoundRule ? "¡otra vuelta!" : "no sobra nada";
    }
    return `sobran ${remainder}`;
  }, [exact, remainder, showRoundRule, total]);

  const badge = exact ? { text: "exacta", className: "border-emerald-400/70 bg-emerald-500/20 text-emerald-200" } : { text: "con resto", className: "border-amber-400/70 bg-amber-500/20 text-amber-100" };

  return (
    <div className="space-y-4" aria-label="Cuando sobra algo en un reparto">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-medium text-[color:var(--stage-muted,#94a3b8)]">Bombones en total</span>
        <div className="flex items-center gap-2 rounded-xl border-2 border-white/15 bg-slate-900/30 px-2 py-1">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-xl font-bold text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label="Quitar un bombón"
            disabled={total <= MIN_TOTAL}
            onClick={() => setTotal((t) => Math.max(MIN_TOTAL, t - 1))}
          >
            −
          </button>
          <span className="min-w-[3rem] text-center font-mono text-2xl font-bold text-[color:var(--stage-ink,#e8edf5)]">
            {total}
          </span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-xl font-bold text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label="Añadir un bombón"
            disabled={total >= MAX_TOTAL}
            onClick={() => setTotal((t) => Math.min(MAX_TOTAL, t + 1))}
          >
            +
          </button>
        </div>
        <span className={cn("rounded-lg border-2 px-3 py-1 text-sm font-semibold", badge.className)}>{badge.text}</span>
      </div>

      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-0.5 sm:gap-1">
        {Array.from({ length: BOXES }, (_, i) => (
          <div key={i} className="flex justify-center" style={{ color: COLOR_BOX }}>
            <Caja each={perBox} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-8">
        <div
          className={cn(
            "flex min-w-[7rem] flex-col items-center px-2 py-1 transition",
            remainder > 0 && "rounded-lg bg-amber-500/10",
          )}
          aria-label={`Bandeja con ${remainder} bombones sueltos`}
        >
          <Image
            src={ASSETS.bombones}
            alt=""
            width={90}
            height={72}
            className={cn("h-14 w-auto object-contain transition", remainder === 0 && "opacity-40")}
            aria-hidden
          />
          <span className="font-mono text-lg font-bold" style={{ color: COLOR_LOOSE }}>
            {remainder}
          </span>
          <span className="font-[family-name:var(--font-caveat)] text-lg text-[color:var(--stage-ink,#e8edf5)]">
            {note}
          </span>
        </div>
      </div>

      <p className="text-center font-mono text-lg font-semibold text-[color:var(--stage-ink,#e8edf5)]">
        <span>{total}</span>
        <span className="text-[color:var(--stage-muted,#94a3b8)]"> = </span>
        <span style={{ color: COLOR_BOX }}>{BOXES}</span>
        <span className="text-[color:var(--stage-muted,#94a3b8)]"> · </span>
        <span style={{ color: COLOR_EACH }}>{perBox}</span>
        {!exact ? (
          <>
            <span className="text-[color:var(--stage-muted,#94a3b8)]"> + </span>
            <span style={{ color: COLOR_LOOSE }}>{remainder}</span>
          </>
        ) : null}
      </p>

      {showRoundRule ? (
        <p className="text-center font-[family-name:var(--font-caveat)] text-xl leading-snug text-[color:var(--stage-ink,#e8edf5)]">
          Si sobran tantos como cajas, reparte otra vuelta.
          <br />
          <span className="text-base text-[color:var(--stage-muted,#94a3b8)]">
            El resto siempre es menor que el divisor.
          </span>
        </p>
      ) : !exact ? (
        <p className="text-center text-sm text-[color:var(--stage-muted,#94a3b8)]">
          Sube o baja el total y mira qué pasa en la bandeja.
        </p>
      ) : null}
    </div>
  );
}
