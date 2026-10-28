"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/**
 * Perspectiva cónica de un punto (x, y, z). El cuadro es el plano y = 0 (vertical), el geometral es z = 0 y el observador
 * está en (0, −d, h): a distancia d del cuadro y altura h sobre el geometral. Devuelve las coordenadas (x′, z′) sobre el cuadro
 * (z′ medida desde la línea de tierra) o null si el punto está en el plano del observador o detrás de él.
 */
export function proyeccionConica(p: readonly [number, number, number], d: number, h: number): Pt | null {
  const w = d + p[1];
  if (!(w > 1e-9)) return null;
  const k = d / w;
  return [p[0] * k, h + (p[2] - h) * k];
}
/** Punto de fuga (en la línea del horizonte) de las rectas horizontales con dirección (dx, dy). Null si son paralelas al cuadro (dy = 0). */
export function puntoFuga(dx: number, dy: number, d: number): number | null {
  return Math.abs(dy) < 1e-12 ? null : (d * dx) / dy;
}

type V3 = [number, number, number];

/** Caja de a × b × c con el centro de la base en (cx, b/2) girada θ grados alrededor del eje vertical que pasa por ese centro. */
export function cajaGirada(a: number, b: number, c: number, thetaDeg: number, cx = -3): V3[] {
  const th = thetaDeg * RAD;
  const cy = b / 2;
  const pts: V3[] = [];
  for (const z of [0, c]) {
    for (const [x, y] of [[-a / 2, -b / 2], [a / 2, -b / 2], [a / 2, b / 2], [-a / 2, b / 2]] as [number, number][]) {
      pts.push([cx + x * Math.cos(th) - y * Math.sin(th), cy + x * Math.sin(th) + y * Math.cos(th), z]);
    }
  }
  return pts; // 0–3 base, 4–7 tapa
}

const CARAS: number[][] = [
  [0, 1, 2, 3], // base
  [4, 5, 6, 7], // tapa
  [0, 1, 5, 4],
  [1, 2, 6, 5],
  [2, 3, 7, 6],
  [3, 0, 4, 7],
];

/** Caras visibles desde el observador (0, −d, h): su normal exterior apunta hacia él. */
export function carasVisibles(pts: V3[], d: number, h: number): boolean[] {
  const cen = pts.reduce((acc, p) => [acc[0] + p[0] / pts.length, acc[1] + p[1] / pts.length, acc[2] + p[2] / pts.length] as V3, [0, 0, 0] as V3);
  const obs: V3 = [0, -d, h];
  return CARAS.map((f) => {
    const [a, b, c] = [pts[f[0]!]!, pts[f[1]!]!, pts[f[2]!]!];
    const u: V3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v: V3 = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
    let n: V3 = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const fc = f.reduce((acc, i) => [acc[0] + pts[i]![0] / 4, acc[1] + pts[i]![1] / 4, acc[2] + pts[i]![2] / 4] as V3, [0, 0, 0] as V3);
    if (n[0] * (fc[0] - cen[0]) + n[1] * (fc[1] - cen[1]) + n[2] * (fc[2] - cen[2]) < 0) n = [-n[0], -n[1], -n[2]];
    return n[0] * (obs[0] - fc[0]) + n[1] * (obs[1] - fc[1]) + n[2] * (obs[2] - fc[2]) > 1e-9;
  });
}

/* ───────────── Perspectiva frontal y oblicua de una caja ───────────── */

