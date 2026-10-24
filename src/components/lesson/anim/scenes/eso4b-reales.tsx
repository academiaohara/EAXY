import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 400;
const U = 40;
const Y = 250;
const xOf = (v: number) => CX + v * U;
const sg = (n: number) => String(n).replace("-", "−");
const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));

function Line({ lo = -8, hi = 8 }: { lo?: number; hi?: number }) {
  const ticks = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  return (
    <g>
      <line x1={xOf(lo) - 24} y1={Y} x2={xOf(hi) + 24} y2={Y} stroke={MANIM.ink} strokeWidth={3} strokeLinecap="round" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={xOf(t)} y1={Y - 8} x2={xOf(t)} y2={Y + 8} stroke={MANIM.ink} strokeWidth={t === 0 ? 4 : 2} />
          <Txt x={xOf(t)} y={Y + 34} size={18} color={t === 0 ? MANIM.ink : MANIM.muted} weight={500}>{sg(t)}</Txt>
        </g>
      ))}
    </g>
  );
}

function Dot({ x, closed, color }: { x: number; closed: boolean; color: string }) {
  return <circle cx={xOf(x)} cy={Y} r={10} fill={closed ? color : MANIM.surface} stroke={color} strokeWidth={4} />;
}

/**
 * Intervalo acotado en la recta. `c`: 0 abierto (a, b), 1 cerrado [a, b], 2 semiabierto (a, b], 3 semiabierto [a, b).
 */
export function buildIntervaloRecta(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = clampInt(params.a, -2, -7, 6);
  const b = Math.max(a + 1, clampInt(params.b, 1, -6, 7));
  const kind = clampInt(params.c, 0, 0, 3);
  const leftClosed = kind === 1 || kind === 3;
  const rightClosed = kind === 1 || kind === 2;
  const lo = leftClosed ? "[" : "(";
  const hi = rightClosed ? "]" : ")";
  const ineq = `${sg(a)} ${leftClosed ? "≤" : "<"} x ${rightClosed ? "≤" : "<"} ${sg(b)}`;
  const ineqTex = `${a} ${leftClosed ? "\\leq" : "<"} x ${rightClosed ? "\\leq" : "<"} ${b}`;
  const name = ["abierto", "cerrado", "semiabierto", "semiabierto"][kind]!;
  return {
    label: `Intervalo ${name} ${lo}${a}, ${b}${hi} en la recta real`,
    captions: [
      `Una condición sobre $x$: $${ineqTex}$. Son **todos** los números entre $${a}$ y $${b}$, también los decimales.`,
      `Se sombrea el tramo que cumple la condición: de $${a}$ a $${b}$.`,
      `Los extremos: punto **${leftClosed ? "relleno" : "vacío"}** en $${a}$ (${leftClosed ? "entra" : "no entra"}) y **${rightClosed ? "relleno" : "vacío"}** en $${b}$ (${rightClosed ? "entra" : "no entra"}).`,
      `Se escribe con corchetes o paréntesis: $${lo}${a}, ${b}${hi}$. Corchete = el extremo entra; paréntesis = no entra.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <Line />
        <Txt x={400} y={80} size={40} color={MANIM.yellow}>{`{ x / ${ineq} }`}</Txt>
        <Fade show={beat >= 1} dy={-6}>
          <line x1={xOf(a)} y1={Y} x2={xOf(b)} y2={Y} stroke={MANIM.blue} strokeWidth={14} strokeLinecap="butt" opacity={0.85} />
        </Fade>
        <Fade show={beat >= 2} dy={-10}>
          <Dot x={a} closed={leftClosed} color={MANIM.orange} />
          <Dot x={b} closed={rightClosed} color={MANIM.orange} />
          <Txt x={xOf(a)} y={Y - 26} size={22} color={MANIM.orange}>{leftClosed ? "entra" : "no entra"}</Txt>
          <Txt x={xOf(b)} y={Y - 26} size={22} color={MANIM.orange}>{rightClosed ? "entra" : "no entra"}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={360} size={52} color={MANIM.green}>{`${lo}${sg(a)}, ${sg(b)}${hi}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/**
 * Semirrecta. `c`: 0 (−∞, a), 1 (−∞, a], 2 (a, +∞), 3 [a, +∞).
 */
export function buildSemirrectaRecta(params: { a?: number; c?: number }): AnimBuild {
  const a = clampInt(params.a, 2, -6, 6);
  const kind = clampInt(params.c, 3, 0, 3);
  const toLeft = kind <= 1;
  const closed = kind === 1 || kind === 3;
  const ineq = `x ${toLeft ? (closed ? "≤" : "<") : closed ? "≥" : ">"} ${sg(a)}`;
  const ineqTex = `x ${toLeft ? (closed ? "\\leq" : "<") : closed ? "\\geq" : ">"} ${a}`;
  const notation = toLeft ? `(−∞, ${sg(a)}${closed ? "]" : ")"}` : `${closed ? "[" : "("}${sg(a)}, +∞)`;
  const notationTex = toLeft ? `(-\\infty, ${a}${closed ? "]" : ")"}` : `${closed ? "[" : "("}${a}, +\\infty)`;
  const far = toLeft ? xOf(-8) - 24 : xOf(8) + 24;
  const arrowDir = toLeft ? -1 : 1;
  return {
    label: `Semirrecta ${notation}`,
    captions: [
      `Condición: $${ineqTex}$. No hay un número máximo (o mínimo) que cierre el tramo: **sigue sin fin**.`,
      `Se marca el punto $${a}$: ${closed ? "relleno, porque el propio $" + a + "$ cumple la condición" : "vacío, porque el $" + a + "$ no entra"}.`,
      `Se sombrea ${toLeft ? "hacia la izquierda" : "hacia la derecha"} y se pone una flecha: continúa **indefinidamente**.`,
      `Se escribe ${toLeft ? "$-\\infty$" : "$+\\infty$"} en ese extremo, siempre con **paréntesis** (el infinito no es un número): $${notationTex}$.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <Line />
        <Txt x={400} y={80} size={40} color={MANIM.yellow}>{`{ ${ineq} }`}</Txt>
        <Fade show={beat >= 1} dy={-10}>
          <Dot x={a} closed={closed} color={MANIM.orange} />
        </Fade>
        <Fade show={beat >= 2} dy={-6}>
          <line x1={xOf(a)} y1={Y} x2={far} y2={Y} stroke={MANIM.blue} strokeWidth={14} opacity={0.85} />
          <path d={`M ${far} ${Y - 18} L ${far + arrowDir * 26} ${Y} L ${far} ${Y + 18} Z`} fill={MANIM.blue} />
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={360} size={52} color={MANIM.green}>{notation}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
