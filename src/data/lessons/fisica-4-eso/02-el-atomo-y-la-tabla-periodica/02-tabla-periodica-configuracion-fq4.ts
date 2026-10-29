import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tablaPeriodicaConfiguracionFq4Lesson: InteractiveLesson = {
  slug: "tabla-periodica-configuracion-fq4",
  title: "2. Tabla periódica y configuración electrónica",
  subtitle: FQ4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "La tabla según la configuración", [
      { kind: "steps", items: [
        "Los elementos se ordenan por **número atómico creciente** y la forma de la tabla refleja la **configuración electrónica**.",
        "El **periodo** (fila) coincide con el **nivel más externo** ocupado (n).",
        "El **grupo** (columna) reúne elementos con la **misma configuración externa**, y por tanto propiedades químicas parecidas.",
        "Los **bloques** indican el subnivel que se llena: **s** (grupos 1–2), **p** (13–18), **d** (3–12, **metales de transición**), **f** (tierras raras).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Los 36 primeros elementos", [
      { kind: "text", text: "Elige un elemento: mira su periodo, grupo, bloque, configuración y el ion más probable." },
    ], tool("fq4-tabla-bloques-explorador"), "visual-top"),
    slide("grupos", "Grupos importantes", [
      { kind: "steps", items: [
        "**Alcalinos** (grupo 1, ns¹): metales muy reactivos que forman **catión 1+**.",
        "**Alcalinotérreos** (grupo 2, ns²): forman **catión 2+**.",
        "**Halógenos** (grupo 17, ns² np⁵): forman **anión 1−**; muy reactivos.",
        "**Gases nobles** (grupo 18, ns² np⁶): capa llena, muy poco reactivos.",
        "Los **iones** de los metales de transición pierden primero los electrones del **4s**: Fe²⁺ = [Ar] 3d⁶.",
      ] },
    ]),
    calc("calc-per", "Periodo", "Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁴. ¿En qué periodo está?", nums(3), "El nivel más externo es el 3: periodo 3.", "Mira el mayor valor de n."),
    calc("calc-gru", "Grupo", "En el bloque p, el grupo de un elemento es 10 + su número de electrones de valencia. El elemento 1s² 2s² 2p⁶ 3s² 3p⁴ tiene 6 electrones de valencia: ¿en qué grupo está?", nums(16), "10 + 6 = 16 (es el azufre, de la familia del oxígeno).", "Suma 10 a sus electrones de valencia."),
    calc("calc-e", "Electrones del ion", "El ion Ca²⁺ proviene de Ca (Z = 20). ¿Cuántos electrones tiene?", nums(18), "20 − 2 = 18.", "Cada carga + es un electrón perdido."),
    calc("calc-val", "Valencia", "¿Cuántos electrones de valencia tiene un halógeno?", nums(7), "ns² np⁵ = 7.", "Piensa en la configuración externa."),
    sort("clasifica", "Bloque", "Clasifica cada elemento según su bloque.",
      [["s", "Bloque s", "rose"], ["p", "Bloque p", "emerald"], ["d", "Bloque d", "amber"]],
      [["Na", "s"], ["Ca", "s"], ["Cl", "p"], ["Al", "p"], ["Fe", "d"], ["Cu", "d"]],
      "Depende del subnivel que se llena.",
    ),
    pick("check", "Mismo grupo", "¿Por qué los elementos de un mismo grupo tienen propiedades químicas parecidas?",
      "Porque tienen la misma configuración electrónica externa",
      [["Porque tienen el mismo número de protones", "Cada elemento tiene un Z distinto."], ["Porque están en el mismo periodo", "Eso es una fila."], ["Porque tienen la misma masa", "No es la causa."]],
      "La química depende de los electrones de valencia.",
    ),
  ],
};
