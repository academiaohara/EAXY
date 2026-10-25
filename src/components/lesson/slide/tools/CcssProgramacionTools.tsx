"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const n = (x: number) => fmtEs(x, 2);

type Rel = "<=" | ">=";
type Cons = { a: number; b: number; c: number; rel: Rel };
export type PL = {
  label: string;
  cons: Cons[];
  obj: { a: number; b: number; k?: number };
  goal: "max" | "min";
  xr: number;
  yr: number;
  z: [number, number, number];
  /** La región no está acotada en la dirección que mejora la función objetivo. */
  ilimitado?: boolean;
  vars: string;
};

export const PL_PROBLEMAS: PL[] = [
  { label: "Producción", cons: [{ a: 1, b: 1, c: 6, rel: "<=" }, { a: 2, b: 1, c: 8, rel: "<=" }], obj: { a: 30, b: 20 }, goal: "max", xr: 7, yr: 7, z: [0, 160, 10], vars: "x = mesas, y = sillas" },
  { label: "Dieta", cons: [{ a: 2, b: 1, c: 8, rel: ">=" }, { a: 1, b: 2, c: 10, rel: ">=" }], obj: { a: 3, b: 2 }, goal: "min", xr: 12, yr: 10, z: [0, 40, 2], vars: "x, y = raciones de dos alimentos" },
  { label: "Solución múltiple", cons: [{ a: 1, b: 1, c: 6, rel: "<=" }, { a: 2, b: 1, c: 8, rel: "<=" }], obj: { a: 2, b: 1 }, goal: "max", xr: 7, yr: 7, z: [0, 10, 1], vars: "Z = 2x + y" },
  { label: "No acotada", cons: [{ a: 1, b: 1, c: 2, rel: ">=" }, { a: -1, b: 1, c: 2, rel: "<=" }], obj: { a: 1, b: 1 }, goal: "max", xr: 10, yr: 8, z: [0, 16, 2], ilimitado: true, vars: "Z = x + y" },
  { label: "Región vacía", cons: [{ a: 1, b: 1, c: 2, rel: "<=" }, { a: 1, b: 1, c: 5, rel: ">=" }], obj: { a: 1, b: 1 }, goal: "max", xr: 6, yr: 6, z: [0, 10, 1], vars: "Z = x + y" },
  { label: "Transporte", cons: [{ a: 1, b: 1, c: 35, rel: ">=" }, { a: 1, b: 1, c: 50, rel: "<=" }, { a: 1, b: 0, c: 30, rel: "<=" }, { a: 0, b: 1, c: 45, rel: "<=" }], obj: { a: -1, b: 3, k: 210 }, goal: "min", xr: 50, yr: 50, z: [190, 350, 5], vars: "x = A→T1, y = A→T2" },
  { label: "Mezcla", cons: [{ a: 6, b: 4, c: 24, rel: "<=" }, { a: 1, b: 2, c: 6, rel: "<=" }, { a: -1, b: 1, c: 1, rel: "<=" }, { a: 0, b: 1, c: 2, rel: "<=" }], obj: { a: 5, b: 4 }, goal: "max", xr: 6, yr: 4, z: [0, 30, 1], vars: "x, y = unidades de dos productos" },
];

const EPS = 1e-9;
const holds = (c: Cons, x: number, y: number) => (c.rel === "<=" ? c.a * x + c.b * y <= c.c + EPS : c.a * x + c.b * y >= c.c - EPS);

