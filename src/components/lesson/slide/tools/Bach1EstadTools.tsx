"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  DATASETS, DOUBLES, HIJOS, NOTAS_B, PESOS, conditionalCol, conditionalRow, correlation, correlationText, covariance, jointStats, mean, median, percentile, regression,
  sd, sorted, syntheticCloud,
} from "@/components/lesson/anim/estad1b";
import { FnPlot, type Mark } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const ink = "text-[color:var(--stage-ink,#fff)]";
const m = (x: number | null, d = 3) => (x === null || !Number.isFinite(x) ? "—" : fmtEs(x, d).replace("-", "−"));
const cell = "border border-[color:var(--stage-border,#3d4f66)] px-2 py-1 text-center tabular-nums";

/* ───────────── Cuartiles y percentiles ───────────── */

const EX12 = [...Array(3).fill(5), ...Array(7).fill(10), ...Array(5).fill(15), ...Array(3).fill(20), ...Array(2).fill(25)] as number[];
const QSETS = [
  { label: "30 pesos (kg)", data: PESOS, dec: 2 },
  { label: "Distribución (n = 20)", data: EX12, dec: 0 },
  { label: "Notas de la clase B", data: NOTAS_B, dec: 0 },
  { label: "Hijos (n = 50)", data: HIJOS, dec: 0 },
];

