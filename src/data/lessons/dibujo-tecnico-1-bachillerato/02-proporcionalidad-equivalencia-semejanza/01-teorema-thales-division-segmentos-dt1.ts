import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const teoremaThalesDivisionSegmentosDt1Lesson: InteractiveLesson = {
  slug: "teorema-thales-division-segmentos-dt1",
  title: "1. Proporcionalidad y teorema de Thales",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Segmentos proporcionales", [
      { kind: "steps", items: [
        "Dos segmentos $a$ y $b$ son **proporcionales** a otros dos $c$ y $d$ si $\\dfrac{a}{b} = \\dfrac{c}{d}$.",
        "**Teorema de Thales**: si dos rectas que se cortan en $O$ son cortadas por rectas **paralelas**, los segmentos que se determinan son proporcionales: $\\dfrac{OA}{OA'} = \\dfrac{AB}{A'B'} = \\dfrac{OB}{OB'}$.",
        "Es la herramienta gráfica para **trasladar proporciones** sin calcular.",
        "Con él se resuelven tres problemas: **dividir un segmento en partes iguales**, **dividirlo en partes proporcionales** y hallar la **cuarta proporcional**.",
      ] },
    ], undefined, "stack"),
    slide("thales", "Comprueba la proporción", [
      { kind: "text", text: "Mueve OA, AB y OA′: las dos razones coinciden siempre. Las paralelas AA′ y BB′ garantizan la proporción." },
    ], tool("dt1-thales-explorador"), "visual-top"),
    slide("construcciones", "Tres construcciones con Thales", [
      { kind: "steps", items: [
        "**Dividir AB en n partes iguales**: por A se traza una semirrecta cualquiera, se llevan n marcas iguales con el compás, se une la última con B y se trazan paralelas a esa unión.",
        "**Dividir AB en partes proporcionales a m y n**: igual, llevando m y n marcas consecutivas.",
        "**Cuarta proporcional** $x$ de $a$, $b$, $c$ (es decir, $a/b = c/x$): se llevan $a$ y $b$ sobre una recta, $c$ sobre la otra, y la paralela por los extremos da $x$.",
        "Todas se basan en que las **paralelas** conservan la razón.",
      ] },
    ]),
    calc("calc-cuarta", "Cuarta proporcional", "Con OA = 3, AB = 2 y OA′ = 6, ¿cuánto mide A′B′? (A′B′ = AB · OA′ / OA)", nums(4), "A′B′ = 2 · 6 / 3 = 4.", "Aplica la proporción de Thales."),
    calc("calc-x", "Hallar x", "Halla x en 4/6 = 10/x.", nums(15), "x = 6 · 10 / 4 = 15.", "Producto cruzado."),
    calc("calc-div", "Partes iguales", "Se divide un segmento de 12 cm en 5 partes iguales con Thales. ¿Cuánto mide cada parte, en cm?", nums(2.4), "12 / 5 = 2,4 cm.", "Divide entre cinco."),
    sort("clasifica-thales", "¿Qué se pide?", "Clasifica cada problema.",
      [["div", "Dividir en partes iguales", "cobalt"], ["pro", "Dividir proporcionalmente", "amber"], ["cua", "Cuarta proporcional", "emerald"]],
      [["Repartir una barra en 7 trozos iguales", "div"], ["Dividir una pared en 3 partes iguales", "div"], ["Dividir un segmento en partes 2 : 3", "pro"], ["Repartir un terreno entre dos socios al 40 % y 60 %", "pro"], ["Hallar x en a/b = c/x", "cua"], ["Hallar la sombra de un poste a partir de otra sombra conocida", "cua"]],
      "Los tres usan paralelas para conservar proporciones.",
    ),
    pick("check-paralelas", "Condición", "¿Qué condición exige el teorema de Thales para que los segmentos sean proporcionales?",
      "Que las rectas que cortan a las dos semirrectas sean paralelas entre sí",
      [["Que las rectas sean perpendiculares", "Eso no da proporcionalidad."], ["Que los segmentos sean iguales", "Entonces no habría que probar nada."], ["Que las semirrectas sean paralelas", "Deben cortarse en O."]],
      "Las paralelas mantienen la razón entre los segmentos.",
    ),
  ],
};
