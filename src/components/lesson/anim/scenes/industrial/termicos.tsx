import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

const f1 = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const GAMMA = 1.4;

export function Arrow({ x1, y1, x2, y2, color, width = 4, head = 12 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; head?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(a) * head;
  const hy = y2 - Math.sin(a) * head;
  const w = head * 0.55;
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx - Math.sin(a) * w},${hy + Math.cos(a) * w} ${hx + Math.sin(a) * w},${hy - Math.cos(a) * w}`} fill={color} />
    </g>
  );
}

/** Caja con rótulo (elementos de una instalación). */
export function Box({ x, y, w, h, color, label, active = true, size = 19 }: { x: number; y: number; w: number; h: number; color: string; label: ReactNode; active?: boolean; size?: number }) {
  return (
    <g className="anim-t" style={{ opacity: active ? 1 : 0.45 }}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill={MANIM.surface} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={active ? 4 : 2.5} />
      <Txt x={x} y={y + 6} size={size} color={color}>
        {label}
      </Txt>
    </g>
  );
}

/** Puntos de una curva y = f(x) como atributo `d` de un path. */
function curve(f: (x: number) => number, x0: number, x1: number, X: (x: number) => number, Y: (y: number) => number, steps = 40) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = x0 + ((x1 - x0) * i) / steps;
    return `${i ? "L" : "M"} ${X(x).toFixed(1)} ${Y(f(x)).toFixed(1)}`;
  }).join(" ");
}

/* ───────────── Trabajo según el camino y ciclo cerrado ───────────── */

export function buildProcesosCamino(): AnimBuild {
  const X0 = 110;
  const Y0 = 360;
  const vi = 220;
  const vf = 560;
  const pi = 110;
  const pf = 270;
  const curvaF = (x: number) => pf + (pi - pf) * ((vf - x) / (vf - vi)) ** 2;
  const pts = Array.from({ length: 41 }, (_, k) => {
    const x = vi + ((vf - vi) * k) / 40;
    return `${k ? "L" : "M"} ${x} ${curvaF(x).toFixed(1)}`;
  }).join(" ");
  const areaCurva = `${pts} L ${vf} ${Y0} L ${vi} ${Y0} Z`;
  return {
    label: "El trabajo de un sistema depende del camino y no solo del estado inicial y final",
    beatMs: 5200,
    captions: [
      "Un gas pasa del estado inicial $i$ al final $f$. El trabajo es el **área bajo la curva** en el diagrama $pV$. ¿Depende solo de $i$ y de $f$?",
      "**Camino 1**: primero expansión a presión constante ($i \\to a$) y luego a volumen constante ($a \\to f$). El área es un rectángulo alto: $W_1 = p_i\\,\\Delta V$.",
      "**Camino 2**: primero a volumen constante ($i \\to b$) y después a presión constante ($b \\to f$). El área es mucho menor: $W_2 = p_f\\,\\Delta V$.",
      "**Camino 3**: directo, simultaneando $p$ y $V$. El área es otra distinta. Mismo estado inicial y final, tres trabajos diferentes: **el trabajo no es una propiedad del estado**.",
      "Si el estado final **coincide** con el inicial, el proceso es **cerrado** (ciclo). El área encerrada es el **trabajo neto**: solo así una máquina puede producir trabajo repetidamente.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={X0} y0={Y0} x1={760} y1={40} xLabel="V" yLabel="p" />
        <rect className="anim-t" x={vi} y={pi} width={vf - vi} height={Y0 - pi} fill={MANIM.blue} fillOpacity={beat === 1 ? 0.22 : 0} />
        <rect className="anim-t" x={vi} y={pf} width={vf - vi} height={Y0 - pf} fill={MANIM.green} fillOpacity={beat === 2 ? 0.25 : 0} />
        <path className="anim-t" d={areaCurva} fill={MANIM.orange} fillOpacity={beat === 3 ? 0.22 : 0} />
        <rect className="anim-t" x={vi} y={pi} width={vf - vi} height={pf - pi} fill={MANIM.yellow} fillOpacity={beat === 4 ? 0.25 : 0} />
        <DrawPath show={beat >= 1} d={`M ${vi} ${pi} L ${vf} ${pi} L ${vf} ${pf}`} color={MANIM.blue} width={beat === 1 ? 5 : 3} />
        <DrawPath show={beat >= 2} d={`M ${vi} ${pi} L ${vi} ${pf} L ${vf} ${pf}`} color={MANIM.green} width={beat === 2 ? 5 : 3} />
        <DrawPath show={beat >= 3} d={pts} color={MANIM.orange} width={beat === 3 ? 5 : 3} />
        <circle cx={vi} cy={pi} r={8} fill={MANIM.ink} />
        <circle cx={vf} cy={pf} r={8} fill={MANIM.ink} />
        <Txt x={vi - 14} y={pi - 10} size={22} color={MANIM.ink} anchor="end">
          i
        </Txt>
        <Txt x={vf + 22} y={pf + 24} size={22} color={MANIM.ink} anchor="start">
          f
        </Txt>
        <Fade show={beat >= 1 && beat <= 1}>
          <Txt x={vf + 14} y={pi - 6} size={20} color={MANIM.blue} anchor="start">
            a
          </Txt>
          <Txt x={420} y={pi + 90} size={22} color={MANIM.blue}>
            W₁ grande
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={vi - 14} y={pf + 6} size={20} color={MANIM.green} anchor="end">
            b
          </Txt>
          <Txt x={420} y={pf + 60} size={22} color={MANIM.green}>
            W₂ pequeño
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={440} y={pf + 60} size={22} color={MANIM.orange}>
            W₃ intermedio
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={400} y={(pi + pf) / 2 + 8} size={24} color={MANIM.yellow}>
            W neto
          </Txt>
          <Txt x={600} y={80} size={18} color={MANIM.muted}>
            ciclo: i → a → f → b → i
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Motor térmico y máquina frigorífica entre dos focos ───────────── */

export function buildMotorFrigorificaFocos(): AnimBuild {
  const Qc = 100;
  const W = 40;
  const Qf = Qc - W;
  const cx = 400;
  const cy = 215;
  const Flow = ({ x1, y1, x2, y2, color, n, label, lx, ly }: { x1: number; y1: number; x2: number; y2: number; color: string; n: number; label: string; lx: number; ly: number }) => (
    <g>
      <Arrow x1={x1} y1={y1} x2={x2} y2={y2} color={color} width={Math.max(5, n * 0.28)} head={20} />
      <Txt x={lx} y={ly} size={22} color={color} anchor="start">
        {label}
      </Txt>
    </g>
  );
  return {
    label: "Motor térmico y máquina frigorífica entre un foco caliente y uno frío",
    beatMs: 5200,
    captions: [
      "Para producir trabajo neto hacen falta **dos focos** a distinta temperatura. El motor térmico toma $Q_c$ del foco caliente.",
      "Una parte se convierte en trabajo, $W = Q_c - Q_f$, y el resto, $Q_f$, se **cede al foco frío**. Siempre hay un calor de escape.",
      "El **rendimiento** es lo aprovechado entre lo aportado: $\\eta = \\dfrac{W}{Q_c} = \\dfrac{Q_c - Q_f}{Q_c} = 1 - \\dfrac{Q_f}{Q_c}$. Con estos números, $40\\,\\%$.",
      "La **máquina frigorífica** es el motor al revés: consume trabajo $W$ para sacar $Q_f$ del foco frío y llevar $Q_c = W + Q_f$ al caliente.",
    ],
    render: (beat) => {
      const reverse = beat === 3;
      return (
        <Canvas>
          <Box x={cx} y={52} w={300} h={56} color={MANIM.red} label={`Foco caliente  T_c`} />
          <Box x={cx} y={378} w={300} h={56} color={MANIM.blue} label={`Foco frío  T_f`} />
          <circle cx={cx} cy={cy} r={58} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={cx} y={cy + 7} size={18} color={MANIM.yellow}>
            {reverse ? "frigorífica" : "motor"}
          </Txt>
          <Fade show={beat >= 0 && !reverse}>
            <Flow x1={cx - 10} y1={86} x2={cx - 10} y2={cy - 56} color={MANIM.red} n={Qc} label="" lx={0} ly={0} />
            <Txt x={cx - 30} y={150} size={22} color={MANIM.red} anchor="end">
              Q_c = 100
            </Txt>
          </Fade>
          <Fade show={beat >= 1 && !reverse}>
            <Flow x1={cx + 56} y1={cy} x2={cx + 200} y2={cy} color={MANIM.green} n={W} label="W = 40" lx={cx + 120} ly={cy - 22} />
            <Flow x1={cx + 10} y1={cy + 56} x2={cx + 10} y2={348} color={MANIM.blue} n={Qf} label="Q_f = 60" lx={cx + 30} ly={300} />
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={150} y={cy + 6} size={30} color={MANIM.yellow}>
              η = 40 %
            </Txt>
          </Fade>
          <Fade show={reverse}>
            <Flow x1={cx + 10} y1={cy - 56} x2={cx + 10} y2={86} color={MANIM.red} n={Qc} label="" lx={0} ly={0} />
            <Txt x={cx + 30} y={150} size={22} color={MANIM.red} anchor="start">
              Q_c = W + Q_f
            </Txt>
            <Flow x1={cx - 10} y1={348} x2={cx - 10} y2={cy + 56} color={MANIM.blue} n={Qf} label="" lx={0} ly={0} />
            <Txt x={cx - 30} y={300} size={22} color={MANIM.blue} anchor="end">
              Q_f
            </Txt>
            <Flow x1={cx + 200} y1={cy} x2={cx + 56} y2={cy} color={MANIM.green} n={W} label="W" lx={cx + 140} ly={cy - 22} />
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Ciclo de Carnot (motor y frigorífico) ───────────── */

function carnotGeom() {
  const k1 = 8; // p·V en el foco caliente (V1 = 1)
  const V1 = 1;
  const V2 = 2;
  const V3 = 12;
  const p2 = k1 / V2;
  const p3 = p2 * (V2 / V3) ** GAMMA;
  const kf = p3 * V3;
  const V4 = (k1 / kf) ** (1 / (GAMMA - 1)) * V1;
  const p4 = kf / V4;
  return { k1, kf, V1, V2, V3, V4, p1: k1, p2, p3, p4 };
}

function buildCarnotBase(reversed: boolean): AnimBuild {
  const g = carnotGeom();
  const X = (v: number) => 110 + v * 54;
  const Y = (p: number) => 370 - p * 38;
  const iso = (k: number) => (v: number) => k / v;
  const adi = (v0: number, p0: number) => (v: number) => p0 * (v0 / v) ** GAMMA;
  const seg = {
    hot: curve(iso(g.k1), g.V1, g.V2, X, Y),
    adiOut: curve(adi(g.V2, g.p2), g.V2, g.V3, X, Y),
    cold: curve(iso(g.kf), g.V4, g.V3, X, Y),
    adiIn: curve(adi(g.V1, g.p1), g.V1, g.V4, X, Y),
  };
  const area = [
    ...Array.from({ length: 41 }, (_, i) => {
      const v = g.V1 + ((g.V2 - g.V1) * i) / 40;
      return `${i ? "L" : "M"} ${X(v).toFixed(1)} ${Y(g.k1 / v).toFixed(1)}`;
    }),
    ...Array.from({ length: 41 }, (_, i) => {
      const v = g.V2 + ((g.V3 - g.V2) * i) / 40;
      return `L ${X(v).toFixed(1)} ${Y(g.p2 * (g.V2 / v) ** GAMMA).toFixed(1)}`;
    }),
    ...Array.from({ length: 41 }, (_, i) => {
      const v = g.V3 + ((g.V4 - g.V3) * i) / 40;
      return `L ${X(v).toFixed(1)} ${Y(g.kf / v).toFixed(1)}`;
    }),
    ...Array.from({ length: 41 }, (_, i) => {
      const v = g.V4 + ((g.V1 - g.V4) * i) / 40;
      return `L ${X(v).toFixed(1)} ${Y(g.p1 * (g.V1 / v) ** GAMMA).toFixed(1)}`;
    }),
    "Z",
  ].join(" ");
  const pts = {
    M1: [X(g.V1), Y(g.p1)],
    M2: [X(g.V2), Y(g.p2)],
    M3: [X(g.V3), Y(g.p3)],
    M4: [X(g.V4), Y(g.p4)],
  } as const;
  // motor: 1→2 (T_c), 2→3 (adiabática), 3→4 (T_f), 4→1 (adiabática); frigorífico: 3→2, 2→1, 1→4, 4→3.
  const names: Record<string, string> = reversed ? { M3: "1", M2: "2", M1: "3", M4: "4" } : { M1: "1", M2: "2", M3: "3", M4: "4" };
  const title = (beat: number) => {
    const t = reversed
      ? ["Compresión adiabática (T_f → T_c)", "Compresión isoterma a T_c: cede Q_c", "Expansión adiabática (T_c → T_f)", "Expansión isoterma a T_f: absorbe Q_f"]
      : ["Expansión isoterma a T_c: absorbe Q_c", "Expansión adiabática (T_c → T_f)", "Compresión isoterma a T_f: cede Q_f", "Compresión adiabática (T_f → T_c)"];
    return t[beat - 1] ?? "";
  };
  const order: ("hot" | "adiOut" | "cold" | "adiIn")[] = reversed ? ["adiIn", "hot", "adiOut", "cold"] : ["hot", "adiOut", "cold", "adiIn"];
  const colors = { hot: MANIM.red, adiOut: MANIM.yellow, cold: MANIM.blue, adiIn: MANIM.purple } as const;
  const captionsMotor = [
    "El motor de Carnot trabaja con un gas ideal en un cilindro, entre un foco caliente a $T_c$ y uno frío a $T_f$ (en kelvin). Hay **dos isotermas** y **dos adiabáticas**.",
    "**Tiempo 1.** Expansión **isoterma** a $T_c$: el gas absorbe $Q_c = R\\,T_c\\ln\\dfrac{V_2}{V_1}$ y realiza trabajo.",
    "**Tiempo 2.** Expansión **adiabática**: sin intercambio de calor, el gas se enfría hasta $T_f$ y sigue produciendo trabajo.",
    "**Tiempo 3.** Compresión **isoterma** a $T_f$: el gas cede $Q_f = R\\,T_f\\ln\\dfrac{V_3}{V_4}$ al foco frío (consume algo de trabajo).",
    "**Tiempo 4.** Compresión **adiabática** hasta $T_c$ y se cierra el ciclo. El área encerrada es el trabajo neto, y el rendimiento sale $\\eta = 1 - T_f/T_c$.",
  ];
  const captionsFrigo = [
    "En la máquina frigorífica el ciclo de Carnot se recorre **al revés**: se consume trabajo para extraer calor del foco frío.",
    "**Proceso 1-2.** Compresión **adiabática** de $T_f$ a $T_c$. Consume trabajo.",
    "**Proceso 2-3.** Compresión **isoterma** a $T_c$: el gas, más caliente que el foco, **cede $Q_c$** al foco caliente.",
    "**Proceso 3-4.** Expansión **adiabática** de $T_c$ a $T_f$: el gas queda más frío que el recinto.",
    "**Proceso 4-1.** Expansión **isoterma** a $T_f$: el gas **absorbe $Q_f$** del recinto frío. Es el objetivo de la máquina. Eficiencia $= T_f/(T_c - T_f)$.",
  ];
  return {
    label: reversed ? "Ciclo de Carnot recorrido en sentido inverso: máquina frigorífica" : "Ciclo de Carnot: dos isotermas y dos adiabáticas",
    beatMs: 5600,
    captions: reversed ? captionsFrigo : captionsMotor,
    render: (beat) => (
      <Canvas>
        <Axes x0={110} y0={370} x1={770} y1={30} xLabel="V" yLabel="p" />
        <path className="anim-t" d={area} fill={reversed ? MANIM.blue : MANIM.green} fillOpacity={beat >= 4 ? 0.2 : 0} />
        {order.map((k, i) => (
          <DrawPath key={k} show={beat >= i + 1} d={seg[k]} color={colors[k]} width={beat === i + 1 ? 6 : 3.5} />
        ))}
        {(["M1", "M2", "M3", "M4"] as const).map((k) => (
          <g key={k}>
            <circle cx={pts[k][0]} cy={pts[k][1]} r={7} fill={MANIM.ink} />
            <Txt x={pts[k][0] + (k === "M1" || k === "M4" ? -14 : 14)} y={pts[k][1] - 12} size={20} color={MANIM.ink} anchor={k === "M1" || k === "M4" ? "end" : "start"}>
              {names[k]}
            </Txt>
          </g>
        ))}
        <Txt x={120} y={400} size={20} color={MANIM.yellow} anchor="start">
          {beat >= 1 && beat <= 4 ? title(beat) : beat === 0 ? "isotermas (hiperbólicas) y adiabáticas (más inclinadas)" : reversed ? "η_frigorífica = T_f / (T_c − T_f)" : "η = 1 − T_f / T_c"}
        </Txt>
        <Fade show={beat >= 4}>
          <Txt x={420} y={250} size={24} color={reversed ? MANIM.blue : MANIM.green}>
            W
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
export const buildCarnotCiclo = () => buildCarnotBase(false);
export const buildCarnotFrigorifico = () => buildCarnotBase(true);

/* ───────────── Ciclo de vapor (Rankine) ───────────── */

export function buildRankineCircuito(): AnimBuild {
  const L = 150;
  const R = 650;
  const T = 100;
  const B = 330;
  const loop = `M ${L} ${B} L ${L} ${T} L ${R} ${T} L ${R} ${B} L ${L} ${B}`;
  return {
    label: "Ciclo de un motor de combustión externa: bomba, caldera, turbina y condensador",
    beatMs: 5400,
    captions: [
      "La **bomba** recibe el agua líquida del condensador y la comprime (casi de forma adiabática) hasta la presión de la caldera. El líquido apenas cambia de volumen.",
      "En la **caldera** (y el sobrecalentador) el agua se calienta a presión constante, hierve y sale como **vapor**. Aquí entra el calor del combustible.",
      "En la **turbina** el vapor se expande: pierde presión y temperatura y cede trabajo mecánico $W$ al eje (alternador, buque…).",
      "En el **condensador** el vapor húmedo cede calor al exterior y vuelve a líquido saturado. El agua vuelve a la bomba y el **ciclo se cierra**.",
      "El calor se aporta en dos etapas, así que el rendimiento usa temperaturas medias: $\\eta = 1 - T_{bm}/T_{am}$. Se mejora **recalentando** el vapor y **extrayendo vapor** para precalentar el agua (ciclo regenerativo).",
    ],
    render: (beat) => (
      <Canvas>
        <path d={loop} fill="none" stroke={MANIM.muted} strokeWidth={3} strokeDasharray="6 6" strokeOpacity={0.5} />
        <path d={`M ${L} ${B} L ${L} ${T} L ${R} ${T}`} fill="none" stroke={MANIM.orange} strokeWidth={5} className="anim-t" strokeOpacity={beat >= 1 ? 1 : 0.25} />
        <path d={`M ${R} ${T} L ${R} ${B} L ${L + 130} ${B}`} fill="none" stroke={MANIM.blue} strokeWidth={5} className="anim-t" strokeOpacity={beat >= 2 ? 0.7 : 0.25} />
        <path d={`M ${L} ${B} L ${L} ${T + 40}`} fill="none" stroke={MANIM.blue} strokeWidth={5} />
        <Box x={L} y={215} w={120} h={70} color={MANIM.green} label="Bomba" active={beat === 0 || beat === 4} />
        <Box x={400} y={T} w={200} h={64} color={MANIM.red} label="Caldera" active={beat === 1 || beat === 4} />
        <Box x={R} y={215} w={120} h={90} color={MANIM.yellow} label="Turbina" active={beat === 2 || beat === 4} />
        <Box x={400} y={B} w={200} h={64} color={MANIM.blue} label="Condensador" active={beat === 3 || beat === 4} />
        <Fade show={beat === 0 || beat === 4}>
          <Txt x={L - 20} y={285} size={18} color={MANIM.blue} anchor="end">
            líquido ↑ p
          </Txt>
        </Fade>
        <Fade show={beat === 1 || beat === 4}>
          <Arrow x1={400} y1={20} x2={400} y2={T - 36} color={MANIM.red} width={5} />
          <Txt x={420} y={34} size={20} color={MANIM.red} anchor="start">
            Q aportado
          </Txt>
        </Fade>
        <Fade show={beat === 2 || beat === 4}>
          <Arrow x1={R + 70} y1={215} x2={R + 130} y2={215} color={MANIM.green} width={5} />
          <Txt x={R + 100} y={196} size={20} color={MANIM.green}>
            W
          </Txt>
          <Txt x={R - 20} y={158} size={17} color={MANIM.orange} anchor="end">
            vapor
          </Txt>
        </Fade>
        <Fade show={beat === 3 || beat === 4}>
          <Arrow x1={400} y1={B + 38} x2={400} y2={B + 80} color={MANIM.blue} width={5} />
          <Txt x={420} y={B + 70} size={20} color={MANIM.blue} anchor="start">
            Q cedido
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={400} y={215} size={26} color={MANIM.yellow}>
            ciclo cerrado
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Turbina de gas (ciclo Brayton) ───────────── */

export function buildBraytonCircuito(): AnimBuild {
  const rp = 10;
  const eta = 1 - 1 / rp ** ((GAMMA - 1) / GAMMA);
  return {
    label: "Turbina de gas: compresor, cámara de combustión y turbina (ciclo Brayton)",
    beatMs: 5400,
    captions: [
      "Entra aire a presión y temperatura ambiente ($p_1$, $T_1$) en el **compresor**, que lo comprime de forma adiabática hasta $p_2$ elevando su temperatura a $T_2$.",
      "En la **cámara de combustión** se inyecta combustible y el aire se calienta a **presión constante** hasta $T_3$: $q_1 = c_p\\,(T_3 - T_2)$.",
      "Los gases se expanden de forma adiabática en la **turbina**: bajan de presión y de temperatura y entregan trabajo. Parte mueve el compresor, el resto es útil (alternador, hélice…).",
      "Los gases de escape ceden calor residual al ambiente a presión constante: $q_2 = c_p\\,(T_4 - T_1)$. Con una relación de presiones $r_p = p_2/p_1$:",
      `$\\eta = 1 - \\dfrac{1}{r_p^{(\\gamma-1)/\\gamma}}$. Con $r_p = 10$ y $\\gamma = 1{,}4$: $\\eta = ${f1(eta, 2)}$. Se pierde el ${f1((1 - eta) * 100, 0)} % por los gases de escape.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={160} y1={290} x2={640} y2={290} stroke={MANIM.muted} strokeWidth={8} strokeOpacity={0.5} />
        <Box x={160} y={290} w={110} h={150} color={MANIM.blue} label="Compresor" active={beat === 0 || beat >= 3} size={17} />
        <Box x={400} y={130} w={240} h={80} color={MANIM.red} label="Cámara de combustión" active={beat === 1 || beat >= 3} size={17} />
        <Box x={640} y={290} w={110} h={150} color={MANIM.yellow} label="Turbina" active={beat === 2 || beat >= 3} size={17} />
        <path d="M 160 215 L 160 130 L 280 130" fill="none" stroke={MANIM.blue} strokeWidth={5} className="anim-t" strokeOpacity={beat >= 0 ? 0.8 : 0.2} />
        <path d="M 520 130 L 640 130 L 640 215" fill="none" stroke={MANIM.orange} strokeWidth={5} className="anim-t" strokeOpacity={beat >= 1 ? 0.8 : 0.2} />
        <Arrow x1={50} y1={290} x2={100} y2={290} color={MANIM.blue} width={5} />
        <Txt x={20} y={270} size={16} color={MANIM.blue} anchor="start">
          aire 1
        </Txt>
        <Fade show={beat === 0 || beat === 4}>
          <Txt x={190} y={105} size={18} color={MANIM.blue} anchor="start">
            2: p₂ y T₂ altas
          </Txt>
        </Fade>
        <Fade show={beat === 1 || beat === 4}>
          <Arrow x1={400} y1={20} x2={400} y2={84} color={MANIM.red} width={5} />
          <Txt x={420} y={50} size={20} color={MANIM.red} anchor="start">
            combustible
          </Txt>
          <Txt x={560} y={105} size={18} color={MANIM.orange} anchor="start">
            3: T₃ máxima
          </Txt>
        </Fade>
        <Fade show={beat === 2 || beat === 4}>
          <Arrow x1={700} y1={290} x2={770} y2={290} color={MANIM.orange} width={5} />
          <Txt x={742} y={268} size={16} color={MANIM.orange}>
            4: escape
          </Txt>
          <Txt x={400} y={340} size={20} color={MANIM.green}>
            W útil + W del compresor
          </Txt>
        </Fade>
        <Fade show={beat === 3 || beat === 4}>
          <Txt x={706} y={330} size={17} color={MANIM.muted} anchor="start">
            q₂ al ambiente
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={400} y={392} size={26} color={MANIM.yellow}>
            η = 0,48 con r_p = 10
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Motor alternativo de cuatro tiempos ───────────── */

export function buildMotor4Tiempos(): AnimBuild {
  const cx = 330;
  const top = 80;
  const pmsY = 130;
  const pmiY = 250;
  const W = 120;
  const pistonY = [pmiY, pmsY, pmiY, pmsY];
  const angle = [180, 360, 540, 720];
  const chamber = ["#58c4dd", "#3b7fb0", "#fc6255", "#9aa7b8"];
  const info = ["1.º tiempo: ADMISIÓN", "2.º tiempo: COMPRESIÓN", "3.º tiempo: EXPANSIÓN", "4.º tiempo: ESCAPE"];
  return {
    label: "Motor de cuatro tiempos: admisión, compresión, expansión y escape",
    beatMs: 5600,
    captions: [
      "**Admisión.** El pistón desciende desde el PMS, crea un vacío y aspira aire (o mezcla) por la **válvula de admisión**, abierta. La de escape está cerrada.",
      "**Compresión.** Se cierra la admisión al llegar al PMI y el pistón **sube** comprimiendo la carga hasta el PMS. Sube la presión y la temperatura.",
      "**Expansión.** Instantes antes del PMS salta la chispa (o se inyecta gasoil): la combustión **empuja el pistón hacia abajo**. Es el **único tiempo que produce trabajo**.",
      "**Escape.** En el PMI se abre la válvula de escape y el pistón sube expulsando los gases. En el PMS se cierra el escape, se abre la admisión y vuelve a empezar: **dos vueltas** del cigüeñal por ciclo.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={cx - W / 2 - 14} y={top} width={14} height={pmiY - top + 130} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={cx + W / 2} y={top} width={14} height={pmiY - top + 130} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={cx - W / 2 - 14} y={top - 24} width={W + 28} height={24} fill={MANIM.muted} fillOpacity={0.5} />
        {/* cámara y gases */}
        <g className="anim-t" style={{ transform: `translate(0px, ${pistonY[beat]! - pmsY}px)` }}>
          <rect x={cx - W / 2} y={pmsY} width={W} height={64} fill={MANIM.muted} fillOpacity={0.85} stroke={MANIM.ink} strokeWidth={2} />
          <line x1={cx - W / 2} y1={pmsY + 14} x2={cx + W / 2} y2={pmsY + 14} stroke={MANIM.surface} strokeWidth={3} />
          <line x1={cx - W / 2} y1={pmsY + 24} x2={cx + W / 2} y2={pmsY + 24} stroke={MANIM.surface} strokeWidth={3} />
        </g>
        {/* cámara bajo el émbolo se rellena de gas a medida que cambia el volumen */}
        <rect className="anim-t" x={cx - W / 2} y={top} width={W} height={pistonY[beat]! - top} fill={chamber[beat]} fillOpacity={0.45} />
        {/* válvulas */}
        <g className="anim-t" style={{ transform: `translate(0px, ${beat === 0 ? 14 : 0}px)` }}>
          <rect x={cx - 38} y={top - 36} width={8} height={40} fill={MANIM.green} />
          <rect x={cx - 52} y={top} width={36} height={6} fill={MANIM.green} />
        </g>
        <g className="anim-t" style={{ transform: `translate(0px, ${beat === 3 ? 14 : 0}px)` }}>
          <rect x={cx + 30} y={top - 36} width={8} height={40} fill={MANIM.orange} />
          <rect x={cx + 16} y={top} width={36} height={6} fill={MANIM.orange} />
        </g>
        <Txt x={cx - 70} y={top - 44} size={15} color={MANIM.green} anchor="end">
          admisión
        </Txt>
        <Txt x={cx + 70} y={top - 44} size={15} color={MANIM.orange} anchor="start">
          escape
        </Txt>
        <Fade show={beat === 0}>
          <Arrow x1={cx - 70} y1={20} x2={cx - 38} y2={64} color={MANIM.blue} width={5} />
        </Fade>
        <Fade show={beat === 3}>
          <Arrow x1={cx + 38} y1={64} x2={cx + 70} y2={20} color={MANIM.muted} width={5} />
        </Fade>
        <Fade show={beat === 2}>
          <polygon points={`${cx},${top + 4} ${cx + 10},${top + 22} ${cx - 10},${top + 22}`} fill={MANIM.yellow} />
          <Arrow x1={cx} y1={pmsY + 80} x2={cx} y2={pmiY + 70} color={MANIM.red} width={7} head={18} />
          <Txt x={cx + 90} y={pmsY + 110} size={22} color={MANIM.green} anchor="start">
            trabajo W
          </Txt>
        </Fade>
        {/* cigüeñal */}
        <g className="anim-t" style={{ transform: `translate(${cx}px, 355px) rotate(${angle[beat]}deg)` }}>
          <circle cx={0} cy={0} r={44} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <circle cx={0} cy={-28} r={9} fill={MANIM.orange} />
        </g>
        <Txt x={cx} y={415} size={15} color={MANIM.muted}>
          cigüeñal: {angle[beat] / 180} × 180°
        </Txt>
        <Txt x={640} y={110} size={26} color={beat === 2 ? MANIM.red : MANIM.yellow}>
          {info[beat]}
        </Txt>
        <Txt x={640} y={150} size={18} color={MANIM.muted}>
          {beat % 2 === 0 ? "el pistón baja (hacia el PMI)" : "el pistón sube (hacia el PMS)"}
        </Txt>
        <Txt x={640} y={188} size={18} color={MANIM.muted}>
          {beat === 0 ? "entra aire o mezcla" : beat === 1 ? "las dos válvulas cerradas" : beat === 2 ? "chispa o inyección" : "salen los gases"}
        </Txt>
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} className="anim-t" x={520 + i * 56} y={250} width={50} height={16} rx={4} fill={i === beat ? (i === 2 ? MANIM.red : MANIM.yellow) : MANIM.muted} fillOpacity={i === beat ? 0.95 : 0.3} />
          ))}
          <Txt x={640} y={300} size={15} color={MANIM.muted}>
            1.º  2.º  3.º  4.º tiempo
          </Txt>
        </g>
      </Canvas>
    ),
  };
}

