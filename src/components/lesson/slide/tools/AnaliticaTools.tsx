"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracTex, fracValue } from "@/components/lesson/anim/eq";
import { add, dist2, lineFromPointDir, lineText, midpoint, modSq, perp, scale, sqrtTex, sub, vec, type Line, type V } from "@/components/lesson/anim/an";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const R = 8;
const W = 320;
const px = (x: number) => 10 + ((x + R) / (2 * R)) * (W - 20);
const py = (y: number) => W - 10 - ((y + R) / (2 * R)) * (W - 20);
const dec = (x: number) => fmtEs(Math.round(x * 100) / 100, 2);
const pair = (v: V) => `(${v[0]}, ${v[1]})`.replace(/-/g, "−");
const texPair = (v: V) => `(${v[0]},\\ ${v[1]})`;

function Plane({ children, id }: { children: ReactNode; id: string }) {
  const ticks = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  return (
    <Svg w={W} h={W} testId={id}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={10} y={10} width={W - 20} height={W - 20} />
        </clipPath>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={10} x2={px(t)} y2={W - 10} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
          <line x1={10} y1={py(t)} x2={W - 10} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
        </g>
      ))}
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
    </Svg>
  );
}

function Arrow({ from, to, color, width = 3.5 }: { from: V; to: V; color: string; width?: number }) {
  const [x1, y1, x2, y2] = [px(from[0]), py(from[1]), px(to[0]), py(to[1])];
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const head = 11;
  const bx = x2 - head * Math.cos(ang);
  const by = y2 - head * Math.sin(ang);
  const dx = -Math.sin(ang) * head * 0.5;
  const dy = Math.cos(ang) * head * 0.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${bx + dx},${by + dy} ${bx - dx},${by - dy}`} fill={color} />
    </g>
  );
}

/** Recta (en coordenadas de datos) como segmento que cruza el recuadro. */
function LineSeg({ l, color }: { l: Line; color: string }) {
  if (l.kind === "vertical") {
    const x = fracValue(l.x);
    return <line x1={px(x)} y1={10} x2={px(x)} y2={W - 10} stroke={color} strokeWidth={3} />;
  }
  const m = fracValue(l.m);
  const n = fracValue(l.n);
  return <line x1={px(-R - 1)} y1={py(m * (-R - 1) + n)} x2={px(R + 1)} y2={py(m * (R + 1) + n)} stroke={color} strokeWidth={3} />;
}

/* ───────────── Vector AB ───────────── */

export function VectorExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ax: int(ini[0], 1, -7, 7), ay: int(ini[1], 4 - 4, -7, 7), bx: int(ini[2], 5, -7, 7), by: int(ini[3], 2, -7, 7) };
  const [v, setV] = useState(init);
  const A: V = [v.ax, v.ay];
  const B: V = [v.bx, v.by];
  const u = vec(A, B);
  const m2 = modSq(u);
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));
  const sentido = u[0] === 0 && u[1] === 0 ? "vector cero" : `${u[0] > 0 ? "hacia la derecha" : u[0] < 0 ? "hacia la izquierda" : ""}${u[0] !== 0 && u[1] !== 0 ? " y " : ""}${u[1] > 0 ? "hacia arriba" : u[1] < 0 ? "hacia abajo" : ""}`;

  return (
    <Frame
      hint={block.hint ?? "Mueve A y B: las coordenadas del vector son extremo − origen, y su módulo es la distancia de A a B."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="x de A" value={v.ax} min={-7} max={7} color={MANIM.blue} onChange={set("ax")} format={f} />
          <Slider label="y de A" value={v.ay} min={-7} max={7} color={MANIM.blue} onChange={set("ay")} format={f} />
          <Slider label="x de B" value={v.bx} min={-7} max={7} color={MANIM.orange} onChange={set("bx")} format={f} />
          <Slider label="y de B" value={v.by} min={-7} max={7} color={MANIM.orange} onChange={set("by")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\overrightarrow{AB} = (${v.bx} - ${v.ax < 0 ? `(${v.ax})` : v.ax},\\ ${v.by} - ${v.ay < 0 ? `(${v.ay})` : v.ay}) = ${texPair(u)}$`} className="text-lg" />
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-vec-coord">{`AB = ${pair(u)}`}</p>
        <MathRenderer text={`$|\\overrightarrow{AB}| = \\sqrt{${u[0]}^2 + ${u[1]}^2} = ${sqrtTex(m2)} \\approx ${dec(Math.sqrt(m2)).replace(",", "{,}")}$`} className="text-base" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-vec-sentido">{`Sentido: ${sentido}`}</p>
      </div>
      <Plane id="tool-vec">
        <Arrow from={A} to={B} color={MANIM.blue} width={4} />
        <circle cx={px(A[0])} cy={py(A[1])} r={6} fill={MANIM.yellow} />
        <circle cx={px(B[0])} cy={py(B[1])} r={6} fill={MANIM.yellow} />
        <Arrow from={[0, 0]} to={u} color={MANIM.green} width={2.5} />
      </Plane>
    </Frame>
  );
}

