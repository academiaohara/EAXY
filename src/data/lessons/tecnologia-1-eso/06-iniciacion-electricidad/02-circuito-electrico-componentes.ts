import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitoElectricoComponentesLesson: InteractiveLesson = {
  slug: "circuito-electrico-componentes",
  title: "2. El circuito eléctrico y sus componentes",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un camino cerrado", [
      { kind: "definition", text: "Un **circuito eléctrico** es un conjunto de elementos conectados por conductores formando un **camino cerrado** por el que circula la corriente." },
      { kind: "text", text: "Si el camino se interrumpe en cualquier punto, **la corriente se detiene** en todo el circuito." },
    ], undefined, "stack"),
    slide("elementos", "Cuatro tipos de elementos", [
      { kind: "text", text: "Cada parte del circuito tiene una función. Observa cómo se reparten." },
    ], anim("circuito-componentes"), "split"),
    slide("lista", "Ejemplos de cada tipo", [
      { kind: "compare",
        left: { title: "Generadores y receptores", text: "**Generadores**: pila, batería, placa solar, dinamo. **Receptores**: bombilla (luz), motor (movimiento), zumbador (sonido), resistencia (calor).", tone: "info" },
        right: { title: "Conductores y control", text: "**Conductores**: cables. **Control**: interruptor, pulsador, conmutador. **Protección**: fusible.", tone: "key" } },
    ]),
    slide("explora", "¿Por qué no luce?", [
      { kind: "text", text: "Estropea una pieza cada vez y comprueba que basta una sola avería para interrumpir todo el circuito." },
    ], tool("circuito-simple-explorador"), "visual-top"),
    sort("clasifica-comp", "¿Qué tipo de elemento es?", "Clasifica cada componente.",
      [["gen", "Generador", "emerald"], ["rec", "Receptor", "amber"], ["con", "Control", "cobalt"], ["cab", "Conductor", "violet"]],
      [["Pila", "gen"], ["Batería de un móvil", "gen"], ["Bombilla", "rec"], ["Motor", "rec"], ["Zumbador", "rec"], ["Interruptor", "con"], ["Pulsador", "con"], ["Cable de cobre", "cab"]],
      "El generador produce la tensión; los conductores la llevan; el control abre o cierra el paso; el receptor aprovecha la energía.",
    ),
    pick("check-abierto", "Circuito abierto", "Una linterna no enciende aunque la pila es nueva y la bombilla está bien. ¿Qué puede estar pasando?",
      "El camino está interrumpido: el interruptor está abierto o hay un contacto suelto",
      [["La bombilla necesita más cables", "Un circuito simple funciona con el camino cerrado, no con más cables."], ["La corriente solo circula de noche", "No depende de la hora."], ["Hay demasiada corriente", "Si hubiera demasiada, la bombilla se fundiría, no se quedaría apagada."]],
      "Cualquier interrupción del camino (interruptor abierto, cable roto, mal contacto) apaga el circuito.",
    ),
    pick("check-energia", "Transformaciones de energía", "¿Qué transformación de energía hace una bombilla?",
      "De energía eléctrica a luz (y calor)",
      [["De energía química a eléctrica", "Eso lo hace la pila."], ["De energía eléctrica a movimiento", "Eso lo hace un motor."], ["De luz a energía eléctrica", "Eso lo hace una célula solar."]],
      "Los receptores transforman la energía eléctrica: la bombilla en luz y calor, el motor en movimiento y el zumbador en sonido.",
    ),
  ],
};
