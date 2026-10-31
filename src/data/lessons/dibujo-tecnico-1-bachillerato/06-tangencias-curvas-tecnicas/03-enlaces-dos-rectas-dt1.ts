import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlacesDosRectasDt1Lesson: InteractiveLesson = {
  slug: "enlaces-dos-rectas-dt1",
  title: "3. Enlaces y problemas de tangencias",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Redondear una esquina", [
      { kind: "steps", items: [
        "Un **enlace** es un arco de circunferencia que **une dos líneas** (rectas o curvas) sin cambio brusco de dirección: **tangente** a ambas.",
        "Todos los problemas de tangencias se resuelven buscando el **centro** del arco como **intersección de lugares geométricos**.",
        "Centro a distancia $r$ de una recta ⇒ está en **dos paralelas** a ella.",
        "Centro a distancia $R \\pm r$ de otro centro ⇒ está en una **circunferencia concéntrica** de radio $R \\pm r$.",
        "Centro equidistante de **dos rectas** ⇒ está en su **bisectriz**.",
      ] },
    ], undefined, "stack"),
    slide("enlace", "Enlace entre dos rectas", [
      { kind: "text", text: "Cambia el ángulo entre las rectas y el radio del enlace. Observa dónde empieza el arco." },
    ], tool("dt1-enlace-explorador"), "visual-top"),
    slide("casos", "Casos típicos", [
      { kind: "steps", items: [
        "**Circunferencia de radio r tangente a dos rectas**: centro en la intersección de dos paralelas (a distancia r) o de la bisectriz.",
        "**Circunferencia de radio r tangente a una recta y a una circunferencia**: la paralela a la recta y la concéntrica de radio $R \\pm r$ se cortan en el centro.",
        "**Circunferencia tangente a una recta por un punto de ella**: el centro está en la **perpendicular** por ese punto.",
        "**Enlace de dos circunferencias con un arco de radio r**: el centro está en la intersección de las dos concéntricas de radios $R_1 \\pm r$ y $R_2 \\pm r$.",
      ] },
    ]),
    calc("calc-t90", "Esquina de 90°", "Se redondea una esquina de 90° con un enlace de radio 3 cm. ¿A qué distancia del vértice están los puntos de tangencia, en cm?", nums(3), "t = r / tan 45° = 3 / 1 = 3 cm.", "tan 45° = 1."),
    calc("calc-t60", "Esquina de 60°", "Una esquina de 60° con enlace de radio 3 cm: t = 3 / tan 30°. ¿Cuántos cm? (dos decimales)", nums(5.2, 5.196), "3 / 0,5774 ≈ 5,20 cm.", "tan 30° ≈ 0,5774."),
    calc("calc-d120", "Centro a 120°", "Una esquina de 120° con enlace de radio 3 cm. ¿A qué distancia del vértice está el centro del arco (d = r / sen 60°), en cm? (dos decimales)", nums(3.46, 3.464), "3 / 0,8660 ≈ 3,46 cm.", "sen 60° ≈ 0,866."),
    sort("clasifica-lugar", "¿Qué lugar geométrico?", "Asocia cada condición del centro con el lugar donde se encuentra.",
      [["par", "Dos paralelas", "cobalt"], ["con", "Circunferencia concéntrica", "amber"], ["bis", "Bisectriz", "emerald"], ["per", "Perpendicular", "rose"]],
      [["Está a 2 cm de una recta", "par"], ["Está a 2 cm de dos rectas a la vez (cada una)", "par"], ["Está a R + r de un centro dado", "con"], ["Está a R − r de un centro dado", "con"], ["Equidista de dos rectas que se cortan", "bis"], ["Es el centro de una circunferencia tangente a una recta en un punto dado", "per"]],
      "Cada condición de tangencia se traduce en un lugar geométrico.",
    ),
    pick("check-enlace", "Puntos de tangencia", "En el enlace entre dos rectas, ¿cómo se obtienen los puntos de tangencia con las rectas?",
      "Como los pies de las perpendiculares desde el centro a cada recta",
      [["Como los puntos medios de los lados", "No tiene relación."], ["Como la intersección de las bisectrices", "Eso es el incentro."], ["Midiendo el radio sobre la recta desde el vértice", "Solo coincide a 90°."]],
      "El radio es perpendicular a la tangente en el punto de tangencia.",
    ),
  ],
};
