import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuentesEnergiaEficienciaFq2Lesson: InteractiveLesson = {
  slug: "fuentes-energia-eficiencia-fq2",
  title: "5. Fuentes de energía, consumo y eficiencia",
  subtitle: FQ2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "De dónde sacamos la energía", [
      { kind: "steps", items: [
        "Las **fuentes de energía** son los recursos de los que obtenemos energía útil.",
        "**Renovables**: se **regeneran** de forma natural (**solar**, **eólica**, **hidráulica**, **biomasa**, **geotérmica**, **mareomotriz**).",
        "**No renovables**: tienen reservas **limitadas** (**carbón**, **petróleo**, **gas natural**, **uranio**).",
        "Hoy se obtiene la mayor parte de la energía de los **combustibles fósiles**, que emiten **CO₂**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Compara las fuentes", [
      { kind: "text", text: "Elige una fuente y mira si es renovable y cuántas emisiones de CO₂ produce al generar tu consumo mensual." },
    ], tool("fq2-fuentes-energia-explorador"), "visual-top"),
    slide("impacto", "Ventajas e inconvenientes", [
      { kind: "steps", items: [
        "**Fósiles**: baratos y abundantes de momento, pero **contaminan**, emiten **CO₂** (cambio climático) y se **agotan**.",
        "**Nuclear**: sin CO₂, pero genera **residuos radiactivos** de larga duración.",
        "**Renovables**: apenas emiten CO₂, pero dependen del **clima** (sol, viento) y ocupan **espacio**.",
        "El **consumo responsable** y el **ahorro** reducen la necesidad de producir energía.",
      ] },
    ]),
    slide("efic", "Eficiencia energética", [
      { kind: "steps", items: [
        "El **rendimiento** de una máquina es la energía **útil** dividida entre la energía **total** consumida: **rendimiento = E_útil / E_total · 100 %**.",
        "Una **bombilla incandescente** convierte en luz solo un 5 % de la electricidad; una **LED**, mucho más. El resto es **calor**.",
        "Ser **eficiente** es hacer lo mismo con **menos energía**: aislar la casa, usar bombillas LED, electrodomésticos de clase A.",
      ] },
    ]),
    calc("calc-co2", "Emisiones", "Una fuente emite 490 g de CO₂ por kWh. ¿Cuántos kg de CO₂ emite al generar 200 kWh?", nums(98), "490 · 200 / 1000 = 98 kg.", "Pasa los gramos a kg al final."),
    calc("calc-rend", "Rendimiento", "Una máquina consume 500 J y produce 150 J de energía útil. ¿Qué rendimiento tiene, en %?", nums(30), "150 / 500 · 100 = 30 %.", "Divide la útil entre la total."),
    calc("calc-perd", "Pérdidas", "Con ese rendimiento, ¿cuántos julios de los 500 J se pierden como calor?", nums(350), "500 − 150 = 350 J.", "La energía total se conserva."),
    sort("clasifica", "Renovable o no renovable", "Clasifica cada fuente de energía.",
      [["ren", "Renovable", "cobalt"], ["no", "No renovable", "amber"]],
      [["Solar", "ren"], ["Eólica", "ren"], ["Hidráulica", "ren"], ["Carbón", "no"], ["Petróleo", "no"], ["Gas natural", "no"]],
      "Renovable si se regenera de forma natural.",
    ),
    pick("check", "Eficiencia", "¿Qué significa que una bombilla sea más eficiente?",
      "Que convierte más energía eléctrica en luz y menos en calor",
      [["Que luce más años", "Eso es su duración."], ["Que gasta más energía", "Es lo contrario."], ["Que es más barata", "No tiene que ver."]],
      "Mayor rendimiento: más energía útil por cada julio consumido.",
    ),
  ],
};
