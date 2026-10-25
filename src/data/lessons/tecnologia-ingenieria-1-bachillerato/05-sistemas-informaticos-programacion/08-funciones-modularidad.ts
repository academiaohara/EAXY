import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const funcionesModularidadLesson: InteractiveLesson = {
  slug: "funciones-modularidad",
  title: "8. Funciones, procedimientos y modularidad",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Por qué funciones", [
      { kind: "definition", text: "Una **función** es un bloque de código con nombre que recibe unos **parámetros**, hace una tarea y puede **devolver** un valor. Se escribe una vez y se usa muchas." },
      { kind: "steps", title: "Ventajas", items: [
        "**Reutilización**: no se repite el mismo código en varios sitios.",
        "**Legibilidad**: el nombre explica la intención (`area_rectangulo`).",
        "**Mantenimiento**: un cambio se hace en un único lugar.",
        "**Pruebas**: cada función se puede probar por separado.",
      ] },
    ], undefined, "stack"),
    slide("sintaxis", "Definir y llamar", [
      { kind: "example", title: "Definición y llamada", lines: [
        { math: "\\texttt{def area\\_rectangulo(base, altura):}" },
        { math: "\\texttt{\\ \\ \\ \\ area = base * altura}" },
        { math: "\\texttt{\\ \\ \\ \\ return area}" },
        { math: "\\texttt{a = area\\_rectangulo(4, 3)}", note: "a vale 12" },
      ] },
      { kind: "text", text: "**Parámetros** son los nombres que aparecen en la definición (`base`, `altura`); **argumentos** son los valores concretos al llamar (4 y 3). Ejecuta paso a paso y mira cómo la tabla de variables cambia de marco." },
    ], tool("python-traza-explorador", { n: 4 }), "visual-top"),
    slide("return", "return frente a print", [
      { kind: "compare",
        left: { title: "return", text: "**Devuelve** un valor al que llamó a la función, que puede guardarlo o usarlo en otra operación.", tone: "ok" },
        right: { title: "print", text: "Solo **muestra** un texto en pantalla. La función devuelve `None` si no hay return: no se puede usar el resultado.", tone: "warn" } },
      { kind: "warning", title: "Error típico", text: "Escribir `print(area)` dentro de la función y luego `total = area_rectangulo(2, 3) + 1` da un error: la función devuelve `None`." },
    ]),
    slide("ambito", "Ámbito de las variables", [
      { kind: "text", text: "Las variables creadas **dentro** de una función son **locales**: existen solo mientras se ejecuta la función. Desde fuera no se pueden usar." },
      { kind: "example", title: "Variable local", lines: [
        { math: "\\texttt{def f():}" },
        { math: "\\texttt{\\ \\ \\ \\ y = 1}" },
        { math: "\\texttt{f()}" },
        { math: "\\texttt{print(y)}", note: "NameError: y no existe fuera de f" },
      ] },
    ]),
    slide("modular", "Descomponer un programa", [
      { kind: "steps", title: "De un programa largo a funciones pequeñas", items: [
        "Escribe en frases **qué hace** el programa.",
        "Cada frase que suene a «tarea» puede ser una función (`leer_notas`, `calcular_media`, `clasificar`).",
        "Haz que cada función haga **una sola cosa** y tenga un nombre claro.",
        "Un programa principal corto las llama en orden.",
      ] },
      { kind: "text", text: "Una función de 50 líneas casi siempre esconde tres o cuatro funciones de 10." },
    ]),
    calc("calc-fun", "Predecir un programa", "¿Qué muestra este programa? `def area(b, h):` / `    return b * h` / `print(area(4, 3) + area(2, 5))`",
      nums(22), "area(4, 3) = 12 y area(2, 5) = 10; la suma es 22.", "Evalúa cada llamada y suma."),
    sort("clasifica-param", "Parámetro o argumento", "Clasifica cada elemento de `def f(x, y): …` y `f(3, 7)`.",
      [["par", "Parámetro", "cobalt"], ["arg", "Argumento", "amber"]],
      [["x", "par"], ["y", "par"], ["3", "arg"], ["7", "arg"]],
      "Los parámetros son los nombres de la definición; los argumentos son los valores que se pasan al llamar.",
    ),
    pick("check-ret", "¿Return o print?", "Necesitas calcular el área y usarla después en otro cálculo. ¿Qué debe hacer la función?",
      "Devolver el valor con return",
      [["Mostrarlo con print dentro de la función", "print lo muestra, pero no lo devuelve: no se puede usar después."], ["Guardarlo en una variable local sin devolver nada", "Las variables locales desaparecen al terminar la función."], ["Pedirlo con input", "input lee datos, no devuelve un resultado calculado."]],
      "Para reutilizar un resultado hay que devolverlo con `return`; `print` es solo para mostrar.",
    ),
  ],
};