/* ───────────── k·u + m·v ───────────── */

export function VectoresOperacionesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ux: int(ini[0], 1, -5, 5), uy: int(ini[1], 3, -5, 5), vx: int(ini[2], 2, -5, 5), vy: int(ini[3], -1, -5, 5), k: int(ini[4], 2, -3, 3), m: int(ini[5], 3, -3, 3) };
  const [s, setS] = useState(init);
  const u: V = [s.ux, s.uy];
  const w: V = [s.vx, s.vy];
  const ku = scale(s.k, u);
  const mv = scale(s.m, w);
  const res = add(ku, mv);
  const suma = add(u, w);
  const resta = sub(u, w);
  const set = (key: keyof typeof init) => (n: number) => setS((p) => ({ ...p, [key]: n }));

  return (
    <Frame
      hint={block.hint ?? "Las coordenadas de k·u + m·v se calculan componente a componente. Mira cómo cambian las flechas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="u (x)" value={s.ux} min={-5} max={5} color={MANIM.blue} onChange={set("ux")} format={f} />
          <Slider label="u (y)" value={s.uy} min={-5} max={5} color={MANIM.blue} onChange={set("uy")} format={f} />
          <Slider label="v (x)" value={s.vx} min={-5} max={5} color={MANIM.orange} onChange={set("vx")} format={f} />
          <Slider label="v (y)" value={s.vy} min={-5} max={5} color={MANIM.orange} onChange={set("vy")} format={f} />
          <Slider label="k (multiplica a u)" value={s.k} min={-3} max={3} color={MANIM.blue} onChange={set("k")} format={f} />
          <Slider label="m (multiplica a v)" value={s.m} min={-3} max={3} color={MANIM.orange} onChange={set("m")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${s.k}\\vec{u} + ${s.m < 0 ? `(${s.m})` : s.m}\\vec{v} = ${texPair(ku)} + ${texPair(mv)} = ${texPair(res)}$`} className="text-lg" />
        <p className="text-lg font-semibold" style={{ color: MANIM.green }} data-testid="tool-vecop-resultado">{`${s.k}u + ${s.m < 0 ? `(${s.m})` : s.m}v = ${pair(res)}`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-vecop-basicas">{`u + v = ${pair(suma)} · u − v = ${pair(resta)}`}</p>
      </div>
      <Plane id="tool-vecop">
        <Arrow from={[0, 0]} to={u} color={MANIM.blue} />
        <Arrow from={[0, 0]} to={w} color={MANIM.orange} />
        <Arrow from={[0, 0]} to={res} color={MANIM.green} width={4.5} />
        <Arrow from={ku} to={res} color={MANIM.orange} width={2} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Punto medio y distancia ───────────── */

export function PuntoMedioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ax: int(ini[0], -2, -7, 7), ay: int(ini[1], 1, -7, 7), bx: int(ini[2], 4, -7, 7), by: int(ini[3], 3, -7, 7) };
  const [v, setV] = useState(init);
  const A: V = [v.ax, v.ay];
  const B: V = [v.bx, v.by];
  const M = midpoint(A, B);
  const d2 = dist2(A, B);
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));
  const mx = fracValue(M[0]);
  const my = fracValue(M[1]);

  return (
    <Frame
      hint={block.hint ?? "El punto medio es la semisuma de las coordenadas; la distancia sale de Pitágoras con los catetos |Δx| y |Δy|."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="x de A" value={v.ax} min={-7} max={7} color={MANIM.blue} onChange={set("ax")} format={f} />
          <Slider label="y de A" value={v.ay} min={-7} max={7} color={MANIM.blue} onChange={set("ay")} format={f} />
          <Slider label="x de B" value={v.bx} min={-7} max={7} color={MANIM.orange} onChange={set("bx")} format={f} />
          <Slider label="y de B" value={v.by} min={-7} max={7} color={MANIM.orange} onChange={set("by")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$M = \\left(\\dfrac{${v.ax} + ${v.bx < 0 ? `(${v.bx})` : v.bx}}{2},\\ \\dfrac{${v.ay} + ${v.by < 0 ? `(${v.by})` : v.by}}{2}\\right) = \\left(${fracTex(M[0])},\\ ${fracTex(M[1])}\\right)$`} className="text-base" />
        <p className="text-lg font-semibold" style={{ color: MANIM.red }} data-testid="tool-pm-medio">{`Punto medio (${dec(mx)}, ${dec(my)})`.replace(/-/g, "−")}</p>
        <MathRenderer text={`$d = \\sqrt{${Math.abs(v.bx - v.ax)}^2 + ${Math.abs(v.by - v.ay)}^2} = \\sqrt{${d2}} = ${sqrtTex(d2)} \\approx ${dec(Math.sqrt(d2)).replace(",", "{,}")}$`} className="text-base" />
        <p className="sr-only" data-testid="tool-pm-dist">{`${dec(Math.sqrt(d2))}`}</p>
      </div>
      <Plane id="tool-pm">
        <line x1={px(A[0])} y1={py(A[1])} x2={px(B[0])} y2={py(A[1])} stroke={MANIM.green} strokeWidth={2.5} strokeDasharray="5 4" />
        <line x1={px(B[0])} y1={py(A[1])} x2={px(B[0])} y2={py(B[1])} stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="5 4" />
        <line x1={px(A[0])} y1={py(A[1])} x2={px(B[0])} y2={py(B[1])} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
        <circle cx={px(A[0])} cy={py(A[1])} r={6} fill={MANIM.yellow} />
        <circle cx={px(B[0])} cy={py(B[1])} r={6} fill={MANIM.yellow} />
        <circle cx={px(mx)} cy={py(my)} r={7} fill={MANIM.red} stroke={MANIM.ink} strokeWidth={2} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Recta, paralela y perpendicular ───────────── */

export function RectasAnaliticaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ax: int(ini[0], -3, -7, 7), ay: int(ini[1], -1, -7, 7), bx: int(ini[2], 3, -7, 7), by: int(ini[3], 3, -7, 7), tx: int(ini[4], 1, -7, 7), ty: int(ini[5], -3, -7, 7) };
  const [s, setS] = useState(init);
  const A: V = [s.ax, s.ay];
  const B: V = [s.bx, s.by];
  const T: V = [s.tx, s.ty];
  const d = vec(A, B);
  const degenerate = d[0] === 0 && d[1] === 0;
  const r = degenerate ? null : lineFromPointDir(A, d);
  const par = degenerate ? null : lineFromPointDir(T, d);
  const per = degenerate ? null : lineFromPointDir(T, perp(d));
  const set = (key: keyof typeof init) => (n: number) => setS((p) => ({ ...p, [key]: n }));

  return (
    <Frame
      hint={block.hint ?? "Con el vector dirección d = (a, b): la paralela usa el mismo d; la perpendicular usa (−b, a)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="x de A" value={s.ax} min={-7} max={7} color={MANIM.blue} onChange={set("ax")} format={f} />
          <Slider label="y de A" value={s.ay} min={-7} max={7} color={MANIM.blue} onChange={set("ay")} format={f} />
          <Slider label="x de B" value={s.bx} min={-7} max={7} color={MANIM.blue} onChange={set("bx")} format={f} />
          <Slider label="y de B" value={s.by} min={-7} max={7} color={MANIM.blue} onChange={set("by")} format={f} />
          <Slider label="x de T" value={s.tx} min={-7} max={7} color={MANIM.orange} onChange={set("tx")} format={f} />
          <Slider label="y de T" value={s.ty} min={-7} max={7} color={MANIM.orange} onChange={set("ty")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        {degenerate || !r || !par || !per ? (
          <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-rectas-r">A y B coinciden: no definen una recta</p>
        ) : (
          <>
            <MathRenderer text={`$\\vec{d} = \\overrightarrow{AB} = ${texPair(d)}$`} className="text-base" />
            <div data-testid="tool-rectas-r"><MathRenderer text={`$r:\\ ${lineText(r)}$`} className="text-base" /></div>
            <div data-testid="tool-rectas-par" style={{ color: MANIM.green }}><MathRenderer text={`$\\text{paralela por } T:\\ ${lineText(par)}$`} className="text-base" /></div>
            <div data-testid="tool-rectas-perp" style={{ color: MANIM.orange }}><MathRenderer text={`$\\text{perpendicular por } T:\\ ${lineText(per)}$`} className="text-base" /></div>
          </>
        )}
      </div>
      <Plane id="tool-rectas">
        {r ? <LineSeg l={r} color={MANIM.blue} /> : null}
        {par ? <LineSeg l={par} color={MANIM.green} /> : null}
        {per ? <LineSeg l={per} color={MANIM.orange} /> : null}
        <circle cx={px(A[0])} cy={py(A[1])} r={5} fill={MANIM.blue} />
        <circle cx={px(B[0])} cy={py(B[1])} r={5} fill={MANIM.blue} />
        <circle cx={px(T[0])} cy={py(T[1])} r={7} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
      </Plane>
    </Frame>
  );
}