/** Vértices de la región factible (con x ≥ 0 e y ≥ 0) como intersección de pares de rectas. */
export function vertices(p: PL): { x: number; y: number; z: number }[] {
  const lines: { a: number; b: number; c: number }[] = [...p.cons, { a: 1, b: 0, c: 0 }, { a: 0, b: 1, c: 0 }];
  const out: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const l1 = lines[i]!;
      const l2 = lines[j]!;
      const det = l1.a * l2.b - l2.a * l1.b;
      if (Math.abs(det) < EPS) continue;
      const x = (l1.c * l2.b - l2.c * l1.b) / det;
      const y = (l1.a * l2.c - l2.a * l1.c) / det;
      if (x < -EPS || y < -EPS || !p.cons.every((c) => holds(c, x, y))) continue;
      if (out.some((q) => Math.abs(q.x - x) < 1e-7 && Math.abs(q.y - y) < 1e-7)) continue;
      out.push({ x: Math.abs(x) < EPS ? 0 : x, y: Math.abs(y) < EPS ? 0 : y, z: p.obj.a * x + p.obj.b * y + (p.obj.k ?? 0) });
    }
  }
  return out.sort((u, v) => u.x - v.x || u.y - v.y);
}

/** Recorta un polígono con un semiplano (Sutherland–Hodgman). */
function clip(poly: [number, number][], c: Cons): [number, number][] {
  const f = (pt: [number, number]) => (c.rel === "<=" ? c.c - (c.a * pt[0] + c.b * pt[1]) : c.a * pt[0] + c.b * pt[1] - c.c);
  const out: [number, number][] = [];
  for (let i = 0; i < poly.length; i++) {
    const A = poly[i]!;
    const B = poly[(i + 1) % poly.length]!;
    const fa = f(A);
    const fb = f(B);
    if (fa >= -EPS) out.push(A);
    if ((fa > EPS && fb < -EPS) || (fa < -EPS && fb > EPS)) {
      const t = fa / (fa - fb);
      out.push([A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])]);
    }
  }
  return out;
}

const txtCons = (c: Cons) => {
  const t = (k: number, v: string, first: boolean) => (k === 0 ? "" : `${first ? (k < 0 ? "−" : "") : k < 0 ? " − " : " + "}${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}`);
  const l = `${t(c.a, "x", true)}${t(c.b, "y", c.a === 0)}`;
  return `${l} ${c.rel === "<=" ? "≤" : "≥"} ${c.c}`;
};
const txtObj = (p: PL) => {
  const t = (k: number, v: string, first: boolean) => (k === 0 ? "" : `${first ? (k < 0 ? "−" : "") : k < 0 ? " − " : " + "}${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}`);
  return `Z = ${t(p.obj.a, "x", true)}${t(p.obj.b, "y", p.obj.a === 0)}${p.obj.k ? ` + ${p.obj.k}` : ""}`;
};

