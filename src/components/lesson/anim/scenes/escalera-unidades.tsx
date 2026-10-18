import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { PREFIX_NAMES, UNIT_COLS, type UnitFamily } from "@/components/lesson/anim/units";

const VALUES: Record<UnitFamily, string[]> = {
  m: ["1 000", "100", "10", "1", "0,1", "0,01", "0,001"],
  l: ["1 000", "100", "10", "1", "0,1", "0,01", "0,001"],
  g: ["1 000", "100", "10", "1", "0,1", "0,01", "0,001"],
  m2: ["1 000 000", "10 000", "100", "1", "0,01", "0,0001", "0,000001"],
};
const BASE_NAME: Record<UnitFamily, string> = { m: "metro", l: "litro", g: "gramo", m2: "metro cuadrado" };
const BASE_SYMBOL: Record<UnitFamily, string> = { m: "m", l: "l", g: "g", m2: "m²" };
const MAGNITUDE: Record<UnitFamily, string> = { m: "longitud", l: "capacidad", g: "peso", m2: "superficie" };

const AGRARIAN: Record<number, string> = { 1: "ha", 2: "a", 3: "ca" };

const CELL = 108;
const GAP = 4;
const X0 = (800 - 7 * CELL - 6 * GAP) / 2;
const cellX = (c: number) => X0 + c * (CELL + GAP);
const midX = (c: number) => cellX(c) + CELL / 2;

/** La unidad base y sus múltiplos y submúltiplos: cada salto multiplica o divide por 10 (por 100 en superficie). */
export function buildEscaleraUnidades(params: { units?: UnitFamily }): AnimBuild {
  const family = params.units ?? "m";
  const names = UNIT_COLS[family];
  const factor = family === "m2" ? 100 : 10;
  const unit = BASE_SYMBOL[family];
  const tex = family === "m2" ? "\\mathrm{m}^2" : `\\mathrm{${unit}}`;

  const captions = [
    `La unidad de **${MAGNITUDE[family]}** es el **${BASE_NAME[family]}** ($${tex}$). Todas las demás se construyen a partir de ella.`,
    `A la izquierda, los **múltiplos**: $\\text{kilo}$, $\\text{hecto}$ y $\\text{deca}$, de mayor a menor.`,
    `A la derecha, los **submúltiplos**: $\\text{deci}$, $\\text{centi}$ y $\\text{mili}$. El prefijo dice cuánto vale respecto a la unidad.`,
    family === "m2"
      ? `Cada unidad vale **100 veces** la de su derecha: las unidades de superficie van **de 100 en 100**.`
      : `Cada unidad vale **10 veces** la de su derecha: las unidades van **de 10 en 10**.`,
  ];

  return {
    label: `Múltiplos y submúltiplos del ${BASE_NAME[family]}`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {names.map((n, c) => {
          const side = c < 3 ? "mult" : c === 3 ? "base" : "sub";
          const shown = c === 3 || (side === "mult" && beat >= 1) || (side === "sub" && beat >= 2);
          const color = side === "mult" ? MANIM.blue : side === "sub" ? MANIM.orange : MANIM.yellow;
          const delay = side === "mult" ? (2 - c) * 140 : (c - 4) * 140;
          return (
            <Fade key={n} show={shown} dx={side === "mult" ? 16 : side === "sub" ? -16 : 0} delay={delay}>
              <rect x={cellX(c)} y={120} width={CELL} height={124} rx={12} fill={MANIM.panel} stroke={color} strokeWidth={side === "base" ? 4 : 2.5} />
              <Txt x={midX(c)} y={158} size={19} color={MANIM.muted} weight={500}>
                {PREFIX_NAMES[c] || BASE_NAME[family].split(" ")[0]!}
              </Txt>
              {family === "m2" && AGRARIAN[c] ? (
                <Txt x={cellX(c) + CELL - 9} y={142} size={17} color={MANIM.yellow} weight={500} anchor="end">
                  {AGRARIAN[c]}
                </Txt>
              ) : null}
              <Txt x={midX(c)} y={202} size={family === "m2" ? 30 : 36} color={color}>
                {n}
              </Txt>
              <Txt x={midX(c)} y={232} size={family === "m2" ? 14 : 18} color={MANIM.ink} weight={500}>
                {`${VALUES[family][c]} ${unit}`}
              </Txt>
            </Fade>
          );
        })}
        {/* flechas entre columnas contiguas */}
        {Array.from({ length: 6 }, (_, i) => {
          const x1 = midX(i);
          const x2 = midX(i + 1);
          const m = (x1 + x2) / 2;
          return (
            <g key={i}>
              <Fade show={beat >= 3} dy={6} delay={i * 120}>
                <path d={`M ${x1 + 14} 108 Q ${m} 58 ${x2 - 14} 108`} fill="none" stroke={MANIM.green} strokeWidth={3} strokeLinecap="round" />
                <polygon points={quadArrowHead(m, 58, x2 - 14, 108)} fill={MANIM.green} strokeLinejoin="round" />
                <Txt x={m} y={64} size={20} color={MANIM.green}>
                  {`×${factor}`}
                </Txt>
              </Fade>
              <Fade show={beat >= 3} dy={-6} delay={i * 120}>
                <path d={`M ${x2 - 14} 258 Q ${m} 308 ${x1 + 14} 258`} fill="none" stroke={MANIM.red} strokeWidth={3} strokeLinecap="round" />
                <polygon points={quadArrowHead(m, 308, x1 + 14, 258)} fill={MANIM.red} strokeLinejoin="round" />
                <Txt x={m} y={332} size={20} color={MANIM.red}>
                  {`:${factor}`}
                </Txt>
              </Fade>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}
