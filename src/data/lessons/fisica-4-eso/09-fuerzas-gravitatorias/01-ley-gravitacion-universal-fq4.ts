import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const leyGravitacionUniversalFq4Lesson: InteractiveLesson = {
  slug: "ley-gravitacion-universal-fq4",
  title: "1. Ley de gravitación universal",
  subtitle: FQ4_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("hist", "De Kepler a Newton", [
      { kind: "steps", items: [
        "**Modelo geocéntrico** (Ptolomeo): la Tierra, inmóvil en el centro. **Heliocéntrico** (Copérnico): los planetas giran en torno al Sol.",
        "**Kepler** describió cómo se mueven los planetas: órbitas **elípticas**, el Sol en un foco; los planetas van **más rápido** cuando están más cerca del Sol.",
        "**Newton** (1687) explicó **por qué**: la misma fuerza que hace caer una manzana mantiene a la Luna en su órbita. Es la **gravitación universal**.",
        "Con ella se unifican la mecánica terrestre y la celeste: las mismas leyes valen en la Tierra y en el cielo.",
      ] },
    ], undefined, "stack"),
    slide("ley", "La ley", [
      { kind: "text", text: "Dos cuerpos cualesquiera se atraen con una fuerza **F = G·m₁·m₂/d²**, con **G = 6,674·10⁻¹¹ N·m²/kg²**. Es **proporcional a las masas** e **inversa al cuadrado de la distancia**. La fuerza es **atractiva**, actúa en la **línea que une los centros** y forma un **par acción-reacción**: el cuerpo 1 atrae al 2 con la misma fuerza que el 2 al 1." },
    ]),
    slide("explora", "Cambia masas y distancia", [
      { kind: "text", text: "Duplica la distancia y observa qué pasa con la fuerza. ¿Y si duplicas una de las masas?" },
    ], tool("fq4-gravitacion-explorador"), "visual-top"),
    slide("nota", "Consecuencias", [
      { kind: "steps", items: [
        "**Doble distancia → fuerza ÷ 4**; triple distancia → ÷ 9. **Doble masa → fuerza × 2**.",
        "La fuerza gravitatoria es **muy débil** entre objetos cotidianos (por eso no nos atraemos entre personas) y solo se nota si hay una masa enorme.",
        "Tiene **alcance infinito**: disminuye con la distancia, pero nunca es cero.",
        "Es siempre **atractiva**, a diferencia de la fuerza eléctrica, que puede ser atractiva o repulsiva.",
      ] },
    ], undefined, "stack"),
    calc("calc-dist", "Doble distancia", "La fuerza gravitatoria entre dos cuerpos es 80 N. ¿Cuánto valdrá, en N, si se duplica la distancia entre ellos?", nums(20), "F ∝ 1/d²: 80/4 = 20 N.", "Doble distancia, F ÷ 4."),
    calc("calc-masa", "Doble masa", "Si se triplica la masa de uno de los cuerpos, la fuerza se multiplica por… (escribe el factor)", nums(3), "F es proporcional a la masa: × 3.", "Proporcionalidad directa."),
    calc("calc-f", "Calcular F", "Dos esferas de 1000 kg están a 1 m de distancia. ¿Cuánto vale F, en 10⁻⁵ N? (G = 6,67·10⁻¹¹; F = G·m₁·m₂/d²)", nums(6.67, 6.7, 6.674), "F = 6,67·10⁻¹¹·10⁶/1 = 6,67·10⁻⁵ N.", "Sustituye en la fórmula."),
    sort("clasifica", "Cómo cambia la fuerza", "¿Qué le pasa a F en cada caso?",
      [["au", "Aumenta", "rose"], ["di", "Disminuye", "cobalt"], ["ig", "No cambia", "emerald"]],
      [["Se acercan los cuerpos", "au"], ["Se alejan los cuerpos", "di"], ["Se duplica una masa", "au"], ["Se intercambian las dos masas de posición (misma distancia)", "ig"], ["Se divide una masa por la mitad", "di"], ["Cambia la dirección de la recta que los une (misma distancia)", "ig"]],
      "F depende del producto de las masas y de la distancia.",
    ),
    pick("check", "Acción y reacción", "La Tierra atrae a la Luna con una fuerza F. ¿Con qué fuerza atrae la Luna a la Tierra?",
      "Con la misma fuerza F",
      [["Con una fuerza menor, por ser más pequeña", "Es igual en módulo; solo la aceleración difiere."], ["Con una fuerza mayor", "Son iguales."], ["Con ninguna fuerza", "La atracción es mutua."]],
      "Par acción-reacción: mismo módulo, sentido opuesto.",
    ),
  ],
};
