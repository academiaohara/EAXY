import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const DATA = [12, 15, 13, 12, 16, 10, 11, 12, 10, 11, 12, 9];
const LEFT = 150;
const UX = 68;
const BASE = 250;
const X = (v: number) => LEFT + (v - 9) * UX;

/** Diagrama de puntos de las edades de un grupo: recorrido, media y desviación media. */
export function buildDispersionPuntos(): AnimBuild {
  const n = DATA.length;
  const mean = DATA.reduce((s, v) => s + v, 0) / n;
  const min = Math.min(...DATA);
  const max = Math.max(...DATA);
  const dist = DATA.map((v) => Math.abs(v - mean));
  const dm = dist.reduce((s, v) => s + v, 0) / n;
  const counts = new Map<number, number>();
  DATA.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  const dots: { v: number; k: number }[] = [];
  counts.forEach((c, v) => {
    for (let k = 0; k < c; k++) dots.push({ v, k });
  });

  return {
    label: "Recorrido, media y desviación media de las edades de un grupo",
    beatMs: 3800,
    captions: [
      `Edades de $${n}$ chicos y chicas: cada punto es una persona. Los parámetros de dispersión dicen **cuánto se separan** los datos.`,
      `El **recorrido** es la diferencia entre los valores extremos: $${max} - ${min} = ${max - min}$ años.`,
      `La **media** es $\\dfrac{${DATA.reduce((s, v) => s + v, 0)}}{${n}} \\approx ${numEs(mean)}$ años (línea amarilla).`,
      `La **desviación media** es el promedio de las distancias de cada dato a la media: $\\dfrac{${numEs(dist.reduce((s, v) => s + v, 0))}}{${n}} \\approx ${numEs(dm)}$ años.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X(8.5)} y1={BASE} x2={X(16.5)} y2={BASE} stroke={MANIM.ink} strokeWidth={2.5} />
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={BASE} x2={X(v)} y2={BASE + 8} stroke={MANIM.ink} strokeWidth={2} />
            <Txt x={X(v)} y={BASE + 32} size={20} color={MANIM.muted}>{String(v)}</Txt>
          </g>
        ))}
        <Fade show={beat >= 3}>
          {dots.map((d, i) => (
            <line key={`d${i}`} x1={X(d.v)} y1={BASE - 20 - d.k * 26} x2={X(mean)} y2={BASE - 20 - d.k * 26} stroke={MANIM.red} strokeWidth={2.5} strokeOpacity={0.8} />
          ))}
        </Fade>
        {dots.map((d, i) => (
          <circle key={i} cx={X(d.v)} cy={BASE - 20 - d.k * 26} r={10} fill={MANIM.blue} stroke={MANIM.surface} strokeWidth={2} />
        ))}
        <Fade show={beat >= 1}>
          <line x1={X(min)} y1={BASE + 60} x2={X(max)} y2={BASE + 60} stroke={MANIM.green} strokeWidth={4} />
          <line x1={X(min)} y1={BASE + 50} x2={X(min)} y2={BASE + 70} stroke={MANIM.green} strokeWidth={4} />
          <line x1={X(max)} y1={BASE + 50} x2={X(max)} y2={BASE + 70} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={(X(min) + X(max)) / 2} y={BASE + 96} size={24} color={MANIM.green}>{`recorrido = ${max} − ${min} = ${max - min}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(mean)} y1={BASE - 150} x2={X(mean)} y2={BASE} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={X(mean)} y={BASE - 160} size={24} color={MANIM.yellow}>{`media ≈ ${numEs(mean)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={640} y={70} size={26} color={MANIM.red}>{`DM ≈ ${numEs(dm)} años`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
