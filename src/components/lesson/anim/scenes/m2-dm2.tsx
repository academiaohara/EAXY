import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const N = 10;
const C = 27;
const LX = 70;
const LY = 70;
const RX = 470;

/** 1 m² son 10 × 10 dm² = 100 dm²; y lo mismo con 1 dm² y los cm²: de 100 en 100. */
export function buildM2Dm2(): AnimBuild {
  const captions = [
    "Un cuadrado de **1 m de lado** es **1 m²**.",
    "Cada lado se divide en 10 partes de 1 dm: aparecen **10 filas de 10 cuadrados** de $1\\ \\mathrm{dm}^2$.",
    "$1\\ \\mathrm{m}^2 = 10 \\cdot 10\\ \\mathrm{dm}^2 = \\mathbf{100}\\ \\mathrm{dm}^2$.",
    "Con un decímetro cuadrado pasa lo mismo: $1\\ \\mathrm{dm}^2 = 10 \\cdot 10\\ \\mathrm{cm}^2 = 100\\ \\mathrm{cm}^2$. Por eso las unidades de superficie van **de 100 en 100**.",
  ];
  const cells = Array.from({ length: N * N }, (_, i) => ({ r: Math.floor(i / N), c: i % N }));
  return {
    label: "1 m² se divide en 100 dm² y 1 dm² en 100 cm²: de 100 en 100",
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <rect x={LX} y={LY} width={N * C} height={N * C} fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <Txt x={LX + (N * C) / 2} y={LY + N * C + 36} size={24} color={MANIM.yellow}>
          1 m
        </Txt>
        <Txt x={LX - 14} y={LY + (N * C) / 2 + 8} size={24} color={MANIM.yellow} anchor="end">
          1 m
        </Txt>
        {/* filas de dm² */}
        <Fade show={beat >= 1}>
          {Array.from({ length: N - 1 }, (_, i) => (
            <g key={i} stroke={MANIM.muted} strokeWidth={1.5}>
              <line x1={LX + (i + 1) * C} y1={LY} x2={LX + (i + 1) * C} y2={LY + N * C} />
              <line x1={LX} y1={LY + (i + 1) * C} x2={LX + N * C} y2={LY + (i + 1) * C} />
            </g>
          ))}
        </Fade>
        {cells.map(({ r, c }) => (
          <Fade key={`${r}-${c}`} show={beat >= 2} delay={r * 160}>
            <rect x={LX + c * C + 2} y={LY + r * C + 2} width={C - 4} height={C - 4} fill={MANIM.blue} fillOpacity={0.5} />
          </Fade>
        ))}
        <Fade show={beat >= 2} dy={6} delay={900}>
          <Txt x={LX + (N * C) / 2} y={LY - 14} size={24} color={MANIM.blue}>
            10 filas × 10 = 100 dm²
          </Txt>
        </Fade>

        {/* zoom de un dm² */}
        <Fade show={beat >= 3} dx={-10}>
          <rect x={LX + 9 * C} y={LY} width={C} height={C} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          <line x1={LX + 10 * C} y1={LY} x2={RX} y2={LY} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
          <line x1={LX + 10 * C} y1={LY + C} x2={RX} y2={LY + N * C} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
          <rect x={RX} y={LY} width={N * C} height={N * C} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          {Array.from({ length: N - 1 }, (_, i) => (
            <g key={i} stroke={MANIM.muted} strokeWidth={1.2}>
              <line x1={RX + (i + 1) * C} y1={LY} x2={RX + (i + 1) * C} y2={LY + N * C} />
              <line x1={RX} y1={LY + (i + 1) * C} x2={RX + N * C} y2={LY + (i + 1) * C} />
            </g>
          ))}
          <rect x={RX + 2} y={LY + 2} width={N * C - 4} height={N * C - 4} fill={MANIM.yellow} fillOpacity={0.18} />
          <Txt x={RX + (N * C) / 2} y={LY + N * C + 36} size={24} color={MANIM.yellow}>
            1 dm = 10 cm
          </Txt>
          <Txt x={RX + (N * C) / 2} y={LY - 14} size={24} color={MANIM.yellow}>
            1 dm² = 100 cm²
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
