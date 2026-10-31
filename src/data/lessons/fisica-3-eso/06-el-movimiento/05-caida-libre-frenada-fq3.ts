import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const caidaLibreFrenadaFq3Lesson: InteractiveLesson = {
  slug: "caida-libre-frenada-fq3",
  title: "5. Caída libre, lanzamientos y distancia de frenado",
  subtitle: FQ3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "La gravedad como aceleración", [
      { kind: "steps", items: [
        "Cerca de la superficie terrestre, los cuerpos que caen **sin rozamiento** lo hacen con una aceleración **g ≈ 9,8 m/s²**, **igual para todos** (una piedra y una pluma caerían a la vez en el vacío).",
        "Es un **MRUA**: desde el reposo, **v = g · t** y **h = ½ · g · t²**; al caer una altura h se llega con **v = √(2 g h)**.",
        "Si se lanza hacia **arriba** con velocidad v₀, el cuerpo **frena** a 9,8 m/s cada segundo hasta pararse en el punto más alto y luego cae.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tres situaciones reales", [
      { kind: "text", text: "Prueba la caída libre, el lanzamiento vertical y la distancia de frenado de un coche." },
    ], tool("fq3-caida-frenada-explorador"), "visual-top"),
    slide("frenado", "Seguridad vial", [
      { kind: "steps", items: [
        "La **distancia de parada** de un vehículo = **distancia de reacción** (v · tiempo de reacción) + **distancia de frenado** (v² / 2a).",
        "Al **duplicar la velocidad**, la distancia de frenado se **cuadruplica**.",
        "El cansancio, el alcohol o el móvil **aumentan el tiempo de reacción**; la lluvia o los neumáticos gastados **reducen la deceleración**.",
      ] },
    ]),
    calc("calc-cae", "Velocidad de impacto", "Se deja caer una piedra desde el reposo durante 2 s (g = 10 m/s², para simplificar). ¿Qué velocidad lleva, en m/s?", nums(20), "v = 10 · 2 = 20 m/s.", "v = g·t."),
    calc("calc-h", "Altura recorrida", "Con g = 10 m/s², ¿qué altura ha caído en esos 2 s, en m?", nums(20), "h = ½ · 10 · 2² = 20 m.", "h = ½·g·t²."),
    calc("calc-lan", "Altura máxima", "Se lanza una pelota hacia arriba a 20 m/s (g = 10 m/s²). ¿Qué altura máxima alcanza, en m?", nums(20), "h = v₀² / 2g = 400 / 20 = 20 m.", "Aplica v₀² / (2g)."),
    calc("calc-par", "Distancia de reacción", "Un coche circula a 72 km/h (20 m/s) y el conductor tarda 1 s en reaccionar. ¿Cuántos metros recorre antes de empezar a frenar?", nums(20), "20 · 1 = 20 m.", "Velocidad por tiempo de reacción."),
    calc("calc-fre", "Distancia de frenado", "Ese coche (20 m/s) frena con una deceleración de 5 m/s². ¿Qué distancia de frenado necesita, en m?", nums(40), "d = 20² / (2 · 5) = 40 m.", "d = v² / 2a."),
    sort("clasifica", "Verdadero o falso", "Clasifica cada afirmación sobre la caída libre (sin rozamiento).",
      [["ve", "Verdadera", "emerald"], ["fa", "Falsa", "rose"]],
      [["Todos los cuerpos caen con la misma aceleración", "ve"], ["La velocidad aumenta unos 9,8 m/s cada segundo", "ve"], ["En el punto más alto de un lanzamiento la velocidad es 0", "ve"], ["Un cuerpo pesado cae más rápido que uno ligero", "fa"], ["La aceleración es 0 al caer", "fa"], ["La velocidad de caída es constante", "fa"]],
      "Misma aceleración g para todos los cuerpos.",
    ),
    pick("check", "Doble velocidad", "Si un coche duplica su velocidad, ¿qué ocurre con su distancia de frenado?",
      "Se multiplica por 4",
      [["Se duplica", "Depende de v², no de v."], ["Se multiplica por 3", "El factor es 2² = 4."], ["No cambia", "Aumenta mucho."]],
      "d = v² / 2a.",
    ),
  ],
};