/** Posición n·p/100, percentil, cuartiles, rango intercuartílico y diagrama de caja. */
export function PercentilesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: int(ini[0], 0, 0, QSETS.length - 1), p: int(ini[1], 30, 1, 99) };
  const [v, setV] = useState(init);
  const Q = QSETS[v.d]!;
  const s = sorted(Q.data);
  const n = s.length;
  const k = (n * v.p) / 100;
  const pos = Math.max(1, Math.ceil(Math.round(k * 1e9) / 1e9));
  const val = percentile(Q.data, v.p);
  const q1 = percentile(Q.data, 25);
  const q3 = percentile(Q.data, 75);
  const me = median(Q.data);
  const lo = s[0]!;
  const hi = s[n - 1]!;
  const px = (x: number) => 20 + ((x - lo) / (hi - lo || 1)) * 380;
  return (
    <Frame
      hint={block.hint ?? "Mueve el percentil: la posición es n·p/100 (si no es entera se toma la siguiente). Los cuartiles son los percentiles 25, 50 y 75, y la caja contiene el 50 % central de los datos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Datos" items={QSETS.map((q, i) => ({ value: i, label: q.label }))} value={v.d} onChange={(d) => setV((x) => ({ ...x, d }))} />
          <Slider label="Percentil p" value={v.p} min={1} max={99} color={MANIM.yellow} unit=" %" onChange={(p) => setV((x) => ({ ...x, p }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-cu-posicion">{`n = ${n};   n·p/100 = ${n}·${v.p}/100 = ${m(k, 2)}   →   lugar ${pos}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-cu-percentil">{`Percentil ${v.p} = ${m(val, Q.dec)}`}</p>
        <p className="text-base" data-testid="tool-cu-cuartiles">{`Q₁ = ${m(q1, Q.dec)}   Me = ${m(me, Q.dec === 0 ? 1 : 2)}   Q₃ = ${m(q3, Q.dec)}   ·   rango intercuartílico = ${m(q3 - q1, Q.dec)}`}</p>
      </div>
      <Svg w={420} h={90} testId="tool-cu-caja">
        <line x1={px(lo)} y1={45} x2={px(hi)} y2={45} stroke={MANIM.muted} strokeWidth={2} />
        <rect x={px(q1)} y={25} width={Math.max(2, px(q3) - px(q1))} height={40} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={2.5} />
        <line x1={px(me)} y1={25} x2={px(me)} y2={65} stroke={MANIM.orange} strokeWidth={4} />
        <line x1={px(lo)} y1={35} x2={px(lo)} y2={55} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={px(hi)} y1={35} x2={px(hi)} y2={55} stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={px(val)} cy={45} r={7} fill={MANIM.yellow} stroke="#101418" strokeWidth={1.5} />
        <text x={px(lo)} y={84} fontSize={12} textAnchor="middle" fill={MANIM.muted}>{m(lo, Q.dec)}</text>
        <text x={px(hi)} y={84} fontSize={12} textAnchor="middle" fill={MANIM.muted}>{m(hi, Q.dec)}</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Tabla de doble entrada ───────────── */

/** Frecuencias conjuntas, marginales, condicionadas e independencia estadística. */
export function DobleEntradaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 0, 0, DOUBLES.length - 1), i: int(ini[1], 3, 0, 4), j: int(ini[2], 1, 0, 4) };
  const [v, setV] = useState(init);
  const T = DOUBLES[v.t]!;
  const i = Math.min(v.i, T.rowLabels.length - 1);
  const j = Math.min(v.j, T.colLabels.length - 1);
  const J = jointStats(T.counts)!;
  const row = conditionalRow(T.counts, i);
  const col = conditionalCol(T.counts, j);
  const fij = J.joint[i]![j]!;
  const prod = J.fRow[i]! * J.fCol[j]!;
  return (
    <Frame
      hint={block.hint ?? "Elige una fila y una columna: se muestran la frecuencia conjunta, las marginales y las dos distribuciones condicionadas. Las variables son independientes si f_ij = f_i·f_j en todas las casillas."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tabla" items={DOUBLES.map((q, k) => ({ value: k, label: q.label }))} value={v.t} onChange={(t) => setV({ t, i: 0, j: 0 })} />
          <Slider label={`Fila: ${T.rows} = ${T.rowLabels[i]}`} value={i} min={0} max={T.rowLabels.length - 1} color={MANIM.blue} onChange={(k) => setV((x) => ({ ...x, i: k }))} />
          <Slider label={`Columna: ${T.cols} = ${T.colLabels[j]}`} value={j} min={0} max={T.colLabels.length - 1} color={MANIM.orange} onChange={(k) => setV((x) => ({ ...x, j: k }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <table className="w-full border-collapse text-sm" data-testid="tool-de-tabla">
          <thead>
            <tr>
              <th className={cell} />
              {T.colLabels.map((c, k) => (
                <th key={c} className={cell} style={{ color: k === j ? MANIM.orange : undefined }}>{c}</th>
              ))}
              <th className={cell}>nᵢ</th>
            </tr>
          </thead>
          <tbody>
            {T.counts.map((r, a) => (
              <tr key={T.rowLabels[a]}>
                <th className={cell} style={{ color: a === i ? MANIM.blue : undefined }}>{T.rowLabels[a]}</th>
                {r.map((c, b) => (
                  <td key={b} className={cell} style={{ background: a === i && b === j ? "rgba(255,210,80,0.25)" : undefined }}>{c}</td>
                ))}
                <td className={cell}>{J.rowTotals[a]}</td>
              </tr>
            ))}
            <tr>
              <th className={cell}>nⱼ</th>
              {J.colTotals.map((c, b) => (
                <td key={b} className={cell}>{c}</td>
              ))}
              <td className={cell}>{J.n}</td>
            </tr>
          </tbody>
        </table>
        <p className="text-base" data-testid="tool-de-celda">{`f(${T.rowLabels[i]}, ${T.colLabels[j]}) = ${T.counts[i]![j]}/${J.n} = ${m(fij, 3)};   fᵢ·fⱼ = ${m(J.fRow[i]!, 3)}·${m(J.fCol[j]!, 3)} = ${m(prod, 3)}`}</p>
        <p className="text-base" data-testid="tool-de-cond-fila">{`${T.cols} | ${T.rows} = ${T.rowLabels[i]}: ${row ? row.map((x, b) => `${T.colLabels[b]}: ${m(x, 2)}`).join("   |   ") : "sin datos"}`}</p>
        <p className="text-base" data-testid="tool-de-cond-col">{`${T.rows} | ${T.cols} = ${T.colLabels[j]}: ${col ? col.map((x, a) => `${T.rowLabels[a]}: ${m(x, 2)}`).join("   |   ") : "sin datos"}`}</p>
        <p className="text-lg font-semibold" style={{ color: J.independent ? MANIM.green : MANIM.red }} data-testid="tool-de-indep">
          {J.independent ? "Independientes: f_ij = fᵢ·fⱼ en todas las casillas" : `Dependientes: la mayor diferencia |f_ij − fᵢ·fⱼ| es ${m(J.maxDeviation, 3)}`}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Nube de puntos, correlación y regresión ───────────── */

const SYNTH = DATASETS.length;

/** Diagrama de dispersión, covarianza, coeficiente de correlación y rectas de regresión. */
export function NubeRegresionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: int(ini[0], 0, 0, SYNTH), r: int(ini[1], 80, -100, 100), ex: int(ini[2], 0, 0, 1), ox: int(ini[3], 50, 0, 100), oy: int(ini[4], 0, 0, 100), x0: int(ini[5], 60, 0, 100) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const synth = v.d === SYNTH;
  const D = synth ? { label: "Nube sintética", xName: "X", yName: "Y", ...syntheticCloud(v.r / 100), x0: 8, note: "30 puntos con el coeficiente de correlación que elijas." } : DATASETS[v.d]!;
  const bx0 = Math.min(...D.x);
  const bx1 = Math.max(...D.x);
  const by0 = Math.min(...D.y);
  const by1 = Math.max(...D.y);
  const padX = (bx1 - bx0) * 0.15 || 1;
  const padY = (by1 - by0) * 0.15 || 1;
  const xr: [number, number] = [bx0 - padX, bx1 + padX * 2];
  const yr: [number, number] = [by0 - padY, by1 + padY];
  const outlier = v.ex === 1 ? { x: xr[0] + ((xr[1] - xr[0]) * v.ox) / 100, y: yr[0] + ((yr[1] - yr[0]) * v.oy) / 100 } : null;
  const xs = outlier ? [...D.x, outlier.x] : D.x;
  const ys = outlier ? [...D.y, outlier.y] : D.y;
  const g = regression(xs, ys);
  const r = correlation(xs, ys);
  const sxy = covariance(xs, ys);
  const x0 = xr[0] + ((xr[1] - xr[0]) * v.x0) / 100;
  const pred = g ? g.a + g.b * x0 : null;
  const inRange = x0 >= bx0 && x0 <= bx1;
  const marks: Mark[] = [...xs.map((x, i) => ({ x, y: ys[i]!, color: outlier && i === xs.length - 1 ? MANIM.red : MANIM.blue, r: 5 }))];
  if (pred !== null) marks.push({ x: x0, y: pred, color: MANIM.yellow, r: 7 });
  const curves = g
    ? [
        { fn: (x: number) => g.a + g.b * x, color: MANIM.green, width: 2.6 },
        ...(Math.abs(g.bPrime) > 1e-12 ? [{ fn: (x: number) => (x - g.aPrime) / g.bPrime, color: MANIM.orange, dashed: true, width: 2 }] : []),
      ]
    : [];
  return (
    <Frame
      hint={block.hint ?? "Verde: recta de regresión de Y sobre X. Naranja discontinua: la de X sobre Y; coinciden solo si |r| = 1. El punto amarillo es la predicción para el valor de x elegido."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Datos" items={[...DATASETS.map((q, i) => ({ value: i, label: q.label })), { value: SYNTH, label: "Nube sintética" }]} value={v.d} onChange={(d) => setV((p) => ({ ...p, d }))} />
          {synth ? <Slider label="Coeficiente de correlación r" value={v.r} min={-100} max={100} color={MANIM.blue} onChange={set("r")} format={(n) => m(n / 100, 2)} /> : null}
          <Slider label={`Valor de ${D.xName} para predecir`} value={v.x0} min={0} max={100} color={MANIM.yellow} onChange={set("x0")} format={() => m(x0, 2)} />
          <Choice label="Dato atípico" items={[{ value: 0, label: "Sin dato extra" }, { value: 1, label: "Añadir un punto" }]} value={v.ex} onChange={set("ex")} />
          {v.ex === 1 ? (
            <>
              <Slider label="Posición horizontal" value={v.ox} min={0} max={100} color={MANIM.red} onChange={set("ox")} format={() => m(outlier!.x, 2)} />
              <Slider label="Posición vertical" value={v.oy} min={0} max={100} color={MANIM.red} onChange={set("oy")} format={() => m(outlier!.y, 2)} />
            </>
          ) : null}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-nr-nota">{D.note}</p>
        <p className="text-base" data-testid="tool-nr-medias">{`n = ${xs.length};  x̄ = ${m(mean(xs), 3)}, ȳ = ${m(mean(ys), 3)};  sₓ = ${m(sd(xs), 3)}, s_y = ${m(sd(ys), 3)};  Sₓᵧ = ${m(sxy, 3)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-nr-r">{`r = ${m(r, 4)}   ·   ${correlationText(r)}`}</p>
        <p className="text-base" data-testid="tool-nr-recta">{g ? `Y sobre X: y = ${m(g.a, 3)} ${g.b < 0 ? "−" : "+"} ${m(Math.abs(g.b), 3)}·x      X sobre Y: x = ${m(g.aPrime, 3)} ${g.bPrime < 0 ? "−" : "+"} ${m(Math.abs(g.bPrime), 3)}·y` : "No hay recta de regresión (una variable no varía)"}</p>
        <p className="text-base" data-testid="tool-nr-prediccion">{pred === null ? "" : `Predicción para x = ${m(x0, 2)}: y ≈ ${m(pred, 3)}   ·   ${inRange ? "dentro del rango de los datos (interpolación)" : "fuera del rango de los datos (extrapolación: poco fiable)"}`}</p>
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-nr-fiabilidad">{r === null ? "" : `Fiabilidad ≈ r² = ${m(r * r, 3)}: la recta explica el ${m(r * r * 100, 1)} % de la variación de Y.`}</p>
      </div>
      <FnPlot testId="tool-nr-grafica" xr={xr} yr={yr} curves={curves} marks={marks} />
    </Frame>
  );
}
