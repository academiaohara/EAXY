import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const variablesDatosIniciacionLesson: InteractiveLesson = {
  slug: "variables-datos-iniciacion",
  title: "4. Variables y datos",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cajas con nombre", [
      { kind: "definition", text: "Una **variable** es un espacio de memoria con un **nombre** en el que un programa guarda un **dato** que puede cambiar mientras se ejecuta." },
      { kind: "steps", items: [
        "**Nombre**: cómo se llama (por ejemplo, «puntos»).",
        "**Valor**: el dato que guarda en ese momento.",
        "**Tipo**: qué clase de dato es (número, texto o verdadero/falso).",
      ] },
    ], undefined, "stack"),
    slide("caja", "Asignar y cambiar", [
      { kind: "text", text: "Observa cómo se **asigna** un valor y cómo se actualiza. El símbolo «=» no significa «es igual», sino «guarda en»." },
    ], anim("variable-caja"), "split"),
    slide("explora", "Ejecuta un programa línea a línea", [
      { kind: "text", text: "Antes de pulsar, intenta predecir qué valor tendrá la variable. Después, ejecuta la línea y comprueba." },
    ], tool("variables-cajas-explorador", { n: 0 }), "visual-top"),
    calc("calc-puntos", "Valor final", "Un programa hace: puntos = 0; puntos = puntos + 10; puntos = puntos + 5; puntos = puntos * 2. ¿Cuánto vale puntos al final?",
      nums(30), "La variable pasa de 0 a 10, luego a 15 y finalmente a 30 (15 × 2).", "Ve línea por línea guardando el valor de la variable."),
    calc("calc-contador", "Un contador", "contador = 5; contador = contador + 3; contador = contador - 2. ¿Cuánto vale contador?",
      nums(6), "El contador pasa de 5 a 8 (5 + 3) y luego a 6 (8 − 2).", "Aplica cada línea sobre el valor actual."),
    sort("clasifica-tipo", "¿Qué tipo de dato es?", "Clasifica cada dato.",
      [["num", "Número", "cobalt"], ["tex", "Texto", "amber"], ["log", "Lógico (verdadero/falso)", "emerald"]],
      [["12", "num"], ["3,5", "num"], ["«Ana»", "tex"], ["«Hola, mundo»", "tex"], ["verdadero", "log"], ["falso", "log"]],
      "Los números se pueden calcular; el texto va entre comillas; los valores lógicos solo pueden ser verdadero o falso.",
    ),
    pick("check-swap", "Intercambiar dos variables", "a = 3 y b = 8. Quieres intercambiar sus valores sin perder ninguno. ¿Qué haces?",
      "Guardar a en una variable auxiliar, copiar b en a y copiar la auxiliar en b",
      [["a = b y luego b = a", "Al hacer a = b se pierde el valor original de a: ambas valdrán 8."], ["b = a y luego a = b", "Pasa lo mismo: se pierde el valor de b."], ["No se puede hacer", "Se puede con una variable auxiliar."]],
      "Una variable auxiliar permite guardar temporalmente un valor antes de sobrescribirlo.",
    ),
  ],
};
