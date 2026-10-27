import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impedanciaCircuitosRlcTi2Lesson: InteractiveLesson = {
  slug: "impedancia-circuitos-rlc-ti2",
  title: "2. Impedancia y circuitos RLC",
  subtitle: TECTI2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Oposición a la corriente alterna", [
      { kind: "steps", items: [
        "La **impedancia** Z (Ω) es la oposición total de un circuito a la corriente alterna. La ley de Ohm se mantiene con valores eficaces: **V = I·Z**.",
        "Una **resistencia** se opone igual a cualquier frecuencia: Z = R.",
        "Una bobina tiene una reactancia inductiva $X_L$ = ω·L: crece con la frecuencia.",
        "Un condensador tiene una reactancia capacitiva $X_C$ = 1/(ω·C): disminuye con la frecuencia.",
        "En un circuito RLC serie: Z = √(R² + ($X_L$ − $X_C$)²) y tgφ = ($X_L$ − $X_C$)/R.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Un circuito RLC en serie", [
      { kind: "text", text: "Cambia R, L, C y la frecuencia. Observa la impedancia, el desfase y la resonancia." },
    ], tool("ti2-rlc-explorador"), "visual-top"),
    slide("res", "La resonancia", [
      { kind: "steps", items: [
        "Cuando $X_L$ = $X_C$, el circuito está en resonancia: la impedancia es mínima (Z = R) y no hay desfase.",
        "La frecuencia de resonancia es $f_0$ = 1/(2π·√(L·C)).",
        "En resonancia, las tensiones en la bobina y el condensador pueden ser **mucho mayores** que la de la fuente (sobretensiones).",
        "Se aprovecha en **radios y filtros** para seleccionar una frecuencia; en las instalaciones eléctricas hay que evitarla.",
      ] },
    ]),
    calc("calc-xl", "Reactancia de una bobina", "Una bobina de 0,2 H a 50 Hz, ¿cuántos Ω de reactancia tiene? (ω·L, redondea a un entero)", nums(63, 62.83), "314,16 · 0,2 ≈ 62,8 Ω.", "ω·L con L en henrios."),
    calc("calc-xc", "Reactancia de un condensador", "Un condensador de 50 µF a 50 Hz, ¿cuántos Ω de reactancia tiene? (1/(ω·C), redondea a un entero)", nums(64, 63.66), "1 / (314,16 · 50·10⁻⁶) ≈ 63,7 Ω.", "Pasa los µF a F."),
    calc("calc-z", "Impedancia", "Un circuito RLC serie con R = 30 Ω, $X_L$ = 70 Ω y $X_C$ = 30 Ω. ¿Cuántos Ω vale Z? (√(30² + 40²))", nums(50), "√(900 + 1 600) = 50 Ω.", "Raíz de R² más la reactancia neta al cuadrado."),
    calc("calc-i", "Corriente", "Ese circuito se alimenta a 230 V. ¿Cuántos A circulan? (230/50)", nums(4.6), "230 / 50 = 4,6 A.", "Ley de Ohm con la impedancia."),
    calc("calc-f0", "Resonancia", "Una bobina de 100 mH y un condensador de 100 µF, ¿a cuántos Hz resuenan? (1/(2π√(10⁻⁵)), redondea a un entero)", nums(50, 50.33), "1 / (2π · 0,003162) ≈ 50,3 Hz.", "f₀ = 1/(2π√(LC))."),
    sort("clasifica-rlc", "¿Cómo se comporta el circuito?", "Clasifica según la reactancia dominante.",
      [["ind", "Inductivo (φ > 0)", "amber"], ["cap", "Capacitivo (φ < 0)", "cobalt"], ["res", "Resistivo (resonancia)", "emerald"]],
      [["X_L = 70 Ω y X_C = 30 Ω", "ind"], ["Una bobina con poca resistencia", "ind"], ["X_L = 20 Ω y X_C = 60 Ω", "cap"], ["Un condensador en serie con una resistencia", "cap"], ["X_L = X_C", "res"], ["La corriente es máxima y está en fase", "res"]],
      "Domina la reactancia mayor.",
    ),
    pick("check-xl", "Con la frecuencia", "Al aumentar la frecuencia, ¿qué le ocurre a la reactancia de una bobina?",
      "Aumenta, porque X_L = 2π·f·L",
      [["Disminuye", "Eso es el condensador."], ["No cambia", "Depende de f."], ["Se anula", "No se anula."]],
      "La bobina deja pasar mejor las bajas frecuencias.",
    ),
  ],
};
