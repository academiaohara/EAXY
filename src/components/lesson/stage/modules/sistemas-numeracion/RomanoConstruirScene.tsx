"use client";

import { useCallback } from "react";
import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { romanToInt } from "@/lib/lesson/stage/numeracion";
import { RomanLetter } from "./numeracion-glyphs";
import { AMBER, INK, MUTED, StageSvg, fmt } from "./numeracion-shared";

const LETTERS = ["M", "D", "C", "L", "X", "V", "I"] as const;

export function RomanoConstruirScene({
  config,
  roman,
  onRomanChange,
}: {
  config: SistemasNumeracionConfig;
  roman: string;
  onRomanChange: (next: string) => void;
}) {
  const target = config.target ?? 1250;
  const value = romanToInt(roman);
  const solved = value === target;

  const append = useCallback(
    (letter: string) => {
      onRomanChange(roman + letter);
    },
    [onRomanChange, roman],
  );

  const clear = useCallback(() => onRomanChange(""), [onRomanChange]);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <StageSvg viewBox="0 0 420 160" testId="numeracion-romano-construir">
        <text x={210} y={36} textAnchor="middle" fill={MUTED} fontSize={13}>
          Objetivo: {fmt(target)}
        </text>
        <g>
          {roman.split("").map((ch, i) => (
            <RomanLetter key={`${i}-${ch}`} letter={ch} x={160 + i * 26} y={80} />
          ))}
          {!roman ? (
            <text x={210} y={80} textAnchor="middle" fill={MUTED} fontSize={12}>
              Pulsa letras…
            </text>
          ) : null}
        </g>
        <text x={210} y={120} textAnchor="middle" fill={AMBER} fontSize={15}>
          Suma actual: {fmt(value)}
        </text>
      </StageSvg>
      <div className="flex flex-wrap justify-center gap-2">
        {LETTERS.map((L) => (
          <button
            key={L}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--stage-accent,#58c4dd)]/40 text-base font-semibold text-[color:var(--stage-ink,#e8edf5)] hover:border-[color:var(--stage-accent,#58c4dd)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--stage-accent,#58c4dd)]"
            onClick={() => append(L)}
            aria-label={`Añadir ${L}`}
          >
            {L}
          </button>
        ))}
        <button
          type="button"
          className="rounded-md border border-[color:var(--stage-muted,#94a3b8)]/50 px-3 py-2 text-sm text-[color:var(--stage-muted,#94a3b8)] hover:text-[color:var(--stage-ink,#e8edf5)] focus-visible:outline-none focus-visible:ring-2"
          onClick={clear}
          aria-label="Borrar numeral romano"
        >
          Borrar
        </button>
      </div>
      {solved ? (
        <p className="text-sm text-[color:var(--stage-accent-muted,#83c167)]" role="status">
          ¡Encaja! {roman} = {fmt(target)}.
        </p>
      ) : (
        <p className="text-xs text-[color:var(--stage-muted,#94a3b8)]">Recuerda: a veces hay que restar (IV, IX…).</p>
      )}
    </div>
  );
}
