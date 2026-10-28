import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const refraccionLuzFq2Lesson: InteractiveLesson = {
  slug: "refraccion-luz-fq2",
  title: "3. Refracción de la luz",
  subtitle: FQ2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "La luz cambia de dirección", [
      { kind: "steps", items: [
        "La **refracción** es el **cambio de dirección** de la luz cuando pasa de un medio transparente a otro.",
        "Ocurre porque la luz **cambia de velocidad**: va más **lenta** en el agua o el vidrio que en el aire.",
        "El **índice de refracción** n = c / v indica cuánto se frena: aire ≈ 1, agua ≈ 1,33, vidrio ≈ 1,5, diamante ≈ 2,42.",
        "Si pasa a un medio con **mayor n**, el rayo se **acerca a la normal**; si pasa a uno con menor n, se **aleja**.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Reflexión y refracción", [
      { kind: "text", text: "Observa un rayo que pasa del aire al agua: una parte se refleja y otra se refracta." },
    ], anim("fq2-rayo-luz"), "visual-top"),
    slide("explora", "Ley de Snell", [
      { kind: "text", text: "Cambia el ángulo y los medios. Busca cuándo ocurre la reflexión total." },
    ], tool("fq2-refraccion-explorador"), "visual-top"),
    slide("efectos", "Efectos de la refracción", [
      { kind: "steps", items: [
        "Un **lápiz en un vaso de agua** parece **quebrado**, y una piscina parece **menos profunda** de lo que es.",
        "Las **lentes** (gafas, lupas, cámaras) usan la refracción: la **convexa** hace converger los rayos, la **cóncava** los separa.",
        "El **arcoíris** aparece porque el agua de las gotas refracta cada color con un ángulo algo distinto (**dispersión**).",
        "En la **fibra óptica**, la **reflexión total** mantiene la luz dentro del cable.",
      ] },
    ]),
    calc("calc-n", "Índice de refracción", "La luz va a 200 000 km/s en cierto material (c = 300 000 km/s). ¿Cuánto vale su índice de refracción?", nums(1.5), "n = 300 000 / 200 000 = 1,5.", "Divide c entre v."),
    calc("calc-v", "Velocidad en el vidrio", "Un vidrio tiene n = 1,5. ¿A qué velocidad viaja la luz en él, en km/s? (c = 300 000 km/s)", nums(200000), "v = c / n = 300 000 / 1,5 = 200 000 km/s.", "Despeja v = c / n."),
    sort("clasifica", "Acerca o aleja", "Clasifica cada paso de la luz según cómo se desvía el rayo respecto de la normal.",
      [["ac", "Se acerca a la normal", "cobalt"], ["al", "Se aleja de la normal", "amber"]],
      [["Del aire al agua", "ac"], ["Del aire al vidrio", "ac"], ["Del aire al diamante", "ac"], ["Del agua al aire", "al"], ["Del vidrio al aire", "al"], ["Del diamante al aire", "al"]],
      "Hacia mayor n, se acerca; hacia menor n, se aleja.",
    ),
    pick("check", "Lápiz en el agua", "¿Por qué un lápiz parece quebrado en un vaso de agua?",
      "Porque la luz se refracta al pasar del agua al aire",
      [["Porque el agua dobla el lápiz", "El lápiz no cambia."], ["Porque la luz se refleja", "La imagen quebrada se debe a la refracción."], ["Porque el vidrio del vaso absorbe parte de la luz", "La imagen quebrada se debe a la refracción en el agua."]],
      "La luz cambia de dirección al cambiar de medio.",
    ),
  ],
};
