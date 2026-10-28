import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conceptoEstructuraTiposLesson: InteractiveLesson = {
  slug: "concepto-estructura-tipos",
  title: "1. Concepto y función de una estructura",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es una estructura", [
      { kind: "definition", text: "Una **estructura** es un conjunto de elementos unidos entre sí que **soportan cargas** y mantienen la forma de un objeto sin romperse ni deformarse demasiado." },
      { kind: "steps", items: [
        "**Soportar cargas**: el peso propio, las personas, la nieve, el viento.",
        "**Mantener la forma** del objeto.",
        "**Proteger** el interior (un casco, una jaula torácica) o **transmitir** las fuerzas al suelo (un pilar).",
      ] },
    ], undefined, "stack"),
    slide("cargas", "Cargas que actúan sobre una estructura", [
      { kind: "compare",
        left: { title: "Cargas fijas", text: "Actúan siempre y no cambian: el **peso propio** de la estructura y de lo que lleva fijo (suelos, paredes).", tone: "key" },
        right: { title: "Cargas variables", text: "Cambian con el tiempo: personas, muebles, vehículos, **viento**, **nieve**, terremotos.", tone: "info" } },
      { kind: "text", text: "Una estructura segura debe soportar **las cargas fijas más las variables más desfavorables** con un margen de seguridad." },
    ]),
    sort("clasifica-origen", "Naturales y artificiales", "Clasifica cada estructura según su origen.",
      [["nat", "Natural", "emerald"], ["art", "Artificial", "cobalt"]],
      [["Esqueleto de un mamífero", "nat"], ["Caparazón de una tortuga", "nat"], ["Panal de abejas", "nat"], ["Tronco de un árbol", "nat"], ["Puente colgante", "art"], ["Silla", "art"], ["Cuadro de una bicicleta", "art"], ["Torre de telefonía", "art"]],
      "Las estructuras naturales las crea la naturaleza (esqueletos, conchas, árboles); las artificiales las diseñan y construyen las personas.",
    ),
    slide("naturaleza", "La naturaleza como inspiración", [
      { kind: "text", text: "Muchas estructuras artificiales imitan a las naturales: los huesos huecos son ligeros y resistentes, como los tubos de una bicicleta; el panal hexagonal ahorra material, como los paneles alveolares de cartón." },
    ]),
    slide("explora", "Esfuerzos, un adelanto", [
      { kind: "text", text: "Las cargas provocan esfuerzos en los elementos de una estructura. Pruébalo con una barra: aumenta la carga y observa qué le ocurre." },
    ], tool("esfuerzos-barra-explorador", { n: 0, a: 40 }), "visual-top"),
    pick("check-estr", "¿Es una estructura?", "¿Cuál de estas opciones describe mejor la función principal de una estructura?",
      "Soportar cargas y mantener la forma de un objeto sin romperse",
      [["Producir energía eléctrica", "Es la función de un generador, no de una estructura."], ["Transformar un giro en un movimiento lineal", "Es la función de un mecanismo."], ["Controlar un proceso automáticamente", "Es la función de un sistema de control."]],
      "La estructura sostiene y da forma; no genera energía ni controla procesos.",
    ),
    pick("check-carga", "Carga fija o variable", "En un puente, ¿qué carga es variable?",
      "El paso de los camiones y el viento",
      [["El peso del hormigón del tablero", "Es peso propio: carga fija."], ["El peso de los pilares", "También es peso propio."], ["El peso de las barandillas fijadas al puente", "Es una carga fija."]],
      "Las cargas variables cambian con el tiempo; las fijas, no.",
    ),
  ],
};
