"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracTex, fracValue } from "@/components/lesson/anim/eq";
import { polyTex } from "@/components/lesson/anim/poly";
import { bestElimination, capitales, eqTex, lineCurve, solveSystem, type Curve, type Eq2 } from "@/components/lesson/anim/sys";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const thou = (x: number) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const dec = (x: number) => fmtEs(Math.round(x * 100) / 100, 2);
const R = 8;
const W = 320;
const H = 320;
const px = (x: number) => 10 + ((x + R) / (2 * R)) * (W - 20);
const py = (y: number) => H - 10 - ((y + R) / (2 * R)) * (H - 20);

function Plane({ children, testId }: { children: ReactNode; testId: string }) {
  const ticks = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  return (
    <Svg w={W} h={H} testId={testId}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={10} x2={px(t)} y2={H - 10} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
          <line x1={10} y1={py(t)} x2={W - 10} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
        </g>
      ))}
      {children}
    </Svg>
  );
}

/** Segmento visible de `ax + by = c` dentro del recuadro. */
function lineSeg(a: number, b: number, c: number): [number, number, number, number] | null {
  if (a === 0 && b === 0) return null;
  if (b === 0) return [px(c / a), py(-R), px(c / a), py(R)];
  const y = (x: number) => (c - a * x) / b;
  return [px(-R), py(y(-R)), px(R), py(y(R))];
}

const clipId = (id: string) => `clip-${id}`;
function Line({ seg, color, id, width = 3.5 }: { seg: [number, number, number, number] | null; color: string; id: string; width?: number }) {
  if (!seg) return null;
  return (
    <g clipPath={`url(#${clipId(id)})`}>
      <defs>
        <clipPath id={clipId(id)}>
          <rect x={10} y={10} width={W - 20} height={H - 20} />
        </clipPath>
      </defs>
      <line x1={seg[0]} y1={seg[1]} x2={seg[2]} y2={seg[3]} stroke={color} strokeWidth={width} strokeLinecap="round" />
    </g>
  );
}

/* ───────────── Una ecuación con dos incógnitas ───────────── */

