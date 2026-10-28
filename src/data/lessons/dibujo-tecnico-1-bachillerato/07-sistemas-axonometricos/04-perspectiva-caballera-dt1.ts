import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const perspectivaCaballeraDt1Lesson: InteractiveLesson = {
  slug: "perspectiva-caballera-dt1",
  title: "4. Axonometría oblicua: perspectivas caballera y militar",
  subtitle: DT1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una cara en verdadera forma", [
      { kind: "steps", items: [
        "En la axonometría **oblicua** los rayos no son perpendiculares al cuadro. Si un plano coordenado es **paralelo al cuadro**, se ve **sin deformar**.",
        "**Perspectiva caballera**: el plano **XZ** (alzado) es paralelo al cuadro. Los ejes X y Z forman **90°** y el eje **Y** (profundidad) forma un ángulo **α** (30°, 45° o 60°) y se **reduce**.",
        "El **coeficiente de reducción** de Y es habitualmente **0,5** (con 45°), aunque se admite 2/3.",
        "**Perspectiva militar**: el plano **XY** (planta) está en verdadera forma y es el eje Z el que se inclina y se reduce.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una pieza en caballera", [
      { kind: "text", text: "Varía el ángulo y el coeficiente de reducción de la profundidad. El agujero de la cara frontal sigue siendo una circunferencia." },
    ], tool("dt1-caballera-explorador"), "visual-top"),
    slide("usos", "Cuándo usarla", [
      { kind: "steps", items: [
        "Cuando una **cara** tiene muchos **detalles circulares** o complejos: se pone paralela al cuadro y se dibuja como en su vista.",
        "Cuando se quiere un **dibujo rápido** de una pieza: se copia el alzado y se añaden las **aristas de profundidad**.",
        "A cambio, la imagen resulta **deformada**: la profundidad parece mayor de lo normal, por eso se reduce.",
        "Con α = 45° y k = 0,5 es la forma más equilibrada.",
      ] },
    ]),
    calc("calc-prof", "Profundidad reducida", "Una pieza tiene 8 cm de profundidad. Con k = 0,5, ¿cuánto mide la arista de fondo dibujada, en cm?", nums(4), "8 · 0,5 = 4 cm.", "Multiplica por k."),
    calc("calc-despl", "Desplazamiento horizontal", "Con α = 45° y esa arista dibujada de 4 cm, ¿cuánto se desplaza horizontalmente cada punto del fondo respecto del frente, en cm? (dos decimales)", nums(2.83, 2.8284), "4 · cos 45° ≈ 2,83 cm.", "cos 45° = 0,7071."),
    calc("calc-ang", "Ángulo entre X y Z", "En la perspectiva caballera, ¿qué ángulo forman entre sí los ejes X y Z, en grados?", nums(90), "Los ejes del plano frontal se dibujan perpendiculares.", "Es el plano paralelo al cuadro."),
    sort("clasifica-obl", "¿Caballera o militar?", "Clasifica según el plano que queda en verdadera forma.",
      [["cab", "Caballera (alzado frontal)", "cobalt"], ["mil", "Militar (planta)", "amber"]],
      [["El plano XZ es paralelo al cuadro", "cab"], ["Las ventanas de una fachada en verdadera forma", "cab"], ["El eje Y se inclina y se reduce", "cab"], ["El plano XY es paralelo al cuadro", "mil"], ["La planta de un edificio sin deformar", "mil"], ["El eje Z se inclina y se reduce", "mil"]],
      "La perspectiva se nombra por qué plano queda sin deformar.",
    ),
    pick("check-caba", "Por qué se reduce", "¿Por qué se reduce la profundidad en la perspectiva caballera?",
      "Para compensar la sensación de que la profundidad sale demasiado grande",
      [["Porque el eje Y es el más corto", "No: se debe a la deformación de la oblicua."], ["Para que el cubo cierre", "No es una cuestión de cierre."], ["Porque la LT lo exige", "La LT es del diédrico."]],
      "Con coeficiente 1 la pieza parecería mucho más profunda de lo que es.",
    ),
  ],
};
