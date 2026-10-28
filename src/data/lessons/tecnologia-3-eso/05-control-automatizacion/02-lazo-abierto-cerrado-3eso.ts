import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const lazoAbiertoCerrado3esoLesson: InteractiveLesson = {
  slug: "lazo-abierto-cerrado-3eso",
  title: "2. Control en lazo abierto y en lazo cerrado",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Con y sin realimentación", [
      { kind: "text", text: "Observa la diferencia entre actuar a ciegas y corregir según lo medido." },
    ], anim("eso3-lazo-abierto-cerrado"), "text-top"),
    slide("def", "Dos formas de controlar", [
      { kind: "steps", items: [
        "**Lazo abierto**: el controlador **no mide** el resultado. Es simple y barato, pero **no corrige** errores (tostadora con temporizador, semáforo programado).",
        "**Lazo cerrado**: un **sensor mide** la salida y la **realimenta** al controlador, que compara con la **consigna** y corrige (termostato, control de crucero).",
        "La diferencia entre lo que se quiere y lo que se mide es el **error**.",
      ] },
    ], undefined, "stack"),
    slide("termostato", "Un termostato frente a un calefactor fijo", [
      { kind: "text", text: "Cambia la temperatura exterior y compara qué temperatura alcanza cada sistema." },
    ], tool("eso3-lazo-control-explorador"), "visual-top"),
    calc("calc-hist", "Histéresis", "Un termostato con consigna de 21 °C enciende la caldera cuando la temperatura baja de 20,5 °C. ¿Cuántos grados por debajo de la consigna está el umbral de encendido?", nums(0.5), "21 − 20,5 = 0,5 °C. Ese margen evita conectar y desconectar continuamente.", "Resta el umbral a la consigna."),
    calc("calc-error2", "Calcula el error", "La consigna es 22 °C y la temperatura medida es 19,5 °C. ¿Cuál es el error, en °C?", nums(2.5), "22 − 19,5 = 2,5 °C.", "Error = consigna − medida."),
    sort("clasifica-lazo", "¿Lazo abierto o cerrado?", "Clasifica cada sistema.",
      [["abi", "Lazo abierto", "amber"], ["cer", "Lazo cerrado", "emerald"]],
      [["Tostadora con temporizador", "abi"], ["Semáforo con programa fijo", "abi"], ["Riego programado por reloj", "abi"], ["Termostato de la calefacción", "cer"], ["Control de crucero de un coche", "cer"], ["Frigorífico que mide su temperatura", "cer"]],
      "Si el sistema mide el resultado y corrige, es de lazo cerrado.",
    ),
    pick("check-feedback", "La realimentación", "¿Qué aporta la realimentación a un sistema de control?",
      "Permite medir el resultado y corregir el error automáticamente",
      [["Hace que el sistema sea más barato", "Añade sensores."], ["Elimina la necesidad de sensores", "Los necesita."], ["Impide que el sistema falle", "Reduce el error, no lo evita siempre."]],
      "La señal medida vuelve al controlador, que la compara con la consigna.",
    ),
  ],
};
