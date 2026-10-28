import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conservacionMasaCalculosFq3Lesson: InteractiveLesson = {
  slug: "conservacion-masa-calculos-fq3",
  title: "2. Conservación de la masa y cálculos con masas",
  subtitle: FQ3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ley de Lavoisier", [
      { kind: "steps", items: [
        "**Ley de conservación de la masa** (Lavoisier, 1789): en una reacción química, la **masa total de los reactivos** es **igual** a la **masa total de los productos**.",
        "Es consecuencia de que los **átomos se conservan**: solo se reorganizan.",
        "Si parece que la masa cambia es porque no se pesa **todo** (un gas que escapa o que se incorpora, como el O₂ del aire en una combustión).",
        "Además, los reactivos reaccionan siempre en **proporciones fijas** de masa (**ley de Proust**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Pasa de gramos a gramos", [
      { kind: "text", text: "Elige una reacción y una masa de reactivo. Observa cuánto reacciona y cuánto se forma." },
    ], tool("fq3-estequiometria-masas-explorador"), "visual-top"),
    slide("metodo", "Cálculo en tres pasos", [
      { kind: "steps", items: [
        "**1.** Pasa la masa conocida a **moles**: n = m / M.",
        "**2.** Usa los **coeficientes** de la ecuación ajustada: si 1 mol de A da 2 mol de B, n(B) = 2 · n(A).",
        "**3.** Pasa los moles obtenidos a **gramos**: m = n · M.",
        "Ejemplo: 4 g de H₂ → 2 mol → (relación 2 : 2) 2 mol de H₂O → 2 · 18 = **36 g**.",
      ] },
    ]),
    calc("calc-ley", "Conservación", "Se queman 12 g de carbono con 32 g de oxígeno y se forma CO₂. ¿Cuántos gramos de CO₂ se obtienen?", nums(44), "Se conserva la masa: 12 + 32 = 44 g.", "Suma las masas de los reactivos."),
    calc("calc-h2o", "Agua", "En 2 H₂ + O₂ → 2 H₂O, ¿cuántos gramos de agua se forman a partir de 4 g de H₂ y 32 g de O₂?", nums(36), "Por la conservación de la masa: 4 + 32 = 36 g.", "La masa del producto es la suma."),
    calc("calc-mg", "Magnesio", "Al quemar 24 g de magnesio se forman 40 g de óxido de magnesio. ¿Cuántos gramos de oxígeno han reaccionado?", nums(16), "40 − 24 = 16 g.", "La masa de O₂ es la diferencia."),
    calc("calc-caco3", "Caliza", "Al descomponer 100 g de CaCO₃ se obtienen 56 g de CaO. ¿Cuántos gramos de CO₂ se desprenden?", nums(44), "100 − 56 = 44 g.", "La masa total se conserva."),
    sort("clasifica", "Antes y después", "Ordena cada afirmación según describa bien la conservación de la masa.",
      [["si", "Cierto", "emerald"], ["no", "Falso", "rose"]],
      [["La masa total no cambia", "si"], ["Los átomos solo se reorganizan", "si"], ["Los productos pesan lo mismo que los reactivos", "si"], ["Se crean átomos nuevos", "no"], ["La masa aumenta siempre", "no"], ["Los productos pesan menos porque «se pierde» materia", "no"]],
      "Los átomos no se crean ni se destruyen.",
    ),
    pick("check", "Madera quemada", "Al quemar un tronco, las cenizas pesan mucho menos que la madera. ¿Por qué?",
      "Porque gran parte de la masa sale como CO₂ y vapor de agua",
      [["Porque la masa desaparece", "La masa se conserva."], ["Porque el fuego destruye átomos", "No se destruyen átomos."], ["Porque las cenizas son más ligeras por naturaleza", "No explica la diferencia de masa."]],
      "Los gases escapan: si se recogieran, la masa total sería igual.",
    ),
  ],
};
