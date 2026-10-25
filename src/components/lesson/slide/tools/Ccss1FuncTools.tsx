"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { DOSIS, diferencias, gradoPorDiferencias, parabolaPor, parteEntera, rectaPor, techo } from "@/components/lesson/anim/funciones1b";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const m = (x: number, d = 2) => fmtEs(x, d);

/* ───────────── Interpolación y extrapolación lineal y cuadrática ───────────── */

/** `initial`: [dosis x en mg (0–12), primer punto usado k (1–8)]. Datos: curaciones según dosis. */
export function InterpolacionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { x: Math.round(num(ini[0], 6.4, 0, 12) * 10) / 10, k: Math.round(num(ini[1], 6, 1, 8)) };
  const [v, setV] = useState(init);
  const P = DOSIS;
  const p0 = P[v.k - 1]!;
  const p1 = P[v.k]!;
  const p2 = P[v.k + 1]!;
  const rec = rectaPor(p0, p1);
  const par = parabolaPor(p0, p1, p2);
  const yL = rec.m * v.x + rec.n;
  const yC = par.a * v.x * v.x + par.b * v.x + par.c;
  const dentroL = v.x >= p0[0] && v.x <= p1[0];
  const dentroC = v.x >= p0[0] && v.x <= p2[0];
  const W = 420;
  const H = 190;
  const X = (x: number) => 30 + (x / 12) * (W - 50);
  const Y = (y: number) => H - 24 - ((y - 20) / 70) * (H - 44);
  const curve = Array.from({ length: 61 }, (_, i) => {
    const x = i * 0.2;
    return `${X(x)},${Y(par.a * x * x + par.b * x + par.c)}`;
  }).join(" ");
  const x0 = 0;
  const x1 = 12;
  return (
    <Frame
      hint={block.hint ?? "Elige tres puntos consecutivos (el primero es k) y una dosis x. La recta usa los dos primeros; la parábola, los tres. Si x queda fuera del tramo usado, es una extrapolación."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Dosis x" value={v.x} min={0} max={12} step={0.1} color={MANIM.yellow} unit=" mg" onChange={(x) => setV((p) => ({ ...p, x }))} format={(x) => m(x, 1)} />
          <Slider label="Primer punto usado (dosis)" value={v.k} min={1} max={8} color={MANIM.blue} unit=" mg" onChange={(k) => setV((p) => ({ ...p, k }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Recta" plain>
          <span data-testid="tool-int-lineal">{`${m(yL)} %`}</span>
        </Stat>
        <Stat color={MANIM.green} label="Parábola" plain>
          <span data-testid="tool-int-cuad">{`${m(yC)} %`}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-int-tipo">
        {`Recta: ${dentroL ? "interpolación" : "extrapolación"} · parábola: ${dentroC ? "interpolación" : "extrapolación"}`}
      </p>
      <p className="text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tool-int-ecuaciones">
        {`y = ${m(rec.m, 3)}·x + ${m(rec.n, 3)}   ·   y = ${m(par.a, 3)}·x² + ${m(par.b, 3)}·x + ${m(par.c, 3)}`}
      </p>
      <Svg w={W} h={H} testId="tool-int-grafica">
        <line x1={X(0)} y1={H - 24} x2={X(12)} y2={H - 24} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={curve} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
        <line x1={X(x0)} y1={Y(rec.m * x0 + rec.n)} x2={X(x1)} y2={Y(rec.m * x1 + rec.n)} stroke={MANIM.blue} strokeWidth={2.5} />
        {P.map(([px, py]) => (
          <circle key={px} cx={X(px)} cy={Y(py)} r={px >= p0[0] && px <= p2[0] ? 5.5 : 3.5} fill={px >= p0[0] && px <= p2[0] ? MANIM.orange : MANIM.muted} />
        ))}
        <line x1={X(v.x)} y1={H - 24} x2={X(v.x)} y2={Y(yC)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle cx={X(v.x)} cy={Y(yC)} r={6} fill={MANIM.green} stroke={MANIM.ink} strokeWidth={1.5} />
        <circle cx={X(v.x)} cy={Y(yL)} r={6} fill={MANIM.blue} stroke={MANIM.ink} strokeWidth={1.5} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Diferencias sucesivas ───────────── */

/** `initial`: [tipo de datos: 0 lineal, 1 cuadrático, 2 cúbico, 3 no polinómico]. */
export function DiferenciasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const SERIES = [
    { label: "y = 3x + 2", ys: [5, 8, 11, 14, 17, 20, 23] },
    { label: "y = −0,45x² + 9,35x + 23,1 (dosis)", ys: DOSIS.map((p) => p[1]) },
    { label: "y = x³ − x", ys: [0, 6, 24, 60, 120, 210, 336] },
    { label: "y = 2ˣ", ys: [2, 4, 8, 16, 32, 64, 128] },
  ];
  const init = { t: Math.round(num(ini[0], 1, 0, SERIES.length - 1)) };
  const [v, setV] = useState(init);
  const S = SERIES[v.t]!;
  const grado = gradoPorDiferencias(S.ys, 3, 1e-6);
  const rows = [S.ys, diferencias(S.ys, 1), diferencias(S.ys, 2), diferencias(S.ys, 3)];
  const cell = "border border-[color:var(--stage-border,#3d4f66)] px-2 py-1 text-center tabular-nums text-sm";
  return (
    <Frame
      hint={block.hint ?? "Si las diferencias de orden n salen todas iguales, los datos se ajustan a un polinomio de grado n. En una exponencial nunca se estabilizan."}
      onReset={() => setV(init)}
      controls={
        <div className="flex flex-col gap-2">
          {SERIES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-pressed={i === v.t}
              onClick={() => setV({ t: i })}
              className={`rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-left text-sm text-[color:var(--stage-ink,#fff)] hover:bg-white/10 ${i === v.t ? "bg-white/15" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      }
    >
      <table className="w-full border-collapse" data-testid="tool-dif-tabla">
        <tbody>
          {rows.map((r, k) => (
            <tr key={k}>
              <th className={`${cell} text-left text-[color:var(--stage-muted,#b8c2d0)]`}>{k === 0 ? "y" : `Δ${k === 1 ? "" : k}`}</th>
              {r.map((val, i) => (
                <td key={i} className={cell} style={{ color: k === grado ? MANIM.green : undefined }}>{m(val, 2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-lg font-semibold" style={{ color: grado ? MANIM.green : MANIM.orange }} data-testid="tool-dif-grado">
        {grado === 1 ? "Diferencias primeras constantes: función lineal" : grado === 2 ? "Diferencias segundas constantes: función cuadrática" : grado === 3 ? "Diferencias terceras constantes: función cúbica" : "Las diferencias no se estabilizan: no es un polinomio"}
      </p>
    </Frame>
  );
}

/* ───────────── Parte entera ───────────── */

/** `initial`: [x·10 (−40 a 40)]. */
export function ParteEnteraExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { x10: Math.round(num(ini[0], 23, -40, 40)) };
  const [v, setV] = useState(init);
  const x = v.x10 / 10;
  const fl = parteEntera(x);
  const ce = techo(x);
  const W = 420;
  const H = 190;
  const X = (t: number) => 210 + t * 44;
  const Y = (t: number) => 100 - t * 22;
  return (
    <Frame
      hint={block.hint ?? "La parte entera [x] es el mayor entero que no supera a x: en los negativos «baja» (−1,3 → −2). Es una función escalonada, con saltos en los enteros."}
      onReset={() => setV(init)}
      controls={<Slider label="x" value={x} min={-4} max={4} step={0.1} color={MANIM.yellow} onChange={(t) => setV({ x10: Math.round(t * 10) })} format={(t) => m(t, 1)} />}
    >
      <Readout>
        <Stat color={MANIM.green} label="Parte entera [x]" plain>
          <span data-testid="tool-pe-suelo">{String(fl).replace("-", "−")}</span>
        </Stat>
        <Stat color={MANIM.orange} label="Por exceso ⌈x⌉" plain>
          <span data-testid="tool-pe-techo">{String(ce).replace("-", "−")}</span>
        </Stat>
        <Stat color={MANIM.muted} label="Parte decimal" plain>
          <span data-testid="tool-pe-decimal">{m(x - fl, 1)}</span>
        </Stat>
      </Readout>
      <Svg w={W} h={H} testId="tool-pe-grafica">
        <line x1={20} y1={Y(0)} x2={400} y2={Y(0)} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={X(0)} y1={10} x2={X(0)} y2={180} stroke={MANIM.grid} strokeWidth={2} />
        {Array.from({ length: 8 }, (_, i) => i - 4).map((k) => (
          <g key={k}>
            <line x1={X(k)} y1={Y(k)} x2={X(k + 1) - 2} y2={Y(k)} stroke={MANIM.blue} strokeWidth={3.5} />
            <circle cx={X(k)} cy={Y(k)} r={4.5} fill={MANIM.blue} />
            <circle cx={X(k + 1)} cy={Y(k)} r={4.5} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={2.5} />
          </g>
        ))}
        <circle cx={X(x)} cy={Y(fl)} r={7} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={1.5} />
      </Svg>
    </Frame>
  );
}
