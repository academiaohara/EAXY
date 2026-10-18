"use client";

import { RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { FractionProductTool } from "@/components/lesson/slide/tools/FractionProductTool";
import { decEs, sectorPath } from "@/components/lesson/anim/fraction";
import { MANIM } from "@/components/lesson/anim/palette";
import type { SlideBlock } from "@/lib/lesson/types";

type ToolBlock = Extract<SlideBlock, { kind: "tool" }>;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function Slider({
  label,
  value,
  min,
  max,
  color,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  color: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
      <span className="flex items-baseline justify-between">
        <span>{label}</span>
        <span className="text-xl font-bold tabular-nums" style={{ color }}>
          {value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: color }}
        className="w-full"
      />
    </label>
  );
}

/** Barra(s) de una unidad partida en `d` trozos con `n` coloreados (puede ocupar más de una unidad). */
function Bars({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const W = 440;
  const H = 40;
  const gap = 14;
  const cell = W / d;
  return (
    <svg viewBox={`0 0 ${W + 4} ${wholes * (H + gap) - gap + 4}`} className="block w-full" aria-hidden focusable="false">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const y = 2 + w * (H + gap);
        return (
          <g key={w}>
            <rect x={2} y={y} width={W} height={H} rx={5} fill={MANIM.panel} />
            <rect x={2} y={y} width={filled * cell} height={H} rx={5} fill={color} fillOpacity={0.85} className="anim-t" />
            {Array.from({ length: d + 1 }, (_, i) => (
              <line key={i} x1={2 + i * cell} y1={y} x2={2 + i * cell} y2={y + H} stroke={MANIM.yellow} strokeWidth={i === 0 || i === d ? 2.5 : 1.2} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Una pizza partida en `d` porciones con `filled` coloreadas; con más de una unidad se dibujan varias. */
function Pizzas({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const R = 84;
  const gap = 28;
  const W = wholes * 2 * R + (wholes - 1) * gap + 8;
  return (
    <svg viewBox={`0 0 ${W} ${2 * R + 8}`} className="mx-auto block h-44 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-pizzas">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const cx = 4 + R + w * (2 * R + gap);
        const cy = 4 + R;
        return (
          <g key={w}>
            {Array.from({ length: d }, (_, i) => {
              const props = {
                fill: i < filled ? color : MANIM.panel,
                fillOpacity: i < filled ? 0.9 : 1,
                stroke: MANIM.yellow,
                strokeWidth: 2,
                strokeLinejoin: "round" as const,
                className: "anim-t",
              };
              return d === 1 ? (
                <circle key={i} cx={cx} cy={cy} r={R} {...props} />
              ) : (
                <path key={i} d={sectorPath(cx, cy, R, i, d)} {...props} />
              );
            })}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
          </g>
        );
      })}
    </svg>
  );
}

/** Recta de 0 a 2 con la fracción marcada. */
function MiniLine({ value, color }: { value: number; color: string }) {
  const x = (v: number) => 20 + v * 200;
  return (
    <svg viewBox="0 0 440 56" className="block w-full" aria-hidden focusable="false">
      <line x1={10} y1={30} x2={430} y2={30} stroke={MANIM.ink} strokeWidth={2.5} strokeLinecap="round" />
      {[0, 1, 2].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={22} x2={x(v)} y2={38} stroke={MANIM.ink} strokeWidth={3} />
          <text x={x(v)} y={54} fill={MANIM.ink} fontSize={14} textAnchor="middle" fontWeight={600}>
            {v}
          </text>
        </g>
      ))}
      <circle cx={x(clamp(value, 0, 2))} cy={30} r={8} fill={color} className="anim-t" />
    </svg>
  );
}

function Frame({
  hint,
  onReset,
  controls,
  children,
  stacked = false,
}: {
  hint: string;
  onReset: () => void;
  controls: React.ReactNode;
  children: React.ReactNode;
  /** Controles arriba y resultado debajo, en una sola columna. */
  stacked?: boolean;
}) {
  return (
    <section
      className="flex flex-col overflow-hidden rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-[color:var(--stage-surface,#1a2332)]"
      data-testid="lesson-tool"
    >
      <div className={stacked ? "flex flex-col gap-5 p-4" : "grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-8"}>
        <div className={stacked ? "grid gap-4 sm:grid-cols-2 sm:gap-8" : "flex flex-col gap-4"}>{controls}</div>
        <div className="flex min-w-0 flex-col gap-3">{children}</div>
      </div>
      <div className="flex items-center gap-3 border-t border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-4 py-2.5">
        <p className="flex-1 text-[0.95rem] leading-snug text-[color:var(--stage-ink,#fff)]">{hint}</p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm text-[color:var(--stage-ink,#fff)] hover:bg-white/10"
        >
          <RotateCcwIcon className="size-4" aria-hidden />
          Reiniciar
        </button>
      </div>
    </section>
  );
}

/** Numerador y denominador libres: la fracción se ve como barra, como punto en la recta y como decimal. */
function FraccionExplorador({ block }: { block: ToolBlock }) {
  const init = { n: block.params?.n ?? 3, d: block.params?.d ?? 8 };
  const [n, setN] = useState(clamp(init.n, 0, 2 * init.d));
  const [d, setD] = useState(clamp(init.d, 1, 12));

  const changeD = (next: number) => {
    setD(next);
    setN((cur) => clamp(cur, 0, 2 * next));
  };
  const value = n / d;
  const exact = (n * 1000) % d === 0;
  const kind = n < d ? "menor que 1" : n === d ? "igual a 1" : "mayor que 1";
  const color = n < d ? MANIM.blue : n === d ? MANIM.yellow : MANIM.red;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el numerador y el denominador y fíjate cuándo la fracción cruza el 1."}
      onReset={() => {
        setN(clamp(init.n, 0, 2 * init.d));
        setD(clamp(init.d, 1, 12));
      }}
      controls={
        <>
          <Slider label="Numerador (partes que coges)" value={n} min={0} max={2 * d} color={MANIM.orange} onChange={setN} />
          <Slider label="Denominador (partes iguales)" value={d} min={1} max={12} color={MANIM.blue} onChange={changeD} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${n}}{${d}}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color }}>
          {kind}
        </span>
        <span className="ml-auto text-lg tabular-nums text-[color:var(--stage-ink,#fff)]">
          {exact ? "=" : "≈"} {decEs(value)}
        </span>
      </div>
      <Pizzas n={n} d={d} color={color} />
      <MiniLine value={value} color={color} />
    </Frame>
  );
}

/** Se multiplican numerador y denominador por k: las barras cambian de trozos, no de porción. */
function FraccionEquivalentes({ block }: { block: ToolBlock }) {
  const n0 = block.params?.n ?? 2;
  const d0 = block.params?.d ?? 5;
  const initK = block.params?.k ?? 2;
  const [k, setK] = useState(clamp(initK, 1, 6));

  return (
    <Frame
      hint={block.hint ?? `Cambia k: la fracción ${n0}/${d0} se escribe de otra forma, pero la parte coloreada mide lo mismo.`}
      onReset={() => setK(clamp(initK, 1, 6))}
      controls={
        <>
          <MathRenderer text={`Fracción de partida: $\\dfrac{${n0}}{${d0}}$`} className="text-lg" />
          <Slider label="Multiplicar arriba y abajo por k" value={k} min={1} max={6} color={MANIM.green} onChange={setK} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer
          text={`$\\dfrac{${n0}}{${d0}} = \\dfrac{${n0} \\cdot ${k}}{${d0} \\cdot ${k}} = \\dfrac{${n0 * k}}{${d0 * k}}$`}
          className="text-2xl"
        />
      </div>
      <Bars n={n0} d={d0} color={MANIM.blue} />
      <Bars n={n0 * k} d={d0 * k} color={MANIM.green} />
    </Frame>
  );
}

const MAX_N = 10;

/** Máquina `a·n + b`: el alumno mueve `n` y ve la cuenta y el resultado entre todos los valores de la tabla. */
function ValorNumerico({ block }: { block: ToolBlock }) {
  const a = clamp(block.params?.a ?? 2, 1, 9);
  const b = clamp(block.params?.b ?? 3, -9, 9);
  const initN = clamp(block.params?.n ?? 5, 0, MAX_N);
  const [n, setN] = useState(initN);
  const out = (k: number) => a * k + b;
  const top = Math.max(1, ...Array.from({ length: MAX_N + 1 }, (_, k) => out(k)));
  const W = 440;
  const H = 130;
  const cell = W / (MAX_N + 1);
  const sign = b < 0 ? "-" : "+";

  return (
    <Frame
      hint={block.hint ?? "Mueve n y fíjate en que la misma regla sirve para cualquier número."}
      onReset={() => setN(initN)}
      controls={
        <>
          <MathRenderer text={`Regla: $n \\longrightarrow ${a === 1 ? "" : a}n ${sign} ${Math.abs(b)}$`} className="text-lg" />
          <Slider label="Número n que entra" value={n} min={0} max={MAX_N} color={MANIM.orange} onChange={setN} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer text={`$${a} \\cdot ${n} ${sign} ${Math.abs(b)} = ${out(n)}$`} className="text-3xl" />
      </div>
      <svg viewBox={`0 0 ${W + 4} ${H + 28}`} className="block w-full" aria-hidden focusable="false">
        {Array.from({ length: MAX_N + 1 }, (_, k) => {
          const h = (Math.max(0, out(k)) / top) * H;
          const active = k === n;
          return (
            <g key={k}>
              <rect x={2 + k * cell + 4} y={H - h} width={cell - 8} height={Math.max(h, 2)} rx={4} fill={active ? MANIM.green : MANIM.blue} fillOpacity={active ? 0.95 : 0.45} className="anim-t" />
              <text x={2 + k * cell + cell / 2} y={H + 18} fontSize={13} textAnchor="middle" fill={active ? MANIM.green : MANIM.muted}>
                {k}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

const BAL = { minB: -6, maxB: 9, minC: -6, maxC: 21 } as const;

function eqText(a: number, b: number, c: number): string {
  const lhs = `${a > 1 ? a : ""}x${b > 0 ? ` + ${b}` : b < 0 ? ` - ${-b}` : ""}`;
  return `${lhs} = ${c}`;
}

function Dots({ count }: { count: number }) {
  const neg = count < 0;
  return (
    <>
      {Array.from({ length: Math.abs(count) }, (_, i) => (
        <span
          key={i}
          className="inline-block size-5 rounded-full"
          style={neg ? { border: `2.5px dashed ${MANIM.red}` } : { background: MANIM.yellow }}
        />
      ))}
    </>
  );
}

/** Balanza `a·x + b = c`: lo que se haga en los dos platos mantiene el equilibrio y la solución. */
function BalanzaExplorador({ block }: { block: ToolBlock }) {
  const a0 = clamp(block.params?.a ?? 2, 1, 5);
  const b0 = clamp(block.params?.b ?? 3, BAL.minB, BAL.maxB);
  const c0 = clamp(block.params?.c ?? 11, BAL.minC, BAL.maxC);
  const [eq, setEq] = useState({ a: a0, b: b0, c: c0 });
  const solution = (c0 - b0) / a0;
  const { a, b, c } = eq;
  const addBoth = (d: number) => setEq((e) => ({ ...e, b: e.b + d, c: e.c + d }));
  const canAdd = (d: number) => b + d >= BAL.minB && b + d <= BAL.maxB && c + d >= BAL.minC && c + d <= BAL.maxC;
  const canDivide = a > 1 && b % a === 0 && c % a === 0;
  const btn =
    "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <Frame
      hint={block.hint ?? "Haz lo mismo en los dos platos y comprueba que la solución de x no cambia."}
      onReset={() => setEq({ a: a0, b: b0, c: c0 })}
      controls={
        <>
          <button type="button" className={btn} disabled={!canAdd(1)} onClick={() => addBoth(1)}>
            Sumar 1 a los dos platos
          </button>
          <button type="button" className={btn} disabled={!canAdd(-1)} onClick={() => addBoth(-1)}>
            Restar 1 a los dos platos
          </button>
          <button
            type="button"
            className={btn}
            disabled={!canDivide}
            title={canDivide ? undefined : "Solo se puede dividir si el número que multiplica a x divide a todo lo demás"}
            onClick={() => setEq({ a: 1, b: b / a, c: c / a })}
          >
            {a > 1 ? `Dividir entre ${a} los dos platos` : "Dividir los dos platos"}
          </button>
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
        <MathRenderer text={`$${eqText(a, b, c)}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.green }}>
          Solución: x = {solution}
        </span>
      </div>
      <div className="flex items-end justify-center gap-3" aria-hidden>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          {Array.from({ length: a }, (_, i) => (
            <span key={i} className="flex size-9 items-center justify-center rounded-md text-lg font-extrabold" style={{ background: MANIM.blue, color: MANIM.surface }}>
              x
            </span>
          ))}
          <Dots count={b} />
        </div>
        <span className="pb-2 text-2xl font-bold text-[color:var(--stage-ink,#fff)]">=</span>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          <Dots count={c} />
        </div>
      </div>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">La balanza sigue equilibrada: hagas lo que hagas, si lo haces en los dos platos.</p>
    </Frame>
  );
}

/** Herramienta interactiva dentro de una diapositiva (el alumno cambia valores y ve el resultado). */
export function SlideTool({ block }: { block: ToolBlock }) {
  switch (block.tool) {
    case "fraccion-explorador":
      return <FraccionExplorador block={block} />;
    case "fraccion-equivalentes":
      return <FraccionEquivalentes block={block} />;
    case "fraction-product":
      return <FractionProductTool initial={block.initial} />;
    case "valor-numerico":
      return <ValorNumerico block={block} />;
    case "balanza-explorador":
      return <BalanzaExplorador block={block} />;
    default:
      return null;
  }
}
