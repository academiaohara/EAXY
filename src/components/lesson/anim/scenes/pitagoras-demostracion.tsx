import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const U = 36;
const Y0 = 70;

/** Demostración con áreas: el cuadrado de lado a + b se llena de dos maneras con los mismos 4 triángulos. */
export function buildPitagorasDemostracion(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 4;
  const hyp2 = a * a + b * b;
  const s = (a + b) * U;
  const L = 460; // hipotenusa
  const R = 60; // catetos
  const p = (ox: number, x: number, y: number) => `${ox + x * U},${Y0 + y * U}`;
  const tri = (ox: number, pts: [number, number][], key: string, color: string) => (
    <polygon key={key} points={pts.map(([x, y]) => p(ox, x, y)).join(" ")} fill={color} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
  );
  return {
    label: `Demostración del teorema de Pitágoras con un cuadrado de lado ${a} + ${b}`,
    captions: [
      `Un cuadrado de lado $b + c = ${a + b}$ y cuatro triángulos rectángulos iguales, de catetos $b = ${a}$ y $c = ${b}$.`,
      `Colocamos los triángulos de modo que quedan libres un cuadrado de lado $b$ y otro de lado $c$. Área libre: $b^2 + c^2$.`,
      `Con los **mismos cuatro triángulos** los colocamos en las esquinas: queda libre un cuadrado de lado $a$ (la hipotenusa). Área libre: $a^2$.`,
      `El cuadrado grande y los triángulos son los mismos, así que el área libre coincide: $b^2 + c^2 = a^2$ ($${a * a} + ${b * b} = ${hyp2}$).`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={R} y={Y0} width={s} height={s} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <Fade show={beat >= 2}>
          <rect x={L} y={Y0} width={s} height={s} fill="none" stroke={MANIM.ink} strokeWidth={3} />
          {tri(L, [[0, 0], [a, 0], [0, b]], "t1", MANIM.blue)}
          {tri(L, [[a, 0], [a + b, 0], [a + b, a]], "t2", MANIM.blue)}
          {tri(L, [[a + b, a], [a + b, a + b], [b, a + b]], "t3", MANIM.blue)}
          {tri(L, [[0, b], [b, a + b], [0, a + b]], "t4", MANIM.blue)}
          <polygon points={[[a, 0], [a + b, a], [b, a + b], [0, b]].map(([x, y]) => p(L, x, y)).join(" ")} fill={MANIM.yellow} fillOpacity={0.4} stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={L + s / 2} y={Y0 + s / 2 + 8} size={30} color={MANIM.yellow}>a²</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <rect x={R} y={Y0} width={s} height={s} fill="none" stroke={MANIM.ink} strokeWidth={3} />
          {tri(R, [[a, 0], [a + b, 0], [a, a]], "u1", MANIM.blue)}
          {tri(R, [[a + b, 0], [a + b, a], [a, a]], "u2", MANIM.blue)}
          {tri(R, [[0, a], [a, a], [0, a + b]], "u3", MANIM.blue)}
          {tri(R, [[a, a], [a, a + b], [0, a + b]], "u4", MANIM.blue)}
          <rect x={R} y={Y0} width={a * U} height={a * U} fill={MANIM.green} fillOpacity={0.45} stroke={MANIM.green} strokeWidth={2} />
          <rect x={R + a * U} y={Y0 + a * U} width={b * U} height={b * U} fill={MANIM.orange} fillOpacity={0.45} stroke={MANIM.orange} strokeWidth={2} />
          <Txt x={R + (a * U) / 2} y={Y0 + (a * U) / 2 + 8} size={28} color={MANIM.green}>b²</Txt>
          <Txt x={R + a * U + (b * U) / 2} y={Y0 + a * U + (b * U) / 2 + 8} size={28} color={MANIM.orange}>c²</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={400} size={30} color={MANIM.ink}>b² + c² = a²</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
