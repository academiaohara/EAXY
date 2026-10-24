"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  COMP, INV, SYM, compose, composeText, domainOf, val, type DomKind, type Fn,
} from "@/components/lesson/anim/fnlib";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const g = (x: number | null, d = 3) => (x === null ? "no definida" : fmtEs(x, d));
const ink = "text-[color:var(--stage-ink,#fff)]";
const sgn = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);

const W = 520;
const H = 320;

type Curve = { fn: Fn; color: string; dashed?: boolean; ok?: (x: number) => boolean; width?: number };
type Mark = { x: number; y: number; color: string; r?: number };

/** Gráfica de funciones con ejes, asíntotas y puntos; corta el trazo donde no hay valor o hay saltos. */
function FnPlot({ curves, xr, yr, marks = [], vlines = [], hlines = [], xTicks, testId }: {
  curves: Curve[]; xr: [number, number]; yr: [number, number]; marks?: Mark[]; vlines?: number[]; hlines?: number[]; xTicks?: { x: number; label: string }[]; testId: string;
}) {
  const px = (x: number) => 20 + ((x - xr[0]) / (xr[1] - xr[0])) * (W - 40);
  const py = (y: number) => H - 14 - ((y - yr[0]) / (yr[1] - yr[0])) * (H - 28);
  const span = yr[1] - yr[0];
  const N = 360;
  const paths: { key: string; pts: string; c: Curve }[] = [];
  curves.forEach((c, ci) => {
    let cur: string[] = [];
    let prev: number | null = null;
    const flush = () => {
      if (cur.length > 1) paths.push({ key: `${ci}-${paths.length}`, pts: cur.join(" "), c });
      cur = [];
      prev = null;
    };
    for (let i = 0; i <= N; i += 1) {
      const x = xr[0] + (i / N) * (xr[1] - xr[0]);
      const y = c.ok && !c.ok(x) ? NaN : c.fn(x);
      if (!Number.isFinite(y) || Math.abs(y) > span * 20 || (prev !== null && Math.abs(y - prev) > span * 0.8)) {
        flush();
        if (Number.isFinite(y) && Math.abs(y) <= span * 20) {
          cur.push(`${px(x)},${py(y)}`);
          prev = y;
        }
        continue;
      }
      cur.push(`${px(x)},${py(clamp(y, yr[0] - span, yr[1] + span))}`);
      prev = y;
    }
    flush();
  });
  const ticks = xTicks ?? Array.from({ length: Math.floor(xr[1]) - Math.ceil(xr[0]) + 1 }, (_, i) => ({ x: Math.ceil(xr[0]) + i, label: String(Math.ceil(xr[0]) + i) })).filter((t) => t.x % 2 === 0 && t.x !== 0);
  return (
    <Svg w={W} h={H} testId={testId}>
      {xr[0] <= 0 && xr[1] >= 0 ? <line x1={px(0)} y1={8} x2={px(0)} y2={H - 8} stroke={MANIM.ink} strokeWidth={1.6} /> : null}
      {yr[0] <= 0 && yr[1] >= 0 ? <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} /> : null}
      {ticks.map((t) => (
        <g key={t.x}>
          <line x1={px(t.x)} y1={py(0) - 4} x2={px(t.x)} y2={py(0) + 4} stroke={MANIM.ink} strokeWidth={1.2} />
          <text x={px(t.x)} y={Math.min(H - 2, py(0) + 18)} fontSize={11} fill={MANIM.muted} textAnchor="middle">{t.label}</text>
        </g>
      ))}
      {vlines.map((x) => <line key={`v${x}`} x1={px(x)} y1={8} x2={px(x)} y2={H - 8} stroke={MANIM.red} strokeWidth={1.8} strokeDasharray="6 5" />)}
      {hlines.map((y) => <line key={`h${y}`} x1={10} y1={py(y)} x2={W - 10} y2={py(y)} stroke={MANIM.red} strokeWidth={1.8} strokeDasharray="6 5" />)}
      {paths.map((p) => <polyline key={p.key} points={p.pts} fill="none" stroke={p.c.color} strokeWidth={p.c.width ?? 3} strokeDasharray={p.c.dashed ? "6 5" : undefined} />)}
      {marks.map((m, i) => <circle key={i} cx={px(m.x)} cy={py(m.y)} r={m.r ?? 5.5} fill={m.color} />)}
    </Svg>
  );
}

