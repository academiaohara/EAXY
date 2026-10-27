import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciasActivaReactivaAparenteTi2Lesson: InteractiveLesson = {
  slug: "potencias-activa-reactiva-aparente-ti2",
  title: "3. Potencia activa, reactiva y aparente: el triángulo de potencias",
  subtitle: TECTI2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres potencias", [
      { kind: "steps", items: [
        "**Potencia activa P = V·I·cosφ** (W): se transforma en trabajo útil o calor.",
        "**Potencia reactiva Q = V·I·senφ** (var): la intercambian las bobinas y los condensadores con la red; no produce trabajo, pero carga la instalación.",
        "**Potencia aparente S = V·I** (VA): lo que parece que se consume; dimensiona cables, protecciones y transformadores.",
        "Forman el **triángulo de potencias**: **S² = P² + Q²**, y el **factor de potencia cosφ = P/S**.",
        "En una **resistencia** φ = 0 (todo es activa); en una bobina pura, φ = 90° (todo es reactiva).",
      ] },
    ], undefined, "stack"),
    slide("tool", "El triángulo de potencias", [
      { kind: "text", text: "Cambia la tensión, la corriente y el desfase. Mira las tres potencias y el factor de potencia." },
    ], tool("ti2-potencias-explorador"), "visual-top"),
    slide("energia", "Energía y facturación", [
      { kind: "steps", items: [
        "Se factura la **energía activa** en kWh (P · tiempo).",
        "En contratos industriales se penaliza un **factor de potencia bajo** (la energía reactiva), porque obliga a la red a transportar más corriente.",
        "Los aparatos se rotulan con la **potencia aparente (VA)** o con la activa y el cosφ.",
        "Un **motor** consume potencia activa en el eje y reactiva para magnetizarse.",
      ] },
    ]),
    calc("calc-s", "Potencia aparente", "Una carga de 230 V consume 10 A. ¿Cuántos VA de potencia aparente tiene?", nums(2300), "230 · 10 = 2 300 VA.", "Producto de tensión y corriente eficaces."),
    calc("calc-p", "Potencia activa", "Con cosφ = 0,8, ¿cuántos W de potencia activa? (2 300·0,8)", nums(1840), "2 300 · 0,8 = 1 840 W.", "Aparente por factor de potencia."),
    calc("calc-q", "Potencia reactiva", "Con senφ = 0,6, ¿cuántos var de potencia reactiva? (2 300·0,6)", nums(1380), "2 300 · 0,6 = 1 380 var.", "Aparente por el seno."),
    calc("calc-tri", "Triángulo", "Una carga tiene P = 1 200 W y Q = 900 var. ¿Cuántos VA de potencia aparente? (√(P² + Q²))", nums(1500), "√(1 440 000 + 810 000) = 1 500 VA.", "Pitágoras."),
    sort("clasifica-pot", "¿Qué potencia?", "Relaciona cada descripción con la potencia.",
      [["act", "Activa (W)", "emerald"], ["rea", "Reactiva (var)", "amber"], ["apa", "Aparente (VA)", "cobalt"]],
      [["Se convierte en trabajo o calor", "act"], ["Es la que cobra la compañía en kWh", "act"], ["Se intercambia con bobinas y condensadores", "rea"], ["No produce trabajo útil", "rea"], ["Dimensiona cables y transformadores", "apa"], ["Es el producto V·I", "apa"]],
      "Cada potencia tiene un papel distinto.",
    ),
    pick("check-fp", "El factor de potencia", "¿Qué indica un factor de potencia de 0,5?",
      "Que solo la mitad de la potencia aparente se convierte en potencia útil",
      [["Que el aparato está estropeado", "No es una avería."], ["Que el aparato consume el doble de energía útil", "Consume menos útil por VA."], ["Que la tensión es la mitad", "No tiene relación."]],
      "cosφ = P/S.",
    ),
  ],
};
