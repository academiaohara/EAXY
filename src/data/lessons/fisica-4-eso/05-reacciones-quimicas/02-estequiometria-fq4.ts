import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estequiometriaFq4Lesson: InteractiveLesson = {
  slug: "estequiometria-fq4",
  title: "2. Cálculos estequiométricos",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "La proporción de la ecuación", [
      { kind: "steps", items: [
        "Una **ecuación ajustada** indica la **proporción en moles** en que reaccionan las sustancias: **2 H₂ + O₂ → 2 H₂O** significa 2 mol de H₂ + 1 mol de O₂ → 2 mol de H₂O.",
        "En **gases** a igual P y T, los coeficientes también dan la proporción en **volumen**: 2 L de H₂ + 1 L de O₂ → 2 L de vapor de H₂O.",
        "Para calcular cantidades se pasa **siempre por los moles**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Del reactivo al producto", [
      { kind: "text", text: "Elige una reacción y la masa del primer reactivo. Observa los moles, gramos y litros de todas las sustancias." },
    ], tool("fq4-estequiometria-explorador"), "visual-top"),
    slide("metodo", "Método en tres pasos", [
      { kind: "steps", items: [
        "**1.** Escribe y **ajusta** la ecuación.",
        "**2.** Pasa los datos a **moles** (n = m/M, o n = V/22,4 si es un gas en CN).",
        "**3.** Usa los **coeficientes** como factor: n(B) = n(A) · coef(B) / coef(A).",
        "**4.** Pasa a lo que pide el problema: **masa** (m = n·M) o **volumen** (V = n·22,4).",
      ] },
    ]),
    calc("calc-h2o", "Agua", "En 2 H₂ + O₂ → 2 H₂O, ¿cuántos gramos de agua se forman con 4 g de H₂? (M(H₂) = 2, M(H₂O) = 18)", nums(36), "4 g = 2 mol de H₂ → 2 mol de H₂O = 36 g.", "Relación 2 : 2."),
    calc("calc-nh3", "Amoniaco", "En N₂ + 3 H₂ → 2 NH₃, ¿cuántos gramos de NH₃ se forman con 28 g de N₂? (M(N₂) = 28, M(NH₃) = 17)", nums(34), "28 g = 1 mol de N₂ → 2 mol de NH₃ = 34 g.", "Relación 1 : 2."),
    calc("calc-co2", "Gas desprendido", "CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂. ¿Qué volumen de CO₂ en CN se obtiene con 100 g de CaCO₃ (M = 100)? En L.", nums(22.4), "100 g = 1 mol → 1 mol de CO₂ = 22,4 L.", "Relación 1 : 1."),
    calc("calc-zn", "Cinc", "Zn + 2 HCl → ZnCl₂ + H₂. ¿Cuántos mol de HCl hacen falta para disolver 1 mol de Zn?", nums(2), "El coeficiente del HCl es 2.", "Mira los coeficientes."),
    calc("calc-mg", "Magnesio", "2 Mg + O₂ → 2 MgO. ¿Cuántos gramos de MgO se forman con 48 g de Mg? (M(Mg) = 24, M(MgO) = 40)", nums(80), "48 g = 2 mol de Mg → 2 mol de MgO = 80 g.", "Relación 2 : 2."),
    sort("clasifica", "Dato y resultado", "Para cada cálculo, indica el primer paso que hay que dar.",
      [["m", "Pasar masa a moles", "cobalt"], ["v", "Pasar volumen (CN) a moles", "amber"]],
      [["Se dan 36 g de agua", "m"], ["Se dan 10 g de CaCO₃", "m"], ["Se dan 48 g de Mg", "m"], ["Se dan 11,2 L de H₂ en CN", "v"], ["Se dan 44,8 L de O₂ en CN", "v"], ["Se dan 5,6 L de CO₂ en CN", "v"]],
      "Siempre se pasa por los moles.",
    ),
    pick("check", "Proporción", "En 2 H₂ + O₂ → 2 H₂O, si reaccionan 6 mol de H₂, ¿cuántos mol de O₂ se consumen?",
      "3 mol",
      [["6 mol", "Por cada 2 mol de H₂ solo se consume 1 de O₂."], ["12 mol", "Es al revés."], ["1 mol", "Es una proporción 2 : 1."]],
      "n(O₂) = 6 · 1/2 = 3 mol.",
    ),
  ],
};
