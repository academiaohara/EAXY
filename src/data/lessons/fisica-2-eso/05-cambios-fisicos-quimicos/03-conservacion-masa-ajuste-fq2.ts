import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const conservacionMasaAjusteFq2Lesson: InteractiveLesson = {
  slug: "conservacion-masa-ajuste-fq2",
  title: "3. Conservación de la masa y ajuste de ecuaciones",
  subtitle: FQ2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "La ley de Lavoisier", [
      { kind: "steps", items: [
        "**Antoine Lavoisier** (1789) comprobó con balanzas que, en una reacción en un **recipiente cerrado**, la **masa total no cambia**.",
        "**Ley de conservación de la masa**: la masa de los reactivos es igual a la masa de los productos.",
        "Se explica porque los **átomos** se conservan: solo se **reordenan**.",
        "Si parece que se «pierde» masa (al quemar madera), es porque **escapan gases** que no se pesaron; en un recipiente cerrado la masa es la misma.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Los átomos se conservan", [
      { kind: "text", text: "Mira cómo se reordenan los átomos al formarse agua y cuenta los átomos antes y después." },
    ], anim("fq2-lavoisier"), "visual-top"),
    slide("ajuste", "Ajustar una ecuación", [
      { kind: "text", text: "Pon coeficientes delante de cada fórmula hasta que haya los mismos átomos de cada elemento a los dos lados." },
    ], tool("fq2-ajuste-ecuacion-explorador"), "visual-top"),
    slide("reglas", "Cómo se ajusta", [
      { kind: "steps", items: [
        "Se **cuentan** los átomos de cada elemento a cada lado.",
        "Se **ponen coeficientes** delante de las fórmulas (nunca se cambian los **subíndices**: eso cambiaría la sustancia).",
        "Se empieza por los elementos que aparecen en **un solo compuesto** de cada lado y se deja para el final el oxígeno o el hidrógeno.",
        "Se **comprueba** que todos los elementos quedan igualados.",
      ] },
    ]),
    calc("calc-masa", "Masa de producto", "En un recipiente cerrado reaccionan 4 g de hidrógeno con 32 g de oxígeno y se forma agua. ¿Cuántos gramos de agua se forman?", nums(36), "Se conserva la masa: 4 + 32 = 36 g.", "Suma las masas de los reactivos."),
    calc("calc-mag", "Magnesio", "Al quemar 24 g de magnesio con 16 g de oxígeno se forma óxido de magnesio. ¿Cuántos gramos de óxido se obtienen?", nums(40), "24 + 16 = 40 g.", "Los átomos no se pierden."),
    calc("calc-perdida", "Gas desprendido", "Se queman 10 g de madera con 30 g de oxígeno y quedan 2 g de cenizas. Los gases formados pesan en total, ¿cuántos gramos?", nums(38), "10 + 30 = 40 g de reactivos; 40 − 2 = 38 g de gases.", "Total inicial menos las cenizas."),
    sort("clasifica", "Ajustada o no", "Clasifica cada ecuación.",
      [["aj", "Ajustada", "cobalt"], ["na", "No ajustada", "amber"]],
      [["2 H₂ + O₂ → 2 H₂O", "aj"], ["N₂ + 3 H₂ → 2 NH₃", "aj"], ["CH₄ + 2 O₂ → CO₂ + 2 H₂O", "aj"], ["H₂ + O₂ → H₂O", "na"], ["N₂ + H₂ → NH₃", "na"], ["Mg + O₂ → MgO", "na"]],
      "Hay que contar los átomos de cada elemento a ambos lados.",
    ),
    pick("check", "Subíndices", "Para ajustar una ecuación, ¿qué NO se debe hacer?",
      "Cambiar los subíndices de las fórmulas",
      [["Poner coeficientes delante", "Es lo que hay que hacer."], ["Contar los átomos", "Es el primer paso."], ["Comprobar el resultado", "Siempre hay que hacerlo."]],
      "Cambiar un subíndice cambia la sustancia (H₂O no es lo mismo que H₂O₂).",
    ),
  ],
};
