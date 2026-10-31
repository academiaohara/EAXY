import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modeloMecanocuanticoFb1Lesson: InteractiveLesson = {
  slug: "modelo-mecanocuantico-fb1",
  title: "3. Modelo mecanocuántico y números cuánticos",
  subtitle: FB1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("dualidad", "Dualidad onda-corpúsculo", [
      { kind: "steps", items: [
        "**Planck** (1900): la energía se emite en **cuantos**, **E = h·f**. **Einstein** (1905): la luz son **fotones** (efecto fotoeléctrico).",
        "**De Broglie** (1924): toda partícula tiene una **onda asociada**: **λ = h/(m·v)**. Confirmado con la difracción de electrones.",
        "**Heisenberg** (1927), **principio de incertidumbre**: **Δx·Δp ≥ h/4π**. No se puede conocer a la vez la posición y el momento de un electrón con precisión arbitraria.",
        "Consecuencia: hay que hablar de **probabilidad** de encontrar al electrón, no de trayectorias.",
      ] },
    ], undefined, "stack"),
    slide("explora-db", "La longitud de onda de De Broglie", [
      { kind: "text", text: "Elige una partícula y cambia su velocidad. ¿Para quién es apreciable el carácter ondulatorio?" },
    ], tool("fb1-de-broglie-explorador"), "visual-top"),
    slide("orb", "Orbitales", [
      { kind: "text", text: "**Schrödinger** (1926) describe al electrón con una **función de onda ψ**; |ψ|² es la probabilidad de encontrarlo en cada punto. Las soluciones permitidas son los **orbitales atómicos**." },
    ], anim("fb1-orbitales"), "visual-top"),
    slide("nc", "Números cuánticos", [
      { kind: "steps", items: [
        "**n** (1, 2, 3…): nivel de energía y tamaño. **l** (0 a n − 1): forma del orbital (s, p, d, f). **m_l** (−l a +l): orientación. **m_s** (+½ o −½): espín.",
        "Cada orbital (n, l, m_l) admite como máximo **2 electrones**, con espines opuestos: **principio de exclusión de Pauli**.",
        "En cada capa hay **n²** orbitales y caben **2n²** electrones: 2, 8, 18, 32…",
        "Un subnivel tiene **2l + 1** orbitales: s → 1, p → 3, d → 5, f → 7.",
      ] },
    ], undefined, "stack"),
    slide("explora-nc", "Construye números cuánticos", [
      { kind: "text", text: "Prueba combinaciones de (n, l, m_l, m_s). ¿Cuáles no existen y por qué?" },
    ], tool("fb1-numeros-cuanticos-explorador"), "visual-top"),
    calc("calc-db", "Longitud de onda de De Broglie", "Un electrón se mueve a 10⁶ m/s (m = 9,1·10⁻³¹ kg). ¿Cuál es su λ, en 10⁻¹⁰ m? (h = 6,63·10⁻³⁴ J·s; redondea a 1 decimal)", nums(7.3, 7.29, 7.28), "λ = h/(m·v) = 6,63·10⁻³⁴ / (9,1·10⁻³¹·10⁶) ≈ 7,3·10⁻¹⁰ m.", "λ = h/(m·v)."),
    calc("calc-cap", "Capacidad de una capa", "¿Cuántos electrones caben como máximo en la capa n = 3?", nums(18), "2n² = 2·9 = 18 electrones.", "2n²."),
    calc("calc-orb", "Orbitales d", "¿Cuántos orbitales tiene un subnivel d?", nums(5), "2l + 1 = 2·2 + 1 = 5.", "l = 2."),
    sort("clasifica", "¿Combinación permitida?", "Indica si la combinación (n, l, m_l) es posible.",
      [["si", "Permitida", "emerald"], ["no", "No permitida", "rose"]],
      [["(2, 1, 0)", "si"], ["(3, 2, −2)", "si"], ["(1, 1, 0)", "no"], ["(2, 0, 1)", "no"], ["(4, 3, 3)", "si"], ["(3, 3, 0)", "no"]],
      "Debe cumplirse l ≤ n − 1 y |m_l| ≤ l.",
    ),
    pick("check", "Orbital", "¿Qué es un orbital atómico?",
      "La región del espacio donde es más probable encontrar al electrón",
      [["La trayectoria circular del electrón", "Eso era una órbita de Bohr."], ["Una capa llena de electrones", "Un orbital admite como máximo 2 electrones."], ["El núcleo del átomo", "No tiene relación."]],
      "Es una descripción probabilística.",
    ),
  ],
};
