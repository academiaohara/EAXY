"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const ink = "text-[color:var(--stage-ink,#fff)]";

/* ───────────── Rectas con intervalos ───────────── */

export type Interval = { lo: number; loIncl: boolean; hi: number; hiIncl: boolean };

const numTxt = (v: number) => (v === Infinity ? "+∞" : v === -Infinity ? "−∞" : f(v));

export function notation(i: Interval): string {
  return `${i.loIncl ? "[" : "("}${numTxt(i.lo)}, ${numTxt(i.hi)}${i.hiIncl ? "]" : ")"}`;
}

function inequality(i: Interval): string {
  const l = Number.isFinite(i.lo);
  const h = Number.isFinite(i.hi);
  if (l && h) return `${f(i.lo)} ${i.loIncl ? "≤" : "<"} x ${i.hiIncl ? "≤" : "<"} ${f(i.hi)}`;
  if (l) return `x ${i.loIncl ? "≥" : ">"} ${f(i.lo)}`;
  if (h) return `x ${i.hiIncl ? "≤" : "<"} ${f(i.hi)}`;
  return "cualquier x";
}

function contains(i: Interval, x: number): boolean {
  const aboveLo = i.loIncl ? x >= i.lo : x > i.lo;
  const belowHi = i.hiIncl ? x <= i.hi : x < i.hi;
  return aboveLo && belowHi;
}

function intersect(a: Interval, b: Interval): Interval | null {
  const lo = Math.max(a.lo, b.lo);
  const hi = Math.min(a.hi, b.hi);
  const loIncl = a.lo === b.lo ? a.loIncl && b.loIncl : lo === a.lo ? a.loIncl : b.loIncl;
  const hiIncl = a.hi === b.hi ? a.hiIncl && b.hiIncl : hi === a.hi ? a.hiIncl : b.hiIncl;
  if (lo > hi || (lo === hi && !(loIncl && hiIncl))) return null;
  return { lo, loIncl, hi, hiIncl };
}

const LR = 9;
const LW = 520;
const LH = 90;
const lx = (v: number) => 30 + ((v + LR) / (2 * LR)) * (LW - 60);

export function NumberLine({ sets, probe, testId }: { sets: { i: Interval; color: string; y: number }[]; probe?: number; testId: string }) {
  const ticks = Array.from({ length: 2 * LR + 1 }, (_, k) => k - LR);
  const clampX = (v: number) => lx(clamp(v, -LR - 0.6, LR + 0.6));
  return (
    <Svg w={LW} h={LH + sets.length * 22} testId={testId}>
      {sets.map(({ i, color, y }, k) => {
        const x1 = clampX(i.lo);
        const x2 = clampX(i.hi);
        return (
          <g key={k}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={9} opacity={0.85} />
            {i.lo === -Infinity ? <path d={`M ${x1} ${y - 11} L ${x1 - 16} ${y} L ${x1} ${y + 11} Z`} fill={color} /> : null}
            {i.hi === Infinity ? <path d={`M ${x2} ${y - 11} L ${x2 + 16} ${y} L ${x2} ${y + 11} Z`} fill={color} /> : null}
            {Number.isFinite(i.lo) ? <circle cx={x1} cy={y} r={7} fill={i.loIncl ? color : MANIM.surface} stroke={color} strokeWidth={3} /> : null}
            {Number.isFinite(i.hi) ? <circle cx={x2} cy={y} r={7} fill={i.hiIncl ? color : MANIM.surface} stroke={color} strokeWidth={3} /> : null}
          </g>
        );
      })}
      <line x1={20} y1={LH + sets.length * 22 - 24} x2={LW - 20} y2={LH + sets.length * 22 - 24} stroke={MANIM.ink} strokeWidth={2.5} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={lx(t)} y1={LH + sets.length * 22 - 31} x2={lx(t)} y2={LH + sets.length * 22 - 17} stroke={MANIM.ink} strokeWidth={t === 0 ? 3 : 1.5} />
          {t % 2 === 0 ? (
            <text x={lx(t)} y={LH + sets.length * 22 - 2} fontSize={14} fill={MANIM.muted} textAnchor="middle">{f(t)}</text>
          ) : null}
        </g>
      ))}
      {probe !== undefined ? (
        <circle cx={lx(probe)} cy={LH + sets.length * 22 - 24} r={6} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={1.5} />
      ) : null}
    </Svg>
  );
}

