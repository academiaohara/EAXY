import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const algoritmosConceptoLesson: InteractiveLesson = {
  slug: "algoritmos-concepto",
  title: "1. Algoritmos",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Resolver problemas paso a paso", [
      { kind: "definition", text: "El **pensamiento computacional** es una forma de resolver problemas dividiéndolos en partes y encontrando una secuencia de pasos que cualquiera (persona o máquina) pueda seguir. Esa secuencia se llama **algoritmo**." },
      { kind: "steps", items: [
        "**Descomponer** el problema en partes pequeñas.",
        "**Buscar patrones**: ¿hay pasos que se repiten?",
        "**Abstraer**: quedarse con lo importante.",
        "**Diseñar el algoritmo** y comprobar que funciona.",
      ] },
    ], undefined, "stack"),
    slide("receta", "Un algoritmo cotidiano", [
      { kind: "text", text: "Una receta, las instrucciones de montaje de un mueble o el recorrido para llegar al instituto son algoritmos. Estas son sus tres características." },
    ], anim("algoritmo-receta"), "split"),
    slide("explora", "Ordena los pasos", [
      { kind: "text", text: "Los pasos están desordenados. Ponlos en el orden correcto con las flechas y comprueba el resultado." },
    ], tool("algoritmo-ordena-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-alg", "¿Es un algoritmo?", "Decide si cada texto describe un algoritmo bien definido.",
      [["si", "Es un algoritmo", "emerald"], ["no", "No lo es", "rose"]],
      [["1. Abrir la puerta. 2. Entrar. 3. Cerrar la puerta.", "si"], ["Receta con cantidades exactas y pasos numerados", "si"], ["«Echa sal un poco y cocínalo un rato»", "no"], ["«Haz lo que quieras con la masa»", "no"], ["Pasos para sumar dos números en columna", "si"], ["Una lista de pasos que se repite sin parar y nunca acaba", "no"]],
      "Un algoritmo debe estar ordenado, ser preciso (sin ambigüedades) y terminar.",
    ),
    pick("check-prop", "Propiedad que falta", "Un algoritmo dice: «Echa un poco de sal y espera un rato». ¿Qué propiedad incumple?",
      "Ser preciso: «un poco» y «un rato» no se entienden igual para todos",
      [["Ser finito: no termina nunca", "Termina; el problema es que sus pasos son ambiguos."], ["Ser ordenado", "El orden no es el problema aquí."], ["Ninguna, es un buen algoritmo", "Las expresiones vagas impiden que cualquiera lo ejecute igual."]],
      "Un algoritmo debe poder ejecutarse sin dudas: se indican cantidades y tiempos concretos.",
    ),
    pick("check-orden", "El orden importa", "En el algoritmo «lavarse las manos» se intercambian los pasos «echar jabón» y «mojarse las manos». ¿Qué ocurre?",
      "El jabón no se disuelve igual y el resultado no es el esperado; el algoritmo ya no funciona del mismo modo",
      [["Nada, da exactamente igual", "El orden de los pasos cambia el resultado."], ["Se vuelve más rápido", "La rapidez no es el criterio; es que el resultado cambia."], ["El algoritmo deja de ser algoritmo para siempre", "Sigue siendo una lista de pasos, pero distinta y probablemente incorrecta."]],
      "Cambiar el orden de los pasos cambia el resultado del algoritmo.",
    ),
  ],
};
