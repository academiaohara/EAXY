import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Raíz entera: el radicando queda entre dos cuadrados perfectos consecutivos. */
export function buildRaizEntreCuadrados(params: { a?: number }): AnimBuild {
  const n = Math.min(Math.max(params.a ?? 40, 5), 99);
  const k = Math.floor(Math.sqrt(n));
  const lo = k * k;
  const hi = (k + 1) * (k + 1);
  const X0 = 100;
  const X1 = 700;
  const pos = (v: number) => X0 + ((v - lo) / (hi - lo)) * (X1 - X0);
  const root = Math.sqrt(n).toFixed(2).replace(".", ",");

  return {
    label: `Raíz entera de ${n}: está entre ${k} y ${k + 1}`,
    captions: [
      `Los cuadrados perfectos cercanos a $${n}$ son $${k}^2 = ${lo}$ y $${k + 1}^2 = ${hi}$.`,
      `$${n}$ queda entre los dos: $${lo} \\le ${n} < ${hi}$.`,
      `Sus raíces quedan entre ${k} y ${k + 1}: $${k} \\le \\sqrt{${n}} < ${k + 1}$.`,
      `La raíz entera es **${k}** (con calculadora, $\\sqrt{${n}} \\approx ${root}$) y el resto es $${n} - ${lo} = ${n - lo}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X0 - 30} y1={190} x2={X1 + 30} y2={190} stroke={MANIM.grid} strokeWidth={3} />
        {[lo, hi].map((v) => (
          <g key={v}>
            <line x1={pos(v)} y1={175} x2={pos(v)} y2={205} stroke={MANIM.blue} strokeWidth={4} />
            <Txt x={pos(v)} y={155} size={30} color={MANIM.blue}>{String(v)}</Txt>
            <Txt x={pos(v)} y={240} size={22} color={MANIM.muted}>{`${Math.sqrt(v)}² `}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1} dy={-10}>
          <circle cx={pos(n)} cy={190} r={9} fill={MANIM.yellow} />
          <Txt x={pos(n)} y={120} size={32} color={MANIM.yellow}>{String(n)}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          <Txt x={pos(lo)} y={300} size={30} color={MANIM.green}>{String(k)}</Txt>
          <Txt x={pos(hi)} y={300} size={30} color={MANIM.green}>{String(k + 1)}</Txt>
          <line x1={pos(lo)} y1={270} x2={pos(hi)} y2={270} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={pos(n)} y={340} size={28} color={MANIM.green}>{`√${n} está entre ${k} y ${k + 1}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={392} size={30} color={MANIM.orange}>{`raíz entera = ${k} · resto = ${n - lo}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
