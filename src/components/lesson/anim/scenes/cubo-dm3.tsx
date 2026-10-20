import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 90;
const Y0 = 150;
const S = 190;
const DX = 80;
const DY = 80;

/** Un cubo de 1 dm de arista: 10 × 10 cubitos por nivel y 10 niveles, o sea, 1 000 cm³. */
export function buildCuboDm3(): AnimBuild {
  const top = (u: number, v: number): [number, number] => [X0 + S * u + DX * v, Y0 - DY * v];
  const grid = Array.from({ length: 9 }, (_, i) => (i + 1) / 10);
  return {
    label: "Un decímetro cúbico contiene 1 000 centímetros cúbicos",
    beatMs: 3400,
    captions: [
      "Un cubo de **1 dm** de arista, es decir, de $10$ cm. Su volumen es **1 dm³**.",
      "En cada **nivel** caben $10 \\times 10 = 100$ cubitos de $1$ cm³.",
      "Hay **10 niveles** apilados.",
      "En total, $10 \\times 10 \\times 10 = 1\\,000$ cm³. Por tanto, $1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3$.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={`${X0},${Y0} ${X0 + S},${Y0} ${X0 + S},${Y0 + S} ${X0},${Y0 + S}`} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={4} />
        <polygon points={`${X0},${Y0} ${X0 + S},${Y0} ${X0 + S + DX},${Y0 - DY} ${X0 + DX},${Y0 - DY}`} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
        <polygon points={`${X0 + S},${Y0} ${X0 + S + DX},${Y0 - DY} ${X0 + S + DX},${Y0 + S - DY} ${X0 + S},${Y0 + S}`} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          {grid.map((t) => (
            <g key={`g${t}`} stroke={MANIM.yellow} strokeOpacity={0.7} strokeWidth={1.5}>
              <line x1={top(t, 0)[0]} y1={top(t, 0)[1]} x2={top(t, 1)[0]} y2={top(t, 1)[1]} />
              <line x1={top(0, t)[0]} y1={top(0, t)[1]} x2={top(1, t)[0]} y2={top(1, t)[1]} />
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          {grid.map((t) => (
            <g key={`l${t}`} stroke={MANIM.green} strokeOpacity={0.8} strokeWidth={1.5}>
              <line x1={X0} y1={Y0 + S * t} x2={X0 + S} y2={Y0 + S * t} />
              <line x1={X0 + S} y1={Y0 + S * t} x2={X0 + S + DX} y2={Y0 + S * t - DY} />
            </g>
          ))}
        </Fade>
        <Txt x={X0 + S / 2} y={Y0 + S + 34} size={26}>1 dm = 10 cm</Txt>
        <Fade show={beat >= 1}>
          <Txt x={470} y={150} size={28} color={MANIM.yellow} anchor="start">10 × 10 = 100 cubitos</Txt>
          <Txt x={470} y={184} size={22} color={MANIM.muted} anchor="start">en cada nivel</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={470} y={240} size={28} color={MANIM.green} anchor="start">10 niveles</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={470} y={310} size={32} color={MANIM.orange} anchor="start">1 dm³ = 1 000 cm³</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
