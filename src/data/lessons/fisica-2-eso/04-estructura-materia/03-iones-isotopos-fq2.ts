import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ionesIsotoposFq2Lesson: InteractiveLesson = {
  slug: "iones-isotopos-fq2",
  title: "3. Iones e isótopos",
  subtitle: FQ2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos formas de cambiar un átomo", [
      { kind: "steps", items: [
        "Un átomo puede **cambiar el número de electrones**: se convierte en un **ion**.",
        "O puede tener **distinto número de neutrones**: es un **isótopo** del mismo elemento.",
        "Si cambia el número de **protones**, ya es **otro elemento**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia electrones y neutrones", [
      { kind: "text", text: "Elige un elemento. Cambia los neutrones para obtener isótopos y la carga para obtener iones." },
    ], tool("fq2-iones-isotopos-explorador"), "visual-top"),
    slide("iones", "Los iones", [
      { kind: "steps", items: [
        "Si un átomo **pierde** electrones queda con carga **positiva**: **catión** (Na → Na⁺, Ca → Ca²⁺).",
        "Si **gana** electrones queda con carga **negativa**: **anión** (Cl → Cl⁻, O → O²⁻).",
        "Los átomos tienden a ganar o perder electrones hasta tener la **última capa completa** (como los gases nobles).",
        "Los iones de carga opuesta se **atraen**: así se forman los compuestos **iónicos** como la sal (Na⁺ y Cl⁻).",
      ] },
    ]),
    slide("isotopos", "Los isótopos", [
      { kind: "steps", items: [
        "Los **isótopos** de un elemento tienen el **mismo Z** pero **distinto A**.",
        "Ejemplo: el **hidrógeno** tiene tres isótopos: protio (0 neutrones), deuterio (1) y tritio (2).",
        "El **carbono-12** y el **carbono-14** son isótopos; el segundo es radiactivo y se usa para **datar** restos arqueológicos.",
        "La **masa atómica** que aparece en la tabla periódica es la **media** de los isótopos del elemento.",
      ] },
    ]),
    calc("calc-ion", "Electrones de un catión", "Un átomo de sodio (Z = 11) pierde un electrón y forma Na⁺. ¿Cuántos electrones tiene el ion?", nums(10), "11 − 1 = 10 electrones.", "Un catión tiene menos electrones que protones."),
    calc("calc-anion", "Electrones de un anión", "Un átomo de cloro (Z = 17) gana un electrón y forma Cl⁻. ¿Cuántos electrones tiene el ion?", nums(18), "17 + 1 = 18 electrones.", "Un anión tiene más electrones que protones."),
    calc("calc-iso", "Neutrones de un isótopo", "El carbono-14 tiene A = 14 y Z = 6. ¿Cuántos neutrones tiene?", nums(8), "14 − 6 = 8 neutrones (el carbono-12 tiene 6).", "Resta Z a A."),
    sort("clasifica", "Ion o isótopo", "Clasifica cada cambio.",
      [["ion", "Se forma un ion", "cobalt"], ["iso", "Se forma un isótopo", "amber"]],
      [["El átomo pierde un electrón", "ion"], ["El átomo gana dos electrones", "ion"], ["Se forma un catión o un anión", "ion"], ["Cambia el número de neutrones", "iso"], ["Cambia el número másico y no la carga", "iso"], ["Deuterio frente a protio", "iso"]],
      "Los iones cambian los electrones; los isótopos, los neutrones.",
    ),
    pick("check", "Carga", "Un átomo de Z = 12 tiene 10 electrones. ¿Qué ion es?",
      "Un catión con carga 2+",
      [["Un anión con carga 2−", "Tiene más protones que electrones."], ["Un átomo neutro", "Los números no coinciden."], ["Un catión con carga 1+", "La diferencia es dos."]],
      "12 protones − 10 electrones = +2.",
    ),
  ],
};
