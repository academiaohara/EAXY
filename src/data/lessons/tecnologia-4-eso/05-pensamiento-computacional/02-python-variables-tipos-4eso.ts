import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pythonVariablesTipos4esoLesson: InteractiveLesson = {
  slug: "python-variables-tipos-4eso",
  title: "2. Programar en Python: variables, tipos y operaciones",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "De los bloques al texto", [
      { kind: "steps", items: [
        "**Python** es un lenguaje **textual** muy usado en ciencia, robótica e inteligencia artificial.",
        "Una **variable** es un nombre para un valor guardado: `velocidad = 12.5`.",
        "Tipos básicos: **int** (entero), **float** (decimal), **str** (texto) y **bool** (verdadero/falso).",
        "La **sangría** (espacios al inicio) indica qué líneas pertenecen a un bloque.",
        "`print()` muestra resultados; `input()` pide datos al usuario.",
      ] },
    ], undefined, "stack"),
    slide("traza", "Ejecuta paso a paso", [
      { kind: "text", text: "Pulsa «Ejecutar paso a paso» y observa cómo cambian las variables línea a línea." },
    ], tool("python-traza-explorador", { n: 0 }), "visual-top"),
    slide("tipos", "Tipos de datos", [
      { kind: "text", text: "Mezclar tipos produce errores. Prueba a cambiar la última línea y lee el mensaje." },
    ], tool("python-traza-explorador", { n: 7 }), "visual-top"),
    slide("ops", "Operadores", [
      { kind: "steps", items: [
        "Aritméticos: `+ - * / ** // %` (`//` es división entera y `%` el resto).",
        "Comparación: `== != < > <= >=` (dan True o False).",
        "Lógicos: `and`, `or`, `not`.",
        "`=` **asigna** y `==` **compara**: es el error más frecuente al empezar.",
      ] },
    ]),
    calc("calc-div", "División entera", "En Python, ¿cuánto vale 17 // 5?", nums(3), "17 entre 5 da 3 y sobran 2; // devuelve el cociente entero.", "Cociente sin decimales."),
    calc("calc-mod", "Resto", "¿Y cuánto vale 17 % 5?", nums(2), "El resto de dividir 17 entre 5 es 2.", "El operador % da el resto."),
    calc("calc-pot", "Potencia", "En Python, ¿cuánto vale 2 ** 5?", nums(32), "2 elevado a 5 es 32.", "** es la potencia."),
    sort("clasifica-tipo", "¿Qué tipo es?", "Clasifica cada valor según su tipo en Python.",
      [["int", "int (entero)", "cobalt"], ["flo", "float (decimal)", "amber"], ["str", "str (texto)", "emerald"], ["boo", "bool", "rose"]],
      [["42", "int"], ["-7", "int"], ["3.14", "flo"], ["0.5", "flo"], ["\"hola\"", "str"], ["\"25\"", "str"], ["True", "boo"], ["5 > 3", "boo"]],
      "Las comillas hacen que un valor sea texto aunque parezca un número.",
    ),
    pick("check-igual", "Asignar o comparar", "En Python, ¿qué hace la línea `x == 5`?",
      "Compara x con 5 y da True o False",
      [["Asigna 5 a x", "Eso lo hace un solo =."], ["Suma 5 a x", "No suma."], ["Da error siempre", "Es válida."]],
      "= asigna, == compara.",
    ),
  ],
};
