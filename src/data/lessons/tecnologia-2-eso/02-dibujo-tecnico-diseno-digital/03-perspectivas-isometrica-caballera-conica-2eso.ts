import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const perspectivasIsometricaCaballeraConica2esoLesson: InteractiveLesson = {
  slug: "perspectivas-isometrica-caballera-conica-2eso",
  title: "3. Perspectivas: isométrica, caballera y cónica",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Representar el volumen en un solo dibujo", [
      { kind: "definition", text: "Una **perspectiva** representa en una sola imagen las tres dimensiones de un objeto. Es más fácil de entender que las vistas, pero más difícil de acotar." },
      { kind: "steps", items: [
        "**Caballera**: el frente se dibuja en verdadera magnitud y la profundidad se dibuja a **45°** reducida a la mitad.",
        "**Isométrica**: los tres ejes forman **120°** entre sí (dos ejes a **30°** de la horizontal).",
        "**Cónica**: imita la visión real; las líneas de profundidad **convergen en un punto de fuga**.",
      ] },
    ], undefined, "stack"),
    slide("iso", "Construcción de una isométrica", [
      { kind: "text", text: "Se dibuja el cubo con sus tres ejes y se copian las medidas sobre ellos." },
    ], anim("isometrica-pasos"), "text-top"),
    slide("compara", "Isométrica y caballera", [
      { kind: "text", text: "Cambia las medidas y alterna entre los dos sistemas." },
    ], tool("perspectiva-explorador", { n: 1, a: 60, b: 40, c: 50 }), "visual-top"),
    slide("conica", "Perspectiva cónica", [
      { kind: "text", text: "Mueve el punto de fuga y el horizonte, y ajusta la profundidad." },
    ], tool("eso2-conica-explorador"), "visual-top"),
    calc("calc-cab", "Coeficiente de reducción", "En caballera, una arista de profundidad mide 40 mm en la realidad. Con coeficiente de reducción 0,5, ¿cuánto se dibuja, en mm?", nums(20), "40 · 0,5 = 20 mm.", "Multiplica por el coeficiente."),
    sort("clasifica-persp", "¿Qué perspectiva es?", "Relaciona cada característica con su perspectiva.",
      [["cab", "Caballera", "cobalt"], ["iso", "Isométrica", "emerald"], ["con", "Cónica", "amber"]],
      [["La cara frontal se ve en verdadera magnitud", "cab"], ["Se reduce la profundidad a la mitad", "cab"], ["Los tres ejes forman 120°", "iso"], ["Se usa en planos de montaje y manuales", "iso"], ["Hay punto de fuga", "con"], ["Los objetos lejanos se ven más pequeños", "con"]],
      "Caballera: frente real y fugas a 45°; isométrica: tres ejes iguales a 120°; cónica: puntos de fuga.",
    ),
    pick("check-conica", "Punto de fuga", "En una perspectiva cónica, ¿qué ocurre con las líneas paralelas de profundidad?",
      "Convergen en un punto de fuga sobre la línea de horizonte",
      [["Se mantienen paralelas", "Eso ocurre en caballera e isométrica."], ["Se cruzan en cualquier punto", "Convergen en un punto concreto del horizonte."], ["Desaparecen", "Se dibujan, pero convergentes."]],
      "La convergencia de las líneas de profundidad es lo que produce la sensación de distancia.",
    ),
  ],
};
