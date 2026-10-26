import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Fundición en molde de arena ───────────── */

export function buildFundicionMolde(): AnimBuild {
  return {
    label: "Fundición: modelo, molde de arena, colada, solidificación y desmoldeo",
    beatMs: 5600,
    captions: [
      "Se fabrica un **modelo** (de madera, plástico…) con la forma de la pieza, algo mayor para compensar la **contracción** del metal al enfriar.",
      "El modelo se entierra en **arena** compactada, en dos cajas. Al sacarlo queda la **cavidad** del molde, con un canal de entrada (**bebedero**).",
      "El metal se **funde** en un horno y se **vierte** por el bebedero. Llena la cavidad y alimenta las **mazarotas**.",
      "El metal se **enfría y solidifica**. Se contrae un poco y las mazarotas compensan el hueco.",
      "Se **rompe el molde** y se extrae la pieza en bruto. Después se cortan bebederos y mazarotas, se limpia y se **mecaniza** para el acabado.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={230} y={150} width={340} height={170} rx={8} fill={MANIM.yellow} fillOpacity={beat <= 4 && beat >= 1 ? 0.25 : 0.05} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 5" className="anim-t" />
        <Fade show={beat === 0}>
          <rect x={330} y={190} width={140} height={90} rx={10} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={5} />
          <Txt x={400} y={235} size={22} color={MANIM.ink}>
            modelo
          </Txt>
        </Fade>
        <Fade show={beat >= 1 && beat <= 3}>
          <rect x={330} y={190} width={140} height={90} rx={10} fill={beat === 1 ? MANIM.surface : beat === 2 ? MANIM.orange : MANIM.red} fillOpacity={beat === 1 ? 1 : 0.7} stroke={MANIM.ink} strokeWidth={3} className="anim-t" />
          <rect x={385} y={120} width={30} height={72} fill={beat === 1 ? MANIM.surface : beat === 2 ? MANIM.orange : MANIM.red} fillOpacity={beat === 1 ? 1 : 0.7} stroke={MANIM.ink} strokeWidth={3} />
          <rect x={470} y={170} width={30} height={50} fill={beat === 1 ? MANIM.surface : beat === 2 ? MANIM.orange : MANIM.red} fillOpacity={beat === 1 ? 1 : 0.7} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={400} y={105} size={20} color={MANIM.ink}>
            bebedero
          </Txt>
          <Txt x={530} y={165} size={18} color={MANIM.ink}>
            mazarota
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Arrow x1={400} y1={40} x2={400} y2={115} color={MANIM.orange} width={8} />
          <Txt x={480} y={55} size={22} color={MANIM.orange}>
            metal líquido
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <rect x={330} y={190} width={140} height={90} rx={10} fill={MANIM.muted} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={4} />
          <Txt x={400} y={235} size={22} color={MANIM.ink}>
            pieza
          </Txt>
          <Txt x={400} y={340} size={22} color={MANIM.green}>
            + mecanizado de acabado
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
