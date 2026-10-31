import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const trabajoFuerzaFb1Lesson: InteractiveLesson = {
  slug: "trabajo-fuerza-fb1",
  title: "1. Trabajo de una fuerza",
  subtitle: FB1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es el trabajo", [
      { kind: "steps", items: [
        "En física hay **trabajo** cuando una fuerza produce un **desplazamiento**. Sostener una mochila sin moverse no es trabajo.",
        "Fuerza constante: **W = F · Δr = F·d·cos α** (α = ángulo entre fuerza y desplazamiento). Unidad: **julio** (1 J = 1 N·m).",
        "**W > 0** (α < 90°): la fuerza **ayuda**. **W < 0** (α > 90°): se **opone** (rozamiento: α = 180°). **W = 0** si F ⟂ desplazamiento (peso y normal en suelo horizontal, fuerza centrípeta).",
        "El **trabajo neto** es la suma de los trabajos de todas las fuerzas (= trabajo de la resultante).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Arrastra un bloque", [
      { kind: "text", text: "Cambia la fuerza, su ángulo y el rozamiento. ¿Con qué ángulo es mayor el trabajo de F? ¿Y el trabajo neto?" },
    ], tool("fb1-trabajo-explorador"), "visual-top"),
    slide("var", "Fuerzas variables", [
      { kind: "steps", items: [
        "Si la fuerza **varía** con la posición, el trabajo es el **área bajo la gráfica F–x** (integral: W = ∫F·dx).",
        "Para un **muelle** (F = k·x): el área es un triángulo, **W = ½·k·x²**.",
        "Para el **peso**: W = −m·g·Δh (negativo al subir, positivo al bajar), **no depende del camino**.",
        "El trabajo del **rozamiento** sí depende del camino (más largo, más trabajo disipado).",
      ] },
    ], undefined, "stack"),
    calc("calc-w", "Trabajo constante", "Se arrastra un baúl 15 m con una fuerza de 40 N que forma 60° con el suelo. ¿Cuánto trabajo realiza la fuerza, en J? (cos 60° = 0,5)", nums(300), "W = 40·15·0,5 = 300 J.", "W = F d cos α."),
    calc("calc-per", "Peso al subir", "Se eleva un cuerpo de 3 kg una altura de 2 m. ¿Qué trabajo realiza el peso, en J? (g = 10 m/s²; con signo)", nums(-60), "W = −m g Δh = −3·10·2 = −60 J.", "El peso se opone al desplazamiento."),
    calc("calc-roz", "Trabajo del rozamiento", "Una caja de 20 kg se arrastra 5 m por el suelo con μ = 0,3. ¿Qué trabajo hace el rozamiento, en J? (g = 10 m/s²; con signo)", nums(-300), "W = −μ m g d = −0,3·200·5 = −300 J.", "α = 180°."),
    calc("calc-muelle", "Trabajo para comprimir un muelle", "¿Qué trabajo se necesita para comprimir 0,1 m un muelle de k = 400 N/m, en J?", nums(2), "W = ½·400·0,01 = 2 J.", "W = ½ k x²."),
    sort("clasifica", "Signo del trabajo", "Indica el signo del trabajo de la fuerza descrita.",
      [["pos", "Positivo", "emerald"], ["neg", "Negativo", "rose"], ["cer", "Nulo", "amber"]],
      [["Un motor acelera un coche", "pos"], ["Los frenos detienen el coche", "neg"], ["La tensión en un péndulo (perpendicular al movimiento)", "cer"], ["El peso de una piedra que cae", "pos"], ["El peso de una piedra que sube", "neg"], ["La normal sobre un libro que se desliza por la mesa", "cer"]],
      "Depende del ángulo entre fuerza y desplazamiento.",
    ),
    pick("check", "Trabajo nulo", "Una persona sostiene una maleta sin moverse. ¿Qué trabajo hace sobre ella?",
      "Ninguno, porque no hay desplazamiento",
      [["Positivo, porque hace fuerza", "Sin desplazamiento no hay trabajo."], ["Negativo, por el peso", "No hay desplazamiento."], ["Igual a m·g", "Falta multiplicar por una distancia."]],
      "W = F·d·cos α con d = 0.",
    ),
  ],
};