export function RectaDosIncognitasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, -5, 5), b: int(ini[1], 2, -5, 5), c: int(ini[2], 4, -10, 10) };
  const [v, setV] = useState(init);
  const { a, b, c } = v;
  const tipo =
    a === 0 && b === 0
      ? c === 0
        ? "Todo el plano: 0 = 0 se cumple siempre"
        : "Ningún punto: 0 = número ≠ 0 es imposible"
      : b === 0
        ? `Recta vertical x = ${fmtEs(c / a, 2)}`
        : a === 0
          ? `Recta horizontal y = ${fmtEs(c / b, 2)}`
          : "Recta oblicua";
  const rows = [-2, -1, 0, 1, 2].map((x) => ({ x, y: b === 0 ? null : (c - a * x) / b }));
  const pts = rows.filter((r) => r.y !== null && Math.abs(r.y) <= R) as { x: number; y: number }[];

  return (
    <Frame
      hint={block.hint ?? "Cambia a, b y c: la ecuación siempre dibuja una recta (salvo que a y b sean 0). Cada punto de la recta es una solución."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a" value={a} min={-5} max={5} color={MANIM.blue} onChange={(a2) => setV((p) => ({ ...p, a: a2 }))} format={f} />
          <Slider label="b" value={b} min={-5} max={5} color={MANIM.green} onChange={(b2) => setV((p) => ({ ...p, b: b2 }))} format={f} />
          <Slider label="c" value={c} min={-10} max={10} color={MANIM.orange} onChange={(c2) => setV((p) => ({ ...p, c: c2 }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${eqTex([a, b, c])}$`} className="text-2xl" />
        <p className="text-lg font-semibold" style={{ color: tipo.startsWith("Ningún") ? MANIM.red : MANIM.green }} data-testid="tool-recta-tipo">{tipo}</p>
        {b !== 0 ? (
          <div className="flex flex-wrap gap-x-4">
            {rows.map((r) => (
              <MathRenderer key={r.x} text={`$(${r.x},\\ ${num(r.y!)})$`} className="text-base" />
            ))}
          </div>
        ) : null}
      </div>
      <Plane testId="tool-recta">
        <Line seg={lineSeg(a, b, c)} color={MANIM.blue} id="recta" />
        {pts.map((p) => (
          <circle key={p.x} cx={px(p.x)} cy={py(p.y)} r={6} fill={MANIM.yellow} />
        ))}
      </Plane>
    </Frame>
  );
}

const num = (x: number) => String(Math.round(x * 100) / 100).replace(".", "{,}");

/* ───────────── Sistema lineal: solución gráfica ───────────── */

export function SistemaGraficoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    a1: int(ini[0], 1, -5, 5), b1: int(ini[1], 2, -5, 5), c1: int(ini[2], 4, -10, 10),
    a2: int(ini[3], 1, -5, 5), b2: int(ini[4], 1, -5, 5), c2: int(ini[5], 3, -10, 10),
  };
  const [v, setV] = useState(init);
  const e1: Eq2 = [v.a1, v.b1, v.c1];
  const e2: Eq2 = [v.a2, v.b2, v.c2];
  const s = solveSystem(e1, e2);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));

  return (
    <Frame
      hint={block.hint ?? "Mueve los coeficientes: busca cuándo las rectas se cortan, son paralelas o coinciden."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a₁" value={v.a1} min={-5} max={5} color={MANIM.blue} onChange={set("a1")} format={f} />
          <Slider label="b₁" value={v.b1} min={-5} max={5} color={MANIM.blue} onChange={set("b1")} format={f} />
          <Slider label="c₁" value={v.c1} min={-10} max={10} color={MANIM.blue} onChange={set("c1")} format={f} />
          <Slider label="a₂" value={v.a2} min={-5} max={5} color={MANIM.orange} onChange={set("a2")} format={f} />
          <Slider label="b₂" value={v.b2} min={-5} max={5} color={MANIM.orange} onChange={set("b2")} format={f} />
          <Slider label="c₂" value={v.c2} min={-10} max={10} color={MANIM.orange} onChange={set("c2")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\begin{cases} ${eqTex(e1)} \\\\ ${eqTex(e2)} \\end{cases}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: s.kind === "unica" ? MANIM.green : s.kind === "incompatible" ? MANIM.red : MANIM.yellow }} data-testid="tool-sistema-tipo">
          {s.kind === "unica" ? (
            <MathRenderer text={`Una solución: $x = ${fracTex(s.x)},\\ y = ${fracTex(s.y)}$`} className="inline" />
          ) : s.kind === "incompatible" ? (
            "Incompatible: sin solución (rectas paralelas)"
          ) : (
            "Indeterminado: infinitas soluciones (la misma recta)"
          )}
        </p>
      </div>
      <Plane testId="tool-sistema">
        <Line seg={lineSeg(...e1)} color={MANIM.blue} id="s1" />
        <Line seg={lineSeg(...e2)} color={MANIM.orange} id="s2" width={s.kind === "indeterminado" ? 2 : 3.5} />
        {s.kind === "unica" && Math.abs(fracValue(s.x)) <= R && Math.abs(fracValue(s.y)) <= R ? (
          <circle cx={px(fracValue(s.x))} cy={py(fracValue(s.y))} r={8} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
        ) : null}
      </Plane>
    </Frame>
  );
}

/* ───────────── Reducción: elige los multiplicadores ───────────── */

export function ReduccionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const e1: Eq2 = [int(ini[0], 3, -9, 9) || 1, int(ini[1], -5, -9, 9) || 1, int(ini[2], 1, -99, 99)];
  const e2: Eq2 = [int(ini[3], 1, -9, 9) || 1, int(ini[4], 2, -9, 9) || 1, int(ini[5], 15, -99, 99)];
  const [m, setM] = useState({ m1: 1, m2: 1 });
  const s1: Eq2 = [e1[0] * m.m1, e1[1] * m.m1, e1[2] * m.m1];
  const s2: Eq2 = [e2[0] * m.m2, e2[1] * m.m2, e2[2] * m.m2];
  const sum: Eq2 = [s1[0] + s2[0], s1[1] + s2[1], s1[2] + s2[2]];
  const xGone = sum[0] === 0 && sum[1] !== 0;
  const yGone = sum[1] === 0 && sum[0] !== 0;
  const both = sum[0] === 0 && sum[1] === 0;
  const estado = both
    ? "Desaparecen las dos incógnitas: elige otros multiplicadores"
    : xGone
      ? `Desaparece x → y = ${fmtEs(sum[2] / sum[1], 3)}`
      : yGone
        ? `Desaparece y → x = ${fmtEs(sum[2] / sum[0], 3)}`
        : "No desaparece ninguna incógnita todavía";
  const plan = bestElimination(e1, e2);

  return (
    <Frame
      hint={block.hint ?? "Elige los multiplicadores de cada ecuación para que, al sumarlas, una incógnita se cancele."}
      onReset={() => setM({ m1: 1, m2: 1 })}
      controls={
        <>
          <Slider label="Multiplicar la 1.ª por" value={m.m1} min={-9} max={9} color={MANIM.blue} onChange={(m1) => setM((p) => ({ ...p, m1 }))} format={f} />
          <Slider label="Multiplicar la 2.ª por" value={m.m2} min={-9} max={9} color={MANIM.orange} onChange={(m2) => setM((p) => ({ ...p, m2 }))} format={f} />
          <button type="button" className={TOOL_BTN} onClick={() => plan && setM({ m1: plan.m1, m2: plan.m2 })}>
            Mostrar multiplicadores mínimos
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\begin{aligned} ${eqTex(s1)} &\\quad (\\times ${f(m.m1)}) \\\\ ${eqTex(s2)} &\\quad (\\times ${f(m.m2)}) \\\\ \\hline ${eqTex(sum)} & \\end{aligned}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: xGone || yGone ? MANIM.green : MANIM.muted }} data-testid="tool-reduccion-estado">{estado}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Sistema no lineal: recta y curva ───────────── */

const CURVES: { id: Curve; label: string; tex: string }[] = [
  { id: "circulo", label: "Círculo", tex: "x^2 + y^2 = 25" },
  { id: "parabola", label: "Parábola", tex: "y = x^2" },
  { id: "hiperbola", label: "Hipérbola", tex: "xy = 6" },
];

export function SistemaNoLinealExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { curve: CURVES[int(ini[0], 0, 0, 2)]!.id, m: int(ini[1], 1, -4, 4), n: int(ini[2], 1, -8, 8) };
  const [v, setV] = useState<{ curve: Curve; m: number; n: number }>(init);
  const lc = lineCurve(v.curve, v.m, v.n);
  const curve = CURVES.find((c) => c.id === v.curve)!;

  const xs = Array.from({ length: 161 }, (_, i) => -R + (i * 2 * R) / 160);
  const path = (pts: [number, number][]) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(y).toFixed(1)}`).join(" ");
  let paths: string[] = [];
  if (v.curve === "circulo") {
    const t = Array.from({ length: 121 }, (_, i) => (i * 2 * Math.PI) / 120);
    paths = [path(t.map((a) => [5 * Math.cos(a), 5 * Math.sin(a)] as [number, number]))];
  } else if (v.curve === "parabola") {
    paths = [path(xs.filter((x) => x * x <= R).map((x) => [x, x * x] as [number, number]))];
  } else {
    const pos = xs.filter((x) => x >= 6 / R && x <= R).map((x) => [x, 6 / x] as [number, number]);
    const neg = xs.filter((x) => x <= -6 / R && x >= -R).map((x) => [x, 6 / x] as [number, number]);
    paths = [path(pos), path(neg)];
  }
  const caso = lc.points.length === 0 ? "No se cortan: ninguna solución" : lc.points.length === 1 ? "Se tocan en 1 punto: una solución" : "Se cortan en 2 puntos: dos soluciones";
  const tex = lc.quad ? `${polyTex([lc.quad.c, lc.quad.b, lc.quad.a])} = 0` : "\\text{ecuación de primer grado}";

  return (
    <Frame
      hint={block.hint ?? "Mueve la recta y observa cuántos puntos de corte tiene con la curva: coinciden con las soluciones del sistema."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {CURVES.map((c) => (
              <button key={c.id} type="button" className={`${TOOL_BTN} ${v.curve === c.id ? "border-white bg-white/20" : ""}`} aria-pressed={v.curve === c.id} onClick={() => setV((p) => ({ ...p, curve: c.id }))}>
                {c.label}
              </button>
            ))}
          </div>
          <Slider label="m (pendiente)" value={v.m} min={-4} max={4} color={MANIM.blue} onChange={(m) => setV((p) => ({ ...p, m }))} format={f} />
          <Slider label="n (ordenada)" value={v.n} min={-8} max={8} color={MANIM.orange} onChange={(n) => setV((p) => ({ ...p, n }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\begin{cases} y = ${v.m === 0 ? "" : v.m === 1 ? "x" : v.m === -1 ? "-x" : `${v.m}x`}${v.n === 0 ? (v.m === 0 ? "0" : "") : v.n > 0 ? (v.m === 0 ? `${v.n}` : `+${v.n}`) : `${v.n}`} \\\\ ${curve.tex} \\end{cases}$`} className="text-xl" />
        <MathRenderer text={`Al sustituir: $${tex}$`} className="text-base" />
        <p className="text-lg font-semibold" style={{ color: lc.points.length === 0 ? MANIM.red : MANIM.green }} data-testid="tool-nolineal-puntos">{caso}</p>
        {lc.points.length > 0 ? (
          <MathRenderer text={lc.points.map((p) => `$(${dec(p.x).replace(",", "{,}")},\\ ${dec(p.y).replace(",", "{,}")})$`).join("  ·  ")} className="text-base" />
        ) : null}
      </div>
      <Plane testId="tool-nolineal">
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
        ))}
        <Line seg={lineSeg(-v.m, 1, v.n)} color={MANIM.blue} id="nl" />
        {lc.points.map((p, i) =>
          Math.abs(p.x) <= R && Math.abs(p.y) <= R ? <circle key={i} cx={px(p.x)} cy={py(p.y)} r={7} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} /> : null,
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Capitales: dos inversiones ───────────── */

export function CapitalesSistemaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { total: int(ini[0], 100000, 10000, 300000), r1: int(ini[1], 4, -15, 15), r2: int(ini[2], 5, -15, 15), g: int(ini[3], 4700, -5000, 20000) };
  const [v, setV] = useState(init);
  const r = capitales(v.total, v.r1, v.r2, v.g);
  const eur = (x: number) => `${fmtEs(Math.round(x * 100) / 100, 2)} €`;
  const share = r && r.ok ? r.x / v.total : null;

  return (
    <Frame
      hint={block.hint ?? "Cambia el capital, los dos tipos y la ganancia total: el sistema x + y = capital, r₁x + r₂y = ganancia reparte el dinero."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Capital total" value={v.total} min={10000} max={300000} step={10000} color={MANIM.blue} unit=" €" onChange={(total) => setV((p) => ({ ...p, total }))} format={(x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} />
          <Slider label="Tipo de la parte x" value={v.r1} min={-15} max={15} color={MANIM.green} unit=" %" onChange={(r1) => setV((p) => ({ ...p, r1 }))} format={f} />
          <Slider label="Tipo de la parte y" value={v.r2} min={-15} max={15} color={MANIM.orange} unit=" %" onChange={(r2) => setV((p) => ({ ...p, r2 }))} format={f} />
          <Slider label="Ganancia al final del año" value={v.g} min={-5000} max={20000} step={50} color={MANIM.yellow} unit=" €" onChange={(g) => setV((p) => ({ ...p, g }))} format={(x) => String(x).replace("-", "−").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} />
        </>
      }
    >
      <div className="flex flex-col gap-2 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\begin{cases} x + y = ${thou(v.total)} \\\\ ${num(v.r1 / 100)}x ${v.r2 < 0 ? "-" : "+"} ${num(Math.abs(v.r2) / 100)}y = ${thou(v.g)} \\end{cases}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: r && r.ok ? MANIM.green : MANIM.red }} data-testid="tool-capitales">
          {!r ? "Con el mismo tipo en las dos partes no se puede repartir" : r.ok ? `x = ${eur(r.x)} · y = ${eur(r.y)}` : "Sin sentido: una de las partes saldría negativa"}
        </p>
        {share !== null ? (
          <svg viewBox="0 0 420 36" className="w-full" aria-hidden>
            <rect x={0} y={4} width={420 * share} height={28} fill={MANIM.green} />
            <rect x={420 * share} y={4} width={420 * (1 - share)} height={28} fill={MANIM.orange} />
          </svg>
        ) : null}
      </div>
    </Frame>
  );
}
