import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const leyesKeplerFb1Lesson: InteractiveLesson = {
  slug: "leyes-kepler-fb1",
  title: "1. Las leyes de Kepler",
  subtitle: FB1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("hist", "Del geocentrismo a Kepler", [
      { kind: "steps", items: [
        "**Ptolomeo** (geocentrismo) explicaba los movimientos planetarios con epiciclos. **Copérnico** puso al Sol en el centro; **Galileo** lo apoyó con el telescopio (fases de Venus, lunas de Júpiter).",
        "**Kepler**, con los datos de **Tycho Brahe** (muy precisos), halló tres leyes empíricas que describen cómo se mueven los planetas, sin explicar por qué.",
        "**Newton** explicó el porqué con la **gravitación universal** y demostró que las leyes de Kepler se deducen de ella.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Las tres leyes", [
      { kind: "text", text: "Observa la órbita elíptica, el reparto de áreas y la velocidad a lo largo de la órbita." },
    ], anim("fb1-kepler"), "visual-top"),
    slide("explora", "Mueve un planeta", [
      { kind: "text", text: "Cambia el semieje y la excentricidad, y desplaza el planeta por la órbita. ¿Cuánto vale T²/a³ siempre?" },
    ], tool("fb1-kepler-explorador"), "visual-top"),
    slide("res", "Resumen", [
      { kind: "steps", items: [
        "**1.ª ley**: órbitas **elípticas**, Sol en un foco. **2.ª ley**: **áreas iguales** en tiempos iguales (conservación del **momento angular**, L = m·r·v·sen φ).",
        "**3.ª ley**: **T² = k·a³**, con k = 4π²/(G·M). En unidades de **años y UA** para el Sol: **T² = a³**.",
        "Se aplica a **cualquier** sistema de cuerpos que orbitan alrededor de otro: satélites de Júpiter, la Luna, satélites artificiales (con su propia k).",
        "**Excentricidad** e: 0 = circunferencia; cerca de 1 = elipse muy alargada (cometas). Perihelio a(1−e) y afelio a(1+e).",
      ] },
    ], undefined, "stack"),
    calc("calc-t", "Tercera ley", "Un asteroide orbita el Sol con semieje mayor de 4 UA. ¿Cuál es su periodo, en años?", nums(8), "T = 4^1,5 = 8 años.", "T² = a³."),
    calc("calc-a", "Semieje", "Un planeta tarda 27 años en dar una vuelta al Sol. ¿Cuál es su semieje mayor, en UA?", nums(9), "a = 27^(2/3) = 9 UA.", "a³ = T²."),
    calc("calc-per", "Perihelio", "Un cometa tiene a = 10 UA y e = 0,8. ¿A qué distancia del Sol está en el perihelio, en UA?", nums(2), "a(1 − e) = 10·0,2 = 2 UA.", "r_perihelio = a(1 − e)."),
    calc("calc-v", "Segunda ley", "En el afelio un planeta está a 4 UA del Sol y va a 5 km/s. En el perihelio está a 1 UA. ¿Cuál es su velocidad allí, en km/s?", nums(20), "r·v = cte: 4·5 = 1·v → v = 20 km/s.", "Conservación del momento angular en los apsides."),
    sort("clasifica", "¿Qué ley?", "Indica qué ley de Kepler expresa cada afirmación.",
      [["l1", "1.ª ley", "cobalt"], ["l2", "2.ª ley", "emerald"], ["l3", "3.ª ley", "amber"]],
      [["El Sol está en un foco de la órbita", "l1"], ["Los planetas más lejanos tardan más en dar una vuelta", "l3"], ["La velocidad es mayor en el perihelio", "l2"], ["La órbita es una elipse", "l1"], ["T²/a³ es la misma para todos los planetas", "l3"], ["El radio vector barre áreas iguales en tiempos iguales", "l2"]],
      "Formas (1.ª), velocidades (2.ª), periodos (3.ª).",
    ),
    pick("check", "Perihelio", "¿Dónde es mayor la velocidad de un planeta?",
      "En el perihelio, el punto más cercano al Sol",
      [["En el afelio", "Es el punto de menor velocidad."], ["Es constante", "Solo si la órbita es circular."], ["En el foco vacío", "No hay nada allí."]],
      "Por la 2.ª ley: cerca, el arco recorrido es mayor.",
    ),
  ],
};