/* ───────────── Dominio ───────────── */

const DOM_KINDS: { value: number; label: string; kind: DomKind }[] = [
  { value: 0, label: "Polinómica", kind: "polinomica" },
  { value: 1, label: "Racional", kind: "racional" },
  { value: 2, label: "Raíz cuadrada", kind: "radical" },
  { value: 3, label: "Logaritmo", kind: "logaritmica" },
  { value: 4, label: "√(x² − q)", kind: "raiz-cuadrado" },
];

/** Dominio de los cinco tipos básicos de función, con el trazo solo donde hay valor. */
export function DominioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 1, 0, 4), p: int(ini[1], 2, -5, 5), q: int(ini[2], 3, -5, 9) };
  const [v, setV] = useState(init);
  const kind = DOM_KINDS[v.t]!.kind;
  const d = domainOf(kind, v.p, v.q);
  const excl = kind === "racional" ? Array.from(new Set([v.p, v.q])) : kind === "logaritmica" ? [v.p] : kind === "radical" ? [v.p] : [];
  return (
    <Frame
      hint={block.hint ?? "Mueve p y q: el dominio cambia y el trazo desaparece justo donde la expresión no tiene sentido (denominador 0, radicando negativo, argumento no positivo)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tipo de función" items={DOM_KINDS.map((k) => ({ value: k.value, label: k.label }))} value={v.t} onChange={(t) => setV((s) => ({ ...s, t }))} />
          {kind !== "raiz-cuadrado" && kind !== "polinomica" ? <Slider label="p" value={v.p} min={-5} max={5} color={MANIM.blue} onChange={(p) => setV((s) => ({ ...s, p }))} format={f} /> : null}
          {kind === "polinomica" ? <Slider label="p" value={v.p} min={-5} max={5} color={MANIM.blue} onChange={(p) => setV((s) => ({ ...s, p }))} format={f} /> : null}
          {kind === "racional" || kind === "raiz-cuadrado" ? <Slider label="q" value={v.q} min={-5} max={9} color={MANIM.orange} onChange={(q) => setV((s) => ({ ...s, q }))} format={f} /> : null}
          {kind === "radical" ? <Choice label="Sentido" items={[{ value: 1, label: "√(x − p)" }, { value: -1, label: "√(p − x)" }]} value={v.q >= 0 ? 1 : -1} onChange={(q) => setV((s) => ({ ...s, q }))} /> : null}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-do-formula">{d.formula}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-do-dominio">{`Dom f = ${d.text}`}</p>
      </div>
      <FnPlot testId="tool-do-grafica" xr={[-8, 8]} yr={[-6, 6]} vlines={kind === "racional" ? excl : []} curves={[{ fn: d.f, color: MANIM.blue, ok: d.ok }]} />
    </Frame>
  );
}

/* ───────────── Simetría ───────────── */

