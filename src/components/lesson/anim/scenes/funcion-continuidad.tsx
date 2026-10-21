import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const L = 120;
const R = 700;
const T = 60;
const B = 320;

function Frame({ xLabel, yLabel }: { xLabel: string; yLabel: string }) {
  return (
    <g>
      <line x1={L} y1={B} x2={R} y2={B} stroke={MANIM.ink} strokeWidth={2.5} />
      <line x1={L} y1={T} x2={L} y2={B} stroke={MANIM.ink} strokeWidth={2.5} />
      <Txt x={R} y={B + 40} size={20} color={MANIM.blue} anchor="end">{xLabel}</Txt>
      <Txt x={L + 8} y={T - 12} size={20} color={MANIM.orange} anchor="start">{yLabel}</Txt>
    </g>
  );
}

/** Tres funciones: puntos aislados, saltos bruscos y trazo continuo. */
export function buildFuncionContinuidad(): AnimBuild {
  const px = (v: number, max: number) => L + (v / max) * (R - L - 20);
  const py = (v: number, max: number) => B - (v / max) * (B - T - 20);
  // 1. ganancias: 1000 + 50n, n = 0..10
  const pts = Array.from({ length: 11 }, (_, n) => ({ x: px(n, 10), y: py(n, 10) }));
  // 2. llamada: 0,30 € hasta 3 min y 0,10 € más cada minuto
  const steps = Array.from({ length: 7 }, (_, k) => ({ from: 3 + k, to: 4 + k, cost: k + 4 }));
  // 3. estatura suave
  const curve: string[] = [];
  for (let a = 0; a <= 6.001; a += 0.1) {
    const h = 138 + 33 * (1 - Math.exp(-a / 3));
    curve.push(`${px(a, 6)},${py(h - 138, 36)}`);
  }

  return {
    label: "Función con puntos aislados, función con saltos y función continua",
    captions: [
      "Un representante cobra $1\\,000$ € fijos y $50$ € por aparato. Solo tiene sentido vender $0, 1, 2, \\dots$ aparatos: **la gráfica son puntos sueltos**.",
      "En una llamada, el coste **salta** cada minuto: la gráfica tiene **discontinuidades** (saltos bruscos).",
      "La estatura cambia **suavemente** con la edad: es una función **continua**, se dibuja sin levantar el lápiz.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Frame xLabel="aparatos vendidos" yLabel="ganancias (€)" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={7} fill={MANIM.green} />
          ))}
          <Txt x={160} y={110} size={24} color={MANIM.green} anchor="start">puntos aislados</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Frame xLabel="duración (min)" yLabel="coste (céntimos)" />
          <line x1={px(0, 10)} y1={py(3, 10)} x2={px(3, 10)} y2={py(3, 10)} stroke={MANIM.orange} strokeWidth={4} />
          <circle cx={px(0, 10)} cy={py(3, 10)} r={6} fill={MANIM.orange} />
          <circle cx={px(3, 10)} cy={py(3, 10)} r={6} fill={MANIM.orange} />
          {steps.map((s) => (
            <g key={s.from}>
              <line x1={px(s.from, 10)} y1={py(s.cost, 10)} x2={px(s.to, 10)} y2={py(s.cost, 10)} stroke={MANIM.orange} strokeWidth={4} />
              <circle cx={px(s.from, 10)} cy={py(s.cost, 10)} r={6} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
              <circle cx={px(s.to, 10)} cy={py(s.cost, 10)} r={6} fill={MANIM.orange} />
              <line x1={px(s.from, 10)} y1={py(s.cost - 1, 10)} x2={px(s.from, 10)} y2={py(s.cost, 10)} stroke={MANIM.red} strokeWidth={2} strokeDasharray="5 4" />
            </g>
          ))}
          <Txt x={160} y={110} size={24} color={MANIM.red} anchor="start">saltos: discontinua</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Frame xLabel="edad (años)" yLabel="estatura (cm)" />
          <polyline points={curve.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
          <Txt x={160} y={110} size={24} color={MANIM.blue} anchor="start">sin saltos: continua</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
