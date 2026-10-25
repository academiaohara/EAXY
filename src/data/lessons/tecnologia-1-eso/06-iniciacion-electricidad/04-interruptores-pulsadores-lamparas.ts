import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const interruptoresPulsadoresLamparasLesson: InteractiveLesson = {
  slug: "interruptores-pulsadores-lamparas",
  title: "4. Interruptores, pulsadores y lámparas",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("control", "Elementos de control", [
      { kind: "steps", items: [
        "**Interruptor**: abre o cierra el circuito y **mantiene** la posición hasta que se vuelve a accionar.",
        "**Pulsador**: cierra (o abre) el circuito **solo mientras se mantiene pulsado**; al soltarlo vuelve a su posición.",
        "**Conmutador**: tiene dos posiciones y dirige la corriente por uno de dos caminos. Dos conmutadores controlan una misma lámpara desde dos puntos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba los tres controles", [
      { kind: "text", text: "Cierra el interruptor, mantén pulsado el timbre y cambia los dos conmutadores. Observa cuándo se enciende la lámpara en cada caso." },
    ], tool("control-luz-explorador", { n: 0 }), "visual-top"),
    slide("normalmente", "Normalmente abierto y normalmente cerrado", [
      { kind: "compare",
        left: { title: "Normalmente abierto (NA)", text: "En reposo **no deja pasar** la corriente; al pulsarlo, sí. Timbre, botón de un ascensor.", tone: "info" },
        right: { title: "Normalmente cerrado (NC)", text: "En reposo **deja pasar** la corriente; al pulsarlo, la corta. Luz de una nevera: se apaga al cerrar la puerta.", tone: "key" } },
    ]),
    slide("lamparas", "Lámparas y receptores de luz", [
      { kind: "steps", items: [
        "**Incandescente**: un filamento metálico se calienta hasta ponerse al rojo blanco. Da luz, pero **la mayor parte de la energía se pierde en forma de calor**.",
        "**Fluorescente y de bajo consumo**: gas excitado. Más eficientes.",
        "**LED**: diodo que emite luz directamente. Consume poco, dura miles de horas y casi no se calienta.",
      ] },
      { kind: "text", text: "Una bombilla incandescente de 60 W y una LED de 8 W pueden dar una luz parecida: la LED gasta unas siete veces menos energía." },
    ]),
    sort("clasifica-control", "¿Interruptor o pulsador?", "Decide qué elemento de control es el más adecuado en cada caso.",
      [["int", "Interruptor", "cobalt"], ["pul", "Pulsador", "amber"], ["con", "Conmutadores", "emerald"]],
      [["Luz de una habitación", "int"], ["Lámpara de un escritorio", "int"], ["Timbre de una casa", "pul"], ["Botón de un ascensor", "pul"], ["Luz de un pasillo con dos puertas", "con"], ["Luz de una escalera con dos pisos", "con"]],
      "El interruptor mantiene el estado; el pulsador, solo mientras se pulsa; los conmutadores controlan una luz desde dos sitios.",
    ),
    pick("check-timbre", "El timbre", "¿Por qué el timbre de una casa usa un pulsador y no un interruptor?",
      "Porque solo debe sonar mientras se pulsa, no quedarse sonando",
      [["Porque un interruptor no puede conducir la corriente", "Podría conducirla, pero se quedaría sonando."], ["Porque un pulsador consume menos", "No cambia el consumo del timbre."], ["Porque es más barato", "La razón principal es el funcionamiento."]],
      "El pulsador vuelve a su posición al soltarlo, así que el timbre solo suena mientras lo pulsamos.",
    ),
    pick("check-conmutador", "Luz desde dos sitios", "Quieres encender y apagar la luz de un pasillo desde las dos puertas. ¿Qué necesitas?",
      "Dos conmutadores conectados entre sí",
      [["Dos interruptores en paralelo", "No permiten encender y apagar desde cualquiera de los dos."], ["Un pulsador y un interruptor en serie", "No funcionan igual."], ["Un solo interruptor muy largo", "No existe esa solución práctica."]],
      "Con dos conmutadores, cada uno puede cambiar el estado de la lámpara con independencia de la posición del otro.",
    ),
  ],
};
