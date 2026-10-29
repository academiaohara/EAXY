import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pesoNormalRozamientoFq4Lesson: InteractiveLesson = {
  slug: "peso-normal-rozamiento-fq4",
  title: "2. Peso, normal y rozamiento",
  subtitle: FQ4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("peso", "Peso y normal", [
      { kind: "steps", items: [
        "El **peso** es la fuerza con que la Tierra atrae un cuerpo: **P = m·g**, con g ≈ 9,8 m/s² cerca de la superficie. Apunta hacia abajo.",
        "La **normal N** es la fuerza que ejerce una superficie sobre un cuerpo apoyado, **perpendicular** a ella.",
        "En un suelo horizontal sin otras fuerzas verticales, **N = P**. Pero N **no siempre** es igual al peso: si alguien tira de la caja hacia arriba, N disminuye.",
        "Peso y normal **no** son un par acción-reacción: actúan sobre el mismo cuerpo.",
      ] },
    ], undefined, "stack"),
    slide("roz", "Rozamiento", [
      { kind: "steps", items: [
        "El **rozamiento** se opone al **deslizamiento**; aparece por las rugosidades de las superficies en contacto.",
        "**Fr = μ·N**: depende del **material** (coeficiente μ) y de la **normal**, no del área de contacto.",
        "**Estático**: con el cuerpo quieto, Fr = F aplicada hasta un máximo μₑ·N. **Cinético**: con el cuerpo en movimiento, Fr = μ_c·N (algo menor).",
        "Es útil (frenar, caminar) y perjudicial (desgaste, pérdida de energía); se reduce con **lubricantes** y **rodamientos**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuándo empieza a deslizar", [
      { kind: "text", text: "Aumenta la fuerza aplicada. ¿Qué ocurre con el rozamiento antes y después de que el bloque se mueva?" },
    ], tool("fq4-rozamiento-explorador"), "visual-top"),
    slide("pasos", "Cómo se resuelve", [
      { kind: "steps", items: [
        "**1.** Dibuja el cuerpo con todas sus fuerzas (P, N, F, Fr).",
        "**2.** En **vertical**: sin movimiento vertical, ΣF_y = 0, luego N = P (si no hay otra fuerza vertical).",
        "**3.** Calcula **Fr = μ·N** y en **horizontal** aplica ΣF = m·a.",
        "**4.** Comprueba si F supera el rozamiento estático máximo: si no, el cuerpo no se mueve y a = 0.",
      ] },
    ], undefined, "stack"),
    calc("calc-p", "Peso", "¿Cuál es el peso de un cuerpo de 15 kg, en N? (g = 10 m/s²)", nums(150), "P = m·g = 15·10 = 150 N.", "P = m·g."),
    calc("calc-fr", "Rozamiento", "Un bloque de 20 kg desliza sobre un suelo con μ = 0,3. ¿Cuánto vale el rozamiento, en N? (g = 10 m/s²)", nums(60), "Fr = μ·m·g = 0,3·20·10 = 60 N.", "Fr = μ·N con N = m·g."),
    calc("calc-acel", "Aceleración con rozamiento", "Se empuja con 100 N un bloque de 20 kg con rozamiento de 60 N. ¿Qué aceleración tiene, en m/s²?", nums(2), "a = (100 − 60)/20 = 2 m/s².", "ΣF = F − Fr."),
    sort("clasifica", "¿Aumenta el rozamiento?", "Indica si el rozamiento cinético aumenta o no cambia.",
      [["si", "Aumenta", "rose"], ["no", "No cambia", "cobalt"]],
      [["Doblar la masa del bloque", "si"], ["Poner una superficie más rugosa", "si"], ["Apoyar el bloque sobre su cara más grande", "no"], ["Cambiar la velocidad (a baja velocidad)", "no"], ["Cargar encima otra caja", "si"]],
      "Fr = μ·N: depende de μ y de N, no del área.",
    ),
    pick("check", "Normal", "Un libro de 2 kg está apoyado en una mesa horizontal. ¿Qué fuerza ejerce la mesa sobre él? (g = 10 m/s²)",
      "20 N hacia arriba",
      [["20 N hacia abajo", "Esa es el peso."], ["0 N", "Si fuera nula, el libro caería."], ["2 N hacia arriba", "Son kg, no N."]],
      "N = P = m·g = 20 N.",
    ),
  ],
};
