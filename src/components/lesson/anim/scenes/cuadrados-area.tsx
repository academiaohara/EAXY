import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CELL = 46;
const GX = 40;
const GY = 50;
const COLS = 15;
const ROWS = 6;

/** Medir superficie = contar cuántas unidades cuadradas caben (un rectángulo y un triángulo). */
export function buildCuadradosArea(params: { a?: number; b?: number }): AnimBuild {
  const base = params.a ?? 5;
  const alto = params.b ?? 3;
  const total = base * alto;
  const half = total / 2;
  const RX = 1; // columna donde empieza el rectángulo
  const TX = 8; // columna donde empieza el triángulo
  const TY = 1;
  const px = (c: number) => GX + c * CELL;
  const py = (r: number) => GY + r * CELL;
  const fmtN = (n: number) => String(n).replace(".", ",");

  const captions = [
    "Para medir una superficie se toma como unidad un **cuadrado** (1 u.c.) y se cuenta cuántos caben.",
    `El rectángulo tiene **${alto} filas de ${base}** cuadrados: $${alto} \\cdot ${base} = ${total}$ u.c.`,
    `En el triángulo hay cuadrados cortados por la diagonal: no se pueden contar enteros.`,
    `Dos triángulos iguales forman el rectángulo de ${total} u.c., así que cada uno mide $${total} : 2 = ${fmtN(half)}$ u.c.`,
  ];

  return {
    label: `Superficie por conteo de cuadrados: rectángulo ${total} u.c. y triángulo ${fmtN(half)} u.c.`,
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        {/* cuadrícula */}
        {Array.from({ length: COLS + 1 }, (_, c) => (
          <line key={`v${c}`} x1={px(c)} y1={GY} x2={px(c)} y2={py(ROWS)} stroke={MANIM.grid} strokeWidth={1.5} />
        ))}
        {Array.from({ length: ROWS + 1 }, (_, r) => (
          <line key={`h${r}`} x1={GX} y1={py(r)} x2={px(COLS)} y2={py(r)} stroke={MANIM.grid} strokeWidth={1.5} />
        ))}
        {/* unidad cuadrada */}
        <rect x={px(0)} y={py(5)} width={CELL} height={CELL} fill={MANIM.yellow} fillOpacity={0.85} />
        <Txt x={px(0) + CELL + 12} y={py(5) + 31} size={20} color={MANIM.yellow} anchor="start">
          = 1 unidad cuadrada (1 u.c.)
        </Txt>

        {/* rectángulo */}
        <Fade show={beat >= 1}>
          <rect x={px(RX)} y={py(TY)} width={base * CELL} height={alto * CELL} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.blue} strokeWidth={3} />
          {Array.from({ length: alto }, (_, r) => (
            <Txt key={r} x={px(RX) - 12} y={py(TY + r) + 31} size={20} color={MANIM.blue} anchor="end">
              {base}
            </Txt>
          ))}
        </Fade>
        <Fade show={beat >= 1} dy={8} delay={500}>
          <Txt x={px(RX) + (base * CELL) / 2} y={py(TY + alto) + 30} size={26} color={MANIM.blue}>
            {`${alto} · ${base} = ${total} u.c.`}
          </Txt>
        </Fade>

        {/* triángulo */}
        <Fade show={beat >= 2}>
          <polygon
            points={`${px(TX)},${py(TY)} ${px(TX)},${py(TY + alto)} ${px(TX + base)},${py(TY + alto)}`}
            fill={MANIM.green}
            fillOpacity={0.4}
            stroke={MANIM.green}
            strokeWidth={3}
          />
        </Fade>
        {/* triángulo gemelo que completa el rectángulo */}
        <Fade show={beat >= 3} dx={-14}>
          <polygon
            points={`${px(TX)},${py(TY)} ${px(TX + base)},${py(TY)} ${px(TX + base)},${py(TY + alto)}`}
            fill={MANIM.orange}
            fillOpacity={0.35}
            stroke={MANIM.orange}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
        </Fade>
        <Fade show={beat >= 3} dy={8} delay={400}>
          <Txt x={px(TX) + (base * CELL) / 2} y={py(TY + alto) + 30} size={26} color={MANIM.green}>
            {`${total} : 2 = ${fmtN(half)} u.c.`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
