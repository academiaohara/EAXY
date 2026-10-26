import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const entradasDigitalesPulsadores3esoLesson: InteractiveLesson = {
  slug: "entradas-digitales-pulsadores-3eso",
  title: "2. Entradas digitales: pulsadores y resistencias pull-up",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Leer un pulsador", [
      { kind: "steps", items: [
        "Un pin configurado como **INPUT** lee un nivel: **HIGH (1)** si recibe 5 V o **LOW (0)** si recibe 0 V.",
        "«digitalRead(pin)» devuelve 1 o 0.",
        "Un pulsador **solo** conecta o desconecta: si no hay otra conexión, el pin queda «al aire» (**flotante**) y lee ruido.",
        "Por eso se usa una **resistencia pull-down** (a 0 V) o **pull-up** (a 5 V).",
      ] },
    ], undefined, "stack"),
    slide("pull", "Pull-up y pull-down", [
      { kind: "text", text: "Prueba los tres montajes y compara qué lee el pin con el botón suelto y pulsado." },
    ], tool("eso3-pull-explorador"), "visual-top"),
    slide("programa", "Un programa con condición", [
      { kind: "example", title: "Encender un LED con un pulsador (pull-up)", lines: [
        { math: "si\\ digitalRead(2) = LOW\\ \\rightarrow\\ encender\\ LED", note: "Con pull-up, pulsar da LOW." },
        { math: "si\\ no\\ \\rightarrow\\ apagar\\ LED" },
      ] },
      { kind: "text", text: "Pulsar y soltar tarda milisegundos: la placa lo detecta porque repite loop() miles de veces por segundo." },
    ]),
    calc("calc-down", "Con pull-down", "Un pulsador con resistencia pull-down se pulsa. ¿Qué lee digitalRead (1 o 0)?", nums(1), "Al pulsar, el pin recibe 5 V: lee 1 (HIGH).", "Pulsar lleva el pin a 5 V."),
    calc("calc-up", "Con pull-up", "Un pulsador con resistencia pull-up se pulsa. ¿Qué lee digitalRead (1 o 0)?", nums(0), "Al pulsar, el pin se conecta a 0 V: lee 0 (LOW).", "Pulsar lleva el pin a 0 V."),
    sort("clasifica-pin", "¿Qué lee el pin?", "Con una resistencia pull-up y un pulsador, ¿qué lee el pin en cada situación?",
      [["alt", "HIGH (1)", "emerald"], ["baj", "LOW (0)", "rose"]],
      [["Botón suelto", "alt"], ["Sin tocar el botón", "alt"], ["Resistencia manteniendo 5 V", "alt"], ["Botón pulsado", "baj"], ["Contacto cerrado a masa", "baj"], ["Tensión 0 V en el pin", "baj"]],
      "Con pull-up, el estado de reposo es HIGH y pulsar da LOW.",
    ),
    pick("check-flota", "Un pin sin resistencia", "¿Qué ocurre con un pin de entrada sin conectar a nada?",
      "Flota y puede leer 0 o 1 al azar por el ruido eléctrico",
      [["Lee siempre 0", "No está garantizado."], ["Lee siempre 1", "Tampoco."], ["Se apaga", "No ocurre."]],
      "La resistencia pull-up o pull-down fija el nivel de reposo.",
    ),
  ],
};
