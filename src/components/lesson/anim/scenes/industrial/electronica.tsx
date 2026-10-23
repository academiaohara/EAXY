import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

/** Polilínea en coordenadas de lienzo a partir de (magnitud 0..60, tensión 0..12 V). */
const toD = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"} ${(80 + (520 * x) / 60).toFixed(1)} ${(320 - (220 * y) / 12).toFixed(1)}`).join(" ");

/* ───────────── Señal analógica → digital ───────────── */

export function buildSenalAnalogicaDigital(): AnimBuild {
  const pts: [number, number][] = [];
  for (let v = 0; v <= 60; v += 1) {
    pts.push([v, (12 * v) / 60]);
  }
  return {
    label: "De la magnitud física a bits: linealidad, cuantización y resolución",
    beatMs: 5200,
    captions: [
      "Un **transductor** convierte una magnitud (volumen, presión, desplazamiento…) en una **señal eléctrica analógica** continua, por ejemplo una tensión entre 0 y 12 V.",
      "La relación puede ser **lineal**: cada 5 litros más en el depósito sube 1 V. La pendiente es la **sensibilidad** del captador.",
      "Para un sistema digital hay que **cuantizar**: dividir el rango en intervalos. Con **1 bit** solo distinguimos dos niveles; con **2 bits**, cuatro.",
      "Con **8 bits** (256 intervalos) la resolución mejora mucho: el conversor A/D muestrea y entrega un **código binario** en cada instante.",
    ],
    render: (beat) => {
      const bits = beat >= 3 ? 8 : beat >= 2 ? 2 : 1;
      const steps = 2 ** bits;
      const quant: [number, number][] = [];
      for (let i = 0; i < steps; i += 1) {
        const v0 = (60 * i) / steps;
        const v1 = (60 * (i + 1)) / steps;
        const y = (12 * (v0 + v1)) / 120;
        quant.push([v0, y], [v1, y]);
      }
      return (
        <Canvas>
          <Axes x0={80} y0={320} x1={620} y1={90} xLabel="Magnitud" yLabel="Tensión (V)" />
          <DrawPath d={toD(pts)} color={MANIM.blue} width={4} show />
          <Fade show={beat >= 2}>
            <DrawPath d={toD(quant)} color={MANIM.orange} width={5} show />
          </Fade>
          <Txt x={640} y={80} size={20} color={MANIM.ink} anchor="start">
            {bits} bit{bits > 1 ? "s" : ""} → {steps} niveles
          </Txt>
          <Fade show={beat >= 3}>
            <Txt x={640} y={110} size={18} color={MANIM.green} anchor="start">
              Resolución ≈ 12/255 V
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Puertas OR y AND ───────────── */

function gateOr(x: number, y: number, active: boolean) {
  return (
    <g>
      <path d={`M ${x} ${y - 28} L ${x + 18} ${y - 28} Q ${x + 52} ${y} ${x + 18} ${y + 28} L ${x} ${y + 28} Z`} fill={active ? MANIM.panel : MANIM.surface} stroke={active ? MANIM.green : MANIM.ink} strokeWidth={3} />
      <Txt x={x + 30} y={y + 6} size={22} color={MANIM.ink}>
        OR
      </Txt>
    </g>
  );
}

function gateAnd(x: number, y: number, active: boolean) {
  return (
    <g>
      <path d={`M ${x} ${y - 28} L ${x + 36} ${y - 28} L ${x + 36} ${y + 28} L ${x} ${y + 28} Z`} fill={active ? MANIM.panel : MANIM.surface} stroke={active ? MANIM.blue : MANIM.ink} strokeWidth={3} />
      <Txt x={x + 14} y={y + 6} size={22} color={MANIM.ink}>
        AND
      </Txt>
    </g>
  );
}

export function buildPuertasLogicasBasicas(): AnimBuild {
  const cases: { a: boolean; b: boolean; or: boolean; and: boolean }[] = [
    { a: false, b: false, or: false, and: false },
    { a: false, b: true, or: true, and: false },
    { a: true, b: false, or: true, and: false },
    { a: true, b: true, or: true, and: true },
  ];
  return {
    label: "Suma lógica (OR) y producto lógico (AND)",
    beatMs: 4800,
    captions: [
      "**OR** ($S = a + b$): la salida es 1 si **alguna** entrada es 1. En contactos en **paralelo**, basta con que uno cierre.",
      "**AND** ($S = a \\cdot b$): la salida es 1 solo si **todas** las entradas son 1. En **serie**, todos deben estar cerrados.",
      "Las **tablas de verdad** recogen las cuatro combinaciones de dos variables binarias.",
      "En TTL, las puertas se fabrican en circuitos integrados (7400, 7408…) con niveles 0 y 5 V.",
    ],
    render: (beat) => {
      const c = cases[Math.min(beat, cases.length - 1)];
      const lamp = (cx: number, on: boolean) => (
        <g>
          <circle cx={cx} cy={200} r={22} fill={on ? MANIM.yellow : MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={cx} y={206} size={18} color={MANIM.ink}>
            S
          </Txt>
        </g>
      );
      return (
        <Canvas>
          <Txt x={200} y={70} size={22} color={MANIM.green}>
            Puerta OR
          </Txt>
          {gateOr(120, 200, c.or)}
          {lamp(280, c.or)}
          <Txt x={80} y={150} size={20} color={c.a ? MANIM.green : MANIM.muted}>
            a={c.a ? 1 : 0}
          </Txt>
          <Txt x={80} y={250} size={20} color={c.b ? MANIM.green : MANIM.muted}>
            b={c.b ? 1 : 0}
          </Txt>
          <Fade show={beat >= 2}>
            <Txt x={520} y={70} size={22} color={MANIM.blue}>
              Puerta AND
            </Txt>
            {gateAnd(440, 200, c.and)}
            {lamp(600, c.and)}
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Mapa de Karnaugh 2 variables ───────────── */

export function buildKarnaughDosVariables(): AnimBuild {
  const cells = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];
  return {
    label: "Agrupar unos adyacentes en un mapa de Karnaugh",
    beatMs: 5000,
    captions: [
      "Para $S = \\bar A B + A B$ colocamos **1** en las celdas donde la función vale verdadero.",
      "Los **1 adyacentes** (también en los bordes opuestos) forman grupos de 2, 4 u 8.",
      "En un grupo de dos, la variable que **cambia** se elimina; la que permanece fija queda en la expresión.",
      "Aquí ambos 1 comparten $B=1$, luego $S = B$.",
    ],
    render: (beat) => {
      const ox = 220;
      const oy = 120;
      const u = 70;
      return (
        <Canvas>
          <Txt x={ox + u} y={oy - 36} size={20} color={MANIM.ink}>
            B
          </Txt>
          <Txt x={ox - 36} y={oy + u} size={20} color={MANIM.ink}>
            A
          </Txt>
          {cells.map(([a, b, val], i) => {
            const cx = ox + b * u;
            const cy = oy + a * u;
            const one = val === 1;
            const grouped = one && beat >= 2;
            return (
              <g key={i}>
                <rect x={cx} y={cy} width={u} height={u} fill={grouped ? MANIM.panel : MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
                <Txt x={cx + u / 2} y={cy + u / 2 + 7} size={26} color={one ? MANIM.green : MANIM.muted}>
                  {one ? "1" : "0"}
                </Txt>
              </g>
            );
          })}
          <Fade show={beat >= 2}>
            <ellipse cx={ox + u * 1.5} cy={oy + u} rx={u * 0.55} ry={u * 1.05} fill="none" stroke={MANIM.orange} strokeWidth={4} />
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={480} y={200} size={28} color={MANIM.green}>
              S = B
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Biestable R-S ───────────── */

export function buildBiestableRs(): AnimBuild {
  return {
    label: "Biestable R-S: memoria con Reset y Set",
    beatMs: 5000,
    captions: [
      "Un **biestable** tiene dos salidas complementarias $Q$ y $\\bar Q$ y puede **recordar** un bit.",
      "Con **R=0** y **S=0** el circuito **mantiene** el estado anterior (modo memoria).",
      "**Set** ($S=1$, $R=0$) fuerza $Q=1$; **Reset** ($R=1$, $S=0$) fuerza $Q=0$.",
      "La entrada **11** es prohibida en el R-S con NOR: las salidas dejan de ser complementarias.",
    ],
    render: (beat) => {
      const mode = beat === 0 ? "mem" : beat === 1 ? "set" : beat === 2 ? "reset" : "mem";
      const q = mode === "set" ? 1 : mode === "reset" ? 0 : beat >= 3 ? 1 : 0;
      return (
        <Canvas>
          <rect x={260} y={140} width={200} height={120} rx={12} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={360} y={200} size={24} color={MANIM.ink}>
            R-S
          </Txt>
          <Txt x={210} y={170} size={20} color={MANIM.red}>
            R
          </Txt>
          <Txt x={210} y={230} size={20} color={MANIM.green}>
            S
          </Txt>
          <Txt x={500} y={170} size={22} color={q ? MANIM.green : MANIM.muted}>
            Q={q}
          </Txt>
          <Txt x={500} y={230} size={22} color={!q ? MANIM.green : MANIM.muted}>
            Q̄={1 - q}
          </Txt>
          <Txt x={360} y={310} size={20} color={MANIM.ink}>
            {mode === "set" ? "Set → Q=1" : mode === "reset" ? "Reset → Q=0" : "R=S=0: conserva estado"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Sensor inductivo ───────────── */

export function buildSensorInductivo(): AnimBuild {
  return {
    label: "Detector inductivo: campo magnético y corrientes de Foucault",
    beatMs: 5200,
    captions: [
      "La **bobina** del sensor forma un **oscilador LC** que genera un campo magnético alterno.",
      "Sin metal, la oscilación es **fuerte** y la etapa de conmutación mantiene la salida en reposo.",
      "Al acercar **acero**, las **corrientes de Foucault** disipan energía y **amortiguan** la oscilación.",
      "El detector compara el nivel y **conmuta** la salida (PNP, NPN o 2 hilos) dentro de la distancia $S_n$.",
    ],
    render: (beat) => {
      const near = beat >= 2;
      const amp = near ? 8 : 22;
      return (
        <Canvas>
          <rect x={100} y={150} width={160} height={100} rx={10} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={180} y={195} size={17} color={MANIM.blue}>
            Bobina + oscilador
          </Txt>
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1={260}
              y1={200}
              x2={260 + amp + i * 6}
              y2={200 - 20 + i * 10}
              stroke={MANIM.yellow}
              strokeWidth={2}
              opacity={near ? 0.35 : 0.9}
            />
          ))}
          <Fade show={near}>
            <path d="M 480 210 Q 520 180 560 210 Q 520 240 480 210" fill="none" stroke={MANIM.orange} strokeWidth={3} />
            <Txt x={520} y={260} size={16} color={MANIM.orange}>
              Foucault
            </Txt>
            <rect x={440} y={170} width={70} height={50} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2} />
          </Fade>
          <rect x={300} y={175} width={100} height={56} rx={8} fill={near ? MANIM.panel : MANIM.surface} stroke={near ? MANIM.green : MANIM.muted} strokeWidth={3} />
          <Txt x={350} y={208} size={16} color={near ? MANIM.green : MANIM.muted}>
            {near ? "ON" : "OFF"}
          </Txt>
        </Canvas>
      );
    },
  };
}
