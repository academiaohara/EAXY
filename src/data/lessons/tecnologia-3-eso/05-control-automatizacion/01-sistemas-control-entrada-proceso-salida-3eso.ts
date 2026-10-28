import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemasControlEntradaProcesoSalida3esoLesson: InteractiveLesson = {
  slug: "sistemas-control-entrada-proceso-salida-3eso",
  title: "1. Sistemas de control: entrada, proceso y salida",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Máquinas que deciden", [
      { kind: "definition", text: "Un **sistema de control** es un conjunto de elementos que gobierna el funcionamiento de una máquina o proceso para que haga lo que queremos. Puede ser **manual** (una persona decide) o **automático** (decide el propio sistema)." },
      { kind: "steps", items: [
        "**Entradas**: sensores y mandos que informan (temperatura, luz, un pulsador).",
        "**Proceso**: el controlador compara y decide (circuito, microcontrolador, autómata).",
        "**Salidas**: actuadores que actúan (motor, lámpara, electroválvula, zumbador).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Descompón un sistema", [
      { kind: "text", text: "Elige un sistema cotidiano y mira cuáles son sus entradas, su proceso y sus salidas." },
    ], tool("eso3-sistema-ips-explorador"), "visual-top"),
    slide("manual", "Manual o automático", [
      { kind: "compare",
        left: { title: "Control manual", text: "Una persona observa y actúa: gira la rueda de la calefacción, enciende la luz. **Exige atención** continua.", tone: "info" },
        right: { title: "Control automático", text: "El sistema mide y actúa solo: termostato, luz con sensor, puerta automática. **Libera** a la persona y es más constante.", tone: "key" } },
    ]),
    calc("calc-error", "El error", "Un termostato mide 18 °C y la temperatura deseada es 21 °C. ¿Cuál es el error (consigna − medida), en °C?", nums(3), "21 − 18 = 3 °C: el sistema debe calentar.", "Error = consigna − medida."),
    sort("clasifica-elem", "¿Entrada, proceso o salida?", "Clasifica cada elemento de un sistema de control.",
      [["ent", "Entrada (sensor)", "cobalt"], ["pro", "Proceso (controlador)", "amber"], ["sal", "Salida (actuador)", "emerald"]],
      [["Sensor de temperatura", "ent"], ["Pulsador", "ent"], ["Sensor de luz", "ent"], ["Microcontrolador", "pro"], ["Autómata programable", "pro"], ["Motor", "sal"], ["Zumbador", "sal"], ["Electroválvula", "sal"]],
      "Los sensores informan, el controlador decide y los actuadores ejecutan.",
    ),
    pick("check-auto", "Un sistema automático", "¿Cuál de estos es un sistema de control automático?",
      "Un termostato que enciende y apaga la caldera según la temperatura",
      [["Girar a mano el grifo de la ducha", "Lo hace una persona."], ["Encender la luz con el interruptor", "Es manual."], ["Usar un abanico", "Es manual."]],
      "Un sistema automático mide y actúa sin intervención continua de una persona.",
    ),
  ],
};
