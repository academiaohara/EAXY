import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const R = 90;
const RY = 24;
const TOP = 120;
const BOT = 320;
const CX1 = 190;
const CX2 = 590;

function Axis({ x }: { x: number }) {
  return <line x1={x} y1={TOP - 30} x2={x} y2={BOT + 36} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="10 7" />;
}

export function buildRevolucionGiro(): AnimBuild {
  return {
    label: "Un cuerpo de revolución se genera al girar una figura plana alrededor de un eje: el rectángulo da un cilindro y el triángulo rectángulo da un cono",
    captions: [
      "Un **cuerpo de revolución** se obtiene al hacer girar una figura plana alrededor de un **eje**. Un rectángulo que apoya un lado en el eje…",
      "…al dar una vuelta completa, barre el espacio y forma un **cilindro**. El lado paralelo al eje es la **generatriz**.",
      "Un triángulo rectángulo que apoya un **cateto** en el eje…",
      "…genera un **cono**: el otro cateto describe la base y la hipotenusa es la generatriz.",
    ],
    render: (beat) => (
      <Canvas>
        <Axis x={CX1} />
        <Axis x={CX2} />
        {/* cilindro */}
        <Fade show={beat >= 1} scale={0.9}>
          <rect x={CX1 - R} y={TOP} width={2 * R} height={BOT - TOP} fill={MANIM.blue} fillOpacity={0.18} />
          <ellipse cx={CX1} cy={TOP} rx={R} ry={RY} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3} />
          <path d={`M ${CX1 - R} ${BOT} A ${R} ${RY} 0 0 0 ${CX1 + R} ${BOT}`} fill="none" stroke={MANIM.blue} strokeWidth={3} />
          <path d={`M ${CX1 - R} ${BOT} A ${R} ${RY} 0 0 1 ${CX1 + R} ${BOT}`} fill="none" stroke={MANIM.blue} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
          <line x1={CX1 - R} y1={TOP} x2={CX1 - R} y2={BOT} stroke={MANIM.blue} strokeWidth={3} />
          <line x1={CX1 + R} y1={TOP} x2={CX1 + R} y2={BOT} stroke={MANIM.blue} strokeWidth={3} />
        </Fade>
        <rect x={CX1} y={TOP} width={R} height={BOT - TOP} fill={MANIM.yellow} fillOpacity={0.45} stroke={MANIM.yellow} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <Txt x={CX1} y={BOT + 78} size={30} color={MANIM.blue}>Cilindro</Txt>
        </Fade>
        {/* cono */}
        <Fade show={beat >= 3} scale={0.9}>
          <polygon points={`${CX2},${TOP} ${CX2 - R},${BOT} ${CX2 + R},${BOT}`} fill={MANIM.green} fillOpacity={0.18} stroke={MANIM.green} strokeWidth={3} strokeLinejoin="round" />
          <path d={`M ${CX2 - R} ${BOT} A ${R} ${RY} 0 0 0 ${CX2 + R} ${BOT}`} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3} />
          <path d={`M ${CX2 - R} ${BOT} A ${R} ${RY} 0 0 1 ${CX2 + R} ${BOT}`} fill="none" stroke={MANIM.green} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={`${CX2},${TOP} ${CX2},${BOT} ${CX2 + R},${BOT}`} fill={MANIM.yellow} fillOpacity={0.45} stroke={MANIM.yellow} strokeWidth={4} strokeLinejoin="round" />
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={CX2} y={BOT + 78} size={30} color={MANIM.green}>Cono</Txt>
        </Fade>
        <Fade show={beat === 0 || beat === 2}>
          <Txt x={beat === 0 ? CX1 : CX2} y={TOP - 40} size={22} color={MANIM.muted}>eje</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
