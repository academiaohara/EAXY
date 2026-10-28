import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const algoritmosDiagramas2esoLesson: InteractiveLesson = {
  slug: "algoritmos-diagramas-2eso",
  title: "1. Algoritmos, diagramas de flujo y pseudocódigo",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Resolver un problema paso a paso", [
      { kind: "definition", text: "Un **algoritmo** es una secuencia ordenada y finita de instrucciones que resuelve un problema. Se puede escribir en **lenguaje natural**, como **pseudocódigo** o como **diagrama de flujo** antes de pasarlo a un lenguaje de programación." },
      { kind: "steps", items: [
        "**Entradas**: los datos que necesita (por ejemplo, la nota).",
        "**Proceso**: las operaciones y decisiones (comparar, sumar, repetir).",
        "**Salidas**: el resultado (mostrar «Aprobado»).",
        "Un algoritmo debe ser **preciso**, **finito** y dar siempre el mismo resultado con los mismos datos.",
      ] },
    ], undefined, "stack"),
    slide("diagrama", "Símbolos del diagrama de flujo", [
      { kind: "text", text: "Cada forma tiene un significado fijo: inicio y fin, entrada o salida, proceso y decisión." },
    ], anim("diagrama-flujo-simbolos"), "text-top"),
    slide("traza", "Ejecuta un algoritmo a mano", [
      { kind: "text", text: "Ejecutar un algoritmo «en papel» se llama **traza**. Avanza paso a paso y mira cómo cambian las variables." },
    ], tool("eso2-traza-explorador", { n: 0 }), "visual-top"),
    calc("calc-suma", "Resultado de una traza", "Un programa hace suma ← 0 y luego suma ← suma + i para i de 1 a 5. ¿Qué valor tiene suma al final?", nums(15), "1 + 2 + 3 + 4 + 5 = 15.", "Ve sumando uno a uno."),
    sort("clasifica-simbolo", "¿Qué tipo de paso es?", "Clasifica cada instrucción como entrada/salida, proceso o decisión.",
      [["es", "Entrada o salida", "cobalt"], ["pro", "Proceso", "emerald"], ["dec", "Decisión", "amber"]],
      [["Leer la nota del alumno", "es"], ["Mostrar «Aprobado»", "es"], ["suma ← suma + 1", "pro"], ["área ← base · altura", "pro"], ["¿nota ≥ 5?", "dec"], ["¿quedan pasos por hacer?", "dec"]],
      "Las entradas y salidas comunican con el exterior; los procesos calculan; las decisiones bifurcan el camino.",
    ),
    pick("check-algoritmo", "Un buen algoritmo", "¿Cuál de estas es una característica de un algoritmo correcto?",
      "Es finito y preciso: acaba y cada paso está claro",
      [["Puede no terminar nunca si hace falta", "Debe ser finito."], ["Cada paso puede interpretarse de varias formas", "Debe ser preciso."], ["Da resultados distintos con los mismos datos", "Debe ser determinista."]],
      "Un algoritmo bien definido termina y no deja lugar a ambigüedades.",
    ),
  ],
};
