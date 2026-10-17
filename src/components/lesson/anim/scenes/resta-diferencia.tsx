import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt as formatGrouped } from "@/components/lesson/anim/format";

const X0 = 60;
const W = 680;

/** Restar es medir la diferencia: lo que falta (o sobra) entre dos cantidades. */
export function buildRestaDiferencia(params: { a?: number; b?: number }): AnimBuild {
  const total = params.b ?? 828;
  const have = params.a ?? 693;
  const diff = total - have;
  const scale = W / total;
  const xHave = X0 + have * scale;

  return {
    label: `${formatGrouped(total)} − ${formatGrouped(have)} = ${formatGrouped(diff)}: la diferencia entre las dos cantidades`,
    captions: [
      `Lo que cuesta todo: **${formatGrouped(total)} €**.`,
      `Lo que tenemos ahorrado: **${formatGrouped(have)} €**.`,
      `Lo que **falta** es la diferencia: el trozo de barra que no llegamos a cubrir.`,
      `**${formatGrouped(total)} − ${formatGrouped(have)} = ${formatGrouped(diff)}**. Restar es lo mismo que preguntar «¿cuánto he de añadir a ${formatGrouped(have)} para llegar a ${formatGrouped(total)}?».`,
    ],
    render: (beat) => (
      <Canvas>
        <Fade show dy={-10}>
          <rect x={X0} y={110} width={W} height={56} rx={10} fill={MANIM.blue} fillOpacity={0.85} />
          <Txt x={X0 + W / 2} y={148} size={28} color={MANIM.surface} weight={700}>
            {`${formatGrouped(total)} €`}
          </Txt>
          <Txt x={X0} y={92} size={20} color={MANIM.blue} anchor="start">
            Precio del equipo
          </Txt>
        </Fade>
        <Fade show={beat >= 1} dy={-10}>
          <rect x={X0} y={200} width={have * scale} height={56} rx={10} fill={MANIM.green} fillOpacity={0.9} />
          <Txt x={X0 + (have * scale) / 2} y={238} size={28} color={MANIM.surface} weight={700}>
            {`${formatGrouped(have)} €`}
          </Txt>
          <Txt x={X0} y={284} size={20} color={MANIM.green} anchor="start">
            Ahorrado
          </Txt>
        </Fade>
        <Fade show={beat >= 2} dy={-6}>
          <rect x={xHave} y={200} width={X0 + W - xHave} height={56} rx={10} fill="none" stroke={MANIM.red} strokeWidth={3} strokeDasharray="8 6" />
          <HBrace show x1={xHave} x2={X0 + W} y={270} color={MANIM.red} label={beat >= 3 ? `${formatGrouped(diff)} €` : "?"} labelSize={30} />
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={52} size={34} color={MANIM.yellow}>
            {`${formatGrouped(total)} − ${formatGrouped(have)} = ${formatGrouped(diff)}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
