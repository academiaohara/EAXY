import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const movimientoOndulatorioFq4Lesson: InteractiveLesson = {
  slug: "movimiento-ondulatorio-fq4",
  title: "1. Movimiento ondulatorio",
  subtitle: FQ4_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es una onda", [
      { kind: "steps", items: [
        "Una **onda** es una perturbación que se **propaga** por un medio (o por el vacío) **transportando energía** pero **sin transportar materia**.",
        "Las partículas del medio solo **oscilan** alrededor de su posición de equilibrio; es la perturbación la que avanza.",
        "Ejemplos: ondas en el agua, en una cuerda, el sonido, la luz, los terremotos.",
      ] },
    ], anim("fq4-ondas"), "visual-top"),
    slide("magn", "Magnitudes de una onda", [
      { kind: "steps", items: [
        "**Amplitud A** (m): elongación máxima. Está relacionada con la **energía** de la onda.",
        "**Longitud de onda λ** (m): distancia entre dos puntos consecutivos en fase.",
        "**Periodo T** (s): tiempo de una oscilación completa. **Frecuencia f = 1/T** (Hz): oscilaciones por segundo.",
        "**Velocidad de propagación v = λ/T = λ·f**: depende del **medio**, no de la fuente.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia los parámetros", [
      { kind: "text", text: "Modifica la amplitud, la longitud de onda y la frecuencia. ¿Qué cambia en la velocidad?" },
    ], tool("fq4-onda-explorador"), "visual-top"),
    slide("tipos", "Tipos de ondas", [
      { kind: "steps", items: [
        "**Transversales**: la vibración es **perpendicular** a la propagación (cuerda, luz, ondas S de un terremoto).",
        "**Longitudinales**: la vibración es **paralela** a la propagación (sonido, ondas P, un muelle comprimido).",
        "Por el medio: **mecánicas** (necesitan un medio material) y **electromagnéticas** (se propagan también en el vacío).",
        "La **ecuación** de una onda armónica: **y = A·sen[2π(x/λ − f·t)]**.",
      ] },
    ], undefined, "stack"),
    calc("calc-v", "Velocidad", "Una onda tiene longitud de onda 2 m y frecuencia 5 Hz. ¿Cuál es su velocidad, en m/s?", nums(10), "v = λ·f = 2·5 = 10 m/s.", "v = λ·f."),
    calc("calc-t", "Periodo", "Una onda tiene frecuencia de 4 Hz. ¿Cuál es su periodo, en s?", nums(0.25), "T = 1/f = 1/4 = 0,25 s.", "T = 1/f."),
    calc("calc-l", "Longitud de onda", "Una onda de 340 m/s tiene una frecuencia de 170 Hz. ¿Cuál es su longitud de onda, en m?", nums(2), "λ = v/f = 340/170 = 2 m.", "λ = v/f."),
    sort("clasifica", "Transversal o longitudinal", "Clasifica cada onda.",
      [["tra", "Transversal", "cobalt"], ["lon", "Longitudinal", "rose"]],
      [["Onda en una cuerda sacudida", "tra"], ["El sonido en el aire", "lon"], ["La luz", "tra"], ["Un muelle comprimido que se suelta", "lon"], ["Ondas S de un terremoto", "tra"], ["Ondas P de un terremoto", "lon"]],
      "Según si vibra perpendicular o paralelamente a la propagación.",
    ),
    pick("check", "Qué se transporta", "Una onda se propaga por una cuerda. ¿Qué transporta?",
      "Energía, pero no materia",
      [["Materia y energía", "La cuerda no avanza."], ["Solo materia", "No transporta materia."], ["Nada", "Transporta energía."]],
      "Las partículas oscilan en su sitio; avanza la perturbación.",
    ),
  ],
};
