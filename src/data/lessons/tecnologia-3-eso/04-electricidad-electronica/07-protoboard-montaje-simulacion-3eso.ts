import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const protoboardMontajeSimulacion3esoLesson: InteractiveLesson = {
  slug: "protoboard-montaje-simulacion-3eso",
  title: "7. Protoboard, montaje y simulación de circuitos",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Probar sin soldar", [
      { kind: "steps", items: [
        "La **protoboard** (placa de pruebas) permite montar circuitos **sin soldar**, insertando las patillas en agujeros.",
        "Los agujeros de cada **columna de 5** están unidos por dentro.",
        "Los **carriles laterales** se usan para la alimentación (+ y −).",
        "El **simulador** (Tinkercad Circuits, por ejemplo) deja probar el circuito en el ordenador antes de montarlo.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Quedan conectados?", [
      { kind: "text", text: "Mueve las patillas de la resistencia y del LED y comprueba si quedan en el mismo nodo." },
    ], tool("eso3-protoboard-explorador"), "visual-top"),
    slide("metodo", "Un método de montaje", [
      { kind: "steps", items: [
        "**1.** Dibuja el **esquema** y calcula los valores (resistencia del LED, etc.).",
        "**2.** **Simula** si es posible.",
        "**3.** Monta **sin alimentación**: cables, resistencias, LED…",
        "**4.** **Comprueba** cada conexión y la polaridad antes de conectar la pila.",
        "**5.** Conecta la alimentación y **mide** con el polímetro.",
      ] },
    ]),
    calc("calc-col", "Agujeros conectados", "En una protoboard, ¿cuántos agujeros están unidos entre sí en cada columna de una mitad (A–E)?", nums(5), "Las columnas A–E tienen 5 agujeros unidos.", "Cuenta las letras A, B, C, D, E."),
    sort("clasifica-nodo", "¿Están conectados?", "Con una protoboard estándar, decide si las dos patillas quedan unidas.",
      [["si", "Conectadas", "emerald"], ["no", "No conectadas", "rose"]],
      [["Agujeros A3 y B3", "si"], ["Agujeros C7 y E7", "si"], ["Agujeros F5 y H5", "si"], ["Agujeros A3 y A4", "no"], ["Agujeros A3 y F3 (separadas por la canal central)", "no"], ["Agujeros B2 y B9", "no"]],
      "Solo están unidos los agujeros de la misma columna y la misma mitad.",
    ),
    pick("check-proto", "Antes de conectar", "¿Qué se hace antes de conectar la alimentación de un montaje?",
      "Comprobar las conexiones y la polaridad de LED, diodos y condensadores",
      [["Conectar directamente y ver qué pasa", "Podría dañar componentes."], ["Quitar todas las resistencias", "Son necesarias."], ["Nada, siempre funciona", "Un error de montaje es habitual."]],
      "Una revisión rápida evita fundir un LED o un condensador.",
    ),
  ],
};
