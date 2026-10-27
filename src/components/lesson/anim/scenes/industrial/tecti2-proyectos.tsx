import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Ciclo de Scrum ───────────── */

const FASES = ["backlog", "planificar", "sprint", "revisión", "retrospectiva"];
const COL = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.yellow, MANIM.green];

export function buildCicloScrum(): AnimBuild {
  return {
    label: "Ciclo de Scrum: backlog, planificación, sprint, revisión y retrospectiva",
    beatMs: 5400,
    captions: [
      "El **backlog del producto** es la lista priorizada de todo lo que podría hacerse. La ordena el **propietario del producto** según el valor.",
      "En la **planificación del sprint** el equipo elige qué parte del backlog puede completar en el sprint y se compromete con ese objetivo.",
      "Durante el **sprint** (1–4 semanas) el equipo trabaja y se reúne cada día 15 minutos (**reunión diaria**) para sincronizarse y detectar bloqueos.",
      "En la **revisión** se enseña al cliente el **incremento** terminado y se recoge su opinión: el backlog se actualiza.",
      "En la **retrospectiva** el equipo analiza **cómo ha trabajado** y decide qué mejorar. Y empieza el siguiente sprint.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 20 + i * 150;
          const on = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={140} width={130} height={70} rx={10} fill={COL[i]} fillOpacity={on ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COL[i]} strokeWidth={on ? 5 : 2} className="anim-t" />
              <Txt x={x + 65} y={175} size={i === 4 ? 17 : 20} color={MANIM.ink}>
                {f}
              </Txt>
            </g>
          );
        })}
        <Fade show={beat === 2}>
          <Txt x={375} y={260} size={21} color={MANIM.orange}>
            reunión diaria de 15 minutos
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={375} y={260} size={21} color={MANIM.yellow}>
            incremento funcionando + opinión del cliente
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <path d="M 685 215 C 685 300 85 300 85 215" fill="none" stroke={MANIM.green} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={385} y={335} size={21} color={MANIM.green}>
            siguiente sprint: se repite y se mejora
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
