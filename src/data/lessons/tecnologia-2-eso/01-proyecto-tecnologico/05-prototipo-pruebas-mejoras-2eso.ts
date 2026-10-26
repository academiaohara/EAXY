import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const prototipoPruebasMejoras2esoLesson: InteractiveLesson = {
  slug: "prototipo-pruebas-mejoras-2eso",
  title: "5. Prototipo, pruebas y mejoras",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("proto", "El prototipo", [
      { kind: "definition", text: "Un **prototipo** es una primera versión del producto, hecha para **probar** la idea. Puede ser de cartón, de espuma o impreso en 3D: lo importante es detectar fallos pronto, cuando corregirlos es barato." },
      { kind: "steps", items: [
        "**Maqueta**: representa la forma y el tamaño.",
        "**Prototipo funcional**: además, funciona de verdad.",
        "El **producto final** se hace después, con los materiales definitivos.",
      ] },
    ], undefined, "stack"),
    slide("pruebas", "Probar frente a los requisitos", [
      { kind: "text", text: "Anota las medidas de tu prototipo y compáralas con cada requisito. Los que fallan indican qué mejorar." },
    ], tool("eso2-pruebas-prototipo-explorador"), "visual-top"),
    slide("metodo", "Un método de prueba", [
      { kind: "steps", items: [
        "Define la **prueba** y cómo se mide (peso, tiempo, ángulo…).",
        "Repite cada prueba **varias veces** y apunta todos los resultados.",
        "Anota **fallos**, sus causas probables y las **mejoras** propuestas.",
        "Cambia **una cosa cada vez** para saber qué la mejora.",
        "Vuelve a **probar** tras cada cambio.",
      ] },
    ]),
    calc("calc-media", "La media de tres pruebas", "Tres pruebas de carga dan 520 g, 480 g y 500 g. ¿Cuál es el valor medio, en g?", nums(500), "(520 + 480 + 500) / 3 = 500 g.", "Suma y divide entre 3."),
    sort("clasifica-resultado", "¿Cumple el requisito?", "El requisito es «aguantar al menos 500 g». Clasifica cada resultado.",
      [["cum", "Cumple", "emerald"], ["fal", "No cumple", "rose"]],
      [["500 g", "cum"], ["620 g", "cum"], ["1 000 g", "cum"], ["480 g", "fal"], ["300 g", "fal"], ["499 g", "fal"]],
      "Cumplir un «al menos» implica igualar o superar el valor del requisito.",
    ),
    pick("check-una", "Una cosa cada vez", "¿Por qué conviene cambiar solo un aspecto del prototipo en cada mejora?",
      "Para saber qué cambio ha producido el efecto observado",
      [["Para trabajar menos", "No es por pereza."], ["Porque se prohíbe cambiar más", "Es una buena práctica, no una norma."], ["No tiene ninguna ventaja", "Permite aprender de las pruebas."]],
      "Si cambias muchas cosas a la vez, no sabrás cuál mejoró o empeoró el resultado.",
    ),
  ],
};
