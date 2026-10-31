import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tensionPoleasFq4Lesson: InteractiveLesson = {
  slug: "tension-poleas-fq4",
  title: "4. Tensión y poleas",
  subtitle: FQ4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("tension", "La tensión", [
      { kind: "steps", items: [
        "La **tensión T** es la fuerza que ejerce una **cuerda** (o cable) sobre los cuerpos que une. Siempre **tira**, nunca empuja, y es **paralela** a la cuerda.",
        "**Cuerda ideal**: inextensible y sin masa. Todos los cuerpos unidos tienen el **mismo módulo de aceleración**.",
        "**Polea ideal**: sin masa ni rozamiento; solo **cambia la dirección** de la cuerda. La tensión es la **misma** a ambos lados.",
        "Un cuerpo colgado **en reposo**: T = P = m·g.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Atwood y bloque en mesa", [
      { kind: "text", text: "Cambia las masas. ¿Hacia dónde se mueve el sistema? ¿Cuánto vale la tensión?" },
    ], tool("fq4-poleas-explorador"), "visual-top"),
    slide("metodo", "Método para sistemas de cuerpos", [
      { kind: "steps", items: [
        "**1.** Dibuja las fuerzas de **cada cuerpo** por separado.",
        "**2.** Elige el sentido positivo **a favor del movimiento** (en cada cuerpo).",
        "**3.** Aplica **ΣF = m·a** a cada cuerpo: aparecen dos ecuaciones con **T** y **a**.",
        "**4.** Suma las ecuaciones: **T se cancela** y despejas a; después, T.",
      ] },
    ], undefined, "stack"),
    slide("formulas", "Resultados útiles", [
      { kind: "text", text: "**Atwood** (m₂ > m₁): **a = (m₂ − m₁)·g/(m₁ + m₂)**, **T = 2·m₁·m₂·g/(m₁ + m₂)**. **Bloque en mesa lisa** (m₁) tirado por m₂ colgando: **a = m₂·g/(m₁ + m₂)**, **T = m₁·a**. La tensión es **menor que el peso** del cuerpo que baja y **mayor** que el del que sube." },
    ]),
    calc("calc-eq", "Cuerpo colgado", "Un cuerpo de 4 kg cuelga en reposo de una cuerda. ¿Cuánto vale la tensión, en N? (g = 10 m/s²)", nums(40), "T = P = m·g = 40 N.", "En equilibrio T = P."),
    calc("calc-at", "Máquina de Atwood", "En una máquina de Atwood hay m₁ = 2 kg y m₂ = 3 kg. ¿Cuánto vale la aceleración, en m/s²? (g = 10 m/s²)", nums(2), "a = (3 − 2)·10/5 = 2 m/s².", "a = (m₂ − m₁)·g/(m₁ + m₂)."),
    calc("calc-t", "Tensión en Atwood", "Con los mismos datos (2 kg y 3 kg, g = 10 m/s²), ¿cuánto vale la tensión, en N?", nums(24), "T = 2·2·3·10/5 = 24 N.", "T = 2·m₁·m₂·g/(m₁ + m₂)."),
    calc("calc-mesa", "Bloque en mesa lisa", "Un bloque de 3 kg en una mesa sin rozamiento está unido a otro de 2 kg colgando. ¿Qué aceleración tiene, en m/s²? (g = 10 m/s²)", nums(4), "a = m₂·g/(m₁ + m₂) = 20/5 = 4 m/s².", "Solo tira el peso del colgante."),
    sort("clasifica", "Aceleración en una Atwood", "¿Cómo cambia el módulo de la aceleración de una máquina de Atwood en cada caso?",
      [["au", "Aumenta", "rose"], ["di", "Disminuye", "cobalt"], ["ig", "No cambia", "emerald"]],
      [["Aumentar m₂ manteniendo m₁", "au"], ["Aumentar la diferencia de masas con la misma suma", "au"], ["Acercar las masas hasta casi igualarlas", "di"], ["Añadir la misma masa a ambos cuerpos", "di"], ["Llevar el montaje a la Luna (g menor)", "di"], ["Intercambiar los cuerpos de lado", "ig"]],
      "a = (m₂ − m₁)·g/(m₁ + m₂): crece con la diferencia y con g, y baja con la masa total.",
    ),
    pick("check", "Misma aceleración", "¿Por qué los dos cuerpos de una polea ideal tienen la misma aceleración (en módulo)?",
      "Porque la cuerda es inextensible",
      [["Porque tienen la misma masa", "No tienen por qué."], ["Porque pesan lo mismo", "No tienen por qué."], ["Porque no hay gravedad", "La gravedad es la causa."]],
      "Cuerda inextensible: si uno baja una longitud, el otro sube la misma.",
    ),
  ],
};
