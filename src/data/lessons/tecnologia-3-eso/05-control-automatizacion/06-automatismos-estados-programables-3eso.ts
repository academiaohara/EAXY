import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const automatismosEstadosProgramables3esoLesson: InteractiveLesson = {
  slug: "automatismos-estados-programables-3eso",
  title: "6. Sistemas programables y automatismos por estados",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Programar en lugar de cablear", [
      { kind: "steps", items: [
        "Un **sistema programable** (microcontrolador, autómata) cambia su comportamiento **cambiando el programa**, sin rehacer el circuito.",
        "Un **automatismo** ejecuta una **secuencia** reaccionando a eventos.",
        "Se describe bien con **estados** y **transiciones**: en cada estado, un evento lleva a otro estado.",
        "Los **finales de carrera** informan de que algo ha llegado a su posición.",
      ] },
    ], undefined, "stack"),
    slide("garaje", "La puerta de un garaje", [
      { kind: "text", text: "Pulsa los eventos y comprueba cómo cambia el estado de la puerta. Prueba el obstáculo mientras cierra." },
    ], tool("eso3-puerta-garaje-explorador"), "visual-top"),
    slide("diseno", "Cómo se diseña", [
      { kind: "steps", items: [
        "Lista los **estados** posibles (Cerrada, Abriendo, Abierta, Cerrando).",
        "Para cada estado, qué **eventos** importan y a qué estado llevan.",
        "Indica qué **salidas** tiene cada estado (motor arriba, motor abajo, parado).",
        "**Seguridad**: añade siempre el comportamiento ante un obstáculo o un fallo.",
      ] },
    ]),
    calc("calc-estados", "Cuántos estados", "La puerta del garaje tiene los estados Cerrada, Abriendo, Abierta y Cerrando. ¿Cuántos estados son?", nums(4), "Hay 4 estados.", "Cuéntalos."),
    calc("calc-pasos", "Una secuencia", "Desde Cerrada, pulsas una vez y llegas al final de carrera superior. ¿Cuántos eventos has provocado en total (pulsador + final de carrera)?", nums(2), "Pulsador (Cerrada → Abriendo) y final de carrera arriba (Abriendo → Abierta): 2 eventos.", "Cuenta los eventos."),
    sort("clasifica-estado", "¿Cuál es el motor?", "¿Qué hace el motor en cada estado?",
      [["par", "Parado", "cobalt"], ["gir", "Girando", "emerald"]],
      [["Cerrada", "par"], ["Abierta", "par"], ["Abriendo", "gir"], ["Cerrando", "gir"]],
      "El motor solo gira mientras la puerta se mueve.",
    ),
    pick("check-obstaculo", "Seguridad", "La puerta se está cerrando y detecta un obstáculo. ¿Qué debe hacer?",
      "Volver a abrir para no aplastar el obstáculo",
      [["Seguir cerrando", "Sería peligroso."], ["Quedarse parada para siempre", "Mejor volver a abrir."], ["Apagarse sin más", "No resuelve el obstáculo."]],
      "La seguridad forma parte del diseño: se programa una transición de emergencia.",
    ),
  ],
};
