import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Del problema a la difusión ───────────── */

const FASES = ["especificar", "simular", "construir", "probar", "documentar"];
const COLORES = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.yellow, MANIM.green];

export function buildFlujoProyecto(): AnimBuild {
  return {
    label: "Flujo de un proyecto: especificar, simular, construir, probar, documentar y difundir",
    beatMs: 5000,
    captions: [
      "Se **especifica** el problema con requisitos medibles: magnitud, unidad y límite.",
      "Se **simula** en el ordenador (CAD, cálculo, circuito virtual) para descartar diseños malos **antes** de gastar material.",
      "Se **construye** el prototipo con los recursos planificados: tiempo, materiales y presupuesto.",
      "Se **prueba** frente a las especificaciones. Si falla, se vuelve atrás y se **mejora**.",
      "Se **documenta** (memoria, planos, hoja de costes) y se **difunde** para que otros lo conozcan, lo reutilicen y lo mejoren.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 20 + i * 150;
          const act = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={150} width={130} height={80} rx={10} fill={COLORES[i]} fillOpacity={act ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COLORES[i]} strokeWidth={act ? 5 : 2} className="anim-t" />
              <Txt x={x + 65} y={190} size={19} color={MANIM.ink}>
                {f}
              </Txt>
              {i < 4 ? <Arrow x1={x + 132} y1={190} x2={x + 148} y2={190} color={i < beat ? MANIM.green : MANIM.muted} width={4} /> : null}
            </g>
          );
        })}
        <Fade show={beat === 3}>
          <path d="M 530 235 C 530 300 120 300 120 235" fill="none" stroke={MANIM.red} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={325} y={320} size={20} color={MANIM.red}>
            si falla, se mejora y se vuelve a probar
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={235} y={115} size={20} color={MANIM.purple}>
            «¿aguanta?» sin gastar material
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
