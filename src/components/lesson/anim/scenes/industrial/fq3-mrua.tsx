import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 90;
const ROW_A = 120;
const ROW_B = 260;
const mru = (t: number): number => X0 + t * 100;
const mrua = (t: number): number => X0 + 20 * t * t; // ½·a·t² con a = 40 px/s²

/** Comparación estroboscópica de un MRU y un MRUA, y su gráfica velocidad-tiempo. */
export function buildMrua(): AnimBuild {
  return {
    label: "Movimiento uniforme frente a movimiento uniformemente acelerado",
    beatMs: 5400,
    captions: [
      "En un **MRU** el móvil recorre **la misma distancia** en cada intervalo de tiempo: las marcas están a igual separación.",
      "En un **MRUA** la velocidad aumenta, así que cada intervalo recorre **más** que el anterior: las marcas se **separan**.",
      "Partiendo del reposo, las distancias recorridas en cada segundo guardan la proporción **1 : 3 : 5 : 7 : 9**.",
      "La **velocidad** crece lo mismo cada segundo: las flechas aumentan de tamaño de forma **uniforme**.",
      "En la gráfica **v–t**, el MRU es una recta **horizontal** y el MRUA una recta **inclinada**: su pendiente es la **aceleración**.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 3}>
          <Txt x={50} y={ROW_A - 50} size={20} color={MANIM.green} anchor="start">MRU</Txt>
          <Seg a={[X0 - 10, ROW_A + 18]} b={[640, ROW_A + 18]} color={MANIM.muted} width={2} />
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <g key={t}>
              <Dot p={[mru(t), ROW_A]} r={13} color={MANIM.green} />
              {beat >= 3 && <Seg a={[mru(t), ROW_A - 28]} b={[mru(t) + 55, ROW_A - 28]} color={MANIM.yellow} width={4} />}
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 1 && beat <= 3}>
          <Txt x={50} y={ROW_B - 50} size={20} color={MANIM.orange} anchor="start">MRUA</Txt>
          <Seg a={[X0 - 10, ROW_B + 18]} b={[640, ROW_B + 18]} color={MANIM.muted} width={2} />
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <g key={t}>
              <Dot p={[mrua(t), ROW_B]} r={13} color={MANIM.orange} />
              {beat >= 3 && <Seg a={[mrua(t), ROW_B - 28]} b={[mrua(t) + 12 + t * 22, ROW_B - 28]} color={MANIM.yellow} width={4} />}
            </g>
          ))}
        </Fade>
        <Fade show={beat === 2}>
          {[1, 2, 3, 4, 5].map((t) => (
            <Txt key={t} x={(mrua(t - 1) + mrua(t)) / 2} y={ROW_B + 55} size={18} color={MANIM.yellow}>{`${2 * t - 1}d`}</Txt>
          ))}
        </Fade>
        <Fade show={beat === 4}>
          <Seg a={[120, 340]} b={[640, 340]} color={MANIM.ink} width={3} />
          <Seg a={[120, 340]} b={[120, 60]} color={MANIM.ink} width={3} />
          <Seg a={[120, 160]} b={[620, 160]} color={MANIM.green} width={5} />
          <Seg a={[120, 340]} b={[620, 80]} color={MANIM.orange} width={5} />
          <Txt x={640} y={160} size={20} color={MANIM.green} anchor="start">MRU: a = 0</Txt>
          <Txt x={560} y={70} size={20} color={MANIM.orange} anchor="end">MRUA: a = pendiente</Txt>
          <Txt x={640} y={372} size={18} color={MANIM.muted} anchor="end">t</Txt>
          <Txt x={130} y={60} size={18} color={MANIM.muted} anchor="start">v</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
