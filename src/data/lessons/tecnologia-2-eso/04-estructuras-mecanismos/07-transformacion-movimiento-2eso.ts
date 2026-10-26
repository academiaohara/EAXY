import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transformacionMovimiento2esoLesson: InteractiveLesson = {
  slug: "transformacion-movimiento-2eso",
  title: "7. Transformación del movimiento",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "De giro a movimiento lineal", [
      { kind: "definition", text: "Muchas máquinas necesitan un movimiento **lineal** a partir del giro de un motor. Los mecanismos de **transformación** convierten el giro en un movimiento rectilíneo (continuo o alternativo)." },
      { kind: "steps", items: [
        "**Piñón-cremallera**: el piñón gira y la cremallera avanza (apertura de puertas, dirección de coche).",
        "**Tornillo-tuerca**: cada vuelta avanza un paso de rosca (gato, prensa, impresora 3D).",
        "**Biela-manivela**: el giro produce un vaivén (motores, bombas, sierra de calar).",
        "**Leva y seguidor**: el perfil de la leva empuja al seguidor (válvulas de un motor, juguetes con muñecos).",
        "**Cigüeñal**: conjunto de bielas-manivelas en un solo eje.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Biela-manivela", [
      { kind: "text", text: "Observa cómo el émbolo va y viene mientras la manivela gira siempre en el mismo sentido." },
    ], anim("eso2-biela-manivela"), "text-top"),
    slide("explora", "Cuánto se desplaza la salida", [
      { kind: "text", text: "Gira la entrada y compara los cuatro mecanismos." },
    ], tool("eso2-transformacion-explorador"), "visual-top"),
    calc("calc-tornillo", "Avance de un tornillo", "Una tuerca avanza por un tornillo de paso 2 mm. ¿Cuántos mm avanza al dar 15 vueltas?", nums(30), "Avance = paso · vueltas = 2 · 15 = 30 mm.", "Cada vuelta avanza un paso."),
    calc("calc-carrera", "Carrera de un émbolo", "La manivela de un mecanismo biela-manivela tiene un radio de 25 mm. ¿Cuál es la carrera del émbolo, en mm?", nums(50), "Carrera = 2 · r = 2 · 25 = 50 mm.", "La carrera es el doble del radio de la manivela."),
    sort("clasifica-mec", "Continuo o alternativo", "Clasifica el movimiento de salida.",
      [["con", "Rectilíneo continuo", "cobalt"], ["alt", "Rectilíneo alternativo", "amber"]],
      [["Piñón-cremallera", "con"], ["Tornillo-tuerca al girar siempre en un sentido", "con"], ["Biela-manivela", "alt"], ["Leva con muelle", "alt"], ["Pistón de un motor", "alt"], ["Sierra de calar", "alt"]],
      "El piñón-cremallera y el tornillo avanzan sin volver; la biela-manivela y la leva van y vienen.",
    ),
    pick("check-gato", "Un gato de coche", "¿Qué mecanismo emplea el gato de tornillo de un coche para levantar una carga pesada con poca fuerza?",
      "Tornillo-tuerca, porque cada vuelta avanza solo un paso pequeño",
      [["Piñón-cremallera", "Avanza mucho por vuelta y no daría tanta fuerza."], ["Biela-manivela", "Produce un vaivén, no una subida continua."], ["Leva", "Es para movimientos cortos y alternativos."]],
      "El paso de rosca pequeño produce una enorme reducción y, con ello, una gran fuerza.",
    ),
  ],
};
