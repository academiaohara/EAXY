import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesDensidadMateriales2esoLesson: InteractiveLesson = {
  slug: "propiedades-densidad-materiales-2eso",
  title: "1. Propiedades de los materiales y densidad",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("prop", "Qué propiedades miramos", [
      { kind: "steps", items: [
        "**Físicas**: densidad, conductividad eléctrica y térmica, punto de fusión.",
        "**Mecánicas**: dureza, elasticidad, plasticidad, tenacidad, resistencia a la tracción.",
        "**Químicas**: resistencia a la oxidación y la corrosión.",
        "**Ecológicas**: reciclabilidad, origen y huella ambiental.",
        "**Tecnológicas**: facilidad para cortar, doblar, soldar o moldear (maleabilidad, ductilidad).",
      ] },
    ], undefined, "stack"),
    slide("dens", "La densidad", [
      { kind: "rule", title: "Densidad", text: "Masa de un material por unidad de volumen. Se mide en g/cm³ o kg/m³.", formula: "ρ = m / V" },
      { kind: "text", text: "Elige un material y unas dimensiones: calcula la masa del bloque y comprueba si flotaría en agua." },
    ], tool("eso2-densidad-explorador"), "visual-top"),
    slide("util", "Para qué sirve conocerla", [
      { kind: "steps", items: [
        "Calcular el **peso** de una pieza antes de fabricarla: m = ρ · V.",
        "Elegir materiales **ligeros** (aluminio, plásticos) cuando el peso importa.",
        "Saber si un objeto **flotará** (ρ menor que 1 g/cm³ en agua dulce).",
      ] },
    ]),
    calc("calc-masa", "Masa de un bloque", "Un cubo de acero de 10 cm de arista (densidad 7,85 g/cm³). ¿Cuántos kg pesa?", nums(7.85), "V = 10 · 10 · 10 = 1 000 cm³; m = 7,85 · 1 000 = 7 850 g = 7,85 kg.", "Volumen en cm³ y multiplica por la densidad; pasa gramos a kg."),
    calc("calc-dens", "Calcular la densidad", "Una pieza de 100 cm³ tiene una masa de 270 g. ¿Cuál es su densidad, en g/cm³?", nums(2.7), "ρ = m / V = 270 / 100 = 2,7 g/cm³ (aluminio).", "ρ = m / V."),
    sort("clasifica-flota", "¿Flota o se hunde?", "Clasifica cada material en agua dulce (1 g/cm³).",
      [["flo", "Flota", "emerald"], ["hun", "Se hunde", "rose"]],
      [["Corcho (0,24)", "flo"], ["Pino (0,5)", "flo"], ["Hielo (0,92)", "flo"], ["PLA (1,24)", "hun"], ["Aluminio (2,7)", "hun"], ["Acero (7,85)", "hun"]],
      "Flota lo que tiene menos densidad que el agua.",
    ),
    pick("check-prop", "Dureza", "¿Qué propiedad mide la resistencia de un material a ser rayado o penetrado?",
      "La dureza",
      [["La elasticidad", "Es recuperar la forma tras deformarse."], ["La densidad", "Es la masa por unidad de volumen."], ["La conductividad", "Es la facilidad para transmitir calor o electricidad."]],
      "El diamante es el material más duro; el plomo, muy blando.",
    ),
  ],
};
