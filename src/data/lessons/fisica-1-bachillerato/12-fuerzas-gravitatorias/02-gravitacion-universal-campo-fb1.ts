import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gravitacionUniversalCampoFb1Lesson: InteractiveLesson = {
  slug: "gravitacion-universal-campo-fb1",
  title: "2. Gravitación universal y campo gravitatorio",
  subtitle: FB1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("ley", "Ley de gravitación universal", [
      { kind: "steps", items: [
        "Dos masas se **atraen** con una fuerza **F = G·M·m/r²**, con **G = 6,674·10⁻¹¹ N·m²/kg²** (constante universal). Es **central**, **atractiva** y varía con el **inverso del cuadrado** de la distancia.",
        "Por la 3.ª ley de Newton las dos masas sufren **fuerzas iguales y opuestas**, aunque la menor sea la que más se acelera.",
        "Newton unificó la **caída de la manzana** y el **movimiento de la Luna**: es la misma fuerza.",
        "En forma vectorial: F = −G·M·m/r² · **u_r** (u_r unitario hacia fuera). Es una fuerza **conservativa**.",
      ] },
    ], undefined, "stack"),
    slide("campo", "Campo gravitatorio", [
      { kind: "steps", items: [
        "Una masa M crea un **campo gravitatorio**; su **intensidad** en un punto es **g = F/m = G·M/r²** (N/kg o m/s²) y apunta al centro de M.",
        "En la **superficie**: g₀ = G·M/R². A una altura h: **g = g₀·R²/(R + h)²**. En la Tierra g₀ ≈ 9,8 m/s²; en la Luna ≈ 1,6; en Marte ≈ 3,7.",
        "**Principio de superposición**: el campo de varias masas es la suma vectorial de sus campos. Hay **puntos de campo nulo** entre dos masas.",
        "**Peso** P = m·g: cambia según el astro y la altura; la **masa** no.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Campo en distintos astros", [
      { kind: "text", text: "Elige un astro y sube. ¿A qué altura baja g a la mitad? ¿Cuánto pesarías en cada sitio?" },
    ], tool("fb1-campo-gravitatorio-explorador"), "visual-top"),
    calc("calc-g", "Gravedad en altura", "g₀ = 10 m/s² en la superficie. ¿Cuánto vale g a una altura igual al radio terrestre (r = 2R), en m/s²?", nums(2.5), "g = 10/4 = 2,5 m/s².", "g ∝ 1/r²."),
    calc("calc-F", "Atracción", "Dos masas de 1000 kg están a 1 m. ¿Con qué fuerza se atraen, en 10⁻⁵ N? (G = 6,67·10⁻¹¹)", nums(6.67, 6.7), "F = 6,67·10⁻¹¹·10⁶/1 = 6,67·10⁻⁵ N.", "F = G m₁ m₂/r²."),
    calc("calc-peso", "Peso en la Luna", "Una persona de 60 kg, ¿cuánto pesa en la Luna (g = 1,6 m/s²), en N?", nums(96), "P = 60·1,6 = 96 N.", "P = m·g."),
    calc("calc-m", "Masa del planeta", "En la superficie de un planeta de radio 6·10⁶ m, g = 10 m/s². ¿Cuánto vale su masa, en 10²⁴ kg? (G = 6,67·10⁻¹¹)", nums(5.4, 5.4, 5.39), "M = g·R²/G = 10·3,6·10¹³/6,67·10⁻¹¹ ≈ 5,4·10²⁴ kg.", "M = g R²/G."),
    sort("clasifica", "Si la distancia se duplica…", "¿Cómo cambia cada magnitud al duplicar la distancia entre las masas?",
      [["c4", "Se divide por 4", "rose"], ["c2", "Se divide por 2", "cobalt"], ["nc", "No cambia", "amber"]],
      [["La fuerza gravitatoria", "c4"], ["La intensidad de campo g", "c4"], ["Las masas de los cuerpos", "nc"], ["La constante G", "nc"], ["La masa de la Tierra", "nc"], ["La relación F/m", "c4"]],
      "Ley del inverso del cuadrado.",
    ),
    pick("check", "Masa y peso", "Un astronauta va a la Luna. ¿Qué cambia?",
      "Su peso disminuye, pero su masa es la misma",
      [["Su masa disminuye", "La masa es propiedad del cuerpo."], ["Ni su peso ni su masa", "El peso depende de g."], ["Su peso aumenta", "g lunar es menor."]],
      "P = m·g, con g distinto.",
    ),
  ],
};
