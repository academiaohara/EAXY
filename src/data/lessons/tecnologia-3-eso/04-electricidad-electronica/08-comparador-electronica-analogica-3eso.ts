import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const comparadorElectronicaAnalogica3esoLesson: InteractiveLesson = {
  slug: "comparador-electronica-analogica-3eso",
  title: "8. Electrónica analógica básica: el comparador",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "De analógico a digital", [
      { kind: "definition", text: "Un **comparador** es un circuito que compara dos tensiones y da una salida **alta o baja** según cuál sea mayor. Convierte una señal analógica en una decisión digital: «hay luz / no hay luz», «hace calor / no hace calor»." },
      { kind: "steps", items: [
        "**Entrada de señal**: la tensión del sensor.",
        "**Referencia**: el valor de umbral (puede ajustarse con un potenciómetro).",
        "**Salida**: alta si la señal supera la referencia (o baja, en modo inversor).",
        "Los **amplificadores operacionales** (como el LM358) se usan como comparadores.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Decide con un umbral", [
      { kind: "text", text: "Cambia la señal y la referencia y mira cuándo se enciende el LED." },
    ], tool("eso3-comparador-explorador"), "visual-top"),
    slide("usos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Termostato**: activa el calefactor cuando la temperatura baja de un umbral.",
        "**Alarma de luz**: se activa si el sensor detecta oscuridad.",
        "**Detector de nivel**: avisa cuando el depósito se llena.",
        "En el **proyecto de la lección 9**, un transistor cumple una función parecida.",
      ] },
    ]),
    calc("calc-ref", "Referencia a la mitad", "Quieres que un comparador cambie justo cuando la señal alcance la mitad de la alimentación de 5 V. ¿Cuántos V debe tener la referencia?", nums(2.5), "La mitad de 5 V son 2,5 V.", "Divide entre 2."),
    calc("calc-sal", "Salida del comparador", "Con Vin = 3 V y Vref = 2,5 V en modo normal, ¿la salida es alta (1) o baja (0)?", nums(1), "3 V > 2,5 V: la salida es alta (1).", "Compara Vin con Vref."),
    sort("clasifica-signal", "Analógica o digital", "Clasifica cada señal.",
      [["ana", "Analógica", "cobalt"], ["dig", "Digital", "amber"]],
      [["Tensión de una LDR (0 a 5 V)", "ana"], ["Tensión de un termistor", "ana"], ["Posición de un potenciómetro", "ana"], ["Salida de un comparador (alta o baja)", "dig"], ["Pulsador (abierto o cerrado)", "dig"], ["Salida de una puerta lógica", "dig"]],
      "Una señal analógica varía de forma continua; una digital tiene solo dos niveles.",
    ),
    pick("check-comp", "Qué hace un comparador", "¿Qué hace un comparador con una tensión de entrada de 1 V y una referencia de 2 V (modo normal)?",
      "Da una salida baja, porque la entrada no supera la referencia",
      [["Da una salida alta", "Solo si Vin supera Vref."], ["Amplifica la señal", "No amplifica: decide."], ["Se funde", "No ocurre."]],
      "La salida es alta solo si Vin es mayor que Vref.",
    ),
  ],
};
