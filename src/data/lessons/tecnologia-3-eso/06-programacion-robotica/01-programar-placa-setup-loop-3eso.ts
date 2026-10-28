import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const programarPlacaSetupLoop3esoLesson: InteractiveLesson = {
  slug: "programar-placa-setup-loop-3eso",
  title: "1. Programar una placa: setup() y loop()",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una placa de control", [
      { kind: "definition", text: "Una **placa de control** (como Arduino, micro:bit o ESP32) es un pequeño ordenador con **pines** de entrada y salida. Se programa en el ordenador y el programa se **carga** en la placa, que lo ejecuta sola." },
      { kind: "steps", items: [
        "**Entradas**: pulsadores, sensores de luz, distancia, temperatura…",
        "**Salidas**: LED, zumbadores, motores, servos.",
        "**Alimentación**: por USB, pilas o baterías.",
        "Se puede programar con **bloques** (MakeCode, mBlock, Scratch) o con **texto** (C/C++, MicroPython).",
      ] },
    ], undefined, "stack"),
    slide("anim", "La estructura de un programa", [
      { kind: "text", text: "Mira cómo funcionan setup() y loop()." },
    ], anim("eso3-setup-loop"), "text-top"),
    slide("blink", "Hola mundo: el LED parpadeante", [
      { kind: "text", text: "El primer programa de cualquier placa hace parpadear un LED. Cambia las esperas y observa el efecto." },
    ], tool("eso3-blink-explorador"), "visual-top"),
    slide("pines", "Configurar los pines", [
      { kind: "steps", items: [
        "«pinMode(13, OUTPUT)» en «setup()»: el pin 13 será una salida.",
        "«digitalWrite(13, HIGH)»: pone 5 V (LED encendido).",
        "«delay(1000)»: espera 1 000 ms = 1 s.",
        "No olvides la **resistencia** del LED (por ejemplo, 220 Ω).",
      ] },
    ]),
    calc("calc-periodo", "El periodo", "Un LED está 300 ms encendido y 700 ms apagado. ¿Cuántos ms dura un ciclo completo?", nums(1000), "300 + 700 = 1 000 ms = 1 s.", "Suma los dos delay."),
    calc("calc-duty", "Tiempo encendido", "En ese mismo programa, ¿qué porcentaje del tiempo está encendido el LED?", nums(30), "300 / 1 000 = 0,30 = 30 %.", "Tiempo encendido entre el periodo."),
    sort("clasifica-func", "¿setup o loop?", "¿Dónde va cada instrucción?",
      [["set", "En setup() (una vez)", "cobalt"], ["loo", "En loop() (repetida)", "emerald"]],
      [["Configurar un pin como salida", "set"], ["Iniciar la comunicación serie", "set"], ["Preparar un sensor", "set"], ["Leer un pulsador cada vez", "loo"], ["Parpadear el LED", "loo"], ["Comprobar la distancia continuamente", "loo"]],
      "setup() prepara; loop() actúa una y otra vez.",
    ),
    pick("check-delay", "Un delay mayor", "¿Qué ocurre si se aumenta el delay con el LED apagado?",
      "El LED permanece más tiempo apagado y parpadea más despacio",
      [["Se enciende más brillante", "El delay no cambia el brillo."], ["Parpadea más rápido", "Al revés."], ["Se funde", "No tiene relación."]],
      "El delay fija cuánto tiempo se mantiene cada estado.",
    ),
  ],
};
