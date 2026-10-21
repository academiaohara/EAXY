import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CW = 200;
const CH = 90;
const X0 = 220;
const Y0 = 130;

/** (2x² − 1)(3x + 4): cada término del primero por cada término del segundo, en una tabla de dobles productos. */
export function buildPolinomioTabla(): AnimBuild {
  const rows = [{ t: "2x²", c: MANIM.blue }, { t: "−1", c: MANIM.green }];
  const cols = [{ t: "3x", c: MANIM.orange }, { t: "+4", c: MANIM.purple }];
  const cells = [
    ["6x³", "8x²"],
    ["−3x", "−4"],
  ];
  return {
    label: "(2x² − 1)(3x + 4) = 6x³ + 8x² − 3x − 4 con una tabla de productos",
    captions: [
      "Ponemos los dos factores: $2x^2 - 1$ en vertical y $3x + 4$ en horizontal.",
      "La primera fila: $2x^2$ por cada término de $3x + 4$: $6x^3$ y $8x^2$.",
      "La segunda fila: $-1$ por cada término: $-3x$ y $-4$. Cuatro productos en total.",
      "Se suman los cuatro y se reducen los semejantes: $6x^3 + 8x^2 - 3x - 4$.",
    ],
    render: (beat) => (
      <Canvas>
        {cols.map((c, j) => (
          <Txt key={j} x={X0 + j * CW + CW / 2} y={Y0 - 22} size={34} color={c.c}>{c.t}</Txt>
        ))}
        {rows.map((r, i) => (
          <Txt key={i} x={X0 - 40} y={Y0 + i * CH + CH / 2 + 12} size={34} color={r.c} anchor="end">{r.t}</Txt>
        ))}
        {rows.map((r, i) =>
          cols.map((c, j) => (
            <g key={`${i}${j}`}>
              <rect x={X0 + j * CW} y={Y0 + i * CH} width={CW} height={CH} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={2} />
              <Fade show={beat >= i + 1} dy={8} delay={j * 150}>
                <Txt x={X0 + j * CW + CW / 2} y={Y0 + i * CH + CH / 2 + 12} size={36} color={MANIM.ink}>{cells[i][j]}</Txt>
              </Fade>
            </g>
          )),
        )}
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={360} size={36} color={MANIM.yellow}>6x³ + 8x² − 3x − 4</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