/** `initial`: [problema (0–6), valor de Z]. Región factible, vértices, recta de nivel y óptimo. */
export function ProgramacionLinealExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const p0 = int(ini[0], 0, 0, PL_PROBLEMAS.length - 1);
  const [lo0, hi0] = PL_PROBLEMAS[p0]!.z;
  const init = { p: p0, z: clamp(Number.isFinite(ini[1]) ? (ini[1] as number) : lo0, lo0, hi0) };
  const [v, setV] = useState(init);
  const P = PL_PROBLEMAS[v.p]!;
  const [zlo, zhi, zst] = P.z;
  const vs = vertices(P);
  const best = vs.length ? (P.goal === "max" ? Math.max(...vs.map((q) => q.z)) : Math.min(...vs.map((q) => q.z))) : NaN;
  const opt = vs.filter((q) => Math.abs(q.z - best) < 1e-7);
  const sinOptimo = vs.length === 0 || (P.ilimitado ?? false);
  const zmin = vs.length ? Math.min(...vs.map((q) => q.z)) : NaN;
  const zmax = vs.length ? Math.max(...vs.map((q) => q.z)) : NaN;
  const toca = vs.length > 0 && (P.ilimitado ? v.z >= zmin - 1e-9 : v.z >= zmin - 1e-9 && v.z <= zmax + 1e-9);
  const W = 520;
  const H = 300;
  const px = (x: number) => 40 + (x / P.xr) * (W - 60);
  const py = (y: number) => H - 30 - (y / P.yr) * (H - 50);
  let poly: [number, number][] = [[0, 0], [P.xr, 0], [P.xr, P.yr], [0, P.yr]];
  for (const c of P.cons) poly = clip(poly, c);
  const line = (a: number, b: number, c: number) => {
    const pts: [number, number][] = [];
    if (b !== 0) {
      for (const x of [0, P.xr]) pts.push([x, (c - a * x) / b]);
    } else if (a !== 0) pts.push([c / a, 0], [c / a, P.yr]);
    return pts.map(([x, y]) => `${px(x)},${py(y)}`).join(" ");
  };
  const zline = line(P.obj.a, P.obj.b, v.z - (P.obj.k ?? 0));
  const tick = Math.max(1, Math.round(P.xr / 7));
  return (
    <Frame
      hint={block.hint ?? "Mueve la recta de nivel Z = constante: el óptimo está en el último vértice de la región que toca al desplazarla en el sentido que mejora Z."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Problema" items={PL_PROBLEMAS.map((q, i) => ({ value: i, label: q.label }))} value={v.p} onChange={(p) => setV({ p, z: PL_PROBLEMAS[p]!.z[0] })} />
          <Slider label="Valor de Z (recta de nivel)" value={v.z} min={zlo} max={zhi} step={zst} color={MANIM.yellow} format={(q) => fmtEs(q, 0)} onChange={(z) => setV((s) => ({ ...s, z }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-pl-grafica">
        <line x1={px(0)} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={8} stroke={MANIM.ink} strokeWidth={1.6} />
        {Array.from({ length: Math.floor(P.xr / tick) }, (_, i) => (i + 1) * tick).map((x) => <text key={x} x={px(x)} y={H - 12} fontSize={11} fill={MANIM.muted} textAnchor="middle">{x}</text>)}
        {poly.length > 2 && <polygon points={poly.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")} fill={MANIM.green} fillOpacity={0.3} />}
        {P.cons.map((c, i) => <polyline key={i} points={line(c.a, c.b, c.c)} fill="none" stroke={MANIM.blue} strokeWidth={2} />)}
        <polyline points={zline} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="7 5" />
        {vs.map((q, i) => {
          const esOpt = !sinOptimo && opt.includes(q);
          return (
            <g key={i}>
              <circle cx={px(q.x)} cy={py(q.y)} r={esOpt ? 7 : 5} fill={esOpt ? MANIM.red : MANIM.ink} />
              <text x={px(q.x) + 9} y={py(q.y) - 8} fontSize={12} fill={MANIM.ink}>{`(${n(q.x)}, ${n(q.y)})`}</text>
            </g>
          );
        })}
      </Svg>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pl-modelo">{`${P.goal === "max" ? "Maximizar" : "Minimizar"} ${txtObj(P)}  sujeto a  ${P.cons.map(txtCons).join(";  ")};  x ≥ 0, y ≥ 0`}</p>
      <table className="w-full max-w-sm border-collapse text-sm tabular-nums" data-testid="tool-pl-vertices">
        <tbody>
          {vs.map((q, i) => (
            <tr key={i}>
              <td className="pr-4 text-[color:var(--stage-muted,#b8c2d0)]">{`(${n(q.x)}, ${n(q.y)})`}</td>
              <td className="text-[color:var(--stage-ink,#fff)]">{`Z = ${n(q.z)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Readout>
        <Stat color={MANIM.yellow} label={`${P.goal === "max" ? "Máximo" : "Mínimo"}`} plain>
          <span data-testid="tool-pl-optimo">{vs.length === 0 ? "región vacía" : P.ilimitado ? "no acotada: sin máximo" : opt.length > 1 ? `Z = ${n(best)} en todo el segmento ${`(${n(opt[0]!.x)}, ${n(opt[0]!.y)})`}–${`(${n(opt[opt.length - 1]!.x)}, ${n(opt[opt.length - 1]!.y)})`}` : `Z = ${n(best)} en (${n(opt[0]!.x)}, ${n(opt[0]!.y)})`}</span>
        </Stat>
        <Stat color={toca ? MANIM.green : MANIM.red} label={`Recta de nivel Z = ${fmtEs(v.z, 0)}`} plain>
          <span data-testid="tool-pl-toca">{toca ? "corta la región" : "no toca la región"}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}