/* ───────────── Ciclos Otto y Diesel ───────────── */

export function buildOttoDieselPV(): AnimBuild {
  const r = 8;
  const rc = 2;
  const p1 = 1;
  const p2 = p1 * r ** GAMMA;
  const p3o = p2 * 3;
  const p4o = p3o * (1 / r) ** GAMMA;
  const p4d = p2 * (rc / r) ** GAMMA;
  const etaO = 1 - 1 / r ** (GAMMA - 1);
  const etaD = 1 - (1 / r ** (GAMMA - 1)) * ((rc ** GAMMA - 1) / (GAMMA * (rc - 1)));
  const X = (v: number) => 110 + v * 78;
  const Y = (p: number) => 365 - p * 5.3;
  const adi = (p0: number, v0: number) => (v: number) => p0 * (v0 / v) ** GAMMA;
  const otto = {
    comp: curve(adi(p1, r), 1, r, X, Y),
    heat: `M ${X(1)} ${Y(p2)} L ${X(1)} ${Y(p3o)}`,
    exp: curve(adi(p3o, 1), 1, r, X, Y),
    cool: `M ${X(r)} ${Y(p4o)} L ${X(r)} ${Y(p1)}`,
  };
  const diesel = {
    heat: `M ${X(1)} ${Y(p2)} L ${X(rc)} ${Y(p2)}`,
    exp: curve(adi(p2, rc), rc, r, X, Y),
    cool: `M ${X(r)} ${Y(p4d)} L ${X(r)} ${Y(p1)}`,
  };
  return {
    label: "Ciclos teóricos Otto (calor a volumen constante) y Diesel (calor a presión constante)",
    beatMs: 5600,
    captions: [
      "**Ciclo Otto** (encendido por chispa): compresión adiabática $1\\to 2$, **explosión a volumen constante** $2\\to 3$, expansión adiabática $3\\to 4$ y escape a volumen constante $4\\to 1$. Con $r = V_B/V_A$:",
      "**Ciclo Diesel** (encendido por compresión): igual, pero el calor se aporta **a presión constante** $2\\to 3$ mientras se inyecta el gasoil. Aparece la relación de combustión $r_c = V_3/V_2$.",
      `Con la misma $r = ${r}$: $\\eta_{Otto} = 1 - \\dfrac{1}{r^{\\gamma-1}} = ${f1(etaO, 2)}$ y $\\eta_{Diesel} = ${f1(etaD, 2)}$. En la práctica el Diesel comprime mucho más (el Otto detona) y por eso su rendimiento real es mayor.`,
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={110} y0={365} x1={770} y1={30} xLabel="V" yLabel="p" />
        <DrawPath show d={otto.comp} color={MANIM.blue} width={4} opacity={beat === 0 ? 1 : 0.45} />
        <DrawPath show d={otto.heat} color={MANIM.red} width={4} opacity={beat === 0 ? 1 : 0.45} />
        <DrawPath show d={otto.exp} color={MANIM.yellow} width={4} opacity={beat === 0 ? 1 : 0.45} />
        <DrawPath show d={otto.cool} color={MANIM.purple} width={4} opacity={beat === 0 ? 1 : 0.45} />
        <DrawPath show={beat >= 1} d={diesel.heat} color={MANIM.orange} width={5} />
        <DrawPath show={beat >= 1} d={diesel.exp} color={MANIM.green} width={4} />
        <DrawPath show={beat >= 1} d={diesel.cool} color={MANIM.purple} width={4} />
        {[
          { n: "1", x: X(r), y: Y(p1), dx: -12, dy: 26, a: "end" as const },
          { n: "2", x: X(1), y: Y(p2), dx: 12, dy: -10, a: "start" as const },
          { n: "3", x: X(1), y: Y(p3o), dx: 12, dy: 6, a: "start" as const },
          { n: "4", x: X(r), y: Y(p4o), dx: -14, dy: -6, a: "end" as const },
        ].map((q) => (
          <g key={q.n}>
            <circle cx={q.x} cy={q.y} r={6} fill={MANIM.ink} />
            <Txt x={q.x + q.dx} y={q.y + q.dy} size={20} color={MANIM.ink} anchor={q.a}>
              {q.n}
            </Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          <circle cx={X(rc)} cy={Y(p2)} r={6} fill={MANIM.orange} />
          <Txt x={X(rc) + 10} y={Y(p2) - 12} size={20} color={MANIM.orange} anchor="start">
            3 (Diesel)
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={420} y={110} size={22} color={MANIM.red} anchor="start">
            2→3: calor a V constante
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={420} y={110} size={22} color={MANIM.orange} anchor="start">
            2→3: calor a p constante
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={420} y={100} size={24} color={MANIM.blue} anchor="start">
            η Otto = {f1(etaO, 2)}
          </Txt>
          <Txt x={420} y={136} size={24} color={MANIM.green} anchor="start">
            η Diesel = {f1(etaD, 2)}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Turbocompresor ───────────── */

export function buildTurbocompresorFlujo(): AnimBuild {
  return {
    label: "Turbocompresor: la turbina de los gases de escape mueve el compresor que sobrealimenta el motor",
    beatMs: 5600,
    captions: [
      "Los **gases de escape** del motor salen a unos $950$ °C y $2$ bar. Aún llevan mucha energía (presión y velocidad) que normalmente se pierde.",
      "Esos gases pasan por una **turbina**: bajan de presión (a $1$ bar) y de temperatura, y **ceden trabajo** al eje común.",
      "El eje mueve el **compresor**: aspira aire a $20$ °C y $1$ bar y lo entrega a $1{,}5$ bar y unos $100$ °C. Más presión significa más aire en el mismo cilindro. El trabajo sale «gratis» del escape.",
      "El aire sale caliente, y el aire caliente es menos denso. Un **intercooler** (radiador) lo enfría antes de entrar al motor: llena aún más el cilindro y la combustión es mejor.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={380} y={196} width={90} height={20} fill={MANIM.muted} fillOpacity={0.6} />
        <Box x={330} y={210} w={110} h={150} color={MANIM.blue} label="Compresor" active={beat >= 2} size={17} />
        <Box x={520} y={210} w={110} h={150} color={MANIM.red} label="Turbina" active={beat === 1 || beat === 2} size={17} />
        <Box x={110} y={310} w={160} h={70} color={MANIM.orange} label="Motor" active={beat === 0 || beat === 3} size={18} />
        <Fade show={beat >= 0}>
          <path d="M 190 340 L 190 380 L 590 380 L 590 295" fill="none" stroke={MANIM.red} strokeWidth={5} strokeOpacity={0.7} />
          <Txt x={390} y={402} size={17} color={MANIM.red}>
            escape: 950 °C · 2 bar
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow x1={560} y1={135} x2={640} y2={90} color={MANIM.red} width={5} />
          <Txt x={780} y={70} size={16} color={MANIM.red} anchor="end">
            salida: 800 °C · 1 bar
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow x1={200} y1={110} x2={290} y2={150} color={MANIM.blue} width={5} />
          <Txt x={190} y={96} size={16} color={MANIM.blue} anchor="end">
            aire: 20 °C · 1 bar
          </Txt>
          <path d="M 330 135 L 330 60 L 110 60 L 110 275" fill="none" stroke={MANIM.blue} strokeWidth={5} strokeOpacity={0.7} />
          <Txt x={330} y={44} size={16} color={MANIM.blue} anchor="start">
            100 °C · 1,5 bar
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={90} y={100} width={40} height={110} rx={6} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={150} y={160} size={18} color={MANIM.green} anchor="start">
            intercooler
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Circuito frigorífico de compresión de vapor ───────────── */

export function buildFrigorificoCircuito(): AnimBuild {
  const L = 170;
  const R = 630;
  const T = 100;
  const B = 330;
  return {
    label: "Circuito frigorífico: compresor, condensador, válvula de expansión y evaporador",
    beatMs: 5600,
    captions: [
      "El **compresor** aspira el vapor frío del evaporador a baja presión y lo comprime a la presión del condensador. Consume trabajo $W$ y el vapor sale **caliente**.",
      "En el **condensador** (los serpentines de atrás de la nevera) el refrigerante cede calor $Q_c$ al ambiente: el vapor **condensa** a presión constante y sale como líquido.",
      "La **válvula de expansión** (estrangula el paso) baja la presión del líquido: parte se evapora y se enfría. Es una mezcla de líquido y vapor, muy fría.",
      "En el **evaporador** (las placas con escarcha) la mezcla absorbe el calor $Q_f$ del interior: el líquido **se evapora** a presión y temperatura constantes. Es el efecto útil: enfriar.",
      "La **eficiencia** (COP) no es un rendimiento y puede superar la unidad: $\\mathrm{COP} = \\dfrac{Q_f}{W} = \\dfrac{q_{abs}}{q_{ced} - q_{abs}}$. Cuanto menor sea el salto de temperatura, mejor.",
    ],
    render: (beat) => (
      <Canvas>
        <path d={`M ${L} ${B} L ${L} ${T} L ${R} ${T} L ${R} ${B} L ${L} ${B}`} fill="none" stroke={MANIM.muted} strokeWidth={3} strokeDasharray="6 6" strokeOpacity={0.5} />
        <path d={`M ${L} ${215} L ${L} ${T} L ${400} ${T}`} fill="none" stroke={MANIM.orange} strokeWidth={5} className="anim-t" strokeOpacity={beat === 0 || beat === 1 || beat === 4 ? 1 : 0.2} />
        <path d={`M ${400} ${T} L ${R} ${T} L ${R} ${215}`} fill="none" stroke={MANIM.red} strokeWidth={5} className="anim-t" strokeOpacity={beat === 1 || beat === 4 ? 1 : 0.2} />
        <path d={`M ${R} ${215} L ${R} ${B} L ${400} ${B}`} fill="none" stroke={MANIM.blue} strokeWidth={5} className="anim-t" strokeOpacity={beat === 2 || beat === 3 || beat === 4 ? 1 : 0.2} />
        <path d={`M ${400} ${B} L ${L} ${B} L ${L} ${215}`} fill="none" stroke="#9fe0ff" strokeWidth={5} className="anim-t" strokeOpacity={beat === 3 || beat === 4 ? 1 : 0.2} />
        <Box x={L} y={215} w={120} h={80} color={MANIM.green} label="Compresor" active={beat === 0 || beat === 4} size={17} />
        <Box x={400} y={T} w={200} h={60} color={MANIM.red} label="Condensador" active={beat === 1 || beat === 4} />
        <Box x={R} y={215} w={120} h={90} color={MANIM.yellow} label="Válvula" active={beat === 2 || beat === 4} size={17} />
        <Box x={400} y={B} w={200} h={60} color={MANIM.blue} label="Evaporador" active={beat === 3 || beat === 4} />
        <Fade show={beat === 0 || beat === 4}>
          <Arrow x1={L - 90} y1={215} x2={L - 66} y2={215} color={MANIM.green} width={5} />
          <Txt x={L - 100} y={200} size={22} color={MANIM.green} anchor="end">
            W
          </Txt>
        </Fade>
        <Fade show={beat === 1 || beat === 4}>
          <Arrow x1={400} y1={T - 40} x2={400} y2={26} color={MANIM.red} width={5} />
          <Txt x={420} y={46} size={22} color={MANIM.red} anchor="start">
            Q_c (cede)
          </Txt>
        </Fade>
        <Fade show={beat === 3 || beat === 4}>
          <Arrow x1={400} y1={B + 80} x2={400} y2={B + 40} color={MANIM.blue} width={5} />
          <Txt x={420} y={B + 70} size={22} color={MANIM.blue} anchor="start">
            Q_f (absorbe)
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={R + 20} y={150} size={17} color={MANIM.yellow} anchor="end">
            líquido → mezcla
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={400} y={215} size={26} color={MANIM.yellow}>
            COP = Q_f / W
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Bomba de calor: invierno y verano ───────────── */

export function buildBombaCalorInversion(): AnimBuild {
  return {
    label: "Bomba de calor reversible: el condensador y el evaporador intercambian su papel",
    beatMs: 5600,
    captions: [
      "Una **bomba de calor** es una máquina frigorífica; solo cambia lo que interesa. En **invierno** el foco frío es la calle y el caliente es la vivienda.",
      "El **evaporador** (fuera) absorbe $Q_f$ del aire exterior, aunque esté frío, y el **condensador** (dentro) cede $Q_c = W + Q_f$ a la casa. Se gasta $W$ y se obtiene **más calor**.",
      "La **eficiencia** es $\\varepsilon = Q_c/W_{ciclo}$ y siempre es mayor que $1$: una resistencia da solo $W$, la bomba da $W + Q_f$.",
      "En **verano**, la **válvula de cuatro vías** invierte el circuito: el evaporador pasa dentro (enfría la casa) y el condensador fuera (expulsa el calor). Es el aire acondicionado reversible.",
    ],
    render: (beat) => {
      const summer = beat === 3;
      const inCoil = summer ? { c: MANIM.blue, l: "Evaporador" } : { c: MANIM.red, l: "Condensador" };
      const outCoil = summer ? { c: MANIM.red, l: "Condensador" } : { c: MANIM.blue, l: "Evaporador" };
      return (
        <Canvas>
          <polygon points="60,200 220,90 380,200 380,380 60,380" fill={MANIM.orange} fillOpacity={0.1} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={220} y={150} size={20} color={MANIM.orange}>
            interior
          </Txt>
          <Txt x={640} y={150} size={20} color={MANIM.blue}>
            exterior
          </Txt>
          <Box x={160} y={300} w={140} h={70} color={inCoil.c} label={inCoil.l} size={17} />
          <Box x={640} y={300} w={140} h={70} color={outCoil.c} label={outCoil.l} size={17} />
          <Box x={400} y={300} w={90} h={50} color={MANIM.green} label="Compresor" size={14} />
          <line x1={230} y1={300} x2={355} y2={300} stroke={MANIM.muted} strokeWidth={3} strokeDasharray="6 6" />
          <line x1={445} y1={300} x2={570} y2={300} stroke={MANIM.muted} strokeWidth={3} strokeDasharray="6 6" />
          <Fade show={beat >= 1 && !summer}>
            <Arrow x1={760} y1={250} x2={706} y2={266} color={MANIM.blue} width={5} />
            <Txt x={760} y={238} size={18} color={MANIM.blue} anchor="end">
              Q_f del aire
            </Txt>
            <Arrow x1={110} y1={262} x2={60} y2={236} color={MANIM.red} width={5} />
            <Txt x={110} y={230} size={18} color={MANIM.red} anchor="start">
              Q_c a la casa
            </Txt>
            <Arrow x1={400} y1={400} x2={400} y2={340} color={MANIM.green} width={5} />
            <Txt x={420} y={398} size={18} color={MANIM.green} anchor="start">
              W
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={400} y={54} size={24} color={MANIM.yellow}>
              invierno
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={400} y={54} size={24} color={MANIM.yellow}>
              ε = Q_c / W &gt; 1
            </Txt>
          </Fade>
          <Fade show={summer}>
            <Txt x={400} y={54} size={24} color={MANIM.yellow}>
              verano (válvula de 4 vías invertida)
            </Txt>
            <Arrow x1={160} y1={262} x2={110} y2={236} color={MANIM.blue} width={5} />
            <Txt x={160} y={230} size={18} color={MANIM.blue} anchor="start">
              Q_f de la casa
            </Txt>
            <Arrow x1={706} y1={266} x2={760} y2={250} color={MANIM.red} width={5} />
            <Txt x={760} y={238} size={18} color={MANIM.red} anchor="end">
              Q_c al exterior
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
