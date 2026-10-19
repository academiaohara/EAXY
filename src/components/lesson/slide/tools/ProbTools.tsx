"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Chip } from "@/components/lesson/anim/scenes/probabilidad";
import { decEs } from "@/components/lesson/anim/fraction";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

function Value({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="text-xl font-bold tabular-nums" style={{ color }}>
      {children}
    </span>
  );
}

/** Generador pseudoaleatorio determinista (el mismo número de lanzamiento da siempre el mismo resultado). */
export function tirada(seed: number, caras: number): number {
  let a = (seed * 2654435761 + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  a = (t ^ (t >>> 14)) >>> 0;
  return a % caras;
}

const pct = (v: number) => decEs(Math.round(v * 1000) / 10, 1);
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (n: number, d: number) => {
  const g = gcd(n, d) || 1;
  return g > 1 && n > 0 ? `${n}/${d} = ${n / g}/${d / g}` : `${n}/${d}`;
};

/* ───────────── Simulador de dado o moneda ───────────── */

export function DadoSimulador({ block }: { block: ToolBlock }) {
  const caras = block.params?.a === 2 ? 2 : 6;
  const [s, setS] = useState({ n: 0, counts: Array.from({ length: caras }, () => 0) });
  const lanzar = (k: number) =>
    setS((p) => {
      const counts = [...p.counts];
      for (let i = 0; i < k; i += 1) {
        counts[tirada(p.n + i + 1, caras)]! += 1;
      }
      return { n: p.n + k, counts };
    });
  const labels = caras === 2 ? ["cara", "cruz"] : ["1", "2", "3", "4", "5", "6"];
  const w = caras === 2 ? 120 : 62;
  const x0 = 260 - (caras * (w + 14)) / 2;
  const target = 1 / caras;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Lanza muchas veces y observa cómo la frecuencia relativa de cada resultado se acerca a su probabilidad."}
      onReset={() => setS({ n: 0, counts: Array.from({ length: caras }, () => 0) })}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          {[1, 10, 100, 1000].map((k) => (
            <button key={k} type="button" className={TOOL_BTN} onClick={() => lanzar(k)}>
              Lanzar ×{k}
            </button>
          ))}
        </div>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>n = {s.n} lanzamientos</Value>
        <span className="text-lg text-[color:var(--stage-ink,#fff)]">
          Probabilidad teórica de cada uno: {frac(1, caras)} ≈ {pct(target)} %
        </span>
      </Readout>
      <Svg h={260} testId="tool-simulador">
        <line x1={x0 - 10} y1={190 - target * 160 * (caras === 2 ? 1 : 3.2)} x2={x0 + caras * (w + 14)} y2={190 - target * 160 * (caras === 2 ? 1 : 3.2)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="8 7" />
        {s.counts.map((c, i) => {
          const h = s.n > 0 ? c / s.n : 0;
          const scale = caras === 2 ? 160 : 160 * 3.2;
          return (
            <g key={i}>
              <rect x={x0 + i * (w + 14)} y={190 - h * scale} width={w} height={h * scale} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.blue} strokeWidth={3} />
              <text x={x0 + i * (w + 14) + w / 2} y={212} fill={MANIM.ink} fontSize={17} fontWeight={700} textAnchor="middle">{labels[i]}</text>
              <text x={x0 + i * (w + 14) + w / 2} y={232} fill={MANIM.green} fontSize={13} textAnchor="middle">f = {c}</text>
              <text x={x0 + i * (w + 14) + w / 2} y={248} fill={MANIM.green} fontSize={13} textAnchor="middle">h = {s.n > 0 ? decEs(Math.round(h * 1000) / 1000, 3) : "–"}</text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Regla de Laplace ───────────── */

export function LaplaceExplorador({ block }: { block: ToolBlock }) {
  const initMode = block.params?.a === 1 ? "bolsa" : "dado";
  const [mode, setMode] = useState<"dado" | "bolsa">(initMode);
  const [sel, setSel] = useState<number[]>([2, 4, 6]);
  const [bolsa, setBolsa] = useState({ r: clamp(Math.round(block.params?.b ?? 2), 0, 8), v: clamp(Math.round(block.params?.c ?? 3), 0, 8) });
  const reset = () => {
    setMode(initMode);
    setSel([2, 4, 6]);
    setBolsa({ r: clamp(Math.round(block.params?.b ?? 2), 0, 8), v: clamp(Math.round(block.params?.c ?? 3), 0, 8) });
  };
  const fav = mode === "dado" ? sel.length : bolsa.r;
  const pos = mode === "dado" ? 6 : bolsa.r + bolsa.v;
  const p = pos > 0 ? fav / pos : 0;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Marca los casos favorables y mira la probabilidad. ¿Cuándo vale 0? ¿Y 1?"}
      onReset={reset}
      controls={
        mode === "dado" ? (
          <div className="flex flex-col gap-3 sm:col-span-2">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Caras favorables">
              {[1, 2, 3, 4, 5, 6].map((f) => (
                <button key={f} type="button" className={TOOL_BTN} aria-pressed={sel.includes(f)} onClick={() => setSel((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))}>
                  Cara {f}
                </button>
              ))}
            </div>
            <button type="button" className={`${TOOL_BTN} self-start`} onClick={() => setMode("bolsa")}>
              Cambiar a bolsa de bolas
            </button>
          </div>
        ) : (
          <>
            <Slider label="Bolas rojas" value={bolsa.r} min={0} max={8} color={MANIM.red} onChange={(r) => setBolsa((b) => ({ ...b, r }))} />
            <Slider label="Bolas verdes" value={bolsa.v} min={0} max={8} color={MANIM.green} onChange={(v) => setBolsa((b) => ({ ...b, v }))} />
            <button type="button" className={`${TOOL_BTN} self-start sm:col-span-2`} onClick={() => setMode("dado")}>
              Cambiar a dado
            </button>
          </>
        )
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>
          P = {pos > 0 ? frac(fav, pos) : "–"}
        </Value>
        <span className="text-lg text-[color:var(--stage-ink,#fff)]">
          {pos > 0 ? `≈ ${decEs(Math.round(p * 1000) / 1000, 3)} = ${pct(p)} %` : "No hay casos posibles"}
        </span>
        <span className="text-lg text-[color:var(--stage-ink,#fff)]">
          {fav} favorables de {pos} posibles{p === 0 && pos > 0 ? " · suceso imposible" : p === 1 ? " · suceso seguro" : ""}
        </span>
      </Readout>
      <Svg h={150} testId="tool-laplace">
        {mode === "dado"
          ? [1, 2, 3, 4, 5, 6].map((f, i) => <Chip key={f} x={50 + i * 76} y={40} size={60} label={String(f)} tone={sel.includes(f) ? "hit" : "idle"} />)
          : Array.from({ length: pos }, (_, i) => (
              <circle key={i} cx={50 + (i % 8) * 56} cy={50 + Math.floor(i / 8) * 56} r={22} fill={i < bolsa.r ? MANIM.red : MANIM.green} fillOpacity={0.7} stroke={i < bolsa.r ? MANIM.red : MANIM.green} strokeWidth={3} />
            ))}
      </Svg>
    </Frame>
  );
}
