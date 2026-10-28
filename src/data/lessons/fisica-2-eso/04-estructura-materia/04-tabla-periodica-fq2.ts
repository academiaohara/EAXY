import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tablaPeriodicaFq2Lesson: InteractiveLesson = {
  slug: "tabla-periodica-fq2",
  title: "4. La tabla periódica",
  subtitle: FQ2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un mapa de los elementos", [
      { kind: "steps", items: [
        "La **tabla periódica** ordena los elementos químicos por **número atómico creciente**.",
        "Las **filas** son los **periodos** (1 a 7); las **columnas**, los **grupos** (1 a 18).",
        "Cada elemento tiene un **símbolo** de una o dos letras (H, He, Na, Cl…) y un nombre.",
        "Mendeléyev (1869) la propuso ordenando por masa y dejó **huecos** para elementos aún por descubrir.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Los primeros 20 elementos", [
      { kind: "text", text: "Cambia el número atómico y mira su posición, su tipo y cómo se reparten sus electrones." },
    ], tool("fq2-tabla-periodica-explorador"), "visual-top"),
    slide("props", "Lo que dice la posición", [
      { kind: "steps", items: [
        "El **periodo** es el número de **capas** que tienen electrones.",
        "El **grupo** indica los **electrones de la última capa** (en los grupos 1, 2 y 13–18, el último dígito).",
        "Los elementos de un mismo grupo tienen **propiedades químicas parecidas** (los alcalinos del grupo 1 reaccionan con el agua).",
        "Se clasifican en **metales**, **no metales**, **metaloides** y **gases nobles** (grupo 18, muy poco reactivos).",
      ] },
    ]),
    calc("calc-per", "Periodo", "El sodio (Z = 11) tiene sus electrones en tres capas (2, 8, 1). ¿En qué periodo está?", nums(3), "Tiene tres capas con electrones: periodo 3.", "El periodo es el número de capas."),
    calc("calc-val", "Electrones de valencia", "El cloro (Z = 17) tiene 2, 8, 7 electrones por capas. ¿Cuántos electrones tiene en la última capa?", nums(7), "La última capa tiene 7.", "Es el último número."),
    calc("calc-gn", "Electrones del neón", "El neón (Z = 10) es un gas noble: tiene 2 y 8 electrones. ¿Cuántos tiene la última capa?", nums(8), "8: la capa está completa, por eso es poco reactivo.", "El último número es 8."),
    sort("clasifica", "Tipo de elemento", "Clasifica cada elemento.",
      [["met", "Metal", "cobalt"], ["nom", "No metal", "amber"], ["gn", "Gas noble", "emerald"]],
      [["Sodio", "met"], ["Calcio", "met"], ["Aluminio", "met"], ["Oxígeno", "nom"], ["Carbono", "nom"], ["Azufre", "nom"], ["Neón", "gn"], ["Argón", "gn"]],
      "Los metales conducen y son brillantes; los gases nobles tienen la última capa completa.",
    ),
    pick("check", "Mismo grupo", "¿Por qué los elementos de un mismo grupo tienen propiedades parecidas?",
      "Porque tienen el mismo número de electrones en la última capa",
      [["Porque tienen el mismo número de protones", "Los protones aumentan en un grupo."], ["Porque tienen la misma masa", "La masa varía."], ["Porque están en el mismo periodo", "Un grupo es una columna, no una fila."]],
      "Los electrones de la última capa son los que intervienen en las reacciones.",
    ),
  ],
};
