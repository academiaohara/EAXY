import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const circuitosSerie2esoLesson: InteractiveLesson = {
  slug: "circuitos-serie-2eso",
  title: "4. Circuitos en serie",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un solo camino para la corriente", [
      { kind: "definition", text: "En un circuito en **serie** los receptores se conectan uno a continuación de otro, de modo que las cargas tienen **un único camino**." },
      { kind: "steps", items: [
        "La **intensidad es la misma** en todos los elementos: I = I₁ = I₂.",
        "Las **tensiones se suman**: V = V₁ + V₂.",
        "Las **resistencias se suman**: R_eq = R₁ + R₂ + …",
        "Si un elemento se rompe, **todo el circuito se corta**.",
      ] },
    ], undefined, "stack"),
    slide("calculo", "Calcula un circuito en serie", [
      { kind: "text", text: "Cambia la pila y las resistencias. Comprueba que la intensidad es la misma y que las tensiones parciales suman la de la pila." },
    ], tool("eso2-serie-paralelo-explorador", { n: 0, a: 12, b: 4 }), "visual-top"),
    slide("ejemplo", "Un ejemplo resuelto", [
      { kind: "example", title: "Pila de 12 V con R₁ = 4 Ω y R₂ = 8 Ω", lines: [
        { math: "R_{eq} = 4 + 8 = 12\\ \\Omega" },
        { math: "I = V / R_{eq} = 12 / 12 = 1\\ A" },
        { math: "V_1 = I \\cdot R_1 = 4\\ V,\\quad V_2 = I \\cdot R_2 = 8\\ V", note: "4 V + 8 V = 12 V: las tensiones suman la de la pila." },
      ] },
    ]),
    calc("calc-req", "Resistencia equivalente", "Tres resistencias de 10 Ω, 20 Ω y 30 Ω están en serie. ¿Cuál es la resistencia equivalente, en Ω?", nums(60), "R_eq = 10 + 20 + 30 = 60 Ω.", "En serie se suman."),
    calc("calc-iserie", "Intensidad", "Esas tres resistencias se conectan a una pila de 12 V. ¿Qué intensidad circula, en A?", nums(0.2), "I = 12 / 60 = 0,2 A.", "I = V / R_eq."),
    calc("calc-v2", "Tensión en una resistencia", "Por esas resistencias circulan 0,2 A. ¿Qué tensión hay en la de 30 Ω, en V?", nums(6), "V = I · R = 0,2 · 30 = 6 V.", "Aplica la ley de Ohm solo a esa resistencia."),
    pick("check-serie", "Una lámpara se funde", "En una guirnalda de lámparas en serie, una se funde. ¿Qué ocurre?",
      "Se apagan todas, porque el circuito queda abierto",
      [["Solo se apaga la fundida", "Eso ocurriría en un montaje en paralelo."], ["Las demás lucen más", "Sin camino, no circula corriente."], ["No ocurre nada", "El circuito queda interrumpido."]],
      "En serie hay un único camino: si se interrumpe en un punto, deja de pasar corriente.",
    ),
  ],
};
