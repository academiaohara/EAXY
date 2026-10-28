import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cilindroConoSeccionesDt2Lesson: InteractiveLesson = {
  slug: "cilindro-cono-secciones-dt2",
  title: "3. Cilindro y cono: secciones",
  subtitle: DT2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuerpos de revolución", [
      { kind: "steps", items: [
        "Un **cilindro** o un **cono** de revolución con eje vertical se representa con una **circunferencia** (la base) en planta y un **rectángulo** o un **triángulo** en alzado.",
        "Sus **generatrices** son las rectas que lo recorren: paralelas al eje en el cilindro, concurrentes en el vértice en el cono.",
        "Para cortarlos se halla la intersección del plano con **varias generatrices** y se unen los puntos con una curva continua.",
        "Las secciones son **cónicas**: elipse, parábola o hipérbola (tema 4).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Elipse en el cilindro y el cono", [
      { kind: "text", text: "Elige el cuerpo, inclina el plano y compara la sección en planta con su verdadera forma." },
    ], tool("dt2-seccion-revolucion-explorador"), "visual-top"),
    slide("casos", "Posibles secciones", [
      { kind: "steps", items: [
        "**Cilindro**: plano **paralelo al eje** → dos generatrices (rectángulo); **perpendicular al eje** → circunferencia; **oblicuo** → elipse.",
        "**Cono**: plano por el **vértice** → una o dos generatrices (triángulo); **perpendicular al eje** → circunferencia.",
        "**Cono, plano oblicuo**: **elipse** si es menos inclinado que las generatrices, **parábola** si es paralelo a una generatriz, **hipérbola** si es más inclinado.",
      ] },
    ]),
    calc("calc-a", "Semieje mayor", "Un cilindro de radio 2 cm se corta con un plano que forma 60° con el PH. ¿Cuánto vale el semieje mayor de la elipse, r / cos α, en cm?", nums(4), "2 / cos 60° = 4 cm.", "cos 60° = 0,5."),
    calc("calc-b", "Semieje menor", "Con esos mismos datos, ¿cuánto vale el semieje menor de la elipse, en cm?", nums(2), "El semieje menor es igual al radio del cilindro: 2 cm.", "No cambia."),
    sort("clasifica", "¿Qué sección?", "Clasifica cada plano de corte según la sección que produce.",
      [["cir", "Circunferencia", "cobalt"], ["eli", "Elipse", "amber"], ["rec", "Rectángulo o triángulo", "emerald"]],
      [["Cilindro cortado perpendicularmente al eje", "cir"], ["Cono cortado perpendicularmente al eje", "cir"], ["Cilindro cortado oblicuamente", "eli"], ["Cono cortado por un plano poco inclinado respecto del eje", "eli"], ["Cilindro cortado por un plano paralelo al eje", "rec"], ["Cono cortado por un plano que pasa por el vértice", "rec"]],
      "Perpendicular al eje: circunferencia; oblicuo: elipse; paralelo o por el vértice: rectas.",
    ),
    pick("check", "Verdadera forma", "¿Cómo se obtiene la verdadera forma de una sección elíptica?",
      "Abatiendo el plano de corte",
      [["Mirándola en planta", "En planta está deformada."], ["Girando el sólido 90°", "No sirve en general."], ["Dividiendo por el radio", "Eso no da la forma."]],
      "El abatimiento convierte la proyección en la figura real, mediante una afinidad.",
    ),
  ],
};
