import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maquinasMecanismosMovimientosLesson: InteractiveLesson = {
  slug: "maquinas-mecanismos-movimientos",
  title: "1. Máquinas, mecanismos y tipos de movimiento",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Máquinas y mecanismos", [
      { kind: "definition", text: "Una **máquina** es un conjunto de piezas que transforma energía para realizar un trabajo. Un **mecanismo** es la parte de la máquina que **transmite o transforma el movimiento** y la fuerza." },
      { kind: "steps", items: [
        "Una **bicicleta** es una máquina; la cadena con los piñones y el plato son su mecanismo de transmisión.",
        "Una **máquina simple** hace un trabajo con un solo mecanismo: palanca, polea, plano inclinado.",
        "Una **máquina compuesta** combina varios mecanismos: una grúa, un coche o una lavadora.",
      ] },
    ], undefined, "stack"),
    slide("tipos", "Tres tipos de movimiento", [
      { kind: "text", text: "Los movimientos que se estudian en los mecanismos se distinguen por la **trayectoria** que describe el objeto." },
    ], anim("movimientos-tipos"), "text-top"),
    slide("explora", "Observa los movimientos", [
      { kind: "text", text: "Cambia el tipo de movimiento y la velocidad. Fíjate en qué trayectoria sigue el objeto." },
    ], tool("movimientos-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-mov", "¿Qué movimiento es?", "Clasifica el movimiento principal de cada objeto.",
      [["lin", "Lineal", "cobalt"], ["cir", "Circular", "amber"], ["alt", "Alternativo", "emerald"]],
      [["Cinta de un aeropuerto", "lin"], ["Cajón que se abre", "lin"], ["Rueda de bicicleta", "cir"], ["Hélice de un ventilador", "cir"], ["Aguja de una máquina de coser", "alt"], ["Pistón de un motor", "alt"], ["Sierra de calar", "alt"], ["Tambor de una lavadora", "cir"]],
      "Recta: lineal. Gira alrededor de un eje: circular. Recta de ida y vuelta: alternativo.",
    ),
    slide("transformar", "Transmitir y transformar", [
      { kind: "compare",
        left: { title: "Transmisión", text: "El movimiento llega **del mismo tipo**: de un giro a otro giro (cadena, correa, engranajes).", tone: "info" },
        right: { title: "Transformación", text: "El movimiento **cambia de tipo**: de giro a recta o al revés (cremallera, biela-manivela, tornillo).", tone: "key" } },
    ]),
    pick("check-mov", "El limpiaparabrisas", "La escobilla de un limpiaparabrisas va de un lado al otro del cristal una y otra vez. ¿Qué movimiento es?",
      "Alternativo (de ida y vuelta)",
      [["Circular continuo", "No da vueltas completas: va y vuelve."], ["Lineal en un solo sentido", "Vuelve a su posición inicial."], ["No es un movimiento mecánico", "Es un mecanismo con motor."]],
      "Repite un ciclo de ida y vuelta, así que es un movimiento alternativo (en este caso, oscilante, porque pivota).",
    ),
    pick("check-transf", "Mecanismo que transforma", "Una cremallera y un piñón convierten el giro de un manillar en el avance de una dirección. ¿Qué hace este mecanismo?",
      "Transforma un movimiento circular en uno lineal",
      [["Transmite un giro a otro giro", "El resultado es un avance recto, no otro giro."], ["Produce energía", "Los mecanismos no producen energía: la transmiten."], ["Transforma un movimiento lineal en otro lineal", "La entrada es un giro."]],
      "Cuando el tipo de movimiento cambia a la salida, el mecanismo es de transformación.",
    ),
  ],
};
