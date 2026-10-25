"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { REG_DATOS, ajustePolinomico, evalPoli } from "@/components/lesson/anim/regresion1b";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const m = (x: number, d = 3) => fmtEs(x, d).replace("-", "−");

/** `initial`: [datos (0 estatura, 1 Física), x₀ para predecir (0–12)]. */
export function RegresionCuadraticaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: Math.round(num(ini[0], 1, 0, REG_DATOS.length - 1)), x0: Math.round(num(ini[1], 9, 0, 12)) };
  const [v, setV] = useState(init);
  const D = REG_DATOS[v.d]!;
  const lin = ajustePolinomico(D.xs, D.ys, 1)!;
  const cua = ajustePolinomico(D.xs, D.ys, 2)!;
  const yl = evalPoli(lin.coef, v.x0);
  const yc = evalPoli(cua.coef, v.x0);
  const [lo, hi] = D.rango;
  const W = 420;
  const H = 200;
  const X = (x: number) => 30 + (x / 12) * (W - 50);
  const Y = (y: number) => H - 24 - ((y - lo) / (hi - lo)) * (H - 44);
  const clip = (y: number) => Math.min(H - 4, Math.max(4, Y(y)));
  const curva = (c: readonly number[]) => Array.from({ length: 61 }, (_, i) => `${X(i * 0.2)},${clip(evalPoli(c, i * 0.2))}`).join(" ");
  const fuera = v.x0 < 3 || v.x0 > 10;
  const eq = (c: readonly number[]) => (c.length === 2 ? `y = ${m(c[1]!)}·x ${c[0]! < 0 ? "−" : "+"} ${m(Math.abs(c[0]!))}` : `y = ${m(c[2]!)}·x² ${c[1]! < 0 ? "−" : "+"} ${m(Math.abs(c[1]!))}·x ${c[0]! < 0 ? "−" : "+"} ${m(Math.abs(c[0]!))}`);
  return (
    <Frame
      hint={block.hint ?? "Compara los dos ajustes: R² dice qué parte de la variación de Y explica cada modelo. Una parábola siempre se ajusta al menos tan bien como una recta, pero fuera de los datos puede dar valores absurdos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Datos" items={REG_DATOS.map((q, i) => ({ value: i, label: q.y }))} value={v.d} onChange={(d) => setV((p) => ({ ...p, d }))} />
          <Slider label={`${D.x} para predecir`} value={v.x0} min={0} max={12} color={MANIM.yellow} onChange={(x0) => setV((p) => ({ ...p, x0 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="R² recta" plain>
          <span data-testid="tool-rc-r2-lineal">{m(lin.r2)}</span>
        </Stat>
        <Stat color={MANIM.green} label="R² parábola" plain>
          <span data-testid="tool-rc-r2-cuad">{m(cua.r2)}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tool-rc-ecuaciones">{`${eq(lin.coef)}   ·   ${eq(cua.coef)}`}</p>
      <p className="text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tool-rc-prediccion">
        {`Predicción para ${D.x} = ${v.x0}: recta ${m(yl, 2)} · parábola ${m(yc, 2)}${fuera ? " (extrapolación: poco fiable)" : ""}`}
      </p>
      <Svg w={W} h={H} testId="tool-rc-grafica">
        <line x1={30} y1={H - 24} x2={W - 20} y2={H - 24} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={curva(lin.coef)} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <polyline points={curva(cua.coef)} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
        {D.xs.map((x, i) => (
          <circle key={i} cx={X(x)} cy={Y(D.ys[i]!)} r={4.5} fill={MANIM.orange} />
        ))}
        <line x1={X(v.x0)} y1={H - 24} x2={X(v.x0)} y2={clip(yc)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
      </Svg>
    </Frame>
  );
}
