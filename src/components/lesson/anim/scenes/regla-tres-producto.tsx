import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

type Params = { a?: number; b?: number; c?: number; titles?: string[]; unit?: string };

const COL_L = MANIM.blue;
const COL_R = MANIM.green;
const TX = [100, 235];
const TY = [130, 215];

/**
 * Regla de tres inversa: `a` ↔ `b` y `c` ↔ `x` con el producto constante.
 * `a·b = c·x` → `x = a·b / c`.
 */
export function buildReglaTresProducto(params: Params): AnimBuild {
  const a = params.a ?? 2;
  const b = params.b ?? 30;
  const c = params.c ?? 4;
  const [tL = "Magnitud A", tR = "Magnitud B"] = params.titles ?? [];
  const unit = params.unit ? `\\,\\text{${params.unit}}` : "";
  const unitTxt = params.unit ? ` ${params.unit}` : "";
  const prod = a * b;
  const res = prod / c;

  const captions = [
    `Datos: **${numEs(a)}** de ${tL} tardan **${numEs(b)}** de ${tR}. Se pregunta por **${numEs(c)}**. Más ${tL}, menos ${tR}: es inversa.`,
    `En la inversa no se cruza: lo que se mantiene es el **producto** de cada fila. Primera fila: $${numTex(a)} \\cdot ${numTex(b)} = ${numTex(prod)}$.`,
    `La segunda fila tiene que dar lo mismo: $${numTex(c)} \\cdot x = ${numTex(prod)}$, es decir, $${numTex(a)} \\cdot ${numTex(b)} = ${numTex(c)} \\cdot x$.`,
    `Para dejar la $x$ sola, el ${numEs(c)} pasa **dividiendo**: $x = \\dfrac{${numTex(prod)}}{${numTex(c)}}$.`,
    `Se calcula: $${numTex(prod)} : ${numTex(c)} = ${numTex(res)}$. Respuesta: $x = ${numTex(res)}${unit}$.`,
  ];

  const cell = (i: number, l: string, r: string) => (
    <g key={i}>
      <rect x={TX[0]! - 60} y={TY[i]! - 30} width={120} height={56} rx={8} fill={COL_L} fillOpacity={0.18} stroke={COL_L} strokeWidth={2} />
      <rect x={TX[1]! - 60} y={TY[i]! - 30} width={120} height={56} rx={8} fill={COL_R} fillOpacity={0.18} stroke={COL_R} strokeWidth={2} />
      <Txt x={TX[0]!} y={TY[i]! + 10} size={30} color={COL_L}>{l}</Txt>
      <Txt x={TX[1]!} y={TY[i]! + 10} size={30} color={COL_R}>{r}</Txt>
    </g>
  );

  return {
    label: `Regla de tres inversa: ${numEs(a)} → ${numEs(b)} y ${numEs(c)} → x, con el producto constante`,
    captions,
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Fade show>
          <Txt x={TX[0]!} y={68} size={18} color={COL_L}>{tL}</Txt>
          <Txt x={TX[1]!} y={68} size={18} color={COL_R}>{tR}</Txt>
          {cell(0, numEs(a), numEs(b))}
          {cell(1, numEs(c), beat >= 4 ? numEs(res) : "x")}
        </Fade>

        <Fade show={beat >= 1} dx={14}>
          <Txt x={560} y={140} size={42}>
            <tspan fill={COL_L}>{numEs(a)}</tspan>
            <tspan fill={MANIM.ink}>{" · "}</tspan>
            <tspan fill={COL_R}>{numEs(b)}</tspan>
            <tspan fill={MANIM.ink}>{"  =  "}</tspan>
            <tspan fill={MANIM.yellow}>{numEs(prod)}</tspan>
          </Txt>
        </Fade>

        <Fade show={beat >= 2} dy={-8}>
          <Txt x={560} y={225} size={42}>
            <tspan fill={COL_L}>{numEs(c)}</tspan>
            <tspan fill={MANIM.ink}>{" · "}</tspan>
            <tspan fill={COL_R}>x</tspan>
            <tspan fill={MANIM.ink}>{"  =  "}</tspan>
            <tspan fill={MANIM.yellow}>{numEs(prod)}</tspan>
          </Txt>
        </Fade>

        <Fade show={beat >= 3} dy={-8}>
          <Txt x={440} y={335} size={42} anchor="end">x =</Txt>
          <Frac x={520} y={320} n={numEs(prod)} d={numEs(c)} size={38} />
        </Fade>

        <Fade show={beat >= 4} dx={-10}>
          <Txt x={580} y={335} size={42} color={MANIM.yellow} anchor="start">{`= ${numEs(res)}${unitTxt}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
