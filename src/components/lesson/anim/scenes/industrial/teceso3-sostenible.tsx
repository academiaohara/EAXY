import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Casa bioclimática ───────────── */

export function buildCasaBioclimatica(): AnimBuild {
  return {
    label: "Casa bioclimática: sol de invierno, sol de verano, aislamiento y ventilación",
    beatMs: 5600,
    captions: [
      "Una casa **bioclimática** aprovecha el clima del lugar para estar bien con poca energía: orientación, sol, aislamiento y ventilación.",
      "En **invierno** el sol está bajo: entra por las ventanas del lado **sur** y calienta el interior.",
      "En **verano** el sol está alto: un **alero** o un toldo da sombra y evita el sobrecalentamiento.",
      "El **aislamiento** en muros y cubierta reduce las pérdidas de calor en invierno y las ganancias en verano.",
      "La **ventilación cruzada** (ventanas enfrentadas) refresca la casa de noche sin gastar energía.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={250} y={170} width={300} height={170} fill={MANIM.surface} stroke={beat === 3 ? MANIM.green : MANIM.ink} strokeWidth={beat === 3 ? 10 : 4} className="anim-t" />
        <polygon points="230,170 400,90 570,170" fill={MANIM.muted} fillOpacity={0.5} stroke={beat === 3 ? MANIM.green : MANIM.ink} strokeWidth={beat === 3 ? 10 : 4} />
        <rect x={250} y={215} width={26} height={80} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={524} y={215} width={26} height={80} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={250} y={190} width={beat === 2 ? 70 : 0} height={6} fill={MANIM.yellow} className="anim-t" />
        <Txt x={160} y={330} size={18} color={MANIM.muted}>
          sur
        </Txt>
        <Fade show={beat === 1}>
          <circle cx={90} cy={150} r={26} fill={MANIM.yellow} />
          <Arrow x1={125} y1={170} x2={245} y2={240} color={MANIM.yellow} width={6} />
          <Txt x={400} y={260} size={22} color={MANIM.orange}>
            calor que entra
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <circle cx={90} cy={50} r={26} fill={MANIM.yellow} />
          <Arrow x1={118} y1={68} x2={215} y2={150} color={MANIM.yellow} width={6} />
          <Txt x={400} y={260} size={22} color={MANIM.blue}>
            sombra del alero
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={260} size={22} color={MANIM.green}>
            el calor no se escapa
          </Txt>
          <Arrow x1={400} y1={345} x2={400} y2={390} color={MANIM.red} width={5} />
        </Fade>
        <Fade show={beat === 4}>
          <Arrow x1={620} y1={255} x2={555} y2={255} color={MANIM.blue} width={6} />
          <Arrow x1={245} y1={255} x2={180} y2={255} color={MANIM.blue} width={6} />
          <Txt x={400} y={260} size={22} color={MANIM.blue}>
            aire fresco
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
