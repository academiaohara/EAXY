import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LEFT = 90;
const UX = 60;
const Y = 250;

/** Desviaciones a la media, sus cuadrados, la varianza y la desviación típica. `nums` = datos (por defecto 2, 4, 4, 6, 9). */
export function buildVarianzaDesviaciones(params: { nums?: number[] }): AnimBuild {
  const data = params.nums && params.nums.length >= 3 ? params.nums.slice(0, 8) : [2, 4, 4, 6, 9];
  const n = data.length;
  const mean = data.reduce((a, b) => a + b, 0) / n;
  const devs = data.map((d) => d - mean);
  const sq = devs.map((d) => d * d);
  const variance = sq.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(variance);
  const X = (v: number) => LEFT + v * UX;
  const f = (v: number) => fmtEs(Math.round(v * 100) / 100, 2);

  return {
    label: `Datos ${data.join(", ")}: media ${f(mean)}, varianza ${f(variance)}, desviación típica ${f(sd)}`,
    captions: [
      `Los datos sobre el eje: ${data.join(", ")}. Su media es $\\bar{x} = ${f(mean)}$.`,
      `Cada dato se desvía de la media $x_i - \\bar{x}$: unos por encima (positivos) y otros por debajo (negativos).`,
      `Se **elevan al cuadrado** las desviaciones (así no se compensan y las grandes pesan más): ${sq.map((s) => f(s)).join("; ")}.`,
      `La **varianza** es el promedio de esos cuadrados: $\\text{Var} = ${f(variance)}$. La **desviación típica**, su raíz: $\\sigma = \\sqrt{${f(variance)}} = ${f(sd)}$, en las mismas unidades que los datos.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <line x1={LEFT - 20} y1={Y} x2={X(Math.max(...data) + 1)} y2={Y} stroke={MANIM.grid} strokeWidth={3} />
        {Array.from({ length: Math.max(...data) + 2 }, (_, i) => i).map((v) => (
          <Txt key={v} x={X(v)} y={Y + 28} size={18} color={MANIM.muted}>{String(v)}</Txt>
        ))}
        {data.map((d, i) => (
          <circle key={i} cx={X(d)} cy={Y - 14 - (data.slice(0, i).filter((e) => e === d).length) * 26} r={10} fill={MANIM.blue} />
        ))}
        <Fade show={beat >= 0}>
          <line x1={X(mean)} y1={Y - 150} x2={X(mean)} y2={Y + 6} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={X(mean)} y={Y - 160} size={22} color={MANIM.yellow}>{`x̄ = ${f(mean)}`}</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          {data.map((d, i) => (
            <line key={i} x1={X(d)} y1={Y - 14 - (data.slice(0, i).filter((e) => e === d).length) * 26 - 12} x2={X(mean)} y2={Y - 14 - (data.slice(0, i).filter((e) => e === d).length) * 26 - 12} stroke={devs[i]! >= 0 ? MANIM.green : MANIM.red} strokeWidth={3} />
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={400} y={330} size={24} color={MANIM.orange}>{`cuadrados: ${sq.map((s) => f(s)).join(" · ")}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={620} y={90} size={26} color={MANIM.orange}>{`Var = ${f(variance)}`}</Txt>
          <Txt x={620} y={130} size={26} color={MANIM.green}>{`σ = ${f(sd)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
