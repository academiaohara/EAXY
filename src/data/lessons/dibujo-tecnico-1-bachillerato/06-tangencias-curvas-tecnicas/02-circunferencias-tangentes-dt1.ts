import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circunferenciasTangentesDt1Lesson: InteractiveLesson = {
  slug: "circunferencias-tangentes-dt1",
  title: "2. Circunferencias tangentes y tangentes comunes",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Posiciones relativas", [
      { kind: "steps", items: [
        "Dos circunferencias de radios $R$ y $r$ con centros a distancia $d$ pueden ser **exteriores** ($d > R + r$), **tangentes exteriores** ($d = R + r$), **secantes**, **tangentes interiores** ($d = R - r$) o **interiores**.",
        "El **punto de tangencia** de dos circunferencias está **siempre sobre la recta que une los centros**.",
        "Dos circunferencias exteriores tienen **4 tangentes comunes**: 2 **exteriores** y 2 **interiores** (que se cruzan entre las circunferencias).",
        "Las tangentes comunes exteriores miden $\\sqrt{d^2 - (R-r)^2}$ entre los puntos de tangencia; las interiores, $\\sqrt{d^2 - (R+r)^2}$.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Acerca las circunferencias", [
      { kind: "text", text: "Mueve la distancia entre centros y observa cuántas tangentes comunes existen en cada posición." },
    ], tool("dt1-circunferencias-explorador"), "visual-top"),
    slide("construir", "Construir las tangentes comunes", [
      { kind: "steps", items: [
        "**Exteriores**: se traza la **circunferencia auxiliar** de radio $R - r$ con el mismo centro que la mayor, se trazan las tangentes desde el centro de la menor a esa circunferencia y se **desplazan** una distancia $r$.",
        "**Interiores**: igual, con circunferencia auxiliar de radio $R + r$.",
        "Los puntos de tangencia se hallan prolongando los **radios** (perpendiculares a las tangentes).",
        "Estas tangentes se usan en el dibujo de **correas y cadenas** entre dos poleas.",
      ] },
    ]),
    calc("calc-ext", "Tangente exterior", "Dos circunferencias de radios 5 y 2 cm tienen los centros a 5 cm. ¿Cuánto mide la tangente común exterior entre los puntos de tangencia, en cm? (√(d² − (R − r)²))", nums(4), "√(25 − 9) = 4 cm.", "R − r = 3."),
    calc("calc-int", "Tangente interior", "Dos circunferencias de radios 3 y 2 cm con los centros a 13 cm. ¿Cuánto mide la tangente común interior, en cm? (√(d² − (R + r)²))", nums(12), "√(169 − 25) = 12 cm.", "R + r = 5."),
    calc("calc-d", "Tangentes exteriores", "Dos circunferencias de radios 4 y 3 cm son tangentes exteriormente. ¿A qué distancia están los centros, en cm?", nums(7), "d = R + r = 7 cm.", "Suma de radios."),
    sort("clasifica-pos", "¿Cuántas tangentes comunes?", "Clasifica según el número de tangentes comunes de cada pareja (R = 3, r = 2).",
      [["cuatro", "4 tangentes", "cobalt"], ["tres", "3 tangentes", "amber"], ["dos", "2 tangentes", "emerald"], ["una", "1 o ninguna", "rose"]],
      [["d = 8", "cuatro"], ["d = 6", "cuatro"], ["d = 5 (tangentes exteriores)", "tres"], ["d = 4 (secantes)", "dos"], ["d = 2 (secantes)", "dos"], ["d = 1 (tangentes interiores)", "una"], ["d = 0,5 (interiores)", "una"]],
      "Cuantos menos puntos en contacto, menos tangentes comunes.",
    ),
    pick("check-centros", "Dónde está el punto", "En dos circunferencias tangentes, ¿dónde está el punto de tangencia?",
      "En la recta que une los dos centros",
      [["En cualquier punto de ambas", "Solo hay un punto en común."], ["En la mediatriz de los centros", "Está sobre la recta de los centros."], ["Siempre en el punto medio de los centros", "Solo si los radios son iguales."]],
      "Los radios en el punto de tangencia son colineales: ambos son perpendiculares a la tangente común.",
    ),
  ],
};
