import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MINUS, signColor, tex, z, zs } from "@/components/lesson/anim/integers";

const SLOT = 118;
const Y1 = 150;
const Y2 = 300;

/** Un signo delante de un paréntesis actúa sobre todos los términos: con + se mantienen, con − se cambian. */
export function buildParentesisSignos(params: { sign?: "+" | "-"; nums?: number[] }): AnimBuild {
  const minus = (params.sign ?? "-") === "-";
  const nums = params.nums?.length ? params.nums : [8, -6, -5];
  const out = nums.map((t) => (minus ? -t : t));
  const total = 90 + nums.length * SLOT + 30;
  const x0 = 400 - total / 2;
  const frontX = x0 + 20;
  const openX = x0 + 62;
  const termX = (i: number) => x0 + 90 + SLOT * (i + 0.5);
  const closeX = x0 + 90 + nums.length * SLOT + 14;
  const value = out.reduce((s, t) => s + t, 0);
  const frontTex = minus ? "-" : "+";
  const inner = nums.map((t, i) => (i === 0 ? tex(t) : `${t < 0 ? "-" : "+"} ${Math.abs(t)}`)).join(" ");
  const finalTex = out.map((t, i) => (i === 0 ? tex(t) : `${t < 0 ? "-" : "+"} ${Math.abs(t)}`)).join(" ");
  const finalTxt = out.map((t, i) => (i === 0 ? z(t) : `${t < 0 ? MINUS : "+"} ${Math.abs(t)}`)).join(" ");

  return {
    label: `${minus ? "Menos" : "Más"} delante de un paréntesis con ${nums.length} términos: ${minus ? "todos los signos cambian" : "los signos se mantienen"}`,
    captions: [
      minus
        ? `Delante del paréntesis hay un $-$: es como si nos **quitaran el paquete entero**.`
        : `Delante del paréntesis hay un $+$: es como si nos **dieran el paquete entero**.`,
      `El signo de delante actúa sobre **cada término** de dentro, no solo sobre el primero.`,
      minus
        ? `Cada término se cambia por su **opuesto**: los $+$ pasan a $-$ y los $-$ a $+$. El paréntesis desaparece.`
        : `Cada término **conserva** su signo. El paréntesis desaparece sin cambiar nada.`,
      `Ahora es una suma y resta de siempre: $${frontTex}(${inner}) = ${finalTex} = ${tex(value)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {/* fila 1: con paréntesis */}
        <g className="anim-t" style={{ opacity: beat >= 2 ? 0.4 : 1 }}>
          <Txt x={frontX} y={Y1} size={54} color={MANIM.yellow}>{minus ? MINUS : "+"}</Txt>
          <Txt x={openX} y={Y1 + 2} size={66} color={MANIM.muted} weight={400}>(</Txt>
          {nums.map((t, i) => (
            <Txt key={i} x={termX(i)} y={Y1} size={46} color={signColor(t)}>{zs(t)}</Txt>
          ))}
          <Txt x={closeX} y={Y1 + 2} size={66} color={MANIM.muted} weight={400}>)</Txt>
        </g>

        {/* el signo de delante apunta a cada término */}
        {nums.map((_, i) => (
          <Fade key={i} show={beat === 1} delay={i * 160}>
            <path
              d={`M ${frontX} ${Y1 - 52} Q ${(frontX + termX(i)) / 2} ${Y1 - 52 - (termX(i) - frontX) * 0.28} ${termX(i)} ${Y1 - 52}`}
              fill="none"
              stroke={MANIM.yellow}
              strokeWidth={3}
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
            <circle cx={termX(i)} cy={Y1 - 52} r={5} fill={MANIM.yellow} />
          </Fade>
        ))}

        {/* fila 2: sin paréntesis */}
        {nums.map((t, i) => {
          const o = out[i]!;
          const changed = o !== t;
          return (
            <Fade key={i} show={beat >= 2} dy={-26} delay={i * 140}>
              <line x1={termX(i)} y1={Y1 + 22} x2={termX(i)} y2={Y2 - 62} stroke={MANIM.grid} strokeWidth={3} strokeDasharray="5 6" />
              {changed ? <rect x={termX(i) - 46} y={Y2 - 52} width={92} height={70} rx={14} fill="rgba(255,216,102,0.14)" stroke={MANIM.yellow} strokeWidth={2.5} /> : null}
              <Txt x={termX(i)} y={Y2} size={46} color={signColor(o)}>{i === 0 ? z(o) : zs(o)}</Txt>
            </Fade>
          );
        })}

        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={Y2 + 86} size={38} color={MANIM.yellow}>{`${finalTxt} = ${z(value)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
