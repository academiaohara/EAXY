import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const organizacionTablaPeriodicaFb1Lesson: InteractiveLesson = {
  slug: "organizacion-tabla-periodica-fb1",
  title: "1. Organización de la tabla periódica",
  subtitle: FB1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("hist", "De Mendeléyev a la tabla actual", [
      { kind: "steps", items: [
        "**Mendeléyev** (1869) ordenó los elementos por **masa atómica** y por sus propiedades, y **dejó huecos** para elementos aún no descubiertos (eka-aluminio = galio, eka-silicio = germanio).",
        "**Moseley** (1913) mostró que lo que ordena es el **número atómico Z**, no la masa. Por eso la tabla actual sigue el orden **creciente de Z**.",
        "La **ley periódica**: las propiedades de los elementos son función periódica de su número atómico.",
        "Hoy hay **118 elementos** en **7 periodos** y **18 grupos**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "La tabla y la configuración", [
      { kind: "text", text: "Pulsa distintos elementos. ¿Qué tienen en común los de una misma columna?" },
    ], tool("fb1-tabla-bloques-explorador"), "visual-top"),
    slide("estruc", "Periodos, grupos y bloques", [
      { kind: "steps", items: [
        "**Periodo** (fila): coincide con el **nivel n más externo** ocupado. El periodo 1 tiene 2 elementos; el 2 y el 3, 8; el 4 y el 5, 18.",
        "**Grupo** (columna): elementos con **igual configuración electrónica de la capa de valencia**; de ahí sus propiedades parecidas.",
        "**Bloques**: **s** (grupos 1 y 2), **p** (13 a 18), **d** (3 a 12, **metales de transición**) y **f** (lantánidos y actínidos).",
        "Alcalinos ns¹; alcalinotérreos ns²; térreos ns² np¹; carbonoideos ns² np²; nitrogenoideos ns² np³; anfígenos ns² np⁴; **halógenos** ns² np⁵; **gases nobles** ns² np⁶.",
      ] },
    ], undefined, "stack"),
    slide("posicion", "Cómo deducir la posición", [
      { kind: "steps", items: [
        "**Periodo** = valor máximo de n en la configuración.",
        "**Grupo** (bloque s): nº de electrones de ns. **Bloque p**: **12 + nº de electrones de np**. **Bloque d**: **ns + (n−1)d**.",
        "Ejemplo: Fe (1s² … 4s² 3d⁶) → periodo 4, bloque d, grupo 2 + 6 = **8**. Cl (… 3s² 3p⁵) → periodo 3, grupo 12 + 5 = **17**.",
        "También se clasifican en **metales** (izquierda y centro), **no metales** (arriba a la derecha) y **semimetales** o metaloides (B, Si, Ge, As, Sb, Te).",
      ] },
    ], undefined, "stack"),
    calc("calc-periodo", "Periodo", "Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁴. ¿En qué periodo está?", nums(3), "El nivel más externo es n = 3.", "Periodo = n máximo."),
    calc("calc-grupo", "Grupo", "Un elemento termina en 3s² 3p⁴. ¿En qué grupo está? (12 + electrones p)", nums(16), "12 + 4 = 16: anfígenos.", "Bloque p: 12 + e⁻ en p."),
    calc("calc-d", "Metal de transición", "Un elemento termina en 4s² 3d⁷. ¿En qué grupo está? (s + d)", nums(9), "2 + 7 = 9: grupo 9 (el cobalto).", "Bloque d: s + d."),
    calc("calc-z", "Número atómico", "El elemento del periodo 3 y grupo 17 es el cloro. ¿Cuál es su número atómico?", nums(17), "Z = 10 (Ne) + 7 = 17.", "Cuenta los electrones: 2 + 8 + 7."),
    sort("clasifica", "Familia", "Relaciona cada elemento con su familia.",
      [["alc", "Alcalinos (grupo 1)", "cobalt"], ["hal", "Halógenos (grupo 17)", "rose"], ["nob", "Gases nobles (grupo 18)", "emerald"]],
      [["Na", "alc"], ["K", "alc"], ["Cl", "hal"], ["Br", "hal"], ["Ne", "nob"], ["Ar", "nob"]],
      "Misma configuración externa: ns¹, ns² np⁵ y ns² np⁶.",
    ),
    pick("check", "Moseley", "¿Qué criterio ordena los elementos en la tabla periódica actual?",
      "El número atómico creciente",
      [["La masa atómica creciente", "Era el criterio de Mendeléyev."], ["El orden alfabético", "No es un criterio químico."], ["La densidad", "No es el criterio."]],
      "Moseley demostró que el orden es el del número atómico.",
    ),
  ],
};
