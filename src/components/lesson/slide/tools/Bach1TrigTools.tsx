"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  cosD, exactTrig, piFrac, quadrant, reference, sinD, solveAAS, solveSAS, solveSSA, solveSSS, solveTrigEq, tanD, toRad, type Tri,
} from "@/components/lesson/anim/trig";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const g = (x: number | null, d = 4) => (x === null ? "no existe" : fmtEs(x, d));
const ink = "text-[color:var(--stage-ink,#fff)]";

const W = 520;
const H = 300;

/* ───────────── Radianes ───────────── */

/** Grados ↔ radianes y longitud de arco s = θ·r. */
export function RadianesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: int(ini[0], 60, 0, 720), r: int(ini[1], 2, 1, 10) };
  const [v, setV] = useState(init);
  const rad = toRad(v.d);
  const R = 100;
  const cx = 150;
  const cy = H / 2;
  const sweep = v.d % 360 === 0 && v.d > 0 ? 359.99 : v.d % 360;
  const x1 = cx + R * Math.cos(toRad(sweep));
  const y1 = cy - R * Math.sin(toRad(sweep));
  return (
    <Frame
      hint={block.hint ?? "Mueve el ángulo: 180° son π rad y 360° son 2π rad. La longitud del arco es siempre el ángulo en radianes por el radio."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Ángulo" value={v.d} min={0} max={720} step={15} color={MANIM.blue} unit="°" onChange={(d) => setV((p) => ({ ...p, d }))} />
          <Slider label="Radio" value={v.r} min={1} max={10} color={MANIM.orange} unit=" m" onChange={(r) => setV((p) => ({ ...p, r }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-ra-rad">{`${v.d}° = ${piFrac(v.d)} rad ≈ ${fmtEs(rad, 4)} rad`}</p>
        <p className="text-lg" data-testid="tool-ra-arco">{`Arco = θ·r = ${fmtEs(rad, 4)} · ${v.r} = ${fmtEs(rad * v.r, 3)} m`}</p>
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-ra-vueltas">{v.d >= 360 ? `Son ${fmtEs(v.d / 360, 2)} vueltas completas.` : `Es ${fmtEs(v.d / 360, 3)} de vuelta.`}</p>
      </div>
      <Svg w={W} h={H} testId="tool-ra-dibujo">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.grid} strokeWidth={2.5} />
        {v.d > 0 ? (
          <path d={`M ${cx + R} ${cy} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 0 ${x1} ${y1}`} fill="none" stroke={MANIM.orange} strokeWidth={6} />
        ) : null}
        <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={MANIM.blue} strokeWidth={3} />
        <line x1={cx} y1={cy} x2={x1} y2={y1} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={cx} y={cy + R + 26} fontSize={15} fill={MANIM.muted} textAnchor="middle">{`radio ${v.r} m`}</text>
        <text x={340} y={cy - 6} fontSize={18} fill={MANIM.orange}>{`s = ${fmtEs(rad * v.r, 2)} m`}</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Circunferencia goniométrica ───────────── */

/** Seno, coseno y tangente de un ángulo cualquiera sobre la circunferencia unidad. */
export function CirculoTrigExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d: int(ini[0], 150, 0, 360) };
  const [v, setV] = useState(init);
  const s = sinD(v.d);
  const c = cosD(v.d);
  const t = tanD(v.d);
  const q = quadrant(v.d);
  const R = 105;
  const cx = 150;
  const cy = H / 2;
  const px = cx + R * c;
  const py = cy - R * s;
  const exS = exactTrig("sen", v.d);
  const exC = exactTrig("cos", v.d);
  const exT = exactTrig("tg", v.d);
  return (
    <Frame
      hint={block.hint ?? "Recorre los cuatro cuadrantes: observa los signos de seno, coseno y tangente, y que el ángulo de referencia da los mismos valores absolutos."}
      onReset={() => setV(init)}
      controls={<Slider label="Ángulo θ" value={v.d} min={0} max={360} step={15} color={MANIM.yellow} unit="°" onChange={(d) => setV({ d })} />}
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-ct-cuadrante">{`${piFrac(v.d)} rad · ${q === 0 ? "sobre un eje" : `cuadrante ${q}`} · referencia ${reference(v.d)}°`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.orange }} data-testid="tool-ct-sen">{`sen ${v.d}° = ${g(s)}${exS ? `  (${exS})` : ""}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-ct-cos">{`cos ${v.d}° = ${g(c)}${exC ? `  (${exC})` : ""}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.purple }} data-testid="tool-ct-tg">{`tg ${v.d}° = ${g(t)}${exT ? `  (${exT})` : ""}`}</p>
      </div>
      <Svg w={W} h={H} testId="tool-ct-circulo">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.grid} strokeWidth={2} />
        <line x1={cx - R - 20} y1={cy} x2={cx + R + 90} y2={cy} stroke={MANIM.ink} strokeWidth={1.5} />
        <line x1={cx} y1={cy + R + 14} x2={cx} y2={cy - R - 14} stroke={MANIM.ink} strokeWidth={1.5} />
        <line x1={cx + R} y1={cy - 130} x2={cx + R} y2={cy + 130} stroke={MANIM.purple} strokeWidth={1.5} strokeDasharray="5 5" />
        <line x1={px} y1={py} x2={px} y2={cy} stroke={MANIM.orange} strokeWidth={4} />
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke={MANIM.green} strokeWidth={4} />
        {t !== null && Math.abs(t * R) < 130 ? <line x1={cx + R} y1={cy} x2={cx + R} y2={cy - t * R} stroke={MANIM.purple} strokeWidth={5} /> : null}
        <line x1={cx} y1={cy} x2={px} y2={py} stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={px} cy={py} r={6} fill={MANIM.blue} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Ángulos relacionados ───────────── */

const REL: { label: string; ang: (a: number) => number }[] = [
  { label: "α", ang: (a) => a },
  { label: "180° − α", ang: (a) => 180 - a },
  { label: "180° + α", ang: (a) => 180 + a },
  { label: "360° − α", ang: (a) => 360 - a },
  { label: "−α", ang: (a) => -a },
  { label: "90° − α", ang: (a) => 90 - a },
];

/** Razones de α, 180° − α, 180° + α, 360° − α, −α y 90° − α a la vez. */
export function AngulosRelacionadosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 30, 5, 85) };
  const [v, setV] = useState(init);
  return (
    <Frame
      hint={block.hint ?? "Compara cada fila con la de α: los valores absolutos se repiten y solo cambian los signos (o se intercambian seno y coseno en 90° − α)."}
      onReset={() => setV(init)}
      controls={<Slider label="Ángulo agudo α" value={v.a} min={5} max={85} step={5} color={MANIM.blue} unit="°" onChange={(a) => setV({ a })} />}
    >
      <div className={`overflow-x-auto ${ink}`} data-testid="tool-readout">
        <table className="w-full text-left text-base tabular-nums" data-testid="tool-ar-tabla">
          <thead>
            <tr className="text-sm" style={{ color: MANIM.muted }}>
              <th className="pr-3">Ángulo</th><th className="pr-3">Valor</th><th className="pr-3">sen</th><th className="pr-3">cos</th><th>tg</th>
            </tr>
          </thead>
          <tbody>
            {REL.map((r, i) => {
              const d = r.ang(v.a);
              return (
                <tr key={r.label} data-testid={`tool-ar-fila-${i}`}>
                  <td className="pr-3 font-semibold">{r.label}</td>
                  <td className="pr-3">{`${d}°`}</td>
                  <td className="pr-3" style={{ color: MANIM.orange }}>{g(sinD(d), 4)}</td>
                  <td className="pr-3" style={{ color: MANIM.green }}>{g(cosD(d), 4)}</td>
                  <td style={{ color: MANIM.purple }}>{g(tanD(d), 4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ───────────── Suma de ángulos ───────────── */

/** sen(a ± b) y cos(a ± b) con las fórmulas, frente al error típico sen a + sen b. */
export function SumaAngulosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 45, 0, 180), b: int(ini[1], 30, 0, 180), m: int(ini[2], 0, 0, 1) };
  const [v, setV] = useState(init);
  const sg = v.m === 0 ? 1 : -1;
  const t = v.a + sg * v.b;
  const op = v.m === 0 ? "+" : "−";
  const senF = sinD(v.a) * cosD(v.b) + sg * cosD(v.a) * sinD(v.b);
  const cosF = cosD(v.a) * cosD(v.b) - sg * sinD(v.a) * sinD(v.b);
  return (
    <Frame
      hint={block.hint ?? "Con 45° y 30° sale sen 75° ≈ 0,9659. Comprueba que sen(a + b) NO es sen a + sen b."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Ángulo a" value={v.a} min={0} max={180} step={5} color={MANIM.blue} unit="°" onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Ángulo b" value={v.b} min={0} max={180} step={5} color={MANIM.orange} unit="°" onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Choice label="Operación" items={[{ value: 0, label: "a + b" }, { value: 1, label: "a − b" }]} value={v.m} onChange={(m) => setV((p) => ({ ...p, m }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-sa-sen">{`sen(${v.a}° ${op} ${v.b}°) = sen ${t}° = ${g(sinD(t))}`}</p>
        <p className="text-lg" style={{ color: MANIM.green }} data-testid="tool-sa-sen-formula">{`sen a·cos b ${op} cos a·sen b = ${g(senF)}`}</p>
        <p className="text-lg" data-testid="tool-sa-cos">{`cos ${t}° = ${g(cosD(t))}`}</p>
        <p className="text-lg" style={{ color: MANIM.green }} data-testid="tool-sa-cos-formula">{`cos a·cos b ${v.m === 0 ? "−" : "+"} sen a·sen b = ${g(cosF)}`}</p>
        <p className="text-lg" style={{ color: MANIM.red }} data-testid="tool-sa-error">{`Error típico: sen a ${op} sen b = ${g(sinD(v.a) + sg * sinD(v.b))}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Ángulo doble y mitad ───────────── */

/** sen 2α, cos 2α y las razones del ángulo mitad con sus fórmulas. */
export function DobleMitadExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 60, 15, 360) };
  const [v, setV] = useState(init);
  const a = v.a;
  const dbl = 2 * a;
  const half = a / 2;
  const signCosHalf = cosD(half) >= 0 ? 1 : -1;
  const cosHalfF = signCosHalf * Math.sqrt((1 + cosD(a)) / 2);
  const sinHalfF = Math.sqrt((1 - cosD(a)) / 2);
  return (
    <Frame
      hint={block.hint ?? "Comprueba cada fórmula con distintos ángulos. En el ángulo mitad el signo de la raíz lo decide el cuadrante de α/2."}
      onReset={() => setV(init)}
      controls={<Slider label="Ángulo α" value={a} min={15} max={360} step={15} color={MANIM.blue} unit="°" onChange={(x) => setV({ a: x })} />}
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-dm-sen2">{`sen ${dbl}° = ${g(sinD(dbl))}  =  2·sen α·cos α = ${g(2 * sinD(a) * cosD(a))}`}</p>
        <p className="text-lg" data-testid="tool-dm-cos2">{`cos ${dbl}° = ${g(cosD(dbl))}  =  cos²α − sen²α = ${g(cosD(a) ** 2 - sinD(a) ** 2)}`}</p>
        <p className="text-lg" style={{ color: MANIM.green }} data-testid="tool-dm-sen-mitad">{`sen ${fmtEs(half, 1)}° = ${g(sinD(half))}  =  +√((1 − cos α)/2) = ${g(sinHalfF)}`}</p>
        <p className="text-lg" style={{ color: MANIM.green }} data-testid="tool-dm-cos-mitad">{`cos ${fmtEs(half, 1)}° = ${g(cosD(half))}  =  ${signCosHalf > 0 ? "+" : "−"}√((1 + cos α)/2) = ${g(cosHalfF)}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Suma de razones a producto ───────────── */

/** sen A + sen B = 2 sen((A+B)/2) cos((A−B)/2) y sus hermanas. */
export function SumaProductoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 75, 0, 180), b: int(ini[1], 15, 0, 180) };
  const [v, setV] = useState(init);
  const hs = (v.a + v.b) / 2;
  const hd = (v.a - v.b) / 2;
  const rows = [
    { id: "sen-mas", izq: `sen ${v.a}° + sen ${v.b}°`, vi: sinD(v.a) + sinD(v.b), der: "2·sen((A+B)/2)·cos((A−B)/2)", vd: 2 * sinD(hs) * cosD(hd) },
    { id: "sen-menos", izq: `sen ${v.a}° − sen ${v.b}°`, vi: sinD(v.a) - sinD(v.b), der: "2·cos((A+B)/2)·sen((A−B)/2)", vd: 2 * cosD(hs) * sinD(hd) },
    { id: "cos-mas", izq: `cos ${v.a}° + cos ${v.b}°`, vi: cosD(v.a) + cosD(v.b), der: "2·cos((A+B)/2)·cos((A−B)/2)", vd: 2 * cosD(hs) * cosD(hd) },
    { id: "cos-menos", izq: `cos ${v.a}° − cos ${v.b}°`, vi: cosD(v.a) - cosD(v.b), der: "−2·sen((A+B)/2)·sen((A−B)/2)", vd: -2 * sinD(hs) * sinD(hd) },
  ];
  return (
    <Frame
      hint={block.hint ?? "Cambia A y B: los dos lados de cada igualdad coinciden siempre. Con A = 75° y B = 15° la suma de senos da √6/2 ≈ 1,2247."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Ángulo A" value={v.a} min={0} max={180} step={5} color={MANIM.blue} unit="°" onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Ángulo B" value={v.b} min={0} max={180} step={5} color={MANIM.orange} unit="°" onChange={(b) => setV((p) => ({ ...p, b }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        {rows.map((r) => (
          <p key={r.id} className="text-base" data-testid={`tool-sp-${r.id}`}>{`${r.izq} = ${g(r.vi)}  =  ${r.der} = ${g(r.vd)}`}</p>
        ))}
      </div>
    </Frame>
  );
}

/* ───────────── Ecuaciones trigonométricas ───────────── */

const FN_LABEL = ["sen x", "cos x", "tg x"] as const;
const FN_KEY = ["sen", "cos", "tg"] as const;

/** sen x = a, cos x = a o tg x = a: soluciones en [0°, 360°) y en la gráfica. */
export function EcuacionTrigExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { fn: int(ini[0], 0, 0, 2), a2: int(ini[1], 1, -6, 6) };
  const [v, setV] = useState(init);
  const a = v.a2 / 2;
  const key = FN_KEY[v.fn]!;
  const sols = solveTrigEq(key, a);
  const fnVal = (d: number) => (key === "sen" ? sinD(d) : key === "cos" ? cosD(d) : tanD(d));
  const YM = 3;
  const px = (d: number) => 30 + (d / 360) * (W - 50);
  const py = (y: number) => H / 2 - (clamp(y, -YM, YM) / YM) * (H / 2 - 14);
  const pts: string[][] = [[]];
  for (let d = 0; d <= 360; d += 2) {
    const y = fnVal(d);
    if (y === null || Math.abs(y) > YM) {
      if (pts[pts.length - 1]!.length) pts.push([]);
    } else pts[pts.length - 1]!.push(`${px(d)},${py(y)}`);
  }
  return (
    <Frame
      hint={block.hint ?? "Con sen x = 0,5 salen 30° y 150°: dos soluciones por vuelta. Prueba valores fuera de [−1, 1] para sen y cos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={FN_LABEL.map((l, i) => ({ value: i, label: l }))} value={v.fn} onChange={(fn) => setV((p) => ({ ...p, fn }))} />
          <Slider label="Valor a" value={a} min={-3} max={3} step={0.5} color={MANIM.orange} onChange={(x) => setV((p) => ({ ...p, a2: Math.round(x * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-et-ecuacion">{`${FN_LABEL[v.fn]} = ${fmtEs(a, 1)}`}</p>
        <p className="text-2xl font-bold" style={{ color: sols.length ? MANIM.green : MANIM.red }} data-testid="tool-et-soluciones">
          {sols.length ? `x = ${sols.map((s) => `${fmtEs(s, 2)}°`).join("  y  ")}` : "Sin solución real"}
        </p>
        <p className="text-sm" data-testid="tool-et-pi">
          {sols.length ? `En radianes: ${sols.map((s) => (Number.isInteger(s) ? piFrac(s) : `${fmtEs((s * Math.PI) / 180, 3)}`)).join("  y  ")}  (más 2kπ)` : "El valor está fuera del recorrido de la función."}
        </p>
      </div>
      <Svg w={W} h={H} testId="tool-et-grafica">
        <line x1={20} y1={H / 2} x2={W - 8} y2={H / 2} stroke={MANIM.ink} strokeWidth={1.5} />
        {[0, 90, 180, 270, 360].map((d) => (
          <g key={d}>
            <line x1={px(d)} y1={H / 2 - 5} x2={px(d)} y2={H / 2 + 5} stroke={MANIM.ink} strokeWidth={1.5} />
            <text x={px(d)} y={H / 2 + 20} fontSize={12} fill={MANIM.muted} textAnchor="middle">{`${d}°`}</text>
          </g>
        ))}
        <line x1={20} y1={py(a)} x2={W - 8} y2={py(a)} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="6 5" />
        {pts.filter((p) => p.length > 1).map((p, i) => (
          <polyline key={i} points={p.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        ))}
        {sols.map((s) => (
          <circle key={s} cx={px(s)} cy={py(a)} r={6} fill={MANIM.yellow} />
        ))}
      </Svg>
    </Frame>
  );
}

/* ───────────── Resolución general de triángulos ───────────── */

const CASES = [
  { value: 0, label: "Dos lados y el ángulo entre ellos" },
  { value: 1, label: "Tres lados" },
  { value: 2, label: "Dos ángulos y un lado" },
  { value: 3, label: "Dos lados y un ángulo opuesto" },
] as const;

function solve(caso: number, p: [number, number, number]): Tri[] {
  if (caso === 0) return [solveSAS(p[0], p[1], p[2])];
  if (caso === 1) {
    const t = solveSSS(p[0], p[1], p[2]);
    return t ? [t] : [];
  }
  if (caso === 2) {
    const t = solveAAS(p[0], p[1], p[2]);
    return t ? [t] : [];
  }
  return solveSSA(p[0], p[1], p[2]);
}

const TRI_COLORS = [MANIM.blue, MANIM.orange];

/** Triángulos por los cuatro casos de datos: coseno, seno y el caso ambiguo. */
export function TrianguloGeneralExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const caso0 = int(ini[0], 0, 0, 3);
  const defs: Record<number, [number, number, number]> = { 0: [5, 7, 60], 1: [5, 6, 7], 2: [40, 60, 8], 3: [7, 10, 30] };
  const d0 = defs[caso0]!;
  const init = { caso: caso0, p: [int(ini[1], d0[0], 1, 180), int(ini[2], d0[1], 1, 180), int(ini[3], d0[2], 1, 180)] as [number, number, number] };
  const [v, setV] = useState(init);
  const labels: Record<number, [string, string, string]> = {
    0: ["Lado b", "Lado c", "Ángulo A entre b y c (°)"],
    1: ["Lado a", "Lado b", "Lado c"],
    2: ["Ángulo A (°)", "Ángulo B (°)", "Lado a opuesto a A"],
    3: ["Lado a", "Lado b", "Ángulo A opuesto a a (°)"],
  };
  const isAngle = (k: number) => (v.caso === 0 && k === 2) || (v.caso === 2 && k < 2) || (v.caso === 3 && k === 2);
  const clampP = (k: number, x: number) => (isAngle(k) ? clamp(x, 5, 175) : clamp(x, 1, 20));
  const p: [number, number, number] = [clampP(0, v.p[0]), clampP(1, v.p[1]), clampP(2, v.p[2])];
  const sols = solve(v.caso, p);
  const verts = sols.map((t) => {
    const B: [number, number] = [t.c, 0];
    const C: [number, number] = [t.b * cosD(t.A), t.b * sinD(t.A)];
    return { A: [0, 0] as [number, number], B, C };
  });
  const xs = verts.flatMap((q) => [q.A[0], q.B[0], q.C[0]]);
  const ys = verts.flatMap((q) => [q.A[1], q.B[1], q.C[1]]);
  const minX = Math.min(0, ...xs);
  const maxX = Math.max(1, ...xs);
  const maxY = Math.max(1, ...ys);
  const scale = Math.min((W - 80) / (maxX - minX), (H - 70) / maxY);
  const T = (pt: [number, number]): [number, number] => [40 + (pt[0] - minX) * scale, H - 30 - pt[1] * scale];
  const setP = (k: number, x: number) => setV((s) => ({ ...s, p: s.p.map((o, i) => (i === k ? x : o)) as [number, number, number] }));
  return (
    <Frame
      hint={block.hint ?? "Dos lados y un ángulo opuesto pueden dar 0, 1 o 2 triángulos. Con a = 7, b = 10 y A = 30° salen dos; acorta a hasta 5 y queda uno solo (rectángulo)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Datos conocidos"
            items={CASES}
            value={v.caso}
            onChange={(caso) => setV({ caso, p: defs[caso]! })}
          />
          {([0, 1, 2] as const).map((k) => (
            <Slider
              key={`${v.caso}-${k}`}
              label={labels[v.caso]![k]}
              value={p[k]}
              min={isAngle(k) ? 5 : 1}
              max={isAngle(k) ? 175 : 20}
              color={k === 0 ? MANIM.blue : k === 1 ? MANIM.orange : MANIM.yellow}
              onChange={(x) => setP(k, x)}
              format={(n) => fmtEs(n, 0)}
            />
          ))}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-xl font-bold" style={{ color: sols.length ? MANIM.green : MANIM.red }} data-testid="tool-tg-n">
          {sols.length === 0 ? "No existe ningún triángulo con esos datos" : sols.length === 1 ? "Un triángulo" : "Dos triángulos distintos"}
        </p>
        {sols.map((t, i) => (
          <p key={i} className="text-sm" style={{ color: TRI_COLORS[i] }} data-testid={`tool-tg-sol-${i}`}>
            {`a = ${fmtEs(t.a, 2)}  b = ${fmtEs(t.b, 2)}  c = ${fmtEs(t.c, 2)}  ·  A = ${fmtEs(t.A, 1)}°  B = ${fmtEs(t.B, 1)}°  C = ${fmtEs(t.C, 1)}°  ·  área = ${fmtEs(t.area, 2)}`}
          </p>
        ))}
      </div>
      <Svg w={W} h={H} testId="tool-tg-dibujo">
        {verts.map((q, i) => {
          const [a, b, c] = [T(q.A), T(q.B), T(q.C)];
          return (
            <g key={i}>
              <polygon points={`${a.join(",")} ${b.join(",")} ${c.join(",")}`} fill={TRI_COLORS[i]} fillOpacity={0.14} stroke={TRI_COLORS[i]} strokeWidth={3} />
              <circle cx={c[0]} cy={c[1]} r={4} fill={TRI_COLORS[i]} />
            </g>
          );
        })}
        {verts[0] ? (
          <g fontSize={14} fill={MANIM.muted}>
            <text x={T(verts[0].A)[0] - 14} y={T(verts[0].A)[1] + 4} textAnchor="end">A</text>
            <text x={T(verts[0].B)[0] + 12} y={T(verts[0].B)[1] + 4}>B</text>
            <text x={T(verts[0].C)[0]} y={T(verts[0].C)[1] - 10} textAnchor="middle">C</text>
          </g>
        ) : null}
      </Svg>
    </Frame>
  );
}
