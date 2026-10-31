import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaGravitatoriaFb1Lesson: InteractiveLesson = {
  slug: "energia-gravitatoria-fb1",
  title: "4. Energía potencial gravitatoria",
  subtitle: FB1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("ep", "Energía potencial gravitatoria", [
      { kind: "steps", items: [
        "La fuerza gravitatoria es **conservativa**: se define **Ep = −G·M·m/r**, con **Ep = 0 en el infinito**. Es **negativa**: hay que **aportar** energía para alejar la masa.",
        "**Trabajo** entre dos puntos: **W = −ΔEp = G·M·m·(1/r₂ − 1/r₁)** (positivo al acercarse).",
        "Cerca de la superficie, ΔEp ≈ **m·g·Δh**: es la aproximación de Ep general para alturas pequeñas.",
        "**Potencial gravitatorio** V = Ep/m = −G·M/r (J/kg), y la fuerza es el **gradiente cambiado** de Ep.",
      ] },
    ], undefined, "stack"),
    slide("orb", "Energía de un satélite", [
      { kind: "steps", items: [
        "En una órbita circular: **Ec = G·M·m/(2r)**, **Ep = −G·M·m/r** y **Em = −G·M·m/(2r) = −Ec**. Em es **negativa**: el satélite está **ligado**.",
        "**Cambio de órbita**: ΔEm = Em₂ − Em₁ = G·M·m/2 · (1/r₁ − 1/r₂). Subir **cuesta energía**; bajar la **libera** (frenado atmosférico).",
        "**Velocidad de escape**: la que da Em = 0 en la superficie: ½·m·v² = G·M·m/R → v_e = √(2·G·M/R).",
        "Si Em < 0 el movimiento es **ligado** (elipse); Em = 0, **parábola**; Em > 0, **hipérbola**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia de órbita", [
      { kind: "text", text: "Fija una masa y una órbita inicial y sube a otra. ¿Cuánta energía hace falta? ¿Qué le pasa a la velocidad?" },
    ], tool("fb1-energia-orbital-explorador"), "visual-top"),
    slide("cons", "Conservación y momento angular", [
      { kind: "steps", items: [
        "Como sobre el satélite solo actúa la gravedad (conservativa), **Em se conserva** a lo largo de la órbita: **½·m·v² − G·M·m/r = constante**.",
        "Además, al ser una fuerza **central**, se conserva el **momento angular** L = m·r·v·sen φ → 2.ª ley de Kepler.",
        "Combinando ambas se obtiene la **ecuación vis-viva**: v² = G·M·(2/r − 1/a) para una elipse de semieje a.",
      ] },
    ], undefined, "stack"),
    calc("calc-ep", "Ep a distancia", "En un punto, G·M·m/r vale 8·10⁹ J. ¿Cuánto vale la energía potencial, en 10⁹ J? (con signo)", nums(-8), "Ep = −G M m/r = −8·10⁹ J.", "Ep = −GMm/r."),
    calc("calc-em", "Energía de una órbita", "Un satélite tiene Ep = −8·10⁹ J en su órbita circular. ¿Cuánto vale su Em, en 10⁹ J? (con signo)", nums(-4), "Em = Ep/2 = −4·10⁹ J.", "Em = Ep/2 en órbita circular."),
    calc("calc-ec", "Ec orbital", "Con esos datos, ¿cuánto vale la energía cinética, en 10⁹ J?", nums(4), "Ec = −Em = 4·10⁹ J.", "Ec = −Em."),
    calc("calc-esc", "Velocidad de escape", "La Luna tiene g₀ = 1,62 m/s² y R = 1,74·10⁶ m. ¿Cuál es su velocidad de escape, en km/s? (v_e = √(2·g₀·R))", nums(2.37, 2.4, 2.38), "v = √(2·1,62·1,74·10⁶) ≈ 2370 m/s.", "v_e = √(2 g₀ R)."),
    sort("clasifica", "Signo de la energía", "Indica el signo de cada magnitud para un satélite en órbita circular.",
      [["pos", "Positiva", "emerald"], ["neg", "Negativa", "rose"]],
      [["Energía cinética", "pos"], ["Energía potencial gravitatoria", "neg"], ["Energía mecánica", "neg"], ["Energía mecánica de un satélite ligado a la Tierra", "neg"], ["Velocidad orbital al cuadrado", "pos"], ["Trabajo para alejarlo al infinito", "pos"]],
      "Ligado: Em < 0; Ec siempre ≥ 0; el trabajo para escapar es positivo.",
    ),
    pick("check", "Subir de órbita", "Al pasar un satélite a una órbita circular más alta, ¿qué ocurre con su energía mecánica?",
      "Aumenta (se hace menos negativa)",
      [["Disminuye", "Hay que aportarle energía."], ["No cambia", "Em = −GMm/2r depende de r."], ["Se hace positiva", "Seguiría ligado (negativa)."]],
      "Em = −GMm/(2r) crece con r.",
    ),
  ],
};
