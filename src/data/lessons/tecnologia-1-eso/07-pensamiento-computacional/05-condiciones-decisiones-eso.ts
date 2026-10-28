import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const condicionesDecisionesEsoLesson: InteractiveLesson = {
  slug: "condiciones-decisiones-eso",
  title: "5. Condiciones: tomar decisiones",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Si ocurre algo, entonces...", [
      { kind: "definition", text: "Una **condición** es una pregunta con respuesta **verdadera o falsa**. Una estructura **condicional** hace que el programa ejecute unas instrucciones u otras según se cumpla o no." },
      { kind: "rule", title: "Estructura condicional", text: "si (condición) → entonces hacer A; si no → hacer B." },
      { kind: "steps", items: [
        "**Condición simple**: si llueve, coger el paraguas.",
        "**Condición doble**: si llueve, coger el paraguas; si no, ponerse gafas de sol.",
        "**Condiciones encadenadas**: si… si no, si… si no…",
      ] },
    ], undefined, "stack"),
    slide("clima", "¿Qué decide el programa?", [
      { kind: "text", text: "Cambia el tiempo y la temperatura: el programa ejecuta solo **la primera condición que se cumple**." },
    ], tool("condiciones-explorador", { a: 20 }), "visual-top"),
    slide("robot", "El robot que decide", [
      { kind: "text", text: "El bloque «Si hay pared delante» permite al robot reaccionar al entorno. Prueba este programa: **repetir 10 veces: si hay pared delante, girar a la derecha; si no, avanzar**." },
    ], tool("programa-bloques-explorador", { n: 2 }), "visual-top"),
    sort("clasifica-cond", "¿Es una condición?", "Decide si cada frase es una condición (verdadera o falsa) o una orden.",
      [["con", "Condición", "emerald"], ["ord", "Orden o acción", "amber"]],
      [["¿La puerta está cerrada?", "con"], ["¿Hay pared delante?", "con"], ["La temperatura es mayor que 25", "con"], ["Abrir la puerta", "ord"], ["Avanzar una casilla", "ord"], ["Coger el paraguas", "ord"]],
      "Una condición se puede responder con verdadero o falso; una orden indica una acción a realizar.",
    ),
    pick("check-primera", "La primera condición verdadera", "Programa: si llueve → paraguas; si no, si temperatura > 25 → camiseta; si no → chaqueta. Llueve y hace 30 °C. ¿Qué hace?",
      "Coge el paraguas, porque la primera condición ya se cumple",
      [["Se pone camiseta, porque hace calor", "Al cumplirse la primera, las siguientes no se evalúan."], ["Coge el paraguas y se pone camiseta", "Solo se ejecuta una rama."], ["Se pone chaqueta", "Solo si no se cumplen las anteriores."]],
      "En una cadena de condiciones se ejecuta solo la primera rama cuyas condiciones sean verdaderas.",
    ),
    pick("check-robot", "Robot y pared", "El robot ejecuta repetidamente: si hay pared delante, girar a la derecha; si no, avanzar. Está en un pasillo largo sin obstáculos. ¿Qué hace?",
      "Avanza hasta encontrar la pared y entonces gira a la derecha",
      [["Gira a la derecha siempre", "Solo gira cuando hay pared delante."], ["No se mueve", "Si no hay pared, avanza."], ["Avanza para siempre sin girar", "En cuanto encuentra la pared, gira."]],
      "El condicional se evalúa de nuevo en cada repetición, por eso el comportamiento cambia al llegar a la pared.",
    ),
  ],
};
