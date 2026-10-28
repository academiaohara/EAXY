import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const preparacionDilucionesFq3Lesson: InteractiveLesson = {
  slug: "preparacion-diluciones-fq3",
  title: "3. Preparación y dilución de disoluciones",
  subtitle: FQ3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("prep", "Preparar una disolución", [
      { kind: "steps", items: [
        "**1.** Calcula la **masa de soluto** necesaria: m = concentración · volumen.",
        "**2.** **Pésala** en una **balanza** (con un vidrio de reloj o una cápsula).",
        "**3.** Disuélvela en un **vaso** con algo de agua, removiendo con una varilla.",
        "**4.** Pasa la disolución a un **matraz aforado** y **enrasa** con agua hasta la marca, con la vista a la altura del menisco.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Diluir", [
      { kind: "text", text: "Toma un volumen de una disolución concentrada y añade agua. ¿Cómo cambia la concentración?" },
    ], tool("fq3-dilucion-explorador"), "visual-top"),
    slide("dil", "Diluciones", [
      { kind: "steps", items: [
        "Al **diluir** se añade disolvente: el **soluto no cambia**, el volumen aumenta y la concentración **disminuye**.",
        "**C₁ · V₁ = C₂ · V₂**: soluto antes = soluto después.",
        "Para preparar V₂ a concentración C₂ a partir de una más concentrada C₁, se toma **V₁ = C₂ · V₂ / C₁** con una **pipeta** y se **enrasa** en el matraz.",
        "Nunca se debe añadir agua a un ácido concentrado: se añade el **ácido sobre el agua**, despacio.",
      ] },
    ]),
    calc("calc-masa", "Masa de soluto", "Quieres preparar 500 mL de una disolución de sal de 20 g/L. ¿Cuántos gramos de sal pesas?", nums(10), "20 · 0,5 = 10 g.", "Concentración por volumen en L."),
    calc("calc-dil", "Dilución", "Tomas 100 mL de una disolución de 50 g/L y la diluyes hasta 250 mL. ¿Qué concentración tiene, en g/L?", nums(20), "C₂ = 50 · 100 / 250 = 20 g/L.", "Aplica C₁V₁ = C₂V₂."),
    calc("calc-ali", "Volumen que tomar", "Para preparar 500 mL de disolución a 10 g/L a partir de otra de 100 g/L, ¿cuántos mL de la concentrada tomas?", nums(50), "V₁ = 10 · 500 / 100 = 50 mL.", "Despeja V₁."),
    calc("calc-agua", "Agua que añadir", "En la dilución anterior (50 mL de concentrada hasta 500 mL), ¿cuántos mL de agua se añaden?", nums(450), "500 − 50 = 450 mL.", "Volumen final menos volumen tomado."),
    sort("clasifica", "Material de laboratorio", "Asocia cada instrumento con su uso.",
      [["pes", "Pesar", "cobalt"], ["med", "Medir volumen con precisión", "amber"], ["mez", "Mezclar o disolver", "emerald"]],
      [["Balanza", "pes"], ["Vidrio de reloj (para pesar sólidos)", "pes"], ["Matraz aforado", "med"], ["Pipeta", "med"], ["Varilla de vidrio", "mez"], ["Vaso de precipitados", "mez"]],
      "Cada instrumento tiene una función concreta.",
    ),
    pick("check", "Dilución", "Al diluir una disolución con agua, ¿qué no cambia?",
      "La cantidad de soluto",
      [["La concentración", "Disminuye."], ["El volumen", "Aumenta."], ["El color", "Se hace más pálido."]],
      "C₁V₁ = C₂V₂: el soluto es el mismo.",
    ),
  ],
};
