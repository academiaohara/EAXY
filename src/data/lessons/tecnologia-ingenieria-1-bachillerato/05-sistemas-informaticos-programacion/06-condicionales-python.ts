import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const condicionalesPythonLesson: InteractiveLesson = {
  slug: "condicionales-python",
  title: "6. Condiciones y estructuras de decisión",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("comparar", "Operadores de comparación y lógicos", [
      { kind: "facts", items: [
        { tex: "==\\ \\ !=", label: "igual, distinto" },
        { tex: "<\\ \\ >\\ \\ <=\\ \\ >=", label: "menor, mayor, menor o igual, mayor o igual" },
        { tex: "\\texttt{and}\\ \\ \\texttt{or}\\ \\ \\texttt{not}", label: "operadores lógicos" },
      ] },
      { kind: "text", text: "Una comparación da un valor **lógico** (`True` o `False`). `and` exige que ambas sean ciertas, `or` que lo sea al menos una y `not` invierte el valor." },
      { kind: "example", title: "Con x = 5", lines: [
        { math: "x > 3\\ \\text{ and }\\ x < 4\\ \\to\\ \\text{False}" },
        { math: "x > 3\\ \\text{ or }\\ x < 4\\ \\to\\ \\text{True}" },
        { math: "1 < x < 10\\ \\to\\ \\text{True}", note: "Python permite encadenar" },
      ] },
    ], undefined, "stack"),
    slide("if", "if, elif y else", [
      { kind: "text", text: "El condicional elige **qué bloque** se ejecuta. Cambia la nota y observa qué líneas se ejecutan y cuáles se saltan. Solo se ejecuta **una** rama: la primera cuya condición sea verdadera." },
    ], tool("python-traza-explorador", { n: 1 }), "visual-top"),
    slide("orden", "El orden de las condiciones importa", [
      { kind: "compare",
        left: { title: "Orden correcto", text: "`if nota >= 9` → `elif nota >= 5` → `else`. Cada rama excluye las anteriores.", tone: "ok" },
        right: { title: "Orden erróneo", text: "`if nota >= 5` primero: un 9,5 entra ahí y nunca llega a `>= 9`.", tone: "warn" } },
      { kind: "warning", title: "Casos límite", text: "Comprueba siempre los valores frontera: ¿qué pasa con exactamente 5? ¿Y con 0 o con 10? Casi todos los errores de las decisiones están en `<` frente a `<=`." },
    ]),
    slide("anidadas", "Decisiones anidadas y validación", [
      { kind: "text", text: "Un `if` puede contener otro. Se usa para **validar** datos antes de procesarlos:" },
      { kind: "example", title: "Validar una nota", lines: [
        { math: "\\texttt{if nota < 0 or nota > 10:}" },
        { math: "\\texttt{\\ \\ \\ \\ print(\"Nota no válida\")}" },
        { math: "\\texttt{else:}" },
        { math: "\\texttt{\\ \\ \\ \\ print(\"Nota correcta\")}" },
      ] },
      { kind: "text", text: "Es mejor rechazar un dato inválido pronto que dejar que contamine el resto del programa." },
    ]),
    calc("calc-rama", "¿Qué rama se ejecuta?", "En el programa `nota = 5` / `if nota >= 9: r = 1` / `elif nota >= 5: r = 2` / `else: r = 3`, ¿cuánto vale `r` al final?",
      nums(2), "5 no cumple `nota >= 9` pero sí `nota >= 5`: se ejecuta la segunda rama y r = 2.", "La primera condición verdadera gana."),
    sort("clasifica-logica", "True o False", "Con x = 5 e y = 8, clasifica cada expresión.",
      [["t", "True", "emerald"], ["f", "False", "amber"]],
      [["x < y", "t"], ["x == 5 and y == 8", "t"], ["x > y or x == 5", "t"], ["not (x > y)", "t"], ["x == y", "f"], ["x > 5 and y > 5", "f"], ["x != 5 or y < 8", "f"]],
      "Evalúa cada comparación por separado y combínalas: `and` necesita las dos, `or` basta con una.",
    ),
    pick("check-elif", "elif frente a varios if", "¿Qué diferencia hay entre `if a: … elif b: …` y `if a: … if b: …` cuando a y b son ambas verdaderas?",
      "Con elif solo se ejecuta la primera rama; con dos if se ejecutan las dos",
      [["Ninguna: siempre se ejecutan las dos", "elif solo se evalúa si el if anterior ha sido falso."], ["Con elif se ejecutan las dos y con dos if solo una", "Es al revés."], ["Con elif se produce un error de sintaxis", "elif es válido tras un if."]],
      "elif encadena opciones excluyentes; dos if independientes se evalúan cada uno por su cuenta.",
    ),
    pick("check-limite", "Un caso límite", "Quieres clasificar como «mayor de edad» a quien tenga 18 años o más. ¿Qué condición es correcta?",
      "edad >= 18",
      [["edad > 18", "Excluiría a quien tiene exactamente 18 años."], ["edad == 18", "Solo valdría para quien tiene 18 justos."], ["edad < 18", "Es la condición contraria."]],
      "«18 o más» se escribe con `>=`: el valor frontera pertenece al grupo.",
    ),
  ],
};
