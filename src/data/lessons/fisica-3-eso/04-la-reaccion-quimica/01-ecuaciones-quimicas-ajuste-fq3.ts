import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ecuacionesQuimicasAjusteFq3Lesson: InteractiveLesson = {
  slug: "ecuaciones-quimicas-ajuste-fq3",
  title: "1. Ecuaciones químicas y ajuste",
  subtitle: FQ3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Escribir una reacción", [
      { kind: "steps", items: [
        "En una **reacción química** unas sustancias, los **reactivos**, se transforman en otras, los **productos**: se **rompen** enlaces y se **forman** otros nuevos.",
        "Se representa con una **ecuación química**: **reactivos → productos**. Por ejemplo, **CH₄ + 2 O₂ → CO₂ + 2 H₂O**.",
        "Los **coeficientes** (los números delante de cada fórmula) indican cuántas **moléculas** (o moles) intervienen. Los **subíndices** no se pueden cambiar.",
        "Los **átomos no se crean ni se destruyen**: la ecuación debe tener los **mismos átomos** de cada elemento a ambos lados (**ecuación ajustada**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ajusta la ecuación", [
      { kind: "text", text: "Cambia los coeficientes hasta que haya los mismos átomos a los dos lados." },
    ], tool("fq2-ajuste-ecuacion-explorador"), "visual-top"),
    slide("metodo", "Método de ajuste", [
      { kind: "steps", items: [
        "**1.** Cuenta los átomos de cada elemento en reactivos y productos.",
        "**2.** Empieza por los elementos que aparecen en **una sola fórmula** de cada lado; deja para el final el **O** y el **H**.",
        "**3.** Cambia **solo coeficientes**, uno a uno, y recuenta.",
        "**4.** Comprueba que los coeficientes son los **números enteros más pequeños**.",
      ] },
    ]),
    slide("leer", "Interpretar la ecuación", [
      { kind: "steps", items: [
        "**2 H₂ + O₂ → 2 H₂O** se lee: 2 moléculas de hidrógeno reaccionan con 1 de oxígeno y forman 2 de agua.",
        "También: **2 mol** de H₂ + **1 mol** de O₂ → **2 mol** de H₂O.",
        "Y en masa: **4 g** de H₂ + **32 g** de O₂ → **36 g** de H₂O.",
      ] },
    ]),
    calc("calc-o", "Átomos de oxígeno", "En el lado de los productos de la ecuación CH₄ + 2 O₂ → CO₂ + 2 H₂O, ¿cuántos átomos de oxígeno hay en total?", nums(4), "En CO₂ hay 2 y en 2 H₂O hay 2: 2 + 2 = 4.", "Suma los átomos de O de cada fórmula multiplicados por su coeficiente."),
    calc("calc-coef", "Coeficiente", "Para ajustar N₂ + x H₂ → 2 NH₃, ¿cuánto vale x?", nums(3), "A la derecha hay 2·3 = 6 átomos de H, luego x = 3.", "Cuenta los H del lado derecho."),
    calc("calc-coef2", "Ajuste del agua", "Para ajustar x H₂ + O₂ → 2 H₂O, ¿cuánto vale x?", nums(2), "A la derecha hay 4 H: x = 2.", "Cuenta los H de 2 H₂O."),
    sort("clasifica", "Ajustada o no", "Clasifica cada ecuación.",
      [["si", "Ajustada", "emerald"], ["no", "Sin ajustar", "rose"]],
      [["2 H₂ + O₂ → 2 H₂O", "si"], ["N₂ + 3 H₂ → 2 NH₃", "si"], ["CH₄ + 2 O₂ → CO₂ + 2 H₂O", "si"], ["H₂ + O₂ → H₂O", "no"], ["N₂ + H₂ → NH₃", "no"], ["Mg + O₂ → MgO", "no"]],
      "Debe haber igual número de átomos de cada elemento en los dos lados.",
    ),
    pick("check", "Subíndices", "Para ajustar una ecuación, ¿qué se puede cambiar?",
      "Solo los coeficientes",
      [["Los subíndices de las fórmulas", "Cambiarían la sustancia."], ["Los símbolos de los elementos", "No se pueden modificar."], ["Los reactivos por otros", "Entonces sería otra reacción."]],
      "Los subíndices definen la sustancia; los coeficientes, la cantidad.",
    ),
  ],
};