export function PerspectivaConicaDt1Explorador({ block }: { block: ToolBlock }) {
  const modo0 = Math.round(num(block.params?.n, 0, 0, 1)) === 1 ? "oblicua" : "frontal";
  const init = { m: modo0 as "frontal" | "oblicua", d: Math.round(num(block.params?.a, 10, 5, 20)), h: Math.round(num(block.params?.b, 5, 0, 8)), th: modo0 === "oblicua" ? 30 : 0 };
  const [s, setS] = useState(init);
  const th = s.m === "frontal" ? 0 : s.th;
  const pts = cajaGirada(4, 3, 3, th);
  const proj = pts.map((p) => proyeccionConica(p, s.d, s.h));
  const ok = proj.every((p): p is Pt => p !== null);
  const vis = ok ? carasVisibles(pts, s.d, s.h) : [];
  const U = 24;
  const O: Pt = [260, 215]; // línea de tierra
  const sc = (q: Pt): Pt => [O[0] + q[0] * U, O[1] - q[1] * U];
  const pf1 = puntoFuga(Math.cos(th * RAD), Math.sin(th * RAD), s.d);
  const pf2 = puntoFuga(-Math.sin(th * RAD), Math.cos(th * RAD), s.d);
  const poly = (idx: number[], color: string, op: number) => <polygon points={idx.map((i) => sc(proj[i]!).join(",")).join(" ")} fill={color} fillOpacity={op} stroke={MANIM.ink} strokeWidth={2} strokeLinejoin="round" />;
  const ocultas = new Set<string>();
  const vistas = new Set<string>();
  if (ok) {
    CARAS.forEach((f, ci) => {
      for (let i = 0; i < 4; i++) {
        const e = [f[i]!, f[(i + 1) % 4]!].sort((x, y) => x - y).join("-");
        if (vis[ci]) vistas.add(e);
        else ocultas.add(e);
      }
    });
  }
  const aristasOcultas = [...ocultas].filter((e) => !vistas.has(e));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Todas las rectas paralelas entre sí que no son paralelas al cuadro convergen en un punto de fuga de la línea del horizonte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Perspectiva" items={[{ value: "frontal", label: "Frontal (un punto de fuga)" }, { value: "oblicua", label: "Oblicua (dos puntos de fuga)" }]} value={s.m} onChange={(m) => setS((v) => ({ ...v, m, th: m === "oblicua" && v.th === 0 ? 30 : v.th }))} />
          <Slider label="Distancia del observador al cuadro" value={s.d} min={5} max={20} step={1} unit=" cm" color={MANIM.orange} onChange={(d) => setS((v) => ({ ...v, d }))} />
          <Slider label="Altura del observador (línea del horizonte)" value={s.h} min={0} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(h) => setS((v) => ({ ...v, h }))} />
          {s.m === "oblicua" ? <Slider label="Giro de la caja respecto al cuadro" value={s.th} min={10} max={60} step={5} unit="°" color={MANIM.purple} onChange={(t) => setS((v) => ({ ...v, th: t }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={270} testId="perspectiva-conica" maxH={300}>
        <line x1={10} y1={O[1]} x2={510} y2={O[1]} stroke={MANIM.ink} strokeWidth={2} />
        <text x={470} y={O[1] + 16} fill={MANIM.muted} fontSize={12} fontWeight={700}>LT</text>
        <line x1={10} y1={sc([0, s.h])[1]} x2={510} y2={sc([0, s.h])[1]} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={14} y={sc([0, s.h])[1] - 5} fill={MANIM.yellow} fontSize={12} fontWeight={700}>LH</text>
        {ok ? (
          <>
            {aristasOcultas.map((e) => {
              const [i, j] = e.split("-").map(Number) as [number, number];
              return <Seg key={e} a={sc(proj[i]!)} b={sc(proj[j]!)} color={MANIM.muted} width={1.2} dashed />;
            })}
            {CARAS.map((f, ci) => (vis[ci] ? <g key={ci}>{poly(f, ci === 1 ? MANIM.blue : ci === 0 ? MANIM.muted : ci % 2 === 0 ? MANIM.green : MANIM.orange, ci === 1 ? 0.28 : 0.22)}</g> : null))}
          </>
        ) : (
          <text x={260} y={110} textAnchor="middle" fill={MANIM.red} fontSize={15} fontWeight={700}>
            El objeto queda delante del observador
          </text>
        )}
        {s.m === "frontal" ? (
          <>
            <Dot p={sc([0, s.h])} color={MANIM.yellow} r={5} />
            <text x={sc([0, s.h])[0] + 8} y={sc([0, s.h])[1] + 16} fill={MANIM.yellow} fontSize={12} fontWeight={700}>F = P</text>
          </>
        ) : (
          <>
            {pf1 !== null && Math.abs(pf1) < 10 ? (
              <>
                <Dot p={sc([pf1, s.h])} color={MANIM.yellow} r={5} />
                <text x={sc([pf1, s.h])[0] + 8} y={sc([pf1, s.h])[1] + 16} fill={MANIM.yellow} fontSize={12} fontWeight={700}>F₁</text>
              </>
            ) : null}
            {pf2 !== null && Math.abs(pf2) < 10 ? (
              <>
                <Dot p={sc([pf2, s.h])} color={MANIM.yellow} r={5} />
                <text x={sc([pf2, s.h])[0] + 8} y={sc([pf2, s.h])[1] + 16} fill={MANIM.yellow} fontSize={12} fontWeight={700}>F₂</text>
              </>
            ) : null}
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Punto de fuga F₁ (aristas largas)">{s.m === "frontal" ? "ninguno (son paralelas al cuadro)" : pf1 !== null ? `x = ${f1(pf1)} cm` : "—"}</Stat>
        <Stat color={MANIM.yellow} label={s.m === "frontal" ? "Punto de fuga de las aristas de fondo" : "Punto de fuga F₂ (aristas cortas)"}>{s.m === "frontal" ? "punto principal P: x = 0" : pf2 !== null ? `x = ${f1(pf2)} cm` : "—"}</Stat>
        <Stat color={MANIM.blue} label="Altura del horizonte">{f1(s.h)} cm sobre la LT</Stat>
      </Readout>
      <Note>En el <b>sistema cónico</b> el observador es un <b>punto de vista</b> a distancia finita; el <b>cuadro</b> es el plano donde se dibuja y la <b>línea del horizonte</b> (LH) está a la altura de los ojos. Las rectas <b>paralelas entre sí</b> convergen en un <b>punto de fuga</b> de la LH. En la perspectiva <b>frontal</b> una cara es paralela al cuadro: las aristas perpendiculares a él fugan al <b>punto principal</b>. En la <b>oblicua</b> ninguna lo es y hay <b>dos puntos de fuga</b>, uno por cada dirección horizontal. Bajar el horizonte muestra la caja <b>desde abajo</b>.</Note>
    </Frame>
  );
}
