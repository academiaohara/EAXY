import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const numerosOxidacionFq4Lesson: InteractiveLesson = {
  slug: "numeros-oxidacion-fq4",
  title: "1. Números de oxidación",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Qué es el número de oxidación?", [
      { kind: "steps", items: [
        "El **número de oxidación** (nº de oxidación o estado de oxidación) es la **carga que tendría un átomo** si todos sus enlaces fueran iónicos. Se escribe con **signo**: +3, −2.",
        "Indica cuántos electrones **cede** (+) o **gana** (−) el átomo al combinarse; permite **formular** y **nombrar** compuestos.",
        "Un mismo elemento puede tener **varios** números de oxidación: el hierro, +2 y +3; el cloro, −1, +1, +3, +5 y +7.",
      ] },
    ], undefined, "stack"),
    slide("reglas", "Reglas básicas", [
      { kind: "steps", items: [
        "Un **elemento libre** (Fe, O₂, H₂, Cl₂) tiene nº de oxidación **0**.",
        "**Oxígeno**: **−2** (excepto en peróxidos, −1). **Hidrógeno**: **+1** (excepto en hidruros metálicos, −1).",
        "**Alcalinos** (Li, Na, K): **+1**. **Alcalinotérreos** (Mg, Ca, Ba): **+2**. **Aluminio**: **+3**. **Flúor**: **−1**.",
        "En un **compuesto neutro**, la **suma** de los números de oxidación de todos los átomos es **0**; en un **ion**, es su **carga**.",
      ] },
    ]),
    slide("explora", "Calcula la incógnita", [
      { kind: "text", text: "Elige un compuesto y mira cómo se plantea la suma para hallar el nº de oxidación que falta." },
    ], tool("fq4-oxidacion-explorador"), "visual-top"),
    calc("calc-s", "Azufre", "En el ácido sulfúrico, H₂SO₄: 2·(+1) + x + 4·(−2) = 0. ¿Cuánto vale x?", nums(6), "2 + x − 8 = 0 → x = +6.", "Despeja x."),
    calc("calc-n", "Nitrógeno", "¿Cuál es el nº de oxidación del N en el HNO₃?", nums(5), "(+1) + x + 3·(−2) = 0 → x = +5.", "H +1, O −2."),
    calc("calc-mn", "Manganeso", "¿Cuál es el nº de oxidación del Mn en el KMnO₄?", nums(7), "(+1) + x + 4·(−2) = 0 → x = +7.", "K +1, O −2."),
    calc("calc-cr", "Cromo", "¿Cuál es el nº de oxidación del Cr en el K₂Cr₂O₇?", nums(6), "2·(+1) + 2x + 7·(−2) = 0 → 2x = 12 → x = +6.", "Hay dos átomos de Cr."),
    calc("calc-nh3", "Nitrógeno en el amoniaco", "¿Cuál es el nº de oxidación del N en el NH₃? (con signo)", nums(-3), "x + 3·(+1) = 0 → x = −3.", "El H es +1."),
    sort("clasifica", "Nº de oxidación del oxígeno", "Clasifica cada situación según el nº de oxidación del oxígeno.",
      [["m2", "O = −2", "emerald"], ["m1", "O = −1", "amber"], ["cero", "O = 0", "cobalt"]],
      [["En el agua, H₂O", "m2"], ["En el CO₂", "m2"], ["En el H₂SO₄", "m2"], ["En el agua oxigenada, H₂O₂ (peróxido)", "m1"], ["En el peróxido de sodio, Na₂O₂", "m1"], ["En la molécula de O₂", "cero"]],
      "El oxígeno vale −2 casi siempre; −1 en peróxidos; 0 como elemento libre.",
    ),
    pick("check", "Suma de números de oxidación", "En un compuesto neutro, ¿cuánto suman los números de oxidación de todos los átomos?",
      "Cero",
      [["La carga del átomo central", "En un compuesto neutro la suma total es 0."], ["+1", "No hay un valor fijo distinto de 0."], ["El número de átomos", "No tiene relación."]],
      "Un compuesto es eléctricamente neutro.",
    ),
  ],
};
