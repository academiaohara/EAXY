import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const condiciones2esoLesson: InteractiveLesson = {
  slug: "condiciones-2eso",
  title: "4. Estructuras condicionales",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Decidir según una condición", [
      { kind: "definition", text: "Una **estructura condicional** ejecuta unas instrucciones u otras según se cumpla o no una **condición** (una expresión que da verdadero o falso)." },
      { kind: "steps", items: [
        "**si … entonces**: se ejecuta un bloque solo si la condición es verdadera.",
        "**si … si no**: elige entre **dos caminos**.",
        "**Condiciones anidadas**: un si dentro de otro, para más de dos casos (por ejemplo, insuficiente, aprobado, notable, sobresaliente).",
        "Se pueden combinar condiciones con **y**, **o**, **no**.",
      ] },
    ], undefined, "stack"),
    slide("clima", "Condiciones en acción", [
      { kind: "text", text: "Cambia las condiciones y mira qué rama se ejecuta." },
    ], tool("condiciones-explorador"), "visual-top"),
    slide("traza", "Sigue un si … si no", [
      { kind: "text", text: "Ejecuta el programa con distintas notas y observa qué líneas se saltan." },
    ], tool("eso2-traza-explorador", { n: 1, a: 4 }), "visual-top"),
    calc("calc-cond", "Cuántos mensajes", "El programa es «si nota ≥ 5 muestra Aprobado, si no muestra Suspenso». Con nota = 7, ¿cuántos mensajes se escriben en pantalla?", nums(1), "7 ≥ 5 es verdadero: se muestra «Aprobado» y se salta el si no. Solo se escribe 1 mensaje.", "Evalúa la condición con nota = 7."),
    sort("clasifica-cond", "¿Qué camino se ejecuta?", "Con temperatura = 30 y lluvia = falso, decide.",
      [["si", "Se ejecuta", "emerald"], ["no", "No se ejecuta", "rose"]],
      [["si temperatura > 25 → ponerse camiseta", "si"], ["si lluvia = falso → ir a la playa", "si"], ["si temperatura < 10 → ponerse abrigo", "no"], ["si lluvia → coger paraguas", "no"], ["si temperatura > 25 y no lluvia → ir a la piscina", "si"], ["si temperatura < 10 o lluvia → quedarse en casa", "no"]],
      "Cada condición se evalúa con los valores actuales; con y deben cumplirse las dos, con o basta con una.",
    ),
    pick("check-anidada", "Varias ramas", "Para mostrar «Suspenso», «Aprobado», «Notable» o «Sobresaliente» según la nota, ¿qué estructura conviene?",
      "Condicionales encadenados o anidados con varias comparaciones",
      [["Un solo si sin si no", "Solo permite decidir entre hacer algo o no."], ["Un bucle mientras", "No sirve para elegir entre casos."], ["Ninguna: no se puede hacer", "Se resuelve fácilmente con condicionales."]],
      "Encadenando condiciones se cubren todos los intervalos de la nota.",
    ),
  ],
};
