import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const programacionAutomatismosSecuencias4esoLesson: InteractiveLesson = {
  slug: "programacion-automatismos-secuencias-4eso",
  title: "5. Programación de automatismos: secuencias",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Etapas y transiciones", [
      { kind: "steps", items: [
        "Un automatismo secuencial se describe con **etapas** (lo que hace la máquina) y **transiciones** (la condición para pasar a la siguiente).",
        "Es una **máquina de estados**: en cada momento solo hay **una etapa activa**.",
        "El diagrama normalizado se llama **GRAFCET**; también se puede programar directamente en C++, Python o en un PLC.",
        "Cada etapa activa unas **salidas**: motores, válvulas, luces.",
      ] },
    ], undefined, "stack"),
    slide("seq", "Una taladradora automática", [
      { kind: "text", text: "Activa las señales y avanza un ciclo del autómata. La etapa solo cambia si se cumple la transición." },
    ], tool("eso4-secuencia-explorador"), "visual-top"),
    slide("garaje", "La puerta de garaje", [
      { kind: "text", text: "Otro automatismo secuencial: la puerta de garaje con finales de carrera y fotocélula." },
    ], tool("eso3-puerta-garaje-explorador"), "visual-top"),
    slide("seguridad", "Seguridad en los automatismos", [
      { kind: "steps", items: [
        "**Parada de emergencia** siempre accesible y que corta las salidas peligrosas.",
        "**Enclavamientos**: no se puede bajar el taladro si la cinta está en marcha.",
        "**Estado seguro** al fallar la alimentación (frenos que se cierran sin energía).",
        "Probar la secuencia **etapa a etapa** antes de ponerla a funcionar en continuo.",
      ] },
    ]),
    calc("calc-et", "Etapas", "La secuencia de la taladradora tiene 4 etapas. Si arranca en E0 y se avanza un ciclo con cada transición cumplida, ¿cuántas transiciones hacen falta para volver a E0?", nums(4), "E0→E1→E2→E3→E0: 4 transiciones.", "Una por cada etapa del ciclo."),
    calc("calc-tmp", "Duración", "La cinta tarda 3 s, el taladro baja en 2 s y sube en 2 s. ¿Cuánto dura el ciclo de trabajo (sin contar el reposo)?", nums(7), "3 + 2 + 2 = 7 s.", "Suma las etapas con movimiento."),
    sort("clasifica-seq", "¿Etapa o transición?", "Clasifica cada elemento.",
      [["eta", "Etapa (qué hace)", "cobalt"], ["tra", "Transición (cuándo cambia)", "amber"]],
      [["La cinta avanza", "eta"], ["El taladro baja", "eta"], ["Reposo", "eta"], ["Llega una pieza", "tra"], ["Se alcanza el final de carrera", "tra"], ["Se pulsa marcha", "tra"]],
      "Las etapas hacen cosas; las transiciones esperan señales.",
    ),
    pick("check-enc", "Enclavamiento", "¿Qué es un enclavamiento?",
      "Una condición que impide una acción peligrosa mientras otra está activa",
      [["Un motor muy potente", "No es un motor."], ["Un tipo de sensor", "No es un sensor."], ["Una pausa de 5 minutos", "No es una pausa."]],
      "Evita, por ejemplo, subir y bajar a la vez.",
    ),
  ],
};
