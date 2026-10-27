import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const descomposicionAlgoritmos4esoLesson: InteractiveLesson = {
  slug: "descomposicion-algoritmos-4eso",
  title: "1. Descomposición de problemas y algoritmos",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Pensar como un ingeniero informático", [
      { kind: "steps", items: [
        "El **pensamiento computacional** es una forma de resolver problemas para que los pueda ejecutar una persona o una máquina.",
        "**Descomposición**: dividir un problema grande en partes pequeñas.",
        "**Abstracción**: quedarse con lo importante y olvidar los detalles.",
        "**Reconocimiento de patrones**: ver lo que se repite para reutilizarlo.",
        "**Algoritmo**: secuencia ordenada y finita de pasos que resuelve el problema.",
      ] },
    ], undefined, "stack"),
    slide("desc", "Divide el problema", [
      { kind: "text", text: "Elige un problema y marca los subproblemas que ya tengas resueltos." },
    ], tool("eso4-descomposicion-explorador"), "visual-top"),
    slide("flujo", "Del algoritmo al diagrama", [
      { kind: "text", text: "Un diagrama de flujo representa el algoritmo con símbolos: inicio, proceso, decisión y fin. Recórrelo con distintos datos." },
    ], tool("diagrama-flujo-explorador", { n: 1 }), "visual-top"),
    slide("props", "Un buen algoritmo", [
      { kind: "steps", items: [
        "**Preciso**: cada paso es claro y no ambiguo.",
        "**Finito**: termina siempre.",
        "**Definido**: con los mismos datos da el mismo resultado.",
        "**General**: sirve para cualquier dato del tipo previsto, no solo para un ejemplo.",
        "**Eficiente**: usa pocos pasos y poca memoria (lo veremos más adelante).",
      ] },
    ]),
    calc("calc-partes", "Cuántas partes", "Una estación meteorológica se divide en 5 subproblemas y cada uno lo resuelve una función. ¿Cuántas funciones, como mínimo, tendrá el programa?", nums(5), "Una función por subproblema: 5.", "Una función por cada parte."),
    calc("calc-pasos", "Pasos de un algoritmo", "Un algoritmo recorre una lista de 12 temperaturas y hace una comparación en cada una. ¿Cuántas comparaciones hace?", nums(12), "Una comparación por dato: 12.", "Una por cada elemento."),
    sort("clasifica-pc", "¿Qué técnica es?", "Relaciona cada situación con la técnica de pensamiento computacional.",
      [["des", "Descomposición", "cobalt"], ["abs", "Abstracción", "amber"], ["pat", "Patrones", "emerald"], ["alg", "Algoritmo", "rose"]],
      [["Dividir un robot en sensores, control y motores", "des"], ["Separar el proyecto en tareas", "des"], ["Dibujar un metro solo con líneas y paradas", "abs"], ["Ignorar el color al contar piezas", "abs"], ["Ver que cada salida repite el mismo cálculo", "pat"], ["Todos los bucles siguen el mismo esquema", "pat"], ["Receta con pasos ordenados", "alg"], ["Instrucciones para cambiar una rueda", "alg"]],
      "Cada técnica ayuda a resolver un problema de una manera distinta.",
    ),
    pick("check-alg", "No es un algoritmo", "¿Cuál de estas instrucciones NO es un buen paso de algoritmo?",
      "«Añade un poco de sal»: es ambiguo, no dice cuánta",
      [["«Si x > 10, escribe grande»", "Es preciso."], ["«Repite 5 veces»", "Es finito y claro."], ["«Suma a y b»", "Es definido."]],
      "Un paso ambiguo no lo puede ejecutar una máquina.",
    ),
  ],
};
