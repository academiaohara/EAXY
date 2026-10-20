import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const L = 110;
const R = 710;
const T = 60;
const B = 320;

/** Tendencia (el agua se enfría hacia 20 °C) y periodicidad (la onda se repite cada periodo). */
export function buildFuncionTendenciaPeriodo(): AnimBuild {
  const px = (v: number, max: number) => L + (v / max) * (R - L - 20);
  const cool: string[] = [];
  for (let t = 0; t <= 4.001; t += 0.05) cool.push(`${px(t, 4)},${B - ((20 + 80 * Math.exp(-1.1 * t)) / 100) * (B - T - 10)}`);
  const wave: string[] = [];
  for (let x = 0; x <= 6.001; x += 0.05) wave.push(`${px(x, 6)},${(T + B) / 2 - Math.sin(x * Math.PI) * 90}`);
  const firstPeriod: string[] = [];
  for (let x = 0; x <= 2.001; x += 0.05) firstPeriod.push(`${px(x, 6)},${(T + B) / 2 - Math.sin(x * Math.PI) * 90}`);
  const yAmb = B - (20 / 100) * (B - T - 10);

  return {
    label: "Tendencia de una función y función periódica",
    captions: [
      "Dejamos enfriar una olla de agua hirviendo en una habitación a $20$ °C.",
      "Con el tiempo, la temperatura se acerca a la de la habitación: **tiende a $20$ °C**, aunque no tengamos la gráfica completa.",
      "Esta función **se repite** cada vez que $x$ recorre un intervalo: es **periódica**.",
      "La longitud del intervalo que se repite es el **periodo**. Conocido un periodo, se conoce toda la función.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          <line x1={L} y1={B} x2={R} y2={B} stroke={MANIM.ink} strokeWidth={2.5} />
          <line x1={L} y1={T} x2={L} y2={B} stroke={MANIM.ink} strokeWidth={2.5} />
          <Txt x={R} y={B + 40} size={20} color={MANIM.blue} anchor="end">tiempo (h)</Txt>
          <Txt x={L + 8} y={T - 12} size={20} color={MANIM.orange} anchor="start">temperatura (°C)</Txt>
          <polyline points={cool.join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={5} strokeLinecap="round" />
          <Txt x={L - 10} y={yAmb + 6} size={20} color={MANIM.green} anchor="end">20</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <line x1={L} y1={yAmb} x2={R} y2={yAmb} stroke={MANIM.green} strokeWidth={3} strokeDasharray="10 8" />
          <Txt x={R - 10} y={yAmb + 34} size={24} color={MANIM.green} anchor="end">tiende a 20 °C</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={L} y1={(T + B) / 2} x2={R} y2={(T + B) / 2} stroke={MANIM.ink} strokeWidth={2.5} />
          <line x1={L} y1={T} x2={L} y2={B} stroke={MANIM.ink} strokeWidth={2.5} />
          <polyline points={wave.join(" ")} fill="none" stroke={MANIM.muted} strokeWidth={4} strokeLinecap="round" />
          <polyline points={firstPeriod.join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={6} strokeLinecap="round" />
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={px(0, 6)} y1={B + 24} x2={px(2, 6)} y2={B + 24} stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={(px(0, 6) + px(2, 6)) / 2} y={B + 56} size={24} color={MANIM.orange}>periodo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
