import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CY = 190;

function Atomo({ x, r, carga, nombre, capas, color }: { x: number; r: number; carga: string; nombre: string; capas: number[]; color: string }) {
  return (
    <g>
      {capas.map((c) => <circle key={c} cx={x} cy={CY} r={c} fill="none" stroke={color} strokeWidth={c === r ? 4 : 2} opacity={c === r ? 1 : 0.5} />)}
      <circle cx={x} cy={CY} r={16} fill={MANIM.red} />
      <Txt x={x} y={CY + 6} size={14} color={MANIM.ink}>{carga}</Txt>
      <Txt x={x} y={CY + r + 36} size={22} color={color}>{nombre}</Txt>
    </g>
  );
}

/** Radio atómico: crece al bajar en un grupo (más capas) y disminuye a lo largo de un periodo (más carga nuclear efectiva). */
export function buildRadioAtomico(): AnimBuild {
  return {
    label: "Tendencia del radio atómico en un periodo y en un grupo",
    beatMs: 5600,
    captions: [
      "El **radio atómico** es la distancia del núcleo a la capa más externa. Veamos cómo cambia en la tabla.",
      "En el **tercer periodo** (Na, S, Cl) los electrones externos están en la **misma capa (n = 3)**.",
      "Al avanzar hacia la derecha aumenta la **carga nuclear** (+11, +16, +17) con el mismo apantallamiento: la **carga nuclear efectiva** crece y el átomo se **contrae**.",
      "En un **grupo** (Li, Na, K), cada elemento tiene **una capa más**: los electrones externos están más lejos y el radio **aumenta** al bajar.",
      "Resumen: el radio **disminuye hacia la derecha** y **aumenta hacia abajo**. La energía de ionización y la electronegatividad siguen la tendencia **opuesta**.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Atomo x={400} r={118} carga="+11" nombre="Na" capas={[40, 80, 118]} color={MANIM.blue} />
          <line x1={400} y1={CY} x2={400 + 118} y2={CY} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={470} y={CY - 12} size={22} color={MANIM.yellow}>r</Txt>
        </Fade>
        <Fade show={beat >= 1 && beat < 3}>
          <Atomo x={170} r={118} carga="+11" nombre="Na" capas={[40, 80, 118]} color={MANIM.blue} />
          <Fade show={beat >= 2}>
            <Atomo x={400} r={84} carga="+16" nombre="S" capas={[40, 62, 84]} color={MANIM.green} />
            <Atomo x={620} r={76} carga="+17" nombre="Cl" capas={[36, 58, 76]} color={MANIM.orange} />
          </Fade>
        </Fade>
        <Fade show={beat >= 3}>
          <Atomo x={150} r={60} carga="+3" nombre="Li" capas={[34, 60]} color={MANIM.purple} />
          <Atomo x={400} r={105} carga="+11" nombre="Na" capas={[34, 70, 105]} color={MANIM.blue} />
          <Atomo x={660} r={150} carga="+19" nombre="K" capas={[30, 70, 110, 150]} color={MANIM.yellow} />
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={400} y={34} size={24} color={MANIM.yellow}>← r aumenta · r disminuye →</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
