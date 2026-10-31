import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemasReferenciaVectoresFb1Lesson: InteractiveLesson = {
  slug: "sistemas-referencia-vectores-fb1",
  title: "1. Sistemas de referencia y magnitudes vectoriales",
  subtitle: FB1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("sr", "Describir el movimiento", [
      { kind: "steps", items: [
        "Un cuerpo está en **movimiento** si su posición **cambia respecto a un sistema de referencia** (origen y ejes). El movimiento es **relativo**: depende del sistema elegido.",
        "**Magnitudes escalares** (módulo y unidad: tiempo, rapidez, distancia) y **vectoriales** (módulo, dirección y sentido: posición, velocidad, aceleración).",
        "**Vector de posición r(t) = x·**i** + y·**j**** (m). **Trayectoria**: curva que describe el móvil. **Desplazamiento** Δr = r₂ − r₁; **distancia recorrida** s ≥ |Δr| (medida sobre la trayectoria).",
        "Un vector se opera por **componentes**: suma y resta componente a componente; el módulo es |r| = √(x² + y²).",
      ] },
    ], undefined, "stack"),
    slide("vel", "Velocidad y aceleración", [
      { kind: "steps", items: [
        "**Velocidad media** vₘ = Δr/Δt (vector). **Rapidez media** = distancia/Δt (escalar).",
        "**Velocidad instantánea** v = dr/dt: es **tangente a la trayectoria** y su módulo es la rapidez.",
        "**Aceleración media** aₘ = Δv/Δt; **instantánea** a = dv/dt. Hay aceleración siempre que cambie v: **su módulo, su dirección o ambos**.",
        "Componentes intrínsecas: **aceleración tangencial aₜ = dv/dt** (cambia el módulo) y **normal aₙ = v²/R** (cambia la dirección; apunta al centro de curvatura).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Vectores en acción", [
      { kind: "text", text: "Cambia la velocidad inicial y la aceleración. Observa cómo r, v y a cambian con el tiempo y cómo se reparte la aceleración en tangencial y normal." },
    ], tool("fb1-vectores-cinematicos-explorador"), "visual-top"),
    slide("casos", "Casos particulares", [
      { kind: "steps", items: [
        "**a ∥ v**: movimiento **rectilíneo** (aₙ = 0). Si tienen el mismo sentido, **acelera**; si son opuestos, **frena**.",
        "**a ⟂ v**: **movimiento circular uniforme** (aₜ = 0, rapidez constante).",
        "**a con ambas componentes**: trayectoria curva con cambio de rapidez (un coche que toma una curva acelerando).",
        "**Aceleración constante** (g): **parábola** si v₀ no es paralela a a (tiro parabólico).",
      ] },
    ], undefined, "stack"),
    calc("calc-mod", "Módulo", "Un vector de posición vale (3, 4) m. ¿Cuál es su módulo, en m?", nums(5), "|r| = √(9 + 16) = 5 m.", "Módulo = √(x² + y²)."),
    calc("calc-desp", "Desplazamiento", "Un móvil pasa de (1, 2) m a (4, 6) m. ¿Cuál es el módulo de su desplazamiento, en m?", nums(5), "Δr = (3, 4) → |Δr| = 5 m.", "Resta componentes y calcula el módulo."),
    calc("calc-vm", "Velocidad media", "En 2 s el desplazamiento es (6, 8) m. ¿Cuál es el módulo de la velocidad media, en m/s?", nums(5), "vₘ = (3, 4) m/s → 5 m/s.", "vₘ = Δr/Δt."),
    calc("calc-an", "Aceleración normal", "Un coche toma una curva de 50 m de radio a 10 m/s. ¿Cuál es su aceleración normal, en m/s²?", nums(2), "aₙ = v²/R = 100/50 = 2 m/s².", "aₙ = v²/R."),
    sort("clasifica", "¿Hay aceleración?", "Indica qué componente de la aceleración existe en cada movimiento.",
      [["tan", "Solo tangencial", "cobalt"], ["nor", "Solo normal", "emerald"], ["amb", "Ambas", "rose"], ["nin", "Ninguna", "amber"]],
      [["Un coche frena en una recta", "tan"], ["Un tren en una curva a rapidez constante", "nor"], ["Un coche acelera al salir de una curva", "amb"], ["Un tren a velocidad constante en una recta", "nin"], ["Una piedra que cae verticalmente", "tan"], ["Un satélite en órbita circular", "nor"]],
      "aₜ cambia la rapidez; aₙ cambia la dirección.",
    ),
    pick("check", "Velocidad", "¿Cómo es la velocidad instantánea respecto a la trayectoria?",
      "Tangente a la trayectoria en cada punto",
      [["Perpendicular a la trayectoria", "Eso es la aceleración normal."], ["Apunta siempre al origen", "Depende del sistema de referencia, no de la trayectoria."], ["Paralela al eje X", "Solo en ciertos movimientos."]],
      "v = dr/dt apunta en el sentido del movimiento.",
    ),
  ],
};
