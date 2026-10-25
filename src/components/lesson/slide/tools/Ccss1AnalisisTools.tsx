"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const m = (x: number, d = 2) => fmtEs(x, d);

/** Modelo económico: precio p(x) = a − b·x, coste C(x) = c·x + F; beneficio B(x) = (a − b·x)·x − c·x − F. */
export function beneficio(a: number, b: number, c: number, F: number, x: number) {
  const ingresos = (a - b * x) * x;
  const costes = c * x + F;
  return { ingresos, costes, beneficio: ingresos - costes, derivada: a - c - 2 * b * x };
}

/** Producción que maximiza el beneficio (vértice de la parábola). */
export const produccionOptima = (a: number, b: number, c: number) => (a - c) / (2 * b);

/** `initial`: [a (precio máximo), b (caída del precio por unidad ×10), c (coste unitario), F (costes fijos), x (unidades)]. */
export function BeneficioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    a: Math.round(num(ini[0], 60, 20, 100)),
    b10: Math.round(num(ini[1], 5, 1, 20)),
    c: Math.round(num(ini[2], 10, 0, 40)),
    F: Math.round(num(ini[3], 100, 0, 500)),
    x: Math.round(num(ini[4], 20, 0, 100)),
  };
  const [v, setV] = useState(init);
  const b = v.b10 / 10;
  const f = (x: number) => beneficio(v.a, b, v.c, v.F, x);
  const xOpt = produccionOptima(v.a, b, v.c);
  const xMax = v.a / b;
  const cur = f(v.x);
  const top = Math.max(f(xOpt).ingresos, v.F + v.c * xMax * 0.5, 1);
  const yMin = -0.35 * top;
  const yMax = top * 1.05;
  const W = 420;
  const H = 190;
  const X = (x: number) => 24 + (x / xMax) * (W - 44);
  const Y = (y: number) => H - 10 - ((y - yMin) / (yMax - yMin)) * (H - 20);
  const path = (g: (x: number) => number) =>
    Array.from({ length: 61 }, (_, i) => (i / 60) * xMax)
      .filter((x) => g(x) >= yMin)
      .map((x) => `${X(x)},${Math.min(H - 4, Math.max(4, Y(g(x))))}`)
      .join(" ");
  const valida = xOpt > 0 && xOpt < xMax;
  return (
    <Frame
      hint={block.hint ?? "El beneficio es máximo donde su derivada se anula: B′(x) = a − c − 2b·x = 0. A la izquierda B′ > 0 (el beneficio sube) y a la derecha B′ < 0 (baja)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Precio máximo a" value={v.a} min={20} max={100} color={MANIM.blue} unit=" €" onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Caída del precio por unidad b" value={v.b10} min={1} max={20} color={MANIM.orange} onChange={(b10) => setV((p) => ({ ...p, b10 }))} format={(x) => m(x / 10, 1)} />
          <Slider label="Coste por unidad c" value={v.c} min={0} max={40} color={MANIM.red} unit=" €" onChange={(c) => setV((p) => ({ ...p, c }))} />
          <Slider label="Costes fijos F" value={v.F} min={0} max={500} step={10} color={MANIM.purple} unit=" €" onChange={(F) => setV((p) => ({ ...p, F }))} />
          <Slider label="Unidades producidas x" value={Math.min(v.x, Math.floor(xMax))} min={0} max={100} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, x }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Ingresos" plain>
          <span data-testid="tool-ben-ingresos">{`${m(cur.ingresos)} €`}</span>
        </Stat>
        <Stat color={MANIM.red} label="Costes" plain>
          <span data-testid="tool-ben-costes">{`${m(cur.costes)} €`}</span>
        </Stat>
        <Stat color={cur.beneficio >= 0 ? MANIM.green : MANIM.orange} label="Beneficio" plain>
          <span data-testid="tool-ben-beneficio">{`${m(cur.beneficio)} €`}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tool-ben-derivada">
        {`B′(${v.x}) = ${m(cur.derivada)} → ${cur.derivada > 0 ? "el beneficio todavía sube" : cur.derivada < 0 ? "el beneficio ya baja" : "punto crítico"}`}
      </p>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-ben-optimo">
        {valida ? `Máximo en x = ${m(xOpt, 1)} unidades, con beneficio ${m(f(xOpt).beneficio)} €` : "Con estos datos no hay beneficio máximo con producción positiva"}
      </p>
      <Svg w={W} h={H} testId="tool-ben-grafica">
        <line x1={24} y1={Y(0)} x2={W - 20} y2={Y(0)} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={path((x) => f(x).ingresos)} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <polyline points={path((x) => f(x).costes)} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
        <polyline points={path((x) => f(x).beneficio)} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
        {valida ? <circle cx={X(xOpt)} cy={Y(f(xOpt).beneficio)} r={6} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={1.5} /> : null}
        <line x1={X(v.x)} y1={Y(0)} x2={X(v.x)} y2={Math.min(H - 4, Math.max(4, Y(cur.beneficio)))} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
      </Svg>
    </Frame>
  );
}
