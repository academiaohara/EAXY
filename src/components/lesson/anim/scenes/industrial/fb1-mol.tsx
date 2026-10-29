import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

function Muestra({ x, masa, nombre, color, r }: { x: number; masa: string; nombre: string; color: string; r: number }) {
  return (
    <g>
      <ellipse cx={x} cy={250} rx={r} ry={r * 0.45} fill={color} fillOpacity={0.75} stroke={MANIM.ink} strokeWidth={2} />
      <rect x={x - 70} y={290} width={140} height={14} rx={3} fill={MANIM.muted} fillOpacity={0.5} />
      <Txt x={x} y={330} size={22} color={color}>{masa}</Txt>
      <Txt x={x} y={360} size={18} color={MANIM.ink}>{nombre}</Txt>
    </g>
  );
}

/** El mol: mismo número de partículas, masas distintas; masa ↔ moles ↔ partículas. */
export function buildMol(): AnimBuild {
  return {
    label: "El mol: número de Avogadro, masa molar y conversiones",
    beatMs: 5600,
    captions: [
      "Los átomos son demasiado pequeños para contarlos uno a uno. Se agrupan en **moles**: **1 mol = 6,022·10²³ entidades** (número de Avogadro).",
      "Un mol de átomos de **carbono-12** tiene una masa de **12 g**. La **masa molar** en g/mol coincide con la masa atómica en u.",
      "**1 mol de cada sustancia** contiene el **mismo número de partículas** pero tiene **distinta masa**: 12 g de C, 18 g de H₂O, 58,5 g de NaCl.",
      "Para convertir: **n = m/M** (masa ↔ moles) y **N = n·N_A** (moles ↔ partículas). La masa molar y N_A son los factores de conversión.",
      "Ejemplo: **36 g de H₂O** → n = 36/18 = **2 mol** → N = 2·6,022·10²³ = **1,2·10²⁴ moléculas**.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Txt x={400} y={150} size={64} color={MANIM.yellow}>6,022·10²³</Txt>
          <Txt x={400} y={210} size={26} color={MANIM.ink}>partículas = 1 mol</Txt>
          {Array.from({ length: 36 }, (_, k) => <circle key={k} cx={190 + (k % 12) * 36} cy={280 + Math.floor(k / 12) * 30} r={9} fill={MANIM.blue} />)}
        </Fade>
        <Fade show={beat === 1}>
          <Muestra x={400} masa="12 g" nombre="1 mol de C" color={MANIM.blue} r={70} />
          <Txt x={400} y={80} size={26} color={MANIM.yellow}>M(C) = 12 g/mol</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Muestra x={200} masa="12 g" nombre="1 mol de C" color={MANIM.blue} r={50} />
          <Muestra x={400} masa="18 g" nombre="1 mol de H₂O" color={MANIM.green} r={56} />
          <Muestra x={600} masa="58,5 g" nombre="1 mol de NaCl" color={MANIM.orange} r={64} />
          <Txt x={400} y={90} size={24} color={MANIM.yellow}>mismo nº de partículas · distinta masa</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={90} y={150} width={170} height={70} rx={10} fill="none" stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={175} y={193} size={28} color={MANIM.blue}>masa (g)</Txt>
          <rect x={315} y={150} width={170} height={70} rx={10} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={400} y={193} size={28} color={MANIM.yellow}>moles</Txt>
          <rect x={540} y={150} width={170} height={70} rx={10} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <Txt x={625} y={193} size={28} color={MANIM.green}>partículas</Txt>
          <Txt x={288} y={130} size={22} color={MANIM.ink}>÷ M</Txt>
          <Txt x={512} y={130} size={22} color={MANIM.ink}>× N_A</Txt>
          <line x1={262} y1={185} x2={313} y2={185} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={487} y1={185} x2={538} y2={185} stroke={MANIM.ink} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={400} y={300} size={30} color={MANIM.yellow}>36 g H₂O → 2 mol → 1,2·10²⁴ moléculas</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
