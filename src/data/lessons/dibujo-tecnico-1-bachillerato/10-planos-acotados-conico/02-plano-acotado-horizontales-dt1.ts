import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planoAcotadoHorizontalesDt1Lesson: InteractiveLesson = {
  slug: "plano-acotado-horizontales-dt1",
  title: "2. El plano: horizontales y escala de pendiente",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un plano por sus horizontales", [
      { kind: "steps", items: [
        "Las **horizontales de un plano** son las rectas de **cota constante**: sus puntos están todos a la misma altura.",
        "Son **paralelas** entre sí. Las de cota entera consecutiva están a una distancia igual al **intervalo** del plano.",
        "La **recta de máxima pendiente** es **perpendicular** a las horizontales y es la de mayor inclinación del plano.",
        "Su graduación es la **escala de pendiente**: con ella queda **definido** el plano.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia la pendiente", [
      { kind: "text", text: "Mueve la pendiente y el rumbo. ¿Qué pasa con las horizontales cuando el plano es más pendiente?" },
    ], tool("dt1-plano-acotado-explorador"), "visual-top"),
    slide("construye", "Cómo se construye", [
      { kind: "steps", items: [
        "Si se conoce la **recta de máxima pendiente** graduada, las horizontales se trazan **perpendiculares** a ella por cada punto de cota entera.",
        "Si se conocen **dos rectas** del plano, se gradúan y se unen los puntos de **igual cota**: son las horizontales.",
        "Para hallar la **cota** de un punto del plano se traza la horizontal que pasa por él y se interpola.",
        "**Planos paralelos** tienen las horizontales paralelas y el **mismo intervalo**.",
      ] },
    ]),
    calc("calc-i25", "Intervalo", "Un plano tiene una pendiente del 25 %. ¿Cuál es su intervalo, en m?", nums(4), "i = 1/0,25 = 4 m.", "Inverso de la pendiente."),
    calc("calc-a100", "Pendiente del 100 %", "¿Qué ángulo forma con la horizontal un plano con pendiente del 100 %, en grados?", nums(45), "arctg 1 = 45°.", "Desnivel igual a la distancia."),
    calc("calc-p", "Pendiente desde el intervalo", "Las horizontales de cota entera de un plano están separadas 1,5 m. ¿Qué pendiente tiene, en %? (un decimal)", nums(66.7, 66.67), "p = 1/1,5 ≈ 0,667 = 66,7 %.", "Inverso del intervalo."),
    sort("clasifica-hor", "¿Cómo son?", "Clasifica cada afirmación sobre el plano acotado.",
      [["ver", "Correcta", "cobalt"], ["fal", "Incorrecta", "amber"]],
      [["Las horizontales son paralelas", "ver"], ["La máxima pendiente es perpendicular a las horizontales", "ver"], ["Más pendiente implica horizontales más juntas", "ver"], ["Las horizontales se cortan en un punto", "fal"], ["La máxima pendiente es paralela a las horizontales", "fal"]],
      "Las horizontales son rectas de cota constante y paralelas.",
    ),
    pick("check-juntas", "Horizontales juntas", "En un plano acotado, ¿qué significa que sus horizontales de cota entera estén más próximas?",
      "Que el plano tiene más pendiente",
      [["Que el plano está más alto", "La altura la dan las cotas, no la separación."], ["Que el plano tiene menos pendiente", "Es al revés."], ["Que el plano es horizontal", "Un plano horizontal no tiene horizontales distintas."]],
      "Se sube la misma unidad de cota en menos distancia horizontal.",
    ),
  ],
};
