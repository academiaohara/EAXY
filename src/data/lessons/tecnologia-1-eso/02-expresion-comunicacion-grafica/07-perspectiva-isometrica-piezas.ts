import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const perspectivaIsometricaPiezasLesson: InteractiveLesson = {
  slug: "perspectiva-isometrica-piezas",
  title: "7. Perspectiva isométrica y representación de piezas",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres ejes iguales", [
      { kind: "definition", text: "En la **perspectiva isométrica** (del griego «igual medida») los tres ejes forman **120°** entre sí y las medidas se dibujan en **verdadera magnitud** sobre cada uno de ellos." },
      { kind: "steps", items: [
        "Un eje **vertical** para la altura.",
        "Dos ejes a **30°** con la horizontal para el largo y el fondo.",
        "La misma escala en los tres ejes.",
      ] },
    ], undefined, "stack"),
    slide("pasos", "Construcción paso a paso", [
      { kind: "text", text: "Primero los ejes, luego las medidas, después las paralelas que forman las caras." },
    ], anim("isometrica-pasos"), "split"),
    slide("compara", "Caballera frente a isométrica", [
      { kind: "compare",
        left: { title: "Caballera", text: "Frente real, fondo a 45° y a la mitad. **Rápida** y buena para piezas con agujeros frontales.", tone: "info" },
        right: { title: "Isométrica", text: "Tres ejes con la misma escala. **Más natural**, pero ninguna cara conserva su forma exacta.", tone: "key" } },
      { kind: "warning", title: "Ojo", text: "En isométrica **las circunferencias se convierten en elipses**. Para piezas con muchos círculos se suele preferir la caballera." },
    ]),
    slide("explora", "Cambia de perspectiva", [
      { kind: "text", text: "Compara la misma pieza en las dos perspectivas y observa el fondo dibujado." },
    ], tool("perspectiva-explorador", { n: 1, a: 60, b: 40, c: 50 }), "visual-top"),
    calc("calc-angulo", "Ángulos de los ejes", "En una perspectiva isométrica, ¿cuántos grados forman entre sí dos ejes consecutivos?",
      nums(120), "Los tres ejes reparten los 360° de la vuelta completa: 360° ÷ 3 = 120°.", "Los tres ejes dividen la vuelta completa en partes iguales."),
    sort("clasifica-persp", "¿Qué perspectiva es?", "Asigna cada característica a la perspectiva que la cumple.",
      [["cab", "Caballera", "amber"], ["iso", "Isométrica", "cobalt"]],
      [["La cara frontal no se deforma", "cab"], ["El fondo se reduce a la mitad", "cab"], ["Se usa el coeficiente 0,5", "cab"], ["Los ejes forman 120°", "iso"], ["Las tres medidas se dibujan con la misma escala", "iso"], ["Los ejes inclinados forman 30° con la horizontal", "iso"]],
      "La caballera destaca por su frente real y su fondo reducido; la isométrica, por los tres ejes iguales a 120°.",
    ),
    pick("check-pieza", "Elegir un sistema", "Debes representar una pieza con tres caras de formas parecidas, sin ningún círculo, y quieres que se vea natural. ¿Qué eliges?",
      "Perspectiva isométrica",
      [["Solo la planta", "Una sola vista no da la forma completa."], ["Un boceto sin medidas", "Faltarían las medidas para fabricarla."], ["Escala 1:1000", "No es una elección de perspectiva y haría el dibujo ilegible."]],
      "La isométrica reparte las tres dimensiones por igual y da una imagen más equilibrada.",
    ),
  ],
};
