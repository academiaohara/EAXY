import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Ciclo del aprendizaje automático ───────────── */

const FASES = ["datos", "entrenar", "modelo", "predecir", "evaluar"];
const COL = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.yellow, MANIM.green];

export function buildCicloAprendizaje(): AnimBuild {
  return {
    label: "Ciclo del aprendizaje automático: datos, entrenamiento, modelo, predicción y evaluación",
    beatMs: 5400,
    captions: [
      "Se recogen **datos de ejemplo**, con la respuesta correcta (**etiquetas**) si el aprendizaje es supervisado. Su calidad y su representatividad lo condicionan todo.",
      "Se **entrena**: un algoritmo ajusta los parámetros del modelo para cometer pocos errores con esos ejemplos.",
      "El resultado es un **modelo**: una función que, dados nuevos datos, produce una salida (una clase, un valor, un texto).",
      "El modelo **predice** sobre casos que no ha visto. Puede equivocarse, y lo hará sobre todo donde los datos de entrenamiento eran escasos o sesgados.",
      "Se **evalúa** con datos reservados para la prueba y métricas adecuadas; si no es suficiente, se mejoran los datos o el modelo y se repite.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 20 + i * 150;
          const on = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={140} width={130} height={70} rx={10} fill={COL[i]} fillOpacity={on ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COL[i]} strokeWidth={on ? 5 : 2} className="anim-t" />
              <Txt x={x + 65} y={175} size={21} color={MANIM.ink}>
                {f}
              </Txt>
            </g>
          );
        })}
        <Fade show={beat === 0}>
          <Txt x={375} y={260} size={21} color={MANIM.blue}>
            fotos con su etiqueta, medidas, textos…
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={375} y={260} size={21} color={MANIM.yellow}>
            ¿qué es esto? → «gato» (92 % de confianza)
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <path d="M 665 215 C 665 300 85 300 85 215" fill="none" stroke={MANIM.green} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={375} y={335} size={21} color={MANIM.green}>
            se mejoran los datos o el modelo y se repite
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
