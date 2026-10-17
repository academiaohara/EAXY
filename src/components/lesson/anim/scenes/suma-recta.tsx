import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { IntAxis, MINUS, labelStep, lineScale, rangeOf, signColor, tex, z } from "@/components/lesson/anim/integers";

const Y = 290;

type HopProps = { x1: number; x2: number; lift: number; color: string; show: boolean; label: string };

/** Salto en arco con punta de flecha (la animación dibuja el arco y luego aparece la punta). */
function Hop({ x1, x2, lift, color, show, label }: HopProps) {
  const y = Y - 18;
  const h = Math.min(86, Math.max(34, Math.abs(x2 - x1) * 0.3)) + lift;
  const cx = (x1 + x2) / 2;
  const cy = y - h * 2;
  const angle = Math.atan2(y - cy, x2 - cx);
  const tip = (da: number) => `${x2 - 15 * Math.cos(angle + da)} ${y - 15 * Math.sin(angle + da)}`;
  return (
    <g>
      <path
        d={`M ${x1} ${y} Q ${cx} ${cy} ${x2} ${y}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={show ? 0 : 1}
        className="anim-draw"
        style={{ opacity: show ? 1 : 0 }}
      />
      <Fade show={show} delay={500}>
        <Txt x={cx} y={y - h - 12} size={26} color={color}>{label}</Txt>
        <path d={`M ${tip(0.5)} L ${x2} ${y} L ${tip(-0.5)}`} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </Fade>
    </g>
  );
}

/** Sumar enteros como movimientos en la recta: mismo sentido → se suman distancias; contrario → se restan. */
export function buildSumaRecta(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? -3;
  const b = params.b ?? -8;
  const r = a + b;
  const [lo, hi] = rangeOf([0, a, r], 2);
  const sx = lineScale(lo, hi, 70, 730);
  const same = Math.sign(a) === Math.sign(b);
  const dir = (n: number) => (n > 0 ? "a la derecha" : "a la izquierda");
  const expr = `${z(a)} ${b < 0 ? MINUS : "+"} ${Math.abs(b)} = ${z(r)}`;
  const big = Math.max(Math.abs(a), Math.abs(b));
  const small = Math.min(Math.abs(a), Math.abs(b));

  return {
    label: `${z(a)} ${b < 0 ? MINUS : "+"} ${Math.abs(b)} = ${z(r)} como dos movimientos en la recta`,
    captions: [
      `Empezamos en el $0$. El primer número, $${tex(a)}$, nos lleva **${dir(a)}**: ${Math.abs(a)} pasos.`,
      `El segundo, $${b > 0 ? "+" : ""}${tex(b)}$, es otro movimiento **${dir(b)}**: ${Math.abs(b)} pasos más.`,
      `Llegamos a $${tex(r)}$: $${tex(a)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${tex(r)}$.`,
      same
        ? `Los dos movimientos van en el **mismo sentido**: las distancias **se suman** ($${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(r)}$) y se conserva el signo.`
        : `Los movimientos van en **sentidos contrarios**: las distancias **se restan** ($${big} - ${small} = ${Math.abs(r)}$) y gana el signo del movimiento más largo.`,
    ],
    render: (beat) => (
      <Canvas>
        <IntAxis lo={lo} hi={hi} y={Y} x0={70} x1={730} labelEvery={labelStep(lo, hi, 12)} />
        <Hop x1={sx(0)} x2={sx(a)} lift={0} color={signColor(a)} show label={z(a)} />
        <Hop x1={sx(a)} x2={sx(r)} lift={same ? 22 : 62} color={signColor(b)} show={beat >= 1} label={b > 0 ? `+${b}` : z(b)} />
        <circle cx={sx(0)} cy={Y} r={9} fill={MANIM.ink} />
        <Fade show>
          <circle cx={sx(a)} cy={Y} r={8} fill={signColor(a)} stroke={MANIM.surface} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 2} dy={-8}>
          <circle cx={sx(r)} cy={Y} r={12} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={sx(r)} y={Y + 76} size={30} color={MANIM.yellow}>{z(r)}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          <Txt x={400} y={64} size={40} color={MANIM.yellow}>{expr}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={Y + 112} size={24} color={MANIM.muted} weight={500}>
            {same
              ? `se suman las distancias: ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(r)}`
              : `se restan las distancias: ${big} ${MINUS} ${small} = ${Math.abs(r)}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
