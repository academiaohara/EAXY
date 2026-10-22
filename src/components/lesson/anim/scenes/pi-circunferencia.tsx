import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const D = 150;
const X0 = 60;

/** π: la circunferencia de diámetro 1 se desenrolla y mide 3 diámetros y un poco más, sin fin. */
export function buildPiCircunferencia(): AnimBuild {
  const cx = 150;
  const cy = 120;
  const r = D / 2;
  const lineY = 300;
  const rest = (Math.PI - 3) * D;

  return {
    label: "π es la razón entre la longitud de la circunferencia y su diámetro: 3,14159265…",
    captions: [
      "Una circunferencia de **diámetro $d$**.",
      "Desenrollamos su longitud $L$ sobre una recta y la medimos con el diámetro como regla.",
      "Caben **3 diámetros** y sobra un trocito: $L = 3d + 0{,}14159\\ldots\\,d$.",
      "La razón $\\dfrac{L}{d} = \\pi = 3{,}14159265\\ldots$ es la misma para **todas** las circunferencias, y sus cifras ni acaban ni se repiten: $\\pi$ es irracional.",
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={MANIM.yellow} strokeWidth={3} />
        <Txt x={cx} y={cy - 12} size={24} color={MANIM.yellow}>d</Txt>
        <Fade show={beat >= 1} dy={10}>
          <line x1={X0} y1={lineY} x2={X0 + 3 * D + rest} y2={lineY} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={X0 + (3 * D + rest) / 2} y={lineY + 80} size={26} color={MANIM.blue}>longitud L</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={X0 + i * D + 2} y={lineY - 34} width={D - 4} height={26} rx={4} fill={MANIM.yellow} fillOpacity={0.35} stroke={MANIM.yellow} strokeWidth={2} />
              <Txt x={X0 + i * D + D / 2} y={lineY - 15} size={20} color={MANIM.yellow}>d</Txt>
            </g>
          ))}
          <rect x={X0 + 3 * D} y={lineY - 34} width={rest} height={26} rx={3} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={2} />
          <Txt x={X0 + 3 * D + rest / 2} y={lineY + 36} size={22} color={MANIM.orange}>0,14159…</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={560} y={110} size={54} color={MANIM.ink}>π = L / d</Txt>
          <Txt x={560} y={170} size={36} color={MANIM.orange}>3,14159265…</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
