import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elementosTiposEstructurasTi2Lesson: InteractiveLesson = {
  slug: "elementos-tipos-estructuras-ti2",
  title: "1. Elementos y tipos de estructuras",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es una estructura", [
      { kind: "steps", items: [
        "Una **estructura** es un conjunto de elementos que soporta cargas y las transmite al terreno **sin deformarse en exceso ni romper**.",
        "Debe cumplir tres condiciones: **resistencia** (no romper), **rigidez** (no deformarse demasiado) y **estabilidad** (no volcar ni pandear).",
        "El análisis estructural calcula **reacciones**, **esfuerzos internos** y **deformaciones** para comprobar cada condición.",
      ] },
    ], undefined, "stack"),
    slide("elem", "Elementos estructurales", [
      { kind: "steps", items: [
        "**Vigas**: horizontales, trabajan sobre todo a **flexión**.",
        "**Pilares y columnas**: verticales, trabajan a **compresión** (y pueden pandear).",
        "**Tirantes y cables**: trabajan a **tracción**.",
        "**Cerchas o armaduras**: barras articuladas formando triángulos; cada barra trabaja solo a tracción o compresión.",
        "**Arcos y bóvedas**: transforman las cargas en compresión.",
        "**Cimentaciones**: zapatas, losas y pilotes que reparten la carga en el terreno.",
      ] },
    ]),
    slide("tipos", "Tipos de estructuras", [
      { kind: "compare",
        left: { title: "Por su forma", text: "**Entramadas** (pilares y vigas), **trianguladas** (cerchas), **colgantes** (cables y tirantes), **laminares** (cúpulas, láminas, tiendas), **masivas** (presas, muros).", tone: "info" },
        right: { title: "Por su comportamiento", text: "**Isostáticas**: las reacciones se calculan con las ecuaciones de equilibrio. **Hiperestáticas**: tienen apoyos o barras de más y exigen añadir condiciones de deformación.", tone: "key" } },
    ]),
    slide("viga", "Comparar soluciones", [
      { kind: "text", text: "Una viga se puede hacer con distintos materiales. Compara la carga que aguanta y lo que pesa." },
    ], tool("eso3-simulacion-viga-explorador"), "visual-top"),
    calc("calc-grado", "Triangulación", "Una cercha plana isostática tiene 2·n − 3 barras para n nudos. ¿Cuántas barras tiene si n = 7?", nums(11), "2·7 − 3 = 11 barras.", "Aplica 2n − 3."),
    calc("calc-pilar", "Reparto", "Cuatro pilares iguales soportan por igual una carga de 800 kN. ¿Cuántos kN lleva cada uno?", nums(200), "800 / 4 = 200 kN.", "Reparte entre cuatro."),
    sort("clasifica-elem", "¿Cómo trabaja?", "Relaciona cada elemento con el esfuerzo principal.",
      [["fle", "Flexión", "cobalt"], ["com", "Compresión", "amber"], ["tra", "Tracción", "emerald"]],
      [["Viga de un forjado", "fle"], ["Dintel de una puerta", "fle"], ["Pilar de un edificio", "com"], ["Arco de un puente de piedra", "com"], ["Cable de un puente colgante", "tra"], ["Tirante de un tejado", "tra"]],
      "Cada elemento está pensado para soportar un esfuerzo dominante.",
    ),
    pick("check-iso", "Isostática", "¿Qué caracteriza a una estructura isostática?",
      "Que sus reacciones se pueden calcular solo con las ecuaciones de equilibrio estático",
      [["Que no se deforma", "Todas se deforman algo."], ["Que tiene muchos apoyos de más", "Eso es hiperestática."], ["Que es de acero", "No depende del material."]],
      "Hay tantas incógnitas como ecuaciones.",
    ),
  ],
};
