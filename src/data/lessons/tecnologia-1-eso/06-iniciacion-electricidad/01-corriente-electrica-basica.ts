import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const corrienteElectricaBasicaLesson: InteractiveLesson = {
  slug: "corriente-electrica-basica",
  title: "1. La corriente eléctrica",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cargas en movimiento", [
      { kind: "definition", text: "La **corriente eléctrica** es el movimiento ordenado de **cargas eléctricas** (en los metales, de **electrones**) a través de un material conductor." },
      { kind: "steps", items: [
        "La **materia** está formada por átomos con cargas positivas (en el núcleo) y negativas (electrones).",
        "En los **metales** algunos electrones se mueven con libertad entre los átomos.",
        "Una **pila** ejerce una fuerza (tensión) que los empuja en un mismo sentido: aparece la corriente.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Electrones libres", [
      { kind: "text", text: "Observa qué cambia cuando conectamos la pila y por qué un aislante no conduce." },
    ], anim("electrones-corriente"), "text-top"),
    slide("magnitudes", "Tres magnitudes básicas", [
      { kind: "steps", items: [
        "**Tensión o voltaje (V)**: la «fuerza» que empuja las cargas. Una pila típica da 1,5 V; la red de casa, 230 V.",
        "**Intensidad (I)**: cantidad de carga que pasa por segundo. Se mide en amperios (A).",
        "**Resistencia (R)**: lo que dificulta el paso de la corriente. Se mide en ohmios (Ω).",
      ] },
      { kind: "warning", title: "Ojo", text: "La electricidad de red (230 V) puede ser mortal. Las pilas de 1,5 V o 4,5 V de los circuitos de clase son seguras." },
    ]),
    slide("conductores", "Conductores y aislantes", [
      { kind: "text", text: "Prueba distintos objetos en el circuito: si la bombilla se enciende, el objeto conduce la corriente." },
    ], tool("conductores-aislantes-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-cond", "Conductor o aislante", "Clasifica cada material.",
      [["con", "Conductor", "amber"], ["ais", "Aislante", "cobalt"]],
      [["Cobre", "con"], ["Aluminio", "con"], ["Hierro", "con"], ["Grafito", "con"], ["Plástico", "ais"], ["Vidrio", "ais"], ["Goma", "ais"], ["Madera seca", "ais"]],
      "Los metales y el grafito conducen la corriente; el plástico, el vidrio, la goma y la madera seca la aíslan.",
    ),
    pick("check-cable", "Cable con funda", "¿Por qué un cable eléctrico lleva un hilo de cobre cubierto por una funda de plástico?",
      "El cobre conduce la corriente y el plástico aísla para que no toquemos el hilo ni se junten dos cables",
      [["Porque el plástico conduce mejor que el cobre", "El plástico es aislante."], ["Porque el cobre es aislante y el plástico conductor", "Es al revés."], ["Solo para que tenga color", "Los colores ayudan a distinguirlos, pero la funda es esencial para la seguridad."]],
      "Un cable combina un conductor (cobre) y un aislante (plástico).",
    ),
    pick("check-corriente", "Qué es la corriente", "¿Qué es la corriente eléctrica en un cable de cobre?",
      "El movimiento ordenado de electrones libres en un mismo sentido",
      [["Electrones que se quedan quietos", "Sin movimiento no hay corriente."], ["Un líquido que circula por el cable", "No es ningún fluido: son cargas en movimiento."], ["Cargas que se mueven desordenadamente en todas las direcciones", "Ese movimiento desordenado existe, pero no produce corriente neta."]],
      "La corriente aparece cuando una tensión ordena el movimiento de los electrones libres.",
    ),
  ],
};
