import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";
import { fmt as grouped } from "@/components/lesson/anim/format";

const X_L = 120;
const X_R = 680;
const Y = 120;

/** Error absoluto (distancia entre el valor real y el aproximado) y error relativo (comparado con el real). */
export function buildErrorAproximacion(params: { a?: number; b?: number }): AnimBuild {
  const real = params.a ?? 7236;
  const approx = params.b ?? 7200;
  const err = Math.abs(real - approx);
  const rel = err / Math.abs(real);
  const lo = Math.min(real, approx);
  const hi = Math.max(real, approx);
  const span = Math.max(hi - lo, 1);
  const pad = span * 0.6;
  const pos = (v: number) => X_L + ((v - (lo - pad)) / (span + 2 * pad)) * (X_R - X_L);
  const xr = pos(real);
  const xa = pos(approx);
  const pct = `${numEs(Math.round(rel * 10_000) / 100)} %`;
  const relTxt = rel.toFixed(3).replace(".", ",");

  return {
    label: `Error absoluto y relativo de aproximar ${grouped(real)} por ${grouped(approx)}`,
    captions: [
      `El valor **real** es $${grouped(real)}$ y la medida que se da es **aproximada**: $${grouped(approx)}$.`,
      `**Error absoluto** = distancia entre ambos: $|${grouped(real)} - ${grouped(approx)}| = ${grouped(err)}$.`,
      `**Error relativo** = error absoluto entre el valor real: $\\dfrac{${grouped(err)}}{${grouped(real)}} \\approx ${relTxt}$.`,
      `Como porcentaje, el error relativo es de un **${pct}**: mide la importancia del error en relación con el valor.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X_L - 30} y1={Y} x2={X_R + 30} y2={Y} stroke={MANIM.muted} strokeWidth={4} strokeLinecap="round" />
        <g>
          <line x1={xr} y1={Y - 18} x2={xr} y2={Y + 18} stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" />
          <Txt x={xr} y={Y - 34} size={24} color={MANIM.green}>{`real ${grouped(real)}`}</Txt>
        </g>
        <g>
          <line x1={xa} y1={Y - 18} x2={xa} y2={Y + 18} stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
          <Txt x={xa} y={Y + 58} size={24} color={MANIM.blue}>{`aprox. ${grouped(approx)}`}</Txt>
        </g>
        <Fade show={beat >= 1} dy={-6}>
          <HBrace show x1={Math.min(xr, xa)} x2={Math.max(xr, xa)} y={Y + 82} color={MANIM.red} label={`E. absoluto = ${grouped(err)}`} labelSize={24} />
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={318} size={30} color={MANIM.yellow}>{`E. relativo = ${grouped(err)} / ${grouped(real)} ≈ ${relTxt}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={366} size={26} color={MANIM.orange}>{`≈ ${pct} del valor real`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
