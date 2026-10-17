import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { IntAxis, labelStep, lineScale, rangeOf, signColor, tex, z, zp } from "@/components/lesson/anim/integers";

const Y = 250;

/** Valor absoluto = distancia al cero en la recta; los opuestos comparten distancia. */
export function buildValorAbsoluto(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? -7;
  const b = params.b ?? 4;
  const [lo, hi] = rangeOf([a, b, -a, 0], 1);
  const sx = lineScale(lo, hi, 70, 730);
  const colorA = signColor(a);
  const colorB = signColor(b);
  const bar = (n: number) => `|${n > 0 ? "+" : ""}${z(n)}|`;

  return {
    label: `Valor absoluto de ${tex(a)} y de ${tex(b)} como distancia al cero en la recta`,
    captions: [
      `Colocamos $${tex(a)}$ y $${b > 0 ? "+" : ""}${tex(b)}$ en la recta.`,
      `El **valor absoluto** es la **distancia al cero**: cuánto se aleja el número, sin fijarse en el lado.`,
      `Se escribe con barras: $|${tex(a)}| = ${Math.abs(a)}$ y $|${b > 0 ? "+" : ""}${tex(b)}| = ${Math.abs(b)}$. Es el número **sin su signo**.`,
      `El opuesto de $${tex(a)}$ es $${a < 0 ? "+" : "-"}${Math.abs(a)}$ y está a la misma distancia: **dos opuestos tienen el mismo valor absoluto**.`,
    ],
    render: (beat) => (
      <Canvas>
        <IntAxis lo={lo} hi={hi} y={Y} x0={70} x1={730} labelEvery={labelStep(lo, hi)} />
        {/* opuesto de a (fantasma) */}
        <Fade show={beat >= 3} dy={-6}>
          <circle cx={sx(-a)} cy={Y} r={11} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="6 5" />
        </Fade>
        <Fade show={beat >= 3}>
          <path
            d={`M ${sx(a)} ${Y - 26} Q ${sx(0)} ${Y - 190} ${sx(-a)} ${Y - 26}`}
            fill="none"
            stroke={MANIM.yellow}
            strokeWidth={3}
            strokeDasharray="9 7"
          />
          <Txt x={sx(0)} y={Y - 124} size={26} color={MANIM.yellow}>{`${bar(a)} = ${bar(-a)}`}</Txt>
        </Fade>

        {/* distancias */}
        <Fade show={beat >= 1 && beat < 3} dy={-4}>
          <HBrace show x1={Math.min(sx(0), sx(a))} x2={Math.max(sx(0), sx(a))} y={Y + 62} color={colorA} label={String(Math.abs(a))} labelSize={26} />
          <HBrace show x1={Math.min(sx(0), sx(b))} x2={Math.max(sx(0), sx(b))} y={Y + 62} color={colorB} label={String(Math.abs(b))} labelSize={26} delay={150} />
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={sx(a)} y={Y - 76} size={32} color={colorA}>{`${bar(a)} = ${Math.abs(a)}`}</Txt>
          <Txt x={sx(b)} y={Y - 76} size={32} color={colorB}>{`${bar(b)} = ${Math.abs(b)}`}</Txt>
        </Fade>

        {/* puntos */}
        <circle cx={sx(a)} cy={Y} r={11} fill={colorA} stroke={MANIM.surface} strokeWidth={3} />
        <circle cx={sx(b)} cy={Y} r={11} fill={colorB} stroke={MANIM.surface} strokeWidth={3} />
        <Fade show={beat < 3}>
          <Txt x={sx(a)} y={Y - 28} size={28} color={colorA}>{zp(a)}</Txt>
          <Txt x={sx(b)} y={Y - 28} size={28} color={colorB}>{zp(b)}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
