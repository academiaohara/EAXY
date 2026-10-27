import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Los cinco esfuerzos ───────────── */

export function buildCincoEsfuerzos(): AnimBuild {
  return {
    label: "Los cinco esfuerzos: tracción, compresión, cortadura, flexión y torsión",
    beatMs: 5400,
    captions: [
      "**Tracción**: dos fuerzas opuestas que **alejan** los extremos: la pieza se **alarga** (cables, tirantes).",
      "**Compresión**: fuerzas opuestas que **acercan** los extremos: la pieza se **acorta** y puede pandear (pilares).",
      "**Cortadura**: fuerzas paralelas y muy próximas que tienden a **deslizar** una sección sobre otra (tornillos, remaches).",
      "**Flexión**: cargas perpendiculares al eje: la viga se **curva**; las fibras superiores se comprimen y las inferiores se traccionan.",
      "**Torsión**: dos pares opuestos que **retuercen** la pieza alrededor de su eje (ejes de transmisión).",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <rect x={250} y={190} width={300} height={40} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={4} />
          <rect x={230} y={190} width={340} height={40} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <Arrow x1={240} y1={210} x2={150} y2={210} color={MANIM.red} width={7} />
          <Arrow x1={560} y1={210} x2={650} y2={210} color={MANIM.red} width={7} />
          <Txt x={400} y={140} size={24} color={MANIM.red}>
            tracción: se alarga
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <rect x={270} y={190} width={260} height={40} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={4} />
          <Arrow x1={150} y1={210} x2={262} y2={210} color={MANIM.red} width={7} />
          <Arrow x1={650} y1={210} x2={538} y2={210} color={MANIM.red} width={7} />
          <Txt x={400} y={140} size={24} color={MANIM.red}>
            compresión: se acorta
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <rect x={260} y={170} width={140} height={60} fill={MANIM.purple} fillOpacity={0.5} stroke={MANIM.purple} strokeWidth={4} />
          <rect x={410} y={190} width={140} height={60} fill={MANIM.purple} fillOpacity={0.5} stroke={MANIM.purple} strokeWidth={4} />
          <Arrow x1={330} y1={120} x2={330} y2={165} color={MANIM.red} width={7} />
          <Arrow x1={480} y1={300} x2={480} y2={255} color={MANIM.red} width={7} />
          <Txt x={400} y={90} size={24} color={MANIM.red}>
            cortadura: desliza
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <path d="M 200 220 Q 400 280 600 220" fill="none" stroke={MANIM.green} strokeWidth={22} strokeLinecap="round" />
          <polygon points="200,250 185,285 215,285" fill={MANIM.muted} />
          <polygon points="600,250 585,285 615,285" fill={MANIM.muted} />
          <Arrow x1={400} y1={150} x2={400} y2={235} color={MANIM.red} width={7} />
          <Txt x={400} y={120} size={24} color={MANIM.red}>
            flexión: se curva
          </Txt>
          <Txt x={400} y={205} size={18} color={MANIM.blue}>
            compresión
          </Txt>
          <Txt x={400} y={320} size={18} color={MANIM.orange}>
            tracción
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <rect x={250} y={195} width={300} height={36} rx={6} fill={MANIM.yellow} fillOpacity={0.45} stroke={MANIM.yellow} strokeWidth={4} />
          <path d="M 210 175 C 190 205 190 225 210 255" fill="none" stroke={MANIM.red} strokeWidth={6} />
          <path d="M 590 255 C 610 225 610 205 590 175" fill="none" stroke={MANIM.red} strokeWidth={6} />
          <Txt x={400} y={140} size={24} color={MANIM.red}>
            torsión: se retuerce
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
