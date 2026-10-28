import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const combustionOxidacionEnergiaFq3Lesson: InteractiveLesson = {
  slug: "combustion-oxidacion-energia-fq3",
  title: "4. Combustión, oxidación y energía de las reacciones",
  subtitle: FQ3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Reacciones del entorno", [
      { kind: "steps", items: [
        "**Combustión**: reacción de un **combustible** con el **oxígeno** que desprende **luz y calor** (gas, gasolina, madera). Con carbono e hidrógeno se forman **CO₂** y **H₂O**.",
        "**Oxidación**: reacción de una sustancia con el **oxígeno**, más **lenta** y sin llama: el hierro forma **herrumbre**; una manzana cortada se oscurece.",
        "**Neutralización**: un **ácido** y una **base** reaccionan y dan una **sal** y **agua**.",
        "**Fotosíntesis** y **respiración**: reacciones de los seres vivos con CO₂, H₂O, glucosa y O₂.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Energía de las reacciones", [
      { kind: "text", text: "Elige una reacción y mira si desprende o absorbe energía." },
    ], tool("fq3-reacciones-entorno-explorador"), "visual-top"),
    slide("ener", "Exotérmicas y endotérmicas", [
      { kind: "steps", items: [
        "En toda reacción hay un **balance de energía**: romper enlaces **cuesta** energía y formarlos la **libera**.",
        "**Exotérmica**: desprende energía (calor o luz): combustiones, neutralizaciones, oxidaciones.",
        "**Endotérmica**: absorbe energía del entorno: fotosíntesis, descomposición de la caliza.",
        "La energía **total** se conserva: solo cambia de forma.",
      ] },
    ]),
    slide("fuego", "El triángulo del fuego", [
      { kind: "steps", items: [
        "Para que haya **fuego** hacen falta tres cosas: **combustible**, **comburente** (oxígeno) y **energía de activación** (una chispa o calor).",
        "Para **apagarlo** basta con quitar **uno** de los tres: aislar del oxígeno (manta, espuma), enfriar (agua) o retirar el combustible.",
      ] },
    ]),
    sort("clasifica", "Exotérmica o endotérmica", "Clasifica cada proceso.",
      [["exo", "Exotérmica", "rose"], ["end", "Endotérmica", "cobalt"]],
      [["Quemar gas natural", "exo"], ["Neutralizar un ácido con una base", "exo"], ["Oxidación del hierro", "exo"], ["Fotosíntesis", "end"], ["Descomposición de la caliza", "end"], ["Descomponer el agua con electricidad (electrólisis)", "end"]],
      "Si se desprende calor o luz, es exotérmica; si necesita aporte, endotérmica.",
    ),
    calc("calc-prod", "Productos de la combustión", "En la combustión completa del metano, CH₄ + 2 O₂ → CO₂ + 2 H₂O, ¿cuántas moléculas de agua se forman por cada molécula de metano?", nums(2), "El coeficiente del agua es 2.", "Mira el coeficiente."),
    calc("calc-masa", "Oxígeno consumido", "Al quemar 16 g de CH₄ se forman 44 g de CO₂ y 36 g de H₂O. ¿Cuántos gramos de oxígeno se han consumido?", nums(64), "(44 + 36) − 16 = 64 g.", "Aplica la conservación de la masa."),
    pick("check", "Apagar un fuego", "Si se tapa una sartén que arde con una tapa, el fuego se apaga. ¿Qué lado del triángulo se elimina?",
      "El comburente (el oxígeno)",
      [["El combustible", "El aceite sigue ahí."], ["La energía de activación", "La sartén sigue caliente."], ["Ninguno: se apaga solo", "Se corta el aporte de oxígeno."]],
      "Sin oxígeno no hay combustión.",
    ),
  ],
};
