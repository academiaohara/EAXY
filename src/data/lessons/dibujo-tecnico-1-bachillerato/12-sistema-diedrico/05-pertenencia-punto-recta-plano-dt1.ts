import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pertenenciaPuntoRectaPlanoDt1Lesson: InteractiveLesson = {
  slug: "pertenencia-punto-recta-plano-dt1",
  title: "5. Pertenencia de punto y recta a un plano",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuándo un elemento está en un plano", [
      { kind: "steps", items: [
        "**Una recta pertenece a un plano** si sus **trazas** están sobre las trazas del plano: H sobre α₁ y V sobre α₂.",
        "**Un punto pertenece a un plano** si pertenece a **una recta del plano** que pase por él.",
        "Las rectas más cómodas son las **horizontales del plano**: tienen **cota constante**, su proyección vertical es paralela a la LT y la horizontal es **paralela a la traza horizontal α₁**.",
        "Análogamente, las **frontales del plano** tienen alejamiento constante y son paralelas a la traza vertical α₂.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Pertenece el punto?", [
      { kind: "text", text: "El plano tiene sus trazas a 135° y 45°. Ajusta el punto hasta que a caiga sobre la horizontal h del plano." },
    ], tool("dt1-pertenencia-plano-explorador"), "visual-top"),
    slide("metodo", "Método", [
      { kind: "steps", items: [
        "Se traza **h′** (paralela a la LT) por a′ hasta cortar **α₂**.",
        "Se baja la línea de referencia hasta la **LT**; por ese punto se traza **h** paralela a **α₁**.",
        "Si **a está sobre h**, el punto pertenece al plano. Si no, hay que **corregir** una de sus proyecciones.",
        "Para **completar** una proyección que falta, se invierte el proceso: se conoce a y se halla a′ sobre h′.",
      ] },
    ]),
    calc("calc-cota1", "Cota que le corresponde", "En el plano con trazas a 135° y 45° (z = x − e), un punto tiene x = 4 y alejamiento 1. ¿Qué cota debe tener para pertenecer al plano, en cm?", nums(3), "z = 4 − 1 = 3 cm.", "Aplica z = x − e."),
    calc("calc-cota2", "Alejamiento negativo", "Con x = 2 y alejamiento −1, ¿qué cota debe tener, en cm?", nums(3), "z = 2 − (−1) = 3 cm.", "Resta un número negativo."),
    calc("calc-cota3", "En el PH", "Un punto del plano con x = 3 y alejamiento 3, ¿qué cota tiene, en cm?", nums(0), "z = 3 − 3 = 0: está en la traza horizontal α₁.", "Está sobre la traza horizontal."),
    sort("clasifica-pert", "¿Pertenece?", "Decide si cada recta o punto pertenece al plano.",
      [["si", "Pertenece al plano", "cobalt"], ["no", "No pertenece", "amber"]],
      [["Una recta con H en α₁ y V en α₂", "si"], ["Un punto de la traza horizontal α₁", "si"], ["Un punto de una horizontal del plano", "si"], ["Una recta cuya H no está en α₁", "no"], ["Un punto cuya proyección a no está en la h que pasa por a′", "no"]],
      "Una recta es del plano si sus trazas están en las del plano.",
    ),
    pick("check-h", "Recta horizontal del plano", "¿Cómo es la proyección horizontal de una recta horizontal de un plano?",
      "Paralela a la traza horizontal del plano",
      [["Perpendicular a la LT", "Eso es una recta de punta."], ["Paralela a la traza vertical", "Esa es la de la recta frontal."], ["Un punto", "Eso ocurre en la recta vertical."]],
      "Todas las rectas de cota constante del plano son paralelas a la intersección del plano con el PH.",
    ),
  ],
};
