import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac, Op } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

type Params = { a?: number; b?: number; c?: number; titles?: string[]; unit?: string };

const COL_L = MANIM.blue;
const COL_R = MANIM.green;
const TX = [100, 235];
const TY = [130, 215];
const FRAC_Y = 110;
const FRAC_SIZE = 44;

/** Fracción cuya raya une dos números de colores distintos (cada magnitud, el suyo). */
function PairFrac({ x, y, n, d, nColor, dColor }: { x: number; y: number; n: string; d: string; nColor: string; dColor: string }) {
  const half = Math.max(n.length, d.length) * FRAC_SIZE * 0.34 + 8;
  return (
    <g>
      <Txt x={x} y={y - FRAC_SIZE * 0.3} size={FRAC_SIZE} color={nColor}>{n}</Txt>
      <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={MANIM.ink} strokeWidth={3.5} strokeLinecap="round" />
      <Txt x={x} y={y + FRAC_SIZE * 0.95} size={FRAC_SIZE} color={dColor}>{d}</Txt>
    </g>
  );
}

/**
 * Regla de tres directa con fracciones equivalentes: `a` ↔ `b` y `c` ↔ `x`.
 * `a/b = c/x` → producto en cruz `a·x = b·c` → `x = b·c / a`.
 */
export function buildReglaTresCruz(params: Params): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 60;
  const c = params.c ?? 8;
  const [tL = "Magnitud A", tR = "Magnitud B"] = params.titles ?? [];
  const unit = params.unit ? `\\,\\text{${params.unit}}` : "";
  const unitTxt = params.unit ? ` ${params.unit}` : "";
  const prod = b * c;
  const res = prod / a;

  const captions = [
    `Datos: **${numEs(a)}** de ${tL} se corresponden con **${numEs(b)}** de ${tR}. Se pregunta por **${numEs(c)}**: llamamos $x$ a lo que falta.`,
    `Cada fila es una pareja y se escribe como una fracción, con ${tL} arriba y ${tR} abajo **en las dos**: $\\dfrac{${numTex(a)}}{${numTex(b)}} = \\dfrac{${numTex(c)}}{x}$.`,
    `Se multiplica en cruz: cada numerador por el denominador de la otra fracción.`,
    `Los dos productos son iguales: $${numTex(a)} \\cdot x = ${numTex(b)} \\cdot ${numTex(c)}$.`,
    `Para dejar la $x$ sola, el ${numEs(a)} que la multiplica pasa **dividiendo**: $x = \\dfrac{${numTex(b)} \\cdot ${numTex(c)}}{${numTex(a)}}$.`,
    `Se calcula: $${numTex(prod)} : ${numTex(a)} = ${numTex(res)}$. Respuesta: $x = ${numTex(res)}${unit}$.`,
  ];

  const cell = (i: number, l: string, r: string, rColor: string) => (
    <g key={i}>
      <rect x={TX[0]! - 60} y={TY[i]! - 30} width={120} height={56} rx={8} fill={COL_L} fillOpacity={0.18} stroke={COL_L} strokeWidth={2} />
      <rect x={TX[1]! - 60} y={TY[i]! - 30} width={120} height={56} rx={8} fill={rColor} fillOpacity={0.18} stroke={rColor} strokeWidth={2} />
      <Txt x={TX[0]!} y={TY[i]! + 10} size={30} color={COL_L}>{l}</Txt>
      <Txt x={TX[1]!} y={TY[i]! + 10} size={30} color={rColor}>{r}</Txt>
    </g>
  );

  const fx1 = 480;
  const fx2 = 650;

  return {
    label: `Regla de tres directa: ${numEs(a)} → ${numEs(b)} y ${numEs(c)} → x, con fracciones iguales y producto en cruz`,
    captions,
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Fade show>
          <Txt x={TX[0]!} y={68} size={18} color={COL_L}>{tL}</Txt>
          <Txt x={TX[1]!} y={68} size={18} color={COL_R}>{tR}</Txt>
          {cell(0, numEs(a), numEs(b), COL_R)}
          {cell(1, numEs(c), beat >= 5 ? numEs(res) : "x", COL_R)}
        </Fade>

        <Fade show={beat >= 1} dx={14}>
          <PairFrac x={fx1} y={FRAC_Y} n={numEs(a)} d={numEs(b)} nColor={COL_L} dColor={COL_R} />
          <g opacity={beat === 2 ? 0.25 : 1} className="anim-t">
            <Op x={(fx1 + fx2) / 2} y={FRAC_Y} kind="=" size={40} />
          </g>
          <PairFrac x={fx2} y={FRAC_Y} n={numEs(c)} d="x" nColor={COL_L} dColor={COL_R} />
        </Fade>

        <WriteLine show={beat === 2} x1={fx1 + 22} y1={FRAC_Y - 22} x2={fx2 - 22} y2={FRAC_Y + 20} color={MANIM.yellow} width={4} />
        <WriteLine show={beat === 2} x1={fx1 + 22} y1={FRAC_Y + 20} x2={fx2 - 22} y2={FRAC_Y - 22} color={MANIM.orange} width={4} delay={350} />

        <Fade show={beat >= 3} dy={-8}>
          <Txt x={565} y={235} size={42}>
            <tspan fill={COL_L}>{numEs(a)}</tspan>
            <tspan fill={MANIM.ink}>{" · "}</tspan>
            <tspan fill={COL_R}>x</tspan>
            <tspan fill={MANIM.ink}>{"  =  "}</tspan>
            <tspan fill={COL_R}>{numEs(b)}</tspan>
            <tspan fill={MANIM.ink}>{" · "}</tspan>
            <tspan fill={COL_L}>{numEs(c)}</tspan>
          </Txt>
        </Fade>

        <Fade show={beat >= 4} dy={-8}>
          <Txt x={395} y={335} size={42} anchor="end">x =</Txt>
          <Frac x={490} y={FRAC_Y + 210} n={`${numEs(b)} · ${numEs(c)}`} d={numEs(a)} size={38} />
        </Fade>

        <Fade show={beat >= 5} dx={-10}>
          <Txt x={590} y={335} size={42} color={MANIM.yellow} anchor="start">{`= ${numEs(res)}${unitTxt}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
