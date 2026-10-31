import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estequiometriaDePartidaFb1Lesson: InteractiveLesson = {
  slug: "estequiometria-de-partida-fb1",
  title: "4. Estequiometría de partida",
  subtitle: FB1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("ley", "Ecuaciones ajustadas", [
      { kind: "steps", items: [
        "La **ecuación química** representa una reacción con las fórmulas de reactivos y productos. Se **ajusta** con **coeficientes** para que haya los mismos átomos de cada elemento a ambos lados.",
        "**Ley de Lavoisier**: la **masa** total se conserva. **Ley de Proust**: las sustancias reaccionan en **proporciones fijas**.",
        "Los **coeficientes** son la proporción en **moles** (y en moléculas): N₂ + 3 H₂ → 2 NH₃ significa 1 mol de N₂ con 3 mol de H₂ da 2 mol de NH₃. **No** son proporciones en masa.",
      ] },
    ], undefined, "stack"),
    slide("metodo", "Método para cualquier cálculo", [
      { kind: "steps", items: [
        "**1.** Escribe y **ajusta** la ecuación.",
        "**2.** Si hay **impurezas**, calcula la masa pura: **m_pura = m_muestra · pureza/100**.",
        "**3.** Pasa a **moles** de la sustancia conocida: n = m/M.",
        "**4.** Usa la **relación molar** con los coeficientes: n_B = n_A · (c_B/c_A).",
        "**5.** Vuelve a **gramos**: m = n·M (o a partículas con N_A).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba con una reacción", [
      { kind: "text", text: "Elige una reacción, una sustancia, la masa de la muestra y su pureza. Mira los moles y gramos de cada especie." },
    ], tool("fb1-estequiometria-pureza-explorador"), "visual-top"),
    slide("ejemplo", "Un ejemplo con pureza", [
      { kind: "text", text: "Se descomponen **200 g de caliza** del **80 %** de pureza en CaCO₃: CaCO₃ → CaO + CO₂. Masa pura = 160 g → n = 160/100 = **1,6 mol**. Relación 1:1:1 → 1,6 mol de CaO y 1,6 mol de CO₂. **m(CaO)** = 1,6·56 = **89,6 g**; **m(CO₂)** = 1,6·44 = **70,4 g**. Comprobación: 160 = 89,6 + 70,4." },
    ]),
    calc("calc-mol", "Relación molar", "En N₂ + 3 H₂ → 2 NH₃, ¿cuántos moles de NH₃ se obtienen a partir de 3 mol de N₂?", nums(6), "Relación 1:2 → 3 · 2 = 6 mol.", "n(NH₃) = 2 · n(N₂)."),
    calc("calc-masa", "Masa de producto", "En CaCO₃ → CaO + CO₂, ¿cuántos gramos de CaO se obtienen a partir de 1 mol de CaCO₃? (M(CaO) = 56 g/mol)", nums(56), "1 mol de CaO → 56 g.", "Relación 1:1."),
    calc("calc-pureza", "Masa pura", "Una muestra de 250 g tiene una pureza del 60 %. ¿Cuántos gramos de sustancia pura hay?", nums(150), "250 · 0,60 = 150 g.", "m_pura = m · pureza/100."),
    calc("calc-zn", "Cinc y ácido", "Zn + 2 HCl → ZnCl₂ + H₂. ¿Cuántos moles de HCl reaccionan con 0,5 mol de Zn?", nums(1), "Relación 1:2 → 0,5 · 2 = 1 mol.", "n(HCl) = 2 · n(Zn)."),
    sort("clasifica", "Coeficientes", "En una ecuación ajustada, ¿qué proporción dan los coeficientes?",
      [["si", "Sí la dan", "emerald"], ["no", "No la dan", "rose"]],
      [["Proporción en moles", "si"], ["Proporción en moléculas", "si"], ["Proporción en masa (gramos)", "no"], ["Proporción en volumen de gases a igual P y T", "si"], ["Proporción en volumen de líquidos", "no"], ["Proporción en nº de átomos totales", "no"]],
      "Los coeficientes son proporciones de cantidad de sustancia.",
    ),
    pick("check", "Lavoisier", "En una reacción se consumen 10 g de A y se forman 6 g de B. ¿Cuánto C se forma, si solo hay A → B + C?",
      "4 g",
      [["16 g", "La masa se conserva: no aumenta."], ["6 g", "Sería la masa de B."], ["No se puede saber", "La ley de Lavoisier permite calcularlo."]],
      "10 = 6 + m(C) → m(C) = 4 g.",
    ),
  ],
};