const TIPOS: { label: string; loIncl: boolean; hiIncl: boolean }[] = [
  { label: "( a, b )", loIncl: false, hiIncl: false },
  { label: "[ a, b ]", loIncl: true, hiIncl: true },
  { label: "( a, b ]", loIncl: false, hiIncl: true },
  { label: "[ a, b )", loIncl: true, hiIncl: false },
];

/** Intervalo acotado: extremos, tipo de intervalo y un número de prueba. */
export function IntervaloExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], -2, -7, 6), b: int(ini[1], 3, -6, 7), t: int(ini[2], 0, 0, 3), x: int(ini[3] === undefined ? 3 : ini[3] * 2, 6, -16, 16) };
  const [v, setV] = useState(init);
  const b = Math.max(v.b, v.a + 1);
  const tipo = TIPOS[v.t]!;
  const itv: Interval = { lo: v.a, loIncl: tipo.loIncl, hi: b, hiIncl: tipo.hiIncl };
  const x = v.x / 2;
  const dentro = contains(itv, x);
  return (
    <Frame
      hint={block.hint ?? "Cambia el tipo de intervalo y mueve el número de prueba hasta uno de los extremos: ¿entra o no entra?"}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Extremo a" value={v.a} min={-7} max={6} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="Extremo b" value={b} min={-6} max={7} color={MANIM.orange} onChange={(nb) => setV((p) => ({ ...p, b: nb }))} format={f} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de intervalo">
            {TIPOS.map((t, i) => (
              <button key={t.label} type="button" className={`${TOOL_BTN} ${i === v.t ? "border-white bg-white/20" : ""}`} aria-pressed={i === v.t} onClick={() => setV((p) => ({ ...p, t: i }))}>
                {t.label}
              </button>
            ))}
          </div>
          <Slider label="Número de prueba x" value={x} min={-8} max={8} step={0.5} color={MANIM.yellow} onChange={(nx) => setV((p) => ({ ...p, x: Math.round(nx * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-int-notacion">{notation(itv)}</p>
        <p className="text-lg" data-testid="tool-int-desigualdad">{inequality(itv)}</p>
        <p className="text-lg font-semibold" style={{ color: dentro ? MANIM.green : MANIM.red }} data-testid="tool-int-x">
          {`x = ${fmtEs(x, 1)} ${dentro ? "pertenece" : "no pertenece"} al intervalo`}
        </p>
      </div>
      <NumberLine sets={[{ i: itv, color: MANIM.blue, y: 26 }]} probe={x} testId="tool-int-recta" />
    </Frame>
  );
}

const SENTIDOS = ["x < a", "x ≤ a", "x > a", "x ≥ a"];

function setOf(s: number, a: number): Interval {
  if (s === 0) return { lo: -Infinity, loIncl: false, hi: a, hiIncl: false };
  if (s === 1) return { lo: -Infinity, loIncl: false, hi: a, hiIncl: true };
  if (s === 2) return { lo: a, loIncl: false, hi: Infinity, hiIncl: false };
  return { lo: a, loIncl: true, hi: Infinity, hiIncl: false };
}

/** Sistema de dos inecuaciones: cada una es una semirrecta y la solución es la intersección. */
export function SistemaInecuacionesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 5, -7, 7), s1: int(ini[1], 1, 0, 3), b: int(ini[2], 3, -7, 7), s2: int(ini[3], 2, 0, 3) };
  const [v, setV] = useState(init);
  const A = setOf(v.s1, v.a);
  const B = setOf(v.s2, v.b);
  const sol = intersect(A, B);
  const label = (s: number, n: number) => SENTIDOS[s]!.replace("a", f(n));
  return (
    <Frame
      hint={block.hint ?? "Cambia el sentido de cada desigualdad y mueve los valores: la solución es lo que cumplen las dos a la vez."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Valor de la 1.ª inecuación" value={v.a} min={-7} max={7} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sentido de la 1.ª inecuación">
            {SENTIDOS.map((s, i) => (
              <button key={s} type="button" className={`${TOOL_BTN} ${i === v.s1 ? "border-white bg-white/20" : ""}`} aria-pressed={i === v.s1} onClick={() => setV((p) => ({ ...p, s1: i }))}>
                {s}
              </button>
            ))}
          </div>
          <Slider label="Valor de la 2.ª inecuación" value={v.b} min={-7} max={7} color={MANIM.orange} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sentido de la 2.ª inecuación">
            {SENTIDOS.map((s, i) => (
              <button key={s} type="button" className={`${TOOL_BTN} ${i === v.s2 ? "border-white bg-white/20" : ""}`} aria-pressed={i === v.s2} onClick={() => setV((p) => ({ ...p, s2: i }))}>
                {s}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg">{`${label(v.s1, v.a)}   y   ${label(v.s2, v.b)}`}</p>
        <p className="text-2xl font-bold" style={{ color: sol ? MANIM.green : MANIM.red }} data-testid="tool-si-solucion">
          {sol ? `${inequality(sol)}  →  ${notation(sol)}` : "Sin solución: no hay ningún número que cumpla las dos"}
        </p>
      </div>
      <NumberLine
        sets={[
          { i: A, color: MANIM.blue, y: 22 },
          { i: B, color: MANIM.orange, y: 46 },
          ...(sol ? [{ i: sol, color: MANIM.green, y: 74 }] : []),
        ]}
        testId="tool-si-recta"
      />
    </Frame>
  );
}

/* ───────────── Ruffini ───────────── */

/** Cociente y resto de dividir P(x) entre x − a por Ruffini (coeficientes de mayor a menor grado). */
export function ruffini(p: number[], a: number) {
  const bottom: number[] = [];
  const prods: number[] = [];
  p.forEach((c, i) => {
    const pr = i === 0 ? 0 : a * bottom[i - 1]!;
    prods.push(pr);
    bottom.push(c + pr);
  });
  return { bottom, prods, quotient: bottom.slice(0, -1), remainder: bottom[bottom.length - 1]! };
}

export function polyTex(p: number[]): string {
  const n = p.length - 1;
  let out = "";
  p.forEach((c, i) => {
    if (c === 0) return;
    const d = n - i;
    const abs = Math.abs(c);
    const body = d === 0 ? String(abs) : `${abs === 1 ? "" : abs}x${d === 1 ? "" : `^{${d}}`}`;
    out += `${c < 0 ? "-" : out ? "+" : ""}${body}`;
  });
  return out || "0";
}

/** Tabla de Ruffini de un cúbico: cambia los coeficientes y `a`; el resto es P(a). */
export function RuffiniExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { c3: int(ini[0], 1, -9, 9), c2: int(ini[1], -2, -9, 9), c1: int(ini[2], -5, -9, 9), c0: int(ini[3], 6, -9, 9), a: int(ini[4], 3, -6, 6) };
  const [v, setV] = useState(init);
  const p = [v.c3, v.c2, v.c1, v.c0];
  const { bottom, prods, quotient, remainder } = ruffini(p, v.a);
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));
  const cell = "w-16 text-center text-xl font-bold tabular-nums";
  return (
    <Frame
      hint={block.hint ?? "Busca un valor de a que dé resto 0: entonces x − a es un factor del polinomio."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Coeficiente de x³" value={v.c3} min={-9} max={9} color={MANIM.blue} onChange={set("c3")} format={f} />
          <Slider label="Coeficiente de x²" value={v.c2} min={-9} max={9} color={MANIM.blue} onChange={set("c2")} format={f} />
          <Slider label="Coeficiente de x" value={v.c1} min={-9} max={9} color={MANIM.blue} onChange={set("c1")} format={f} />
          <Slider label="Término independiente" value={v.c0} min={-9} max={9} color={MANIM.blue} onChange={set("c0")} format={f} />
          <Slider label="Valor a (divisor x − a)" value={v.a} min={-6} max={6} color={MANIM.orange} onChange={set("a")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$P(x) = ${polyTex(p)}$`} className="text-xl" />
        <div className="grid grid-cols-[auto_repeat(4,4rem)] items-center gap-y-1 rounded-lg bg-black/20 p-3" data-testid="tool-ruf-tabla">
          <span />
          {p.map((c, i) => (
            <span key={i} className={cell}>{f(c)}</span>
          ))}
          <span className="pr-3 text-xl font-bold text-[color:#ff862f]">{f(v.a)}</span>
          {prods.map((c, i) => (
            <span key={i} className={`${cell} text-[color:#ff862f]`}>{i === 0 ? "" : f(c)}</span>
          ))}
          <span />
          {bottom.map((c, i) => (
            <span key={i} className={`${cell} border-t-2 border-white/60 ${i === 3 ? "text-[color:#ffd866]" : "text-[color:#83c167]"}`}>{f(c)}</span>
          ))}
        </div>
        <p className="text-lg" data-testid="tool-ruf-cociente">
          <span>{"Cociente: "}</span>
          <MathRenderer text={`$${polyTex(quotient)}$`} className="inline text-lg" />
          {` · resto ${f(remainder)}`}
        </p>
        <p className="text-lg font-semibold" style={{ color: remainder === 0 ? MANIM.green : MANIM.muted }} data-testid="tool-ruf-raiz">
          {remainder === 0 ? `Resto 0: ${f(v.a)} es raíz y x ${v.a < 0 ? "+" : "−"} ${Math.abs(v.a)} divide a P(x)` : `P(${f(v.a)}) = ${f(remainder)}: ${f(v.a)} no es raíz`}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Fracciones algebraicas ───────────── */

type FracPreset = {
  num: string;
  den: string;
  simp: string;
  numF: (x: number) => number;
  denF: (x: number) => number;
  simpN: (x: number) => number;
  simpD: (x: number) => number;
  excluded: string;
  tex: string;
};

const FRACS: FracPreset[] = [
  {
    num: "x² − 4", den: "x² + 2x", simp: "(x − 2)/x",
    numF: (x) => x * x - 4, denF: (x) => x * x + 2 * x, simpN: (x) => x - 2, simpD: (x) => x,
    excluded: "x = 0 y x = −2", tex: "\\dfrac{x^2-4}{x^2+2x}=\\dfrac{(x+2)(x-2)}{x(x+2)}=\\dfrac{x-2}{x}",
  },
  {
    num: "3x² + 3x", den: "6x²", simp: "(x + 1)/(2x)",
    numF: (x) => 3 * x * x + 3 * x, denF: (x) => 6 * x * x, simpN: (x) => x + 1, simpD: (x) => 2 * x,
    excluded: "x = 0", tex: "\\dfrac{3x^2+3x}{6x^2}=\\dfrac{3x(x+1)}{3x\\cdot 2x}=\\dfrac{x+1}{2x}",
  },
  {
    num: "x² − 1", den: "x² + 2x + 1", simp: "(x − 1)/(x + 1)",
    numF: (x) => x * x - 1, denF: (x) => x * x + 2 * x + 1, simpN: (x) => x - 1, simpD: (x) => x + 1,
    excluded: "x = −1", tex: "\\dfrac{x^2-1}{x^2+2x+1}=\\dfrac{(x+1)(x-1)}{(x+1)^2}=\\dfrac{x-1}{x+1}",
  },
];

/** Una fracción y su simplificada dan el mismo valor salvo donde el denominador original se anula. */
export function FraccionAlgExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, FRACS.length - 1);
  const x0 = int(block.params?.b, 3, -8, 8);
  const [idx, setIdx] = useState(idx0);
  const [x, setX] = useState(x0);
  const fr = FRACS[idx]!;
  const d = fr.denF(x);
  const d2 = fr.simpD(x);
  const origen = d === 0 ? "no existe (denominador 0)" : fmtEs(fr.numF(x) / d, 3);
  const simpl = d2 === 0 ? "no existe (denominador 0)" : fmtEs(fr.simpN(x) / d2, 3);
  const igual = d !== 0 && d2 !== 0 && Math.abs(fr.numF(x) / d - fr.simpN(x) / d2) < 1e-9;
  return (
    <Frame
      hint={block.hint ?? "Elige un valor de x: la fracción original y la simplificada coinciden salvo donde el denominador original vale 0."}
      onReset={() => {
        setIdx(idx0);
        setX(x0);
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {FRACS.map((_, i) => (
              <button key={i} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} onClick={() => setIdx(i)}>
                {`Fracción ${i + 1}`}
              </button>
            ))}
          </div>
          <Slider label="Valor de x" value={x} min={-8} max={8} color={MANIM.yellow} onChange={setX} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$${fr.tex}$`} className="text-lg" />
        <p className="text-base" data-testid="tool-fa-orig">{`Original (${fr.num})/(${fr.den}) → ${origen}`}</p>
        <p className="text-base" data-testid="tool-fa-simpl">{`Simplificada ${fr.simp} → ${simpl}`}</p>
        <p className="text-lg font-semibold" style={{ color: igual ? MANIM.green : MANIM.muted }} data-testid="tool-fa-estado">
          {igual ? "Mismo valor: son equivalentes aquí" : `Valores excluidos de la original: ${fr.excluded}`}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Trigonometría ───────────── */

const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;
const f3 = (x: number) => fmtEs(x, 3);

/** Ángulo en grados, minutos y segundos (por ejemplo, 23° 1′ 32″). */
export function dms(angle: number): string {
  const total = Math.round(angle * 3600);
  const d = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${d}° ${m}′ ${s}″`;
}

/** Triángulo rectángulo con α en el vértice izquierdo; cambia α y el tamaño: las razones no dependen del tamaño. */
export function TrigExplorador({ block }: { block: ToolBlock }) {
  const init = { a: int(block.params?.a, 35, 5, 85), h: int(block.params?.b, 6, 2, 10) };
  const [v, setV] = useState(init);
  const op = v.h * Math.sin(rad(v.a));
  const co = v.h * Math.cos(rad(v.a));
  const scale = 26;
  const ax = 40;
  const ay = 250;
  const bx = ax + co * scale;
  const by = ay - op * scale;
  return (
    <Frame
      hint={block.hint ?? "Cambia el tamaño del triángulo sin tocar el ángulo: los lados cambian, pero seno, coseno y tangente no."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Ángulo α" value={v.a} min={5} max={85} color={MANIM.yellow} unit="°" onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Hipotenusa" value={v.h} min={2} max={10} color={MANIM.blue} onChange={(h) => setV((p) => ({ ...p, h }))} />
        </>
      }
    >
      <div className={`flex flex-wrap gap-x-8 gap-y-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-trig-lados">{`Opuesto ${fmtEs(op, 2)} · Contiguo ${fmtEs(co, 2)} · Hipotenusa ${v.h}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }}>
          <span data-testid="tool-trig-sen">{`sen α = ${f3(op / v.h)}`}</span>
          {"   "}
          <span data-testid="tool-trig-cos">{`cos α = ${f3(co / v.h)}`}</span>
          {"   "}
          <span data-testid="tool-trig-tg">{`tg α = ${f3(op / co)}`}</span>
        </p>
      </div>
      <Svg w={420} h={280} testId="tool-trig-dibujo">
        <polygon points={`${ax},${ay} ${bx},${ay} ${bx},${by}`} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={3} />
        <line x1={ax} y1={ay} x2={bx} y2={by} stroke={MANIM.blue} strokeWidth={4} />
        <line x1={bx} y1={ay} x2={bx} y2={by} stroke={MANIM.orange} strokeWidth={4} />
        <line x1={ax} y1={ay} x2={bx} y2={ay} stroke={MANIM.green} strokeWidth={4} />
        <path d={`M ${ax + 36} ${ay} A 36 36 0 0 0 ${ax + 36 * Math.cos(rad(v.a))} ${ay - 36 * Math.sin(rad(v.a))}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
      </Svg>
    </Frame>
  );
}

/** Resolver un triángulo rectángulo: con un lado y un ángulo, o con dos lados. */
export function TrigResolverExplorador({ block }: { block: ToolBlock }) {
  const init = { mode: int(block.params?.n, 0, 0, 1), a: int(block.params?.a, 62, 5, 85), h: int(block.params?.b, 36, 2, 60), b: int(block.params?.c, 17, 1, 60), c: int(block.params?.d, 40, 1, 60) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));
  const res =
    v.mode === 0
      ? { op: v.h * Math.sin(rad(v.a)), co: v.h * Math.cos(rad(v.a)), hip: v.h, alpha: v.a, beta: 90 - v.a }
      : { op: v.b, co: v.c, hip: Math.hypot(v.b, v.c), alpha: deg(Math.atan(v.b / v.c)), beta: 90 - deg(Math.atan(v.b / v.c)) };
  return (
    <Frame
      hint={block.hint ?? "Con un lado y un ángulo se usan sen, cos y tg para los otros lados; con dos lados, Pitágoras y la razón inversa."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Datos conocidos">
            <button type="button" className={`${TOOL_BTN} ${v.mode === 0 ? "border-white bg-white/20" : ""}`} aria-pressed={v.mode === 0} onClick={() => set("mode")(0)}>Un lado y un ángulo</button>
            <button type="button" className={`${TOOL_BTN} ${v.mode === 1 ? "border-white bg-white/20" : ""}`} aria-pressed={v.mode === 1} onClick={() => set("mode")(1)}>Dos catetos</button>
          </div>
          {v.mode === 0 ? (
            <>
              <Slider label="Ángulo α" value={v.a} min={5} max={85} color={MANIM.yellow} unit="°" onChange={set("a")} />
              <Slider label="Hipotenusa" value={v.h} min={2} max={60} color={MANIM.blue} onChange={set("h")} />
            </>
          ) : (
            <>
              <Slider label="Cateto opuesto" value={v.b} min={1} max={60} color={MANIM.orange} onChange={set("b")} />
              <Slider label="Cateto contiguo" value={v.c} min={1} max={60} color={MANIM.green} onChange={set("c")} />
            </>
          )}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-res-lados">{`Opuesto ${fmtEs(res.op, 2)} · Contiguo ${fmtEs(res.co, 2)} · Hipotenusa ${fmtEs(res.hip, 2)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-res-angulos">{`α = ${dms(res.alpha)} · β = ${dms(res.beta)}`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-res-metodo">
          {v.mode === 0 ? "Lados: opuesto = hip · sen α, contiguo = hip · cos α. Ángulo β = 90° − α." : "Hipotenusa por Pitágoras; α con tg α = opuesto / contiguo."}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Combinatoria ───────────── */

export function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i += 1) r *= i;
  return r;
}

/** Variaciones con repetición, ordinarias, permutaciones y combinaciones de m elementos tomados n a n. */
export function combinatoria(m: number, n: number) {
  return {
    vr: m ** n,
    v: factorial(m) / factorial(m - n),
    p: factorial(m),
    c: factorial(m) / (factorial(n) * factorial(m - n)),
  };
}

export function CombinatoriaExplorador({ block }: { block: ToolBlock }) {
  const init = { m: int(block.params?.a, 8, 1, 10), n: int(block.params?.b, 3, 1, 10) };
  const [v, setV] = useState(init);
  const n = Math.min(v.n, v.m);
  const r = combinatoria(v.m, n);
  const fm = (x: number) => fmtEs(x, 0);
  const row = "flex items-baseline justify-between gap-4 rounded-lg bg-black/20 px-3 py-2";
  return (
    <Frame
      hint={block.hint ?? "Sube n con m fijo: las variaciones crecen mucho más rápido que las combinaciones, que dividen entre n!."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Elementos m" value={v.m} min={1} max={10} color={MANIM.blue} onChange={(m) => setV((p) => ({ ...p, m }))} />
          <Slider label="Se toman n" value={n} min={1} max={v.m} color={MANIM.orange} onChange={(nn) => setV((p) => ({ ...p, n: nn }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <div className={row}><span>Variaciones con repetición (VR = mⁿ)</span><strong data-testid="tool-comb-vr" style={{ color: MANIM.blue }}>{fm(r.vr)}</strong></div>
        <div className={row}><span>Variaciones ordinarias (importa el orden)</span><strong data-testid="tool-comb-v" style={{ color: MANIM.orange }}>{fm(r.v)}</strong></div>
        <div className={row}><span>Permutaciones (m!)</span><strong data-testid="tool-comb-p" style={{ color: MANIM.purple }}>{fm(r.p)}</strong></div>
        <div className={row}><span>Combinaciones (no importa el orden)</span><strong data-testid="tool-comb-c" style={{ color: MANIM.green }}>{fm(r.c)}</strong></div>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-comb-nota">
          {`Cada combinación aparece ${fm(factorial(n))} veces entre las variaciones: ${fm(r.v)} : ${fm(factorial(n))} = ${fm(r.c)}.`}
        </p>
      </div>
    </Frame>
  );
}
