import { MANIM } from "@/components/lesson/anim/palette";
import { Fade, Txt } from "@/components/lesson/anim/primitives";

/** Signo menos tipográfico (U+2212), el mismo que usan los libros y las expresiones de las lecciones. */
export const MINUS = "−";

/** Colores por signo: positivo en verde, negativo en rojo. */
export const POS = MANIM.green;
export const NEG = MANIM.red;

export const signColor = (n: number) => (n > 0 ? POS : n < 0 ? NEG : MANIM.ink);

/** `-3` → «−3», `4` → «4». */
export const z = (n: number) => (n < 0 ? `${MINUS}${-n}` : String(n));

/** Con signo explícito: «+4», «−3», «0». */
export const zs = (n: number) => (n < 0 ? `${MINUS}${-n}` : n > 0 ? `+${n}` : "0");

/** Entre paréntesis y con signo: «(+4)», «(−3)». */
export const zp = (n: number) => `(${zs(n)})`;

/** Para LaTeX dentro de `$…$`: «-3», «4». */
export const tex = (n: number) => String(n);

/** Entre paréntesis para LaTeX: «(-3)», «(+4)». */
export const texp = (n: number) => `(${n < 0 ? "-" : "+"}${Math.abs(n)})`;

/** Escala lineal valor → x del lienzo. */
export function lineScale(lo: number, hi: number, x0 = 60, x1 = 740) {
  return (v: number) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
}

type AxisProps = {
  lo: number;
  hi: number;
  y: number;
  x0?: number;
  x1?: number;
  /** Cada cuántas unidades se rotula (el resto son marcas sin número). */
  labelEvery?: number;
  size?: number;
  /** `false`: las marcas negativas se ocultan (aparecen con un fundido al pasar a `true`). */
  showNegatives?: boolean;
};

/** Recta numérica de enteros con marcas, el 0 destacado y flechas en los extremos. */
export function IntAxis({ lo, hi, y, x0 = 60, x1 = 740, labelEvery = 1, size = 20, showNegatives = true }: AxisProps) {
  const sx = lineScale(lo, hi, x0, x1);
  const ticks = Array.from({ length: hi - lo + 1 }, (_, k) => lo + k);
  return (
    <g>
      <line x1={x0 - 30} y1={y} x2={x1 + 30} y2={y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
      <path d={`M ${x1 + 22} ${y - 9} L ${x1 + 34} ${y} L ${x1 + 22} ${y + 9}`} fill="none" stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${x0 - 22} ${y - 9} L ${x0 - 34} ${y} L ${x0 - 22} ${y + 9}`} fill="none" stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {ticks.map((v) => (
        <Fade key={v} show={showNegatives || v >= 0} dx={v < 0 ? 12 : 0} delay={v < 0 ? (-v) * 60 : 0}>
          <line x1={sx(v)} y1={y - (v === 0 ? 14 : 8)} x2={sx(v)} y2={y + (v === 0 ? 14 : 8)} stroke={v === 0 ? MANIM.ink : MANIM.grid} strokeWidth={v === 0 ? 4 : 3} strokeLinecap="round" />
          {v % labelEvery === 0 ? (
            <Txt x={sx(v)} y={y + 40} size={size} color={v === 0 ? MANIM.ink : MANIM.muted}>
              {z(v)}
            </Txt>
          ) : null}
        </Fade>
      ))}
    </g>
  );
}

/** Rango entero que abarca todos los valores, con holgura a cada lado. */
export function rangeOf(values: number[], pad = 1): [number, number] {
  return [Math.min(...values) - pad, Math.max(...values) + pad];
}

/** Cada cuánto rotular para que las cifras no se pisen. */
export function labelStep(lo: number, hi: number, max = 17): number {
  const span = hi - lo + 1;
  for (const step of [1, 2, 5, 10, 20, 50]) {
    if (span / step <= max) {
      return step;
    }
  }
  return 100;
}
