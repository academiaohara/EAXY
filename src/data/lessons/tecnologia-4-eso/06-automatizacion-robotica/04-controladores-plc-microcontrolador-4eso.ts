import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const controladoresPlcMicrocontrolador4esoLesson: InteractiveLesson = {
  slug: "controladores-plc-microcontrolador-4eso",
  title: "4. Controladores: microcontroladores y PLC",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "El cerebro del sistema", [
      { kind: "compare",
        left: { title: "Microcontrolador / placa programable", text: "Arduino, ESP32, micro:bit. **Barato y flexible**, se programa en C++ o Python; ideal para prototipos, robots y productos.", tone: "info" },
        right: { title: "PLC (autómata programable)", text: "Diseñado para la **industria**: robusto, con entradas y salidas a 24 V, resistente a ruido y temperatura, y programado en lenguajes normalizados.", tone: "key" } },
    ]),
    slide("ciclo", "El ciclo de un autómata", [
      { kind: "steps", items: [
        "**1. Lee las entradas** (sensores, pulsadores).",
        "**2. Ejecuta el programa** y calcula las salidas.",
        "**3. Actualiza las salidas** (relés, motores, válvulas).",
        "Y vuelve a empezar, **muchas veces por segundo**: es el **ciclo de scan**.",
        "El tiempo de ciclo limita lo rápido que puede reaccionar el sistema.",
      ] },
    ]),
    slide("entradas", "Entradas y salidas", [
      { kind: "text", text: "Las entradas pueden ser digitales o analógicas. Repasa cómo se convierte una señal analógica." },
    ], tool("eso3-conversor-adc-explorador"), "visual-top"),
    slide("elegir", "Cómo se elige", [
      { kind: "steps", items: [
        "**Número y tipo** de entradas y salidas.",
        "**Entorno**: ruido eléctrico, temperatura, humedad.",
        "**Tensión de trabajo** (3,3 V, 5 V, 24 V) y **potencia** de las salidas.",
        "**Comunicaciones** (Wi-Fi, Ethernet, bus industrial).",
        "**Coste**, soporte y **facilidad de programación**.",
      ] },
    ]),
    calc("calc-scan", "Frecuencia de scan", "Un autómata tarda 5 ms en un ciclo completo. ¿Cuántos ciclos hace por segundo?", nums(200), "1 000 / 5 = 200 ciclos/s.", "Mil ms entre la duración del ciclo."),
    calc("calc-e", "Entradas necesarias", "Una máquina tiene 6 pulsadores, 4 sensores y 2 finales de carrera, todos digitales. ¿Cuántas entradas digitales necesita?", nums(12), "6 + 4 + 2 = 12.", "Suma todas."),
    sort("clasifica-ctrl", "¿PLC o microcontrolador?", "Elige el controlador más adecuado.",
      [["plc", "PLC", "amber"], ["mcu", "Microcontrolador", "cobalt"]],
      [["Línea de envasado de una fábrica", "plc"], ["Maquinaria con entradas a 24 V", "plc"], ["Entorno con mucho ruido eléctrico", "plc"], ["Robot de clase", "mcu"], ["Estación meteorológica casera", "mcu"], ["Prototipo de un producto de consumo", "mcu"]],
      "El PLC prima la robustez; el microcontrolador, el coste y la flexibilidad.",
    ),
    pick("check-ciclo", "Orden del ciclo", "¿Cuál es el orden correcto del ciclo de un autómata?",
      "Leer entradas, ejecutar el programa, actualizar salidas",
      [["Actualizar salidas, leer entradas, ejecutar", "No tendría datos nuevos."], ["Ejecutar, actualizar salidas, leer entradas", "Ejecutaría con datos viejos."], ["Solo ejecutar el programa", "Faltan entradas y salidas."]],
      "Primero se lee, luego se decide y por último se actúa.",
    ),
  ],
};
