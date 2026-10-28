import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impactoSocialAmbientalTecnologia4esoLesson: InteractiveLesson = {
  slug: "impacto-social-ambiental-tecnologia-4eso",
  title: "5. Impacto social y ambiental de la tecnología",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Toda tecnología tiene efectos", [
      { kind: "steps", items: [
        "**Ambientales**: consumo de recursos y energía, emisiones, residuos, pérdida de biodiversidad.",
        "**Sociales**: empleo, salud, brecha digital, privacidad, desigualdad en el acceso.",
        "**Económicos**: nuevos mercados y empleos, pero también sectores que desaparecen.",
        "Se evalúa con un **análisis de impacto**: ¿quién gana y quién pierde? ¿Qué efectos son **reversibles**?",
      ] },
    ], undefined, "stack"),
    slide("huella", "El impacto de un producto", [
      { kind: "text", text: "Estima la huella de un producto a lo largo de su vida." },
    ], tool("huella-producto-explorador"), "visual-top"),
    slide("dig", "La huella digital", [
      { kind: "text", text: "Los servicios digitales también consumen energía: centros de datos, redes y dispositivos." },
    ], tool("eso2-huella-digital-explorador"), "visual-top"),
    slide("res", "Los residuos electrónicos", [
      { kind: "steps", items: [
        "Un móvil contiene **metales valiosos** (oro, cobre, cobalto, litio) cuya extracción tiene un gran impacto.",
        "Los **residuos electrónicos (RAEE)** crecen más rápido que cualquier otro tipo y contienen **sustancias tóxicas**.",
        "Se deben llevar a **puntos limpios** o devolver al comercio: los materiales se recuperan.",
        "**Brecha digital**: no todas las personas tienen acceso a dispositivos ni a la formación para usarlos.",
      ] },
    ]),
    calc("calc-raee", "Tasa de reciclaje", "En un país se generan 800 000 t de residuos electrónicos y se recogen 320 000 t. ¿Qué porcentaje se recoge?", nums(40), "320 000 / 800 000 = 0,4 = 40 %.", "Recogido entre generado."),
    calc("calc-vida", "Vida del móvil", "Fabricar un móvil emite 70 kg de CO₂. Si se usa 5 años en lugar de 2, ¿cuántos kg de CO₂ por año de uso se ahorran? (70/2 − 70/5)", nums(21), "35 − 14 = 21 kg por año de ahorro.", "70/2 = 35 y 70/5 = 14."),
    sort("clasifica-imp", "¿Ambiental o social?", "Clasifica cada efecto.",
      [["amb", "Ambiental", "emerald"], ["soc", "Social", "cobalt"]],
      [["Minería de cobalto", "amb"], ["Emisiones de un centro de datos", "amb"], ["Residuos electrónicos", "amb"], ["Brecha digital", "soc"], ["Pérdida de privacidad", "soc"], ["Automatización de empleos", "soc"]],
      "Muchos impactos tienen una parte ambiental y otra social.",
    ),
    pick("check-raee", "Dónde llevar un móvil", "Un móvil viejo ya no funciona. ¿Qué es lo más adecuado?",
      "Llevarlo a un punto limpio o al comercio para reciclar sus materiales",
      [["Tirarlo al contenedor normal", "Contiene sustancias tóxicas."], ["Enterrarlo", "Contamina el suelo."], ["Quemarlo", "Libera tóxicos."]],
      "Los residuos electrónicos tienen su propia gestión.",
    ),
  ],
};
