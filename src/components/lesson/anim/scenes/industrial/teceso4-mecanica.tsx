import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Reductora de dos etapas ───────────── */

export function buildReductoraEtapas(): AnimBuild {
  return {
    label: "Reductora de dos etapas: la velocidad baja y el par sube",
    beatMs: 5600,
    captions: [
      "Un **motor** gira rápido (3 000 rpm) pero da **poco par**: no puede mover una carga pesada directamente.",
      "La **primera etapa** reduce la velocidad en una relación 4:1: 750 rpm, y el par se multiplica por 4 (menos las pérdidas).",
      "La **segunda etapa** vuelve a reducir 4:1: la salida gira a 187,5 rpm y el par se multiplica por 16 en total.",
      "La **potencia** (par × velocidad) se conserva, salvo las **pérdidas por rozamiento** en cada etapa: hay que contar el rendimiento.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={140} cy={230} r={34} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={5} />
        <circle cx={250} cy={230} r={76} fill={MANIM.orange} fillOpacity={beat >= 1 ? 0.35 : 0.12} stroke={MANIM.orange} strokeWidth={beat >= 1 ? 5 : 2} className="anim-t" />
        <circle cx={360} cy={230} r={30} fill={MANIM.orange} fillOpacity={beat >= 1 ? 0.35 : 0.12} stroke={MANIM.orange} strokeWidth={beat >= 1 ? 5 : 2} className="anim-t" />
        <circle cx={500} cy={230} r={110} fill={MANIM.purple} fillOpacity={beat >= 2 ? 0.35 : 0.12} stroke={MANIM.purple} strokeWidth={beat >= 2 ? 5 : 2} className="anim-t" />
        <Txt x={140} y={232} size={20} color={MANIM.ink}>
          motor
        </Txt>
        <Txt x={500} y={232} size={20} color={MANIM.ink}>
          salida
        </Txt>
        <Txt x={140} y={290} size={20} color={MANIM.blue}>
          3 000 rpm
        </Txt>
        <Fade show={beat >= 1}>
          <Txt x={250} y={330} size={20} color={MANIM.orange}>
            750 rpm
          </Txt>
          <Txt x={300} y={110} size={22} color={MANIM.orange}>
            i₁ = 4
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={500} y={360} size={20} color={MANIM.purple}>
            187,5 rpm
          </Txt>
          <Txt x={440} y={90} size={22} color={MANIM.purple}>
            i total = 16
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Arrow x1={140} y1={170} x2={140} y2={120} color={MANIM.blue} width={5} />
          <Txt x={230} y={130} size={20} color={MANIM.blue}>
            poco par
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={405} size={22} color={MANIM.green}>
            P entrada ≈ P salida + pérdidas
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
