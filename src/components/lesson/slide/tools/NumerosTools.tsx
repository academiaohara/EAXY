"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const MINUS = "−";
const z = (n: number) => (n < 0 ? `${MINUS}${-n}` : String(n));
const tz = (n: number) => String(n);
const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/** Posición en una recta que va de `lo` a `hi` sobre el ancho del lienzo. */
function scale(lo: number, hi: number, x0: number, x1: number) {
  return (v: number) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
}

/* ───────────── Enteros: orden, opuesto, valor absoluto y distancia ───────────── */

const E_MAX = 10;

export function EnterosExplorador({ block }: { block: ToolBlock }) {
  const initA = int(block.params?.a, -4, -E_MAX, E_MAX);
  const initB = int(block.params?.b, 6, -E_MAX, E_MAX);
  const [a, setA] = useState(initA);
  const [b, setB] = useState(initB);
  const sx = scale(-E_MAX - 1, E_MAX + 1, 24, 396);
  const Y = 110;
  const order = a < b ? "<" : a > b ? ">" : "=";
  const dist = Math.abs(a - b);

  return (
    <Frame
      hint={block.hint ?? "Mueve los dos números por la recta: observa cómo cambian el orden, el valor absoluto y la distancia."}
      onReset={() => {
        setA(initA);
        setB(initB);
      }}
      controls={
        <>
          <Slider label="Número a" value={a} min={-E_MAX} max={E_MAX} color={MANIM.blue} onChange={setA} format={z} />
          <Slider label="Número b" value={b} min={-E_MAX} max={E_MAX} color={MANIM.green} onChange={setB} format={z} />
        </>
      }
    >
      <Readout>
        <MathRenderer text={`$${tz(a)} ${order} ${tz(b)}$`} className="text-3xl" />
        <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          {order === "=" ? "son el mismo número" : `${order === "<" ? "a" : "b"} está más a la izquierda, así que es menor`}
        </span>
      </Readout>
      <Svg w={420} h={190} testId="tool-enteros">
        <line x1={8} y1={Y} x2={412} y2={Y} stroke={MANIM.grid} strokeWidth={3} strokeLinecap="round" />
        {Array.from({ length: 2 * E_MAX + 3 }, (_, i) => i - E_MAX - 1).map((v) => (
          <g key={v}>
            <line x1={sx(v)} y1={Y - (v === 0 ? 10 : 5)} x2={sx(v)} y2={Y + (v === 0 ? 10 : 5)} stroke={v === 0 ? MANIM.ink : MANIM.grid} strokeWidth={v === 0 ? 3 : 2} />
            {v % 2 === 0 && Math.abs(v) <= E_MAX ? (
              <text x={sx(v)} y={Y + 28} fontSize={14} textAnchor="middle" fill={v === 0 ? MANIM.ink : MANIM.muted}>
                {z(v)}
              </text>
            ) : null}
          </g>
        ))}
        {dist > 0 ? (
          <g>
            <path d={`M ${sx(Math.min(a, b))} ${Y - 26} v -10 H ${sx(Math.max(a, b))} v 10`} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} />
            <text x={(sx(a) + sx(b)) / 2} y={Y - 44} fontSize={15} textAnchor="middle" fill={MANIM.yellow}>
              {`distancia = ${dist}`}
            </text>
          </g>
        ) : null}
        <circle cx={sx(a)} cy={Y} r={9} fill={MANIM.blue} className="anim-t" />
        <circle cx={sx(b)} cy={Y} r={9} fill={MANIM.green} fillOpacity={0.9} stroke={MANIM.surface} strokeWidth={2} className="anim-t" />
        <text x={sx(a)} y={Y + 58} fontSize={16} fontWeight={700} textAnchor="middle" fill={MANIM.blue}>{`a = ${z(a)}`}</text>
        <text x={sx(b)} y={Y + 78} fontSize={16} fontWeight={700} textAnchor="middle" fill={MANIM.green}>{`b = ${z(b)}`}</text>
      </Svg>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-enteros-datos">
        <MathRenderer text={`$|${tz(a)}| = ${Math.abs(a)}$`} />
        <MathRenderer text={`$|${tz(b)}| = ${Math.abs(b)}$`} />
        <MathRenderer text={`Opuesto de $${tz(a)}$: $${tz(-a)}$`} />
        <MathRenderer text={`Opuesto de $${tz(b)}$: $${tz(-b)}$`} />
        <MathRenderer text={`$|${tz(a)} - (${tz(b)})| = ${dist}$`} className="col-span-2" />
      </div>
    </Frame>
  );
}

/* ───────────── Potencias de base entera y exponente entero ───────────── */

const P_BASE = 5;
const P_EXP_MIN = -4;
const P_EXP_MAX = 6;