/** Función par, impar o sin simetría: f(−x) frente a f(x) en un punto. */
export function SimetriaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 3, 0, SYM.length - 1), x2: int(ini[1], 3, 1, 12) };
  const [v, setV] = useState(init);
  const s = SYM[v.i]!;
  const x0 = v.x2 / 2;
  const a = val(s.f, x0);
  const b = val(s.f, -x0);
  const tipo = s.parity === "par" ? "Par: f(−x) = f(x). Su gráfica es simétrica respecto del eje Y." : s.parity === "impar" ? "Impar: f(−x) = −f(x). Su gráfica es simétrica respecto del origen." : "Ni par ni impar: f(−x) no es f(x) ni −f(x).";
  return (
    <Frame
      hint={block.hint ?? "Compara f(x₀) con f(−x₀) en distintas funciones: iguales (par), opuestos (impar) o sin relación."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={SYM.map((q, i) => ({ value: i, label: q.label.replace("f(x) = ", "") }))} value={v.i} onChange={(i) => setV((p) => ({ ...p, i }))} />
          <Slider label="Punto x₀" value={x0} min={0.5} max={6} step={0.5} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, x2: Math.round(x * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-si-valores">{`f(${fmtEs(x0, 1)}) = ${g(a)}    f(−${fmtEs(x0, 1)}) = ${g(b)}`}</p>
        <p className="text-xl font-bold" style={{ color: s.parity === "ninguna" ? MANIM.red : MANIM.green }} data-testid="tool-si-tipo">{tipo}</p>
      </div>
      <FnPlot testId="tool-si-grafica" xr={[-6, 6]} yr={[-6, 6]} curves={[{ fn: s.f, color: MANIM.blue, ok: s.domainOk }]} marks={[...(a !== null ? [{ x: x0, y: a, color: MANIM.yellow }] : []), ...(b !== null ? [{ x: -x0, y: b, color: MANIM.orange }] : [])]} />
    </Frame>
  );
}

/* ───────────── Signo y cortes ───────────── */

/** f(x) = s·(x − r₁)(x − r₂)[(x − r₃)]: cortes con los ejes y tabla de signos. */
export function SignoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { r1: int(ini[0], -2, -6, 6), r2: int(ini[1], 1, -6, 6), r3: int(ini[2], 3, -6, 6), tres: int(ini[3], 0, 0, 1), s: int(ini[4], 1, -1, 1) === -1 ? -1 : 1 };
  const [v, setV] = useState(init);
  const roots = v.tres ? [v.r1, v.r2, v.r3] : [v.r1, v.r2];
  const fn = (x: number) => roots.reduce((acc, r) => acc * (x - r), v.s);
  const distinct = Array.from(new Set(roots)).sort((a, b) => a - b);
  const edges = [-Infinity, ...distinct, Infinity];
  const rows = edges.slice(0, -1).map((lo, i) => {
    const hi = edges[i + 1]!;
    const mid = lo === -Infinity ? hi - 1 : hi === Infinity ? lo + 1 : (lo + hi) / 2;
    const val0 = fn(mid);
    const t = (n: number) => (n === Infinity ? "+∞" : n === -Infinity ? "−∞" : f(n));
    return { label: `(${t(lo)}, ${t(hi)})`, pos: val0 > 0 };
  });
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const expr = `f(x) = ${v.s === -1 ? "−" : ""}(x ${sgn(-v.r1)})(x ${sgn(-v.r2)})${v.tres ? `(x ${sgn(-v.r3)})` : ""}`;
  return (
    <Frame
      hint={block.hint ?? "Mueve las raíces: la función solo cambia de signo en ellas. Si dos raíces coinciden (raíz doble), no cambia de signo al pasar por ahí."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Raíz r₁" value={v.r1} min={-6} max={6} color={MANIM.blue} onChange={set("r1")} format={f} />
          <Slider label="Raíz r₂" value={v.r2} min={-6} max={6} color={MANIM.orange} onChange={set("r2")} format={f} />
          <Choice label="Tercer factor" items={[{ value: 0, label: "No" }, { value: 1, label: "Sí" }]} value={v.tres} onChange={(tres) => setV((p) => ({ ...p, tres }))} />
          {v.tres ? <Slider label="Raíz r₃" value={v.r3} min={-6} max={6} color={MANIM.green} onChange={set("r3")} format={f} /> : null}
          <Choice label="Signo del coeficiente principal" items={[{ value: 1, label: "+" }, { value: -1, label: "−" }]} value={v.s} onChange={(s) => setV((p) => ({ ...p, s }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-sg-formula">{expr}</p>
        <p className="text-base" data-testid="tool-sg-raices">{`Cortes con el eje X: ${distinct.map((r) => `(${f(r)}, 0)`).join("  ")}`}</p>
        <p className="text-base" data-testid="tool-sg-corte-y">{`Corte con el eje Y: (0, ${fmtEs(fn(0), 2)})`}</p>
        <p className="text-base" data-testid="tool-sg-tabla">{rows.map((r) => `${r.label}: ${r.pos ? "positiva (+)" : "negativa (−)"}`).join("   ·   ")}</p>
      </div>
      <FnPlot testId="tool-sg-grafica" xr={[-8, 8]} yr={[-10, 10]} curves={[{ fn, color: MANIM.blue }]} marks={[...distinct.map((r) => ({ x: r, y: 0, color: MANIM.yellow })), { x: 0, y: fn(0), color: MANIM.green }]} />
    </Frame>
  );
}

/* ───────────── Función raíz ───────────── */

/** f(x) = a·ⁿ√(x − h) + k con n = 2 o 3: dominio, recorrido y gráfica. */
export function FuncionRaizExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const nz = (x: number) => (x === 0 ? 1 : x);
  const init = { n: int(ini[0], 2, 2, 3), a: nz(int(ini[1], 1, -3, 3)), h: int(ini[2], 0, -5, 5), k: int(ini[3], 0, -5, 5) };
  const [v, setV] = useState(init);
  const a = nz(v.a);
  const fn: Fn = (x) => (v.n === 2 ? a * Math.sqrt(x - v.h) + v.k : a * Math.cbrt(x - v.h) + v.k);
  const dom = v.n === 2 ? `[${f(v.h)}, +∞)` : "ℝ";
  const rec = v.n === 3 ? "ℝ" : a > 0 ? `[${f(v.k)}, +∞)` : `(−∞, ${f(v.k)}]`;
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  return (
    <Frame
      hint={block.hint ?? "Con índice par la raíz solo existe a la derecha de h; con índice impar existe en todo ℝ. El signo de a decide si sube o baja."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Índice" items={[{ value: 2, label: "Raíz cuadrada" }, { value: 3, label: "Raíz cúbica" }]} value={v.n} onChange={(n) => setV((p) => ({ ...p, n }))} />
          <Slider label="a" value={a} min={-3} max={3} color={MANIM.blue} onChange={set("a")} format={f} />
          <Slider label="h" value={v.h} min={-5} max={5} color={MANIM.orange} onChange={set("h")} format={f} />
          <Slider label="k" value={v.k} min={-5} max={5} color={MANIM.green} onChange={set("k")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-fr-formula">{`f(x) = ${a === 1 ? "" : a === -1 ? "−" : f(a)}${v.n === 2 ? "√" : "∛"}(x ${sgn(-v.h)}) ${sgn(v.k)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-fr-dominio">{`Dom f = ${dom}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.yellow }} data-testid="tool-fr-recorrido">{`Im f = ${rec}`}</p>
      </div>
      <FnPlot testId="tool-fr-grafica" xr={[-8, 8]} yr={[-6, 6]} curves={[{ fn, color: MANIM.blue }]} marks={[{ x: v.h, y: v.k, color: MANIM.yellow }]} />
    </Frame>
  );
}

/* ───────────── Exponencial y logaritmo ───────────── */

const BASES = [0.5, 2, Math.E, 3, 10];
const baseTxt = (b: number) => (b === Math.E ? "e" : fmtEs(b, 1));

/** y = aˣ y su inversa y = logₐ x, simétricas respecto de y = x. */
export function ExpLogExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { b: int(ini[0], 1, 0, BASES.length - 1) };
  const [v, setV] = useState(init);
  const a = BASES[v.b]!;
  const crece = a > 1;
  return (
    <Frame
      hint={block.hint ?? "Las dos curvas son simétricas respecto de la diagonal. Con base menor que 1 ambas decrecen. Fíjate en las asíntotas: el eje X para la exponencial y el eje Y para el logaritmo."}
      onReset={() => setV(init)}
      controls={<Choice label="Base a" items={BASES.map((b, i) => ({ value: i, label: baseTxt(b) }))} value={v.b} onChange={(b) => setV({ b })} />}
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" style={{ color: MANIM.blue }} data-testid="tool-el-exp">{`y = ${baseTxt(a)}ˣ: Dom = ℝ, Im = (0, +∞), pasa por (0, 1) y (1, ${baseTxt(a)}), asíntota y = 0`}</p>
        <p className="text-lg" style={{ color: MANIM.orange }} data-testid="tool-el-log">{`y = log${a === Math.E ? "ₑ" : ""} x (base ${baseTxt(a)}): Dom = (0, +∞), Im = ℝ, pasa por (1, 0) y (${baseTxt(a)}, 1), asíntota x = 0`}</p>
        <p className="text-base" data-testid="tool-el-monotonia">{crece ? "Base > 1: las dos son crecientes." : "Base < 1: las dos son decrecientes."}</p>
      </div>
      <FnPlot
        testId="tool-el-grafica"
        xr={[-4, 8]}
        yr={[-4, 8]}
        curves={[
          { fn: (x) => a ** x, color: MANIM.blue },
          { fn: (x) => (x > 0 ? Math.log(x) / Math.log(a) : NaN), color: MANIM.orange },
          { fn: (x) => x, color: MANIM.muted, dashed: true, width: 1.8 },
        ]}
        marks={[{ x: 0, y: 1, color: MANIM.blue }, { x: 1, y: a, color: MANIM.blue }, { x: 1, y: 0, color: MANIM.orange }, { x: a, y: 1, color: MANIM.orange }]}
      />
    </Frame>
  );
}

/* ───────────── Trigonométricas ───────────── */

const TRIG = [
  { label: "sen", fn: Math.sin },
  { label: "cos", fn: Math.cos },
  { label: "tg", fn: Math.tan },
] as const;

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const piOver = (num: number, den: number) => {
  const d = gcd(num, den);
  const n = num / d;
  const m = den / d;
  return m === 1 ? (n === 1 ? "π" : `${n}π`) : `${n === 1 ? "" : n}π/${m}`;
};

/** y = A·sen(Bx + C) + D (o cos, tg): amplitud, periodo, desfase y recorrido. */
export function TrigFuncionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 0, 0, 2), A: int(ini[1], 2, 1, 4), B: int(ini[2], 1, 1, 4), C: int(ini[3], 0, -180, 180), D: int(ini[4], 0, -2, 2) };
  const [v, setV] = useState(init);
  const T = TRIG[v.t]!;
  const c = (v.C * Math.PI) / 180;
  const fn: Fn = (x) => v.A * T.fn(v.B * x + c) + v.D;
  const period = v.t === 2 ? piOver(1, v.B) : piOver(2, v.B);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const ticks = [-2, -1, 0, 1, 2, 3, 4].filter((k) => k !== 0).map((k) => ({ x: (k * Math.PI) / 2, label: k % 2 === 0 ? `${k / 2 === 1 ? "" : k / 2}π` : `${k}π/2` }));
  return (
    <Frame
      hint={block.hint ?? "A estira en vertical, B comprime en horizontal (periodo 2π/B), C desplaza en horizontal y D en vertical. Prueba con la tangente: no tiene amplitud y tiene asíntotas."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={TRIG.map((q, i) => ({ value: i, label: q.label }))} value={v.t} onChange={(t) => setV((p) => ({ ...p, t }))} />
          <Slider label="A" value={v.A} min={1} max={4} color={MANIM.blue} onChange={set("A")} />
          <Slider label="B" value={v.B} min={1} max={4} color={MANIM.orange} onChange={set("B")} />
          <Slider label="C (desfase, en grados)" value={v.C} min={-180} max={180} step={15} color={MANIM.green} unit="°" onChange={set("C")} format={f} />
          <Slider label="D" value={v.D} min={-2} max={2} color={MANIM.purple} onChange={set("D")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-tf-formula">{`f(x) = ${v.A === 1 ? "" : v.A}${T.label}(${v.B === 1 ? "" : v.B}x ${v.C < 0 ? "−" : "+"} ${Math.abs(v.C)}°) ${v.D < 0 ? "−" : "+"} ${Math.abs(v.D)}`}</p>
        <p className="text-lg" data-testid="tool-tf-periodo">{`Periodo = ${period}`}</p>
        <p className="text-lg" data-testid="tool-tf-amplitud">{v.t === 2 ? "La tangente no tiene amplitud (no está acotada)" : `Amplitud = ${v.A}`}</p>
        <p className="text-lg" data-testid="tool-tf-recorrido">{v.t === 2 ? "Im f = ℝ" : `Im f = [${f(v.D - v.A)}, ${f(v.D + v.A)}]`}</p>
      </div>
      <FnPlot testId="tool-tf-grafica" xr={[-2 * Math.PI, 4 * Math.PI]} yr={[-7, 7]} xTicks={ticks} curves={[{ fn, color: MANIM.blue }]} />
    </Frame>
  );
}

/* ───────────── Valor absoluto de una función ───────────── */

/** |f(x)| con f lineal o cuadrática: la parte negativa se refleja y queda escrita a trozos. */
export function AbsFuncionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const nz = (x: number) => (x === 0 ? 1 : x);
  const init = { t: int(ini[0], 0, 0, 1), a: nz(int(ini[1], 1, -3, 3)), b: int(ini[2], -2, -6, 6), c: int(ini[3], 4, 1, 9) };
  const [v, setV] = useState(init);
  const a = nz(v.a);
  const inner: Fn = v.t === 0 ? (x) => a * x + v.b : (x) => x * x - v.c;
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const x0 = -v.b / a;
  const r = Math.sqrt(v.c);
  const rt = Number.isInteger(r) ? String(r) : `√${v.c}`;
  const trozos =
    v.t === 0
      ? `|${a === 1 ? "" : a === -1 ? "−" : f(a)}x ${sgn(v.b)}| = ${a > 0 ? `{ ${a === 1 ? "" : a}x ${sgn(v.b)}  si x ≥ ${fmtEs(x0, 2)};  −(${a === 1 ? "" : a}x ${sgn(v.b)})  si x < ${fmtEs(x0, 2)} }` : `{ ${a === -1 ? "−" : a}x ${sgn(v.b)}  si x ≤ ${fmtEs(x0, 2)};  −(${a === -1 ? "−" : a}x ${sgn(v.b)})  si x > ${fmtEs(x0, 2)} }`}`
      : `|x² − ${v.c}| = { x² − ${v.c}  si |x| ≥ ${rt};  −x² + ${v.c}  si |x| < ${rt} }`;
  return (
    <Frame
      hint={block.hint ?? "La línea discontinua es f(x) y la continua es |f(x)|: donde f es negativa, su gráfica se refleja respecto del eje X. El recorrido de |f| nunca baja de 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función de dentro" items={[{ value: 0, label: "ax + b" }, { value: 1, label: "x² − c" }]} value={v.t} onChange={(t) => setV((p) => ({ ...p, t }))} />
          {v.t === 0 ? (
            <>
              <Slider label="a" value={a} min={-3} max={3} color={MANIM.blue} onChange={set("a")} format={f} />
              <Slider label="b" value={v.b} min={-6} max={6} color={MANIM.orange} onChange={set("b")} format={f} />
            </>
          ) : (
            <Slider label="c" value={v.c} min={1} max={9} color={MANIM.blue} onChange={set("c")} />
          )}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-ab-trozos">{trozos}</p>
        <p className="text-lg" data-testid="tool-ab-recorrido">{`Im |f| = [0, +∞)${v.t === 0 ? `   ·   vértice en x = ${fmtEs(x0, 2)}` : `   ·   se anula en x = ±${rt}`}`}</p>
      </div>
      <FnPlot testId="tool-ab-grafica" xr={[-8, 8]} yr={[-4, 12]} curves={[{ fn: inner, color: MANIM.muted, dashed: true, width: 2 }, { fn: (x) => Math.abs(inner(x)), color: MANIM.blue }]} />
    </Frame>
  );
}

/* ───────────── Oferta y demanda ───────────── */

/** Oferta p = ao·q + bo, demanda p = bd − ad·q: equilibrio y situación a un precio dado. */
export function OfertaDemandaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { bo: int(ini[0], 2, 0, 10), ao: int(ini[1], 2, 1, 5), bd: int(ini[2], 20, 10, 40), ad: int(ini[3], 3, 1, 5), p: int(ini[4], 12, 0, 40) };
  const [v, setV] = useState(init);
  const qe = (v.bd - v.bo) / (v.ao + v.ad);
  const pe = v.ao * qe + v.bo;
  const qo = Math.max(0, (v.p - v.bo) / v.ao);
  const qd = Math.max(0, (v.bd - v.p) / v.ad);
  const dif = qd - qo;
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  return (
    <Frame
      hint={block.hint ?? "El precio de equilibrio es donde se cortan las rectas. Por debajo de él se demanda más de lo que se ofrece (escasez); por encima, sobra producto (excedente)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Oferta: precio mínimo b" value={v.bo} min={0} max={10} color={MANIM.blue} onChange={set("bo")} />
          <Slider label="Oferta: pendiente" value={v.ao} min={1} max={5} color={MANIM.blue} onChange={set("ao")} />
          <Slider label="Demanda: precio máximo" value={v.bd} min={10} max={40} color={MANIM.orange} onChange={set("bd")} />
          <Slider label="Demanda: pendiente" value={v.ad} min={1} max={5} color={MANIM.orange} onChange={set("ad")} />
          <Slider label="Precio p" value={v.p} min={0} max={40} color={MANIM.yellow} onChange={set("p")} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-od-funciones">{`Oferta: p = ${v.ao}q + ${v.bo}    Demanda: p = ${v.bd} − ${v.ad}q`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-od-equilibrio">{`Equilibrio: q = ${fmtEs(qe, 2)}, p = ${fmtEs(pe, 2)}`}</p>
        <p className="text-lg" style={{ color: Math.abs(dif) < 1e-9 ? MANIM.green : MANIM.red }} data-testid="tool-od-mercado">
          {`A p = ${v.p}: se ofrecen ${fmtEs(qo, 2)} y se demandan ${fmtEs(qd, 2)} → ${Math.abs(dif) < 1e-9 ? "mercado en equilibrio" : dif > 0 ? `escasez de ${fmtEs(dif, 2)} unidades` : `excedente de ${fmtEs(-dif, 2)} unidades`}`}
        </p>
      </div>
      <FnPlot testId="tool-od-grafica" xr={[0, 16]} yr={[0, 42]} xTicks={[4, 8, 12, 16].map((x) => ({ x, label: String(x) }))} curves={[{ fn: (q) => v.ao * q + v.bo, color: MANIM.blue }, { fn: (q) => v.bd - v.ad * q, color: MANIM.orange }]} hlines={[v.p]} marks={[{ x: qe, y: pe, color: MANIM.green, r: 7 }]} />
    </Frame>
  );
}

/* ───────────── Composición ───────────── */

/** f∘g y g∘f con expresiones y valores en un punto. */
export function ComposicionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { fi: int(ini[0], 2, 0, COMP.length - 1), gi: int(ini[1], 0, 0, COMP.length - 1), x2: int(ini[2], 2, -10, 10) };
  const [v, setV] = useState(init);
  const F = COMP[v.fi]!;
  const G = COMP[v.gi]!;
  const x = v.x2 / 2;
  const a = compose(F, G, x);
  const b = compose(G, F, x);
  return (
    <Frame
      hint={block.hint ?? "Cambia el orden: f∘g y g∘f casi nunca coinciden. Prueba f = √x y g = x + 2: f∘g no existe para x menor que −2."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="f(x) =" items={COMP.map((q, i) => ({ value: i, label: q.label }))} value={v.fi} onChange={(fi) => setV((p) => ({ ...p, fi }))} />
          <Choice label="g(x) =" items={COMP.map((q, i) => ({ value: i, label: q.label }))} value={v.gi} onChange={(gi) => setV((p) => ({ ...p, gi }))} />
          <Slider label="x" value={x} min={-5} max={5} step={0.5} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, x2: Math.round(n * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-cp-fog">{`(f∘g)(x) = f(g(x)) = ${composeText(F, G)}   →   en x = ${fmtEs(x, 1)}: ${g(a)}`}</p>
        <p className="text-lg" data-testid="tool-cp-gof">{`(g∘f)(x) = g(f(x)) = ${composeText(G, F)}   →   en x = ${fmtEs(x, 1)}: ${g(b)}`}</p>
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-cp-valores">{`g(${fmtEs(x, 1)}) = ${g(val(G.f, x))}   ·   f(${fmtEs(x, 1)}) = ${g(val(F.f, x))}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Inversa ───────────── */

/** Una función y su inversa: simétricas respecto de y = x. */
export function InversaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, INV.length - 1), x2: int(ini[1], 2, 1, 8) };
  const [v, setV] = useState(init);
  const it = INV[v.i]!;
  const x0 = v.x2 / 2;
  const y0 = val(it.f, x0);
  return (
    <Frame
      hint={block.hint ?? "La gráfica de f⁻¹ es la de f reflejada en la diagonal: el punto (a, b) pasa a (b, a). Con f(x) = x² en todo ℝ falla: a dos valores de x les corresponde el mismo."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={INV.map((q, i) => ({ value: i, label: q.label.replace("f(x) = ", "") }))} value={v.i} onChange={(i) => setV((p) => ({ ...p, i }))} />
          <Slider label="Punto x₀" value={x0} min={0.5} max={4} step={0.5} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, x2: Math.round(n * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-iv-funcion">{it.label}</p>
        <p className="text-xl font-bold" style={{ color: it.injective ? MANIM.green : MANIM.red }} data-testid="tool-iv-inversa">{it.invLabel}</p>
        <p className="text-base" data-testid="tool-iv-punto">{y0 === null ? "" : it.injective ? `(${fmtEs(x0, 1)}, ${g(y0)}) ∈ f   ⇒   (${g(y0)}, ${fmtEs(x0, 1)}) ∈ f⁻¹` : `f(${fmtEs(x0, 1)}) = f(−${fmtEs(x0, 1)}) = ${g(y0)}: dos x distintos con la misma imagen`}</p>
      </div>
      <FnPlot
        testId="tool-iv-grafica"
        xr={[-6, 6]}
        yr={[-6, 6]}
        curves={[
          { fn: it.f, color: MANIM.blue, ok: it.domainOk },
          ...(it.injective ? [{ fn: it.inv, color: MANIM.orange }] : []),
          { fn: (x: number) => x, color: MANIM.muted, dashed: true, width: 1.8 },
        ]}
        marks={y0 === null ? [] : [{ x: x0, y: y0, color: MANIM.blue }, ...(it.injective ? [{ x: y0, y: x0, color: MANIM.orange }] : [{ x: -x0, y: y0, color: MANIM.red }])]}
      />
    </Frame>
  );
}

