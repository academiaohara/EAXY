"use client";

import { useCallback, useMemo, useState } from "react";
import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { egyptianBreakdown } from "@/lib/lesson/stage/numeracion";
import {
  EgyptianHundred,
  EgyptianStick,
  EgyptianTen,
  EgyptianThousand,
} from "./numeracion-glyphs";
import {
  AMBER,
  CalloutLayer,
  ENTER,
  SMOOTH,
  StageSvg,
  fmt,
} from "./numeracion-shared";

type Sym = { id: number; kind: "1" | "10" | "100" | "1000"; x: number };

function buildSymbols(n: number): Sym[] {
  const b = egyptianBreakdown(n);
  const out: Sym[] = [];
  let id = 0;
  const push = (kind: Sym["kind"], count: number) => {
    for (let i = 0; i < count; i += 1) {
      out.push({ id: id++, kind, x: 0 });
    }
  };
  push("1000", b.thousands);
  push("100", b.hundreds);
  push("10", b.tens);
  push("1", b.ones);
  return out;
}

function layout(symbols: Sym[], startX: number, y: number): Sym[] {
  let x = startX;
  return symbols.map((s) => {
    const placed = { ...s, x };
    x += s.kind === "1000" ? 36 : s.kind === "100" ? 32 : s.kind === "10" ? 28 : 16;
    return placed;
  });
}

function renderSym(sym: Sym, y: number) {
  if (sym.kind === "1000") {
    return <EgyptianThousand x={sym.x} y={y} />;
  }
  if (sym.kind === "100") {
    return <EgyptianHundred x={sym.x} y={y} />;
  }
  if (sym.kind === "10") {
    return <EgyptianTen x={sym.x} y={y} />;
  }
  return <EgyptianStick x={sym.x} y={y} />;
}

export function EgipcioOrdenScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const n = config.value ?? 1435;
  const [shuffled, setShuffled] = useState(false);
  const [seed, setSeed] = useState(0);

  const ordered = useMemo(() => layout(buildSymbols(n), 48, 90), [n]);
  const mixed = useMemo(() => {
    const copy = [...buildSymbols(n)];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = (seed * 17 + i * 13) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return layout(copy, 48, 90);
  }, [n, seed]);

  const display = shuffled ? mixed : ordered;

  const shuffle = useCallback(() => {
    setShuffled(true);
    setSeed((s) => s + 1);
    onReadyChange?.(true);
  }, [onReadyChange]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <StageSvg viewBox="0 0 420 180" testId="numeracion-egipcio-orden">
        <g
          style={{
            transition: `transform 0.8s ${SMOOTH}`,
          }}
        >
          {display.map((sym) => (
            <g key={sym.id} className={ENTER}>
              {renderSym(sym, 90)}
            </g>
          ))}
        </g>
        <text x={210} y={150} textAnchor="middle" fill={AMBER} fontSize={16}>
          {fmt(n)}
        </text>
        <CalloutLayer callouts={config.callouts} phase={shuffled ? 1 : 0} anchor={{ x: 210, y: 60 }} />
      </StageSvg>
      <button
        type="button"
        className="rounded-full border border-[color:var(--stage-accent,#58c4dd)]/50 bg-[color:var(--stage-surface,#1a2332)] px-5 py-2 text-sm font-medium text-[color:var(--stage-ink,#e8edf5)] transition hover:border-[color:var(--stage-accent,#58c4dd)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--stage-accent,#58c4dd)]"
        onClick={shuffle}
        aria-label="Mezclar los símbolos egipcios del 1435"
      >
        Mezclar los símbolos
      </button>
    </div>
  );
}