export type PowerResult =
  | { kind: "undefined"; reason: string }
  | { kind: "ok"; num: number; den: number };

/** Valor de `base^exp` como fracción irreducible (denominador siempre positivo). */
export function powerValue(base: number, exp: number): PowerResult {
  if (base === 0 && exp <= 0) {
    return { kind: "undefined", reason: exp === 0 ? "0⁰ no está definido" : "no se puede dividir entre 0" };
  }
  if (exp >= 0) {
    return { kind: "ok", num: base ** exp, den: 1 };
  }
  const p = base ** -exp;
  return { kind: "ok", num: p < 0 ? -1 : 1, den: Math.abs(p) };
}

export function PotenciaExplorador({ block }: { block: ToolBlock }) {
  const initBase = int(block.params?.a, -2, -P_BASE, P_BASE);
  const initExp = int(block.params?.b, 3, P_EXP_MIN, P_EXP_MAX);
  const [base, setBase] = useState(initBase);
  const [exp, setExp] = useState(initExp);
  const result = powerValue(base, exp);
  const count = Math.abs(exp);
  const shown = Math.min(count, 6);
  const baseTex = base < 0 ? `(${tz(base)})` : tz(base);
  const color = base < 0 ? MANIM.red : MANIM.blue;
  const R = 22;
  const gap = 56;
  const x0 = 260 - ((shown - 1) * gap) / 2;
  const valueTex =
    result.kind !== "ok"
      ? ""
      : result.den === 1
        ? tz(result.num)
        : `${result.num < 0 ? "-" : ""}\\dfrac{1}{${result.den}}`;
  const expanded =
    exp > 0
      ? Array.from({ length: count }, () => baseTex).join(" \\cdot ")
      : exp === 0
        ? "1"
        : `\\dfrac{1}{${Array.from({ length: count }, () => baseTex).join(" \\cdot ")}}`;

  return (
    <Frame
      hint={block.hint ?? "Cambia la base y el exponente. Fíjate en cuándo el resultado es negativo y en qué hace un exponente negativo."}
      onReset={() => {
        setBase(initBase);
        setExp(initExp);
      }}
      controls={
        <>
          <Slider label="Base" value={base} min={-P_BASE} max={P_BASE} color={MANIM.blue} onChange={setBase} format={z} />
          <Slider label="Exponente" value={exp} min={P_EXP_MIN} max={P_EXP_MAX} color={MANIM.orange} onChange={setExp} format={z} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${baseTex}^{${tz(exp)}}$`} className="text-3xl" />
        {result.kind === "ok" ? (
          <div className="mt-2 flex flex-col gap-1">
            <MathRenderer text={`$= ${expanded}$`} className="text-xl" />
            <MathRenderer text={`$= ${valueTex}$`} className="text-3xl" />
          </div>
        ) : (
          <p className="mt-2 text-lg" style={{ color: MANIM.red }} data-testid="tool-potencia-indefinida">
            {result.reason}
          </p>
        )}
      </div>
      <Svg w={520} h={130} testId="tool-potencia">
        {result.kind === "ok" && exp !== 0
          ? Array.from({ length: shown }, (_, i) => (
              <g key={i}>
                <circle cx={x0 + i * gap} cy={exp < 0 ? 92 : 65} r={R} fill={MANIM.panel} stroke={color} strokeWidth={3} className="anim-t" />
                <text x={x0 + i * gap} y={(exp < 0 ? 92 : 65) + 7} fontSize={20} fontWeight={700} textAnchor="middle" fill={color}>
                  {z(base)}
                </text>
              </g>
            ))
          : null}
        {result.kind === "ok" && exp < 0 ? (
          <g>
            <text x={260} y={36} fontSize={24} fontWeight={700} textAnchor="middle" fill={MANIM.yellow}>1</text>
            <line x1={x0 - 34} y1={54} x2={x0 + (shown - 1) * gap + 34} y2={54} stroke={MANIM.ink} strokeWidth={3} />
          </g>
        ) : null}
        {result.kind === "ok" && exp === 0 ? (
          <text x={260} y={72} fontSize={20} textAnchor="middle" fill={MANIM.yellow}>ningún factor: el producto vacío vale 1</text>
        ) : null}
        {result.kind === "ok" && count > 6 ? <text x={510} y={120} fontSize={13} textAnchor="end" fill={MANIM.muted}>{`(${count} factores)`}</text> : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Racionales: fracción, mixto, decimal y posición en la recta ───────────── */

const R_N = 24;
const R_DEN = 8;

/** Decimal con coma: exacto si el denominador solo tiene 2 y 5; si no, aproximado a 3 cifras. */
export function decimalText(n: number, d: number): { text: string; exact: boolean } {
  let den = d / gcd(n, d);
  let twos = 0;
  let fives = 0;
  while (den % 2 === 0) {
    den /= 2;
    twos += 1;
  }
  while (den % 5 === 0) {
    den /= 5;
    fives += 1;
  }
  const exact = den === 1;
  const places = exact ? Math.max(twos, fives) : 3;
  const value = (n / d).toFixed(places).replace(".", ",");
  return { text: value.replace("-", MINUS), exact };
}

export function RacionalExplorador({ block }: { block: ToolBlock }) {
  const initN = int(block.params?.n, 7, -R_N, R_N);
  const initD = int(block.params?.d, 4, 1, R_DEN);
  const [n, setN] = useState(initN);
  const [d, setD] = useState(initD);
  const g = n === 0 ? d : gcd(n, d);
  const sn = n / g;
  const sd = d / g;
  const value = n / d;
  const whole = Math.trunc(n / d);
  const rem = Math.abs(n) - Math.abs(whole) * d;
  const dec = decimalText(n, d);
  const lo = -4;
  const hi = 4;
  const sx = scale(lo, hi, 30, 390);
  const Y = 60;
  const px = sx(clamp(value, lo, hi));
  const sign = n < 0 ? "-" : "";
  const mixed =
    rem === 0
      ? `${tz(whole)}`
      : whole === 0
        ? `${sign}\\dfrac{${rem}}{${d}}`
        : `${tz(whole)} ${n < 0 ? "-" : "+"} \\dfrac{${rem}}{${d}}`;
  const floor = Math.floor(value);

  return (
    <Frame
      hint={block.hint ?? "Cambia el numerador y el denominador y mira dónde cae la fracción en la recta, también con signo negativo."}
      onReset={() => {
        setN(initN);
        setD(initD);
      }}
      controls={
        <>
          <Slider label="Numerador" value={n} min={-R_N} max={R_N} color={MANIM.blue} onChange={setN} format={z} />
          <Slider label="Denominador" value={d} min={1} max={R_DEN} color={MANIM.green} onChange={setD} />
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${tz(n)}}{${d}}$`} className="text-3xl" />
        <MathRenderer text={`$= ${mixed}$`} className="text-xl" />
        <MathRenderer text={`$${dec.exact ? "=" : "\\approx"} ${dec.text}$`} className="text-xl" />
        {g > 1 ? <MathRenderer text={`$= \\dfrac{${tz(sn)}}{${sd}}$`} className="text-xl" /> : null}
      </div>
      <Svg w={420} h={120} testId="tool-racional">
        <line x1={10} y1={Y} x2={410} y2={Y} stroke={MANIM.grid} strokeWidth={3} strokeLinecap="round" />
        {Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).map((v) => (
          <g key={v}>
            <line x1={sx(v)} y1={Y - 10} x2={sx(v)} y2={Y + 10} stroke={v === 0 ? MANIM.ink : MANIM.muted} strokeWidth={v === 0 ? 3 : 2} />
            <text x={sx(v)} y={Y + 28} fontSize={15} textAnchor="middle" fill={MANIM.muted}>{z(v)}</text>
          </g>
        ))}
        {Array.from({ length: (hi - lo) * d + 1 }, (_, i) => lo + i / d).map((v, i) =>
          i % d === 0 ? null : <line key={i} x1={sx(v)} y1={Y - 5} x2={sx(v)} y2={Y + 5} stroke={MANIM.yellow} strokeOpacity={0.6} strokeWidth={1.5} />,
        )}
        <circle cx={px} cy={Y} r={9} fill={MANIM.orange} className="anim-t" />
        {Math.abs(value) > hi ? (
          <text x={value > 0 ? 400 : 20} y={Y - 24} fontSize={14} textAnchor={value > 0 ? "end" : "start"} fill={MANIM.orange}>
            {value > 0 ? "sigue →" : "← sigue"}
          </text>
        ) : (
          <text x={px} y={Y - 22} fontSize={17} fontWeight={700} textAnchor="middle" fill={MANIM.orange}>{`${tz(n)}/${d}`}</text>
        )}
        <text x={210} y={108} fontSize={15} textAnchor="middle" fill={MANIM.muted}>
          {Number.isInteger(value) ? `es el entero ${z(value)}` : `está entre ${z(floor)} y ${z(floor + 1)}`}
        </text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Fracciones encadenadas: «gasta a/b y después c/d de lo que queda» ───────────── */

const G_MAX_DEN = 10;
const G_TOTALS = [200, 300, 400, 500, 600, 750, 800, 1000, 1200, 2000];

type Frac = { n: number; d: number };
const simp = (f: Frac): Frac => {
  const g = f.n === 0 ? f.d : gcd(f.n, f.d);
  return { n: f.n / g, d: f.d / g };
};
const fracTex = (f: Frac) => (f.d === 1 ? String(f.n) : `\\dfrac{${f.n}}{${f.d}}`);

/** Reparto en cadena: primera fracción del total, segunda fracción de lo que queda. */
export function chainParts(a: number, b: number, c: number, d: number): { first: Frac; second: Frac; left: Frac } {
  const first = simp({ n: a, d: b });
  const rest = { n: b - a, d: b };
  const second = simp({ n: rest.n * c, d: rest.d * d });
  const left = simp({ n: b * d - a * d - (b - a) * c, d: b * d });
  return { first, second, left };
}

export function GastoRestoExplorador({ block }: { block: ToolBlock }) {
  const init = block.initial ?? [];
  const b0 = int(init[1], 5, 2, G_MAX_DEN);
  const a0 = int(init[0], 3, 1, b0 - 1);
  const d0 = int(init[3], 2, 2, G_MAX_DEN);
  const c0 = int(init[2], 1, 1, d0 - 1);
  const t0 = G_TOTALS.includes(init[4] ?? 0) ? (init[4] as number) : 750;
  const [v, setV] = useState({ a: a0, b: b0, c: c0, d: d0, total: t0 });
  const set = (patch: Partial<typeof v>) =>
    setV((p) => {
      const next = { ...p, ...patch };
      next.b = clamp(next.b, 2, G_MAX_DEN);
      next.d = clamp(next.d, 2, G_MAX_DEN);
      next.a = clamp(next.a, 1, next.b - 1);
      next.c = clamp(next.c, 1, next.d - 1);
      return next;
    });
  const { first, second, left } = chainParts(v.a, v.b, v.c, v.d);
  const val = (f: Frac) => (v.total * f.n) / f.d;
  const money = (x: number) => `${Number.isInteger(x) ? x : x.toFixed(2).replace(".", ",")}`;
  const W = 480;
  const parts = [
    { f: first, color: MANIM.blue, label: "1.ª" },
    { f: second, color: MANIM.orange, label: "2.ª" },
    { f: left, color: MANIM.green, label: "Queda" },
  ];
  let acc = 0;

  return (
    <Frame
      hint={block.hint ?? "Cambia las dos fracciones: la segunda siempre se calcula sobre lo que quedó después de la primera."}
      onReset={() => setV({ a: a0, b: b0, c: c0, d: d0, total: t0 })}
      controls={
        <>
          <Slider label="Numerador 1.ª" value={v.a} min={1} max={v.b - 1} color={MANIM.blue} onChange={(a) => set({ a })} />
          <Slider label="Denominador 1.ª" value={v.b} min={2} max={G_MAX_DEN} color={MANIM.blue} onChange={(b) => set({ b })} />
          <Slider label="Numerador 2.ª" value={v.c} min={1} max={v.d - 1} color={MANIM.orange} onChange={(c) => set({ c })} />
          <Slider label="Denominador 2.ª" value={v.d} min={2} max={G_MAX_DEN} color={MANIM.orange} onChange={(d) => set({ d })} />
          <Slider
            label="Total"
            value={G_TOTALS.indexOf(v.total)}
            min={0}
            max={G_TOTALS.length - 1}
            color={MANIM.yellow}
            onChange={(i) => set({ total: G_TOTALS[i]! })}
            format={(i) => String(G_TOTALS[i])}
          />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer
          text={`$\\dfrac{${v.a}}{${v.b}} \\to \\dfrac{${v.c}}{${v.d}} \\text{ de lo que queda}$`}
          className="text-xl"
        />
        <div className="mb-3 mt-2 grid grid-cols-3 gap-3 text-center">
          {parts.map((p) => (
            <div key={p.label}>
              <div className="text-xs" style={{ color: p.color }}>{p.label}</div>
              <MathRenderer text={`$${fracTex(p.f)}$`} className="text-lg" />
              <div className="text-sm tabular-nums">{money(val(p.f))}</div>
            </div>
          ))}
        </div>
      </div>
      <Svg w={520} h={90} testId="tool-gasto-resto">
        <rect x={20} y={20} width={W} height={44} rx={6} fill={MANIM.panel} />
        {parts.map((p) => {
          const w = (p.f.n / p.f.d) * W;
          const x = 20 + acc * W;
          acc += p.f.n / p.f.d;
          return <rect key={p.label} x={x} y={20} width={w} height={44} fill={p.color} fillOpacity={0.75} stroke={MANIM.surface} strokeWidth={2} className="anim-t" />;
        })}
        <rect x={20} y={20} width={W} height={44} rx={6} fill="none" stroke={MANIM.ink} strokeWidth={2.5} />
      </Svg>
    </Frame>
  );
}
