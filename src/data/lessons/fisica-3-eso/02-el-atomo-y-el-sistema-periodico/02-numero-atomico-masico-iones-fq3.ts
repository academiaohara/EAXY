import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const numeroAtomicoMasicoIonesFq3Lesson: InteractiveLesson = {
  slug: "numero-atomico-masico-iones-fq3",
  title: "2. Número atómico, másico e iones",
  subtitle: FQ3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Z y A", [
      { kind: "steps", items: [
        "El **número atómico Z** es el número de **protones**. Define el elemento: si cambia Z, cambia el elemento.",
        "El **número másico A** es la suma de **protones y neutrones** (el número de nucleones): A = Z + N.",
        "Un **átomo neutro** tiene tantos **electrones** como protones.",
        "Se escribe ᴬ_Z X: por ejemplo, ²³₁₁Na tiene 11 protones, 12 neutrones y, si es neutro, 11 electrones.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Construye partículas", [
      { kind: "text", text: "Cambia protones, neutrones y electrones. ¿Qué elemento, qué isótopo, qué carga?" },
    ], tool("fq2-construir-atomo-explorador"), "visual-top"),
    slide("iones", "Iones", [
      { kind: "steps", items: [
        "Un **ion** es un átomo (o grupo de átomos) con **carga eléctrica** porque ha ganado o perdido **electrones**. Los **protones no cambian**.",
        "Si **pierde** electrones queda con carga **positiva**: **catión** (Na⁺, Ca²⁺).",
        "Si **gana** electrones queda con carga **negativa**: **anión** (Cl⁻, O²⁻).",
        "**Carga = protones − electrones**.",
      ] },
    ]),
    calc("calc-n", "Neutrones", "El carbono-14 tiene Z = 6. ¿Cuántos neutrones tiene?", nums(8), "N = A − Z = 14 − 6 = 8.", "Resta el número atómico al másico."),
    calc("calc-e", "Electrones de un ion", "El ion Ca²⁺ tiene Z = 20. ¿Cuántos electrones tiene?", nums(18), "Pierde 2 electrones: 20 − 2 = 18.", "Carga = protones − electrones."),
    calc("calc-anion", "Anión", "El ion cloruro Cl⁻ tiene 18 electrones. ¿Cuántos protones tiene?", nums(17), "Carga −1: p = e − 1 = 17.", "Los protones no cambian al formarse el ion."),
    sort("clasifica", "Átomo, catión o anión", "Clasifica cada especie.",
      [["at", "Átomo neutro", "cobalt"], ["ca", "Catión", "amber"], ["an", "Anión", "rose"]],
      [["11 protones y 11 electrones", "at"], ["8 protones y 8 electrones", "at"], ["12 protones y 10 electrones", "ca"], ["11 protones y 10 electrones", "ca"], ["17 protones y 18 electrones", "an"], ["8 protones y 10 electrones", "an"]],
      "Compara protones con electrones.",
    ),
    pick("check", "Cambio de elemento", "¿Qué debe cambiar para que un átomo se convierta en otro elemento?",
      "El número de protones",
      [["El número de electrones", "Eso da un ion del mismo elemento."], ["El número de neutrones", "Eso da otro isótopo."], ["Nada: todos son iguales", "El elemento lo define Z."]],
      "Z identifica el elemento.",
    ),
  ],
};
