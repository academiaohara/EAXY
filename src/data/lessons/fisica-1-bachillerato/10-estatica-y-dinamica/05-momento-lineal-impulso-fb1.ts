import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const momentoLinealImpulsoFb1Lesson: InteractiveLesson = {
  slug: "momento-lineal-impulso-fb1",
  title: "5. Momento lineal e impulso",
  subtitle: FB1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("p", "Momento lineal", [
      { kind: "steps", items: [
        "El **momento lineal** (cantidad de movimiento) es **p = m·v** (kg·m/s), un vector con la dirección de v.",
        "La 2.ª ley en su forma general: **ΣF = dp/dt**. Si la masa es constante, equivale a ΣF = m·a.",
        "**Impulso** de una fuerza: **I = F·Δt** (N·s) = **Δp**. Una fuerza grande en poco tiempo puede dar el mismo impulso que una pequeña durante más tiempo (de ahí los **airbags** y los **colchones**).",
        "Para un **sistema** de cuerpos: **p_total = Σ mᵢ·vᵢ**; las fuerzas internas no la cambian.",
      ] },
    ], undefined, "stack"),
    slide("cons", "Conservación del momento", [
      { kind: "steps", items: [
        "Si la **fuerza externa neta es nula**, el momento lineal total **se conserva**: **Σp antes = Σp después**.",
        "Es consecuencia de la **3.ª ley** (las fuerzas internas son iguales y opuestas) y vale también cuando las fuerzas internas son muy grandes: **choques**, **explosiones**, **retroceso** de un arma, **cohetes**.",
        "Es una ecuación **vectorial**: en dimensión 1, se pone signo a cada velocidad.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Choques", [
      { kind: "text", text: "Haz chocar dos cuerpos. Cambia las masas, las velocidades y el coeficiente de restitución. ¿Qué se conserva siempre? ¿Y cuándo se conserva la energía cinética?" },
    ], tool("fb1-choque-explorador"), "visual-top"),
    slide("tipos", "Tipos de choque", [
      { kind: "steps", items: [
        "**Elástico** (e = 1): se conservan **p** y **Ec**. Velocidades finales: v₁′ = ((m₁ − m₂)v₁ + 2m₂v₂)/(m₁ + m₂); v₂′ = ((m₂ − m₁)v₂ + 2m₁v₁)/(m₁ + m₂).",
        "**Inelástico** (0 < e < 1): se conserva **p**, no la Ec (se disipa en deformación y calor).",
        "**Totalmente inelástico** (e = 0): quedan unidos con **v′ = (m₁v₁ + m₂v₂)/(m₁ + m₂)**; la pérdida de Ec es máxima.",
        "**Coeficiente de restitución**: e = (v₂′ − v₁′)/(v₁ − v₂): velocidad relativa de separación entre la de acercamiento.",
      ] },
    ], undefined, "stack"),
    calc("calc-p", "Momento", "Un coche de 1000 kg circula a 15 m/s. ¿Cuánto vale su momento lineal, en kg·m/s?", nums(15000), "p = 1000·15 = 15 000 kg·m/s.", "p = m·v."),
    calc("calc-imp", "Impulso", "Una pelota de 0,4 kg llega a 10 m/s y sale en sentido contrario a 10 m/s. ¿Qué impulso recibe, en N·s? (módulo)", nums(8), "Δp = 0,4·10 − 0,4·(−10) = 8 N·s.", "Cuidado con el signo."),
    calc("calc-ine", "Choque inelástico", "Un vagón de 2000 kg a 3 m/s choca y se une a otro de 1000 kg en reposo. ¿A qué velocidad se mueven juntos, en m/s?", nums(2), "v = 6000/3000 = 2 m/s.", "Conservación de p."),
    calc("calc-retro", "Retroceso", "Un cañón de 500 kg dispara un proyectil de 5 kg a 200 m/s. ¿Cuál es la velocidad de retroceso del cañón, en m/s? (módulo)", nums(2), "0 = 5·200 − 500·v → v = 2 m/s.", "p total inicial nulo."),
    sort("clasifica", "Qué se conserva", "Indica qué magnitud se conserva en cada caso (sistema aislado).",
      [["p", "Solo p", "cobalt"], ["ambas", "p y Ec", "emerald"]],
      [["Choque entre dos bolas de billar (ideal)", "ambas"], ["Dos vagones que se enganchan", "p"], ["Explosión de un petardo", "p"], ["Choque de coches con deformación", "p"], ["Choque entre dos bolas de acero muy duras (ideal)", "ambas"], ["Un proyectil que se incrusta en un bloque", "p"]],
      "El momento se conserva siempre; la energía cinética solo si es elástico.",
    ),
    pick("check", "Choque elástico", "Una bola choca elásticamente con otra idéntica en reposo. ¿Qué ocurre?",
      "Se intercambian las velocidades: la primera se detiene y la segunda sale con la velocidad inicial",
      [["Las dos salen con la mitad de la velocidad", "No se conservaría Ec."], ["La primera rebota con la misma velocidad", "Eso exigiría otra masa."], ["Quedan unidas", "Eso sería inelástico."]],
      "Con m₁ = m₂ y e = 1, v₁′ = v₂ y v₂′ = v₁.",
    ),
  ],
};
