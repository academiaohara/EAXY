import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const verdaderaFormaFiguraPlanaDt2Lesson: InteractiveLesson = {
  slug: "verdadera-forma-figura-plana-dt2",
  title: "2. Verdadera forma de una figura plana",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Abatir una figura entera", [
      { kind: "steps", items: [
        "Para abatir un polígono situado en un plano se abate **cada vértice** con el procedimiento del punto, o se usa la **afinidad** entre su proyección y su abatimiento.",
        "El **eje de afinidad** es la **charnela** (la traza) y la dirección es perpendicular a ella.",
        "Los puntos de la traza son **dobles**: no cambian.",
        "Así, a partir de **un solo punto** abatido se obtiene el resto de la figura con rectas homólogas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Proyecciones y verdadera forma", [
      { kind: "text", text: "Cambia la inclinación del plano. Las proyecciones se deforman; la figura abatida no cambia." },
    ], tool("dt2-verdadera-forma-explorador"), "visual-top"),
    slide("aplicaciones", "Qué se puede hacer una vez abatida", [
      { kind: "steps", items: [
        "**Medir** lados, ángulos y áreas reales.",
        "**Construir** figuras regulares en un plano oblicuo: se dibujan en el abatimiento y se **desabaten**.",
        "**Dibujar secciones** de sólidos con planos oblicuos, cuya verdadera forma se obtiene abatiendo la sección.",
        "**Hallar el centro** de una circunferencia contenida en un plano y sus proyecciones, que son **elipses**.",
      ] },
    ]),
    calc("calc-area", "Área proyectada", "Una figura de 12 cm² de área real está en un plano inclinado 60° respecto del PH. ¿Qué área tiene su proyección horizontal, área · cos φ, en cm²?", nums(6), "12 · cos 60° = 12 · 0,5 = 6 cm².", "cos 60° = 0,5."),
    calc("calc-areav", "Área proyectada en el PV", "Con la misma figura, ¿qué área tiene su proyección vertical, área · sen φ? (dos decimales, en cm²)", nums(10.39, 10.392), "12 · sen 60° ≈ 10,39 cm².", "sen 60° ≈ 0,866."),
    sort("clasifica", "¿Se conserva o se deforma?", "Clasifica cada propiedad de la figura según se vea en la proyección o en el abatimiento.",
      [["pro", "Proyección (deformada)", "cobalt"], ["aba", "Abatimiento (verdadera forma)", "amber"]],
      [["El área se reduce por cos φ", "pro"], ["Los ángulos pueden cambiar", "pro"], ["Un cuadrado puede verse como paralelogramo", "pro"], ["Los lados tienen su longitud real", "aba"], ["Los ángulos son los verdaderos", "aba"], ["No depende de la inclinación del plano", "aba"]],
      "Las proyecciones se deforman; el abatimiento da la forma real.",
    ),
    pick("check", "Eje de afinidad", "En la afinidad entre una figura proyectada y su abatimiento, ¿qué recta es el eje?",
      "La traza del plano (la charnela)",
      [["La línea de tierra siempre", "Solo si el plano pasa por ella."], ["La perpendicular a la traza", "Esa es la dirección de afinidad."], ["La recta de máxima pendiente", "No es el eje."]],
      "Los puntos de la traza no se mueven: son los puntos dobles.",
    ),
  ],
};
