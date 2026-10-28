import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tablaPeriodicaPropiedadesFq3Lesson: InteractiveLesson = {
  slug: "tabla-periodica-propiedades-fq3",
  title: "5. Tabla periódica y propiedades periódicas",
  subtitle: FQ3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo se organiza", [
      { kind: "steps", items: [
        "La **tabla periódica** ordena los elementos por **número atómico creciente** en **18 grupos** (columnas) y **7 periodos** (filas).",
        "El **periodo** indica el **número de capas** con electrones. El **grupo** agrupa elementos con el **mismo número de electrones de valencia**, de ahí que se parezcan.",
        "Grupos importantes: **1 alcalinos**, **2 alcalinotérreos**, **17 halógenos**, **18 gases nobles**.",
        "Según sus propiedades: **metales**, **no metales** y **metaloides** (semimetales).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tendencias periódicas", [
      { kind: "text", text: "Compara el radio atómico y la electronegatividad a lo largo de un periodo y de un grupo." },
    ], tool("fq3-propiedades-periodicas-explorador"), "visual-top"),
    slide("tablaviva", "La tabla de los primeros elementos", [
      { kind: "text", text: "Recuerda la tabla con el explorador de la unidad anterior: elige un Z y localiza su grupo y periodo." },
    ], tool("fq2-tabla-periodica-explorador"), "visual-top"),
    slide("prop", "Metales y no metales", [
      { kind: "steps", items: [
        "**Metales**: brillo, buenos **conductores** del calor y la electricidad, **dúctiles** y **maleables**, tienden a formar **cationes**.",
        "**No metales**: malos conductores, quebradizos en estado sólido, tienden a formar **aniones** o a **compartir** electrones.",
        "**Gases nobles**: monoatómicos y poco reactivos.",
        "En un **periodo**, de izquierda a derecha se pasa de **metal** a **no metal**.",
      ] },
    ]),
    calc("calc-per", "Periodo", "Un átomo tiene la distribución 2 – 8 – 3. ¿En qué periodo está?", nums(3), "Tiene 3 capas con electrones: periodo 3.", "Cuenta las capas ocupadas."),
    calc("calc-gru", "Grupo", "El mismo átomo (2 – 8 – 3) pertenece al grupo 13. ¿Cuántos electrones de valencia tiene?", nums(3), "Los del último nivel: 3.", "Mira el último número."),
    sort("clasifica", "Propiedad", "Clasifica cada propiedad como de metal o de no metal.",
      [["me", "Metal", "amber"], ["nm", "No metal", "cobalt"]],
      [["Conduce bien la electricidad", "me"], ["Es dúctil y maleable", "me"], ["Tiende a formar cationes", "me"], ["Suele ser mal conductor", "nm"], ["Quebradizo en estado sólido", "nm"], ["Tiende a formar aniones", "nm"]],
      "Propiedades típicas de cada tipo de elemento.",
    ),
    pick("check", "Radio atómico", "¿Cómo varía el radio atómico al bajar por un grupo?",
      "Aumenta, porque hay más capas",
      [["Disminuye, porque hay más protones", "Pesa más el aumento de capas."], ["No varía", "Varía de forma regular."], ["Primero aumenta y luego disminuye", "Aumenta siempre."]],
      "Más capas, mayor tamaño.",
    ),
    pick("check2", "Electronegatividad", "¿Cuál es el elemento más electronegativo?",
      "El flúor",
      [["El sodio", "El sodio tiene baja electronegatividad."], ["El helio", "Los gases nobles no se consideran."], ["El litio", "Es un metal poco electronegativo."]],
      "Esquina superior derecha de la tabla (sin contar los gases nobles).",
    ),
  ],
};
