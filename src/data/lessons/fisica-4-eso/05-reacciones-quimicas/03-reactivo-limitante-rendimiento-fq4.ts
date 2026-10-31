import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reactivoLimitanteRendimientoFq4Lesson: InteractiveLesson = {
  slug: "reactivo-limitante-rendimiento-fq4",
  title: "3. Reactivo limitante y rendimiento",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando falta un reactivo", [
      { kind: "steps", items: [
        "Si se mezclan reactivos en proporción **distinta** de la de la ecuación, uno se **agota primero**: es el **reactivo limitante**. El otro queda **en exceso**.",
        "La cantidad de **producto** depende **solo del limitante**.",
        "Para identificarlo: calcula los **moles** de cada reactivo y **divídelos entre su coeficiente**. El **menor** cociente es el del limitante.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Quién se agota", [
      { kind: "text", text: "Elige la reacción y las masas de los dos reactivos. Mira cuál limita, el exceso y el producto." },
    ], tool("fq4-reactivo-limitante-explorador"), "visual-top"),
    slide("rend", "Rendimiento", [
      { kind: "steps", items: [
        "El **rendimiento teórico** es la cantidad **máxima** de producto que se podría obtener (la que calcula la estequiometría).",
        "El **rendimiento real** es lo que **realmente** se obtiene; suele ser menor (reacciones incompletas, pérdidas, reacciones secundarias).",
        "**Rendimiento (%) = real / teórico · 100**.",
      ] },
    ]),
    calc("calc-lim", "Moles / coeficiente", "Se mezclan 2 mol de H₂ y 0,5 mol de O₂ para 2 H₂ + O₂ → 2 H₂O. ¿Cuánto vale n(O₂)/coeficiente, en mol?", nums(0.5), "0,5 / 1 = 0,5 mol (menor que 2/2 = 1): el O₂ es el limitante.", "Divide entre el coeficiente."),
    calc("calc-prod", "Agua máxima", "Con esos reactivos, ¿cuántos g de agua se forman como máximo? (M(H₂O) = 18)", nums(18), "El limitante O₂ (0,5 mol) da 2·0,5 = 1 mol de H₂O = 18 g.", "Usa el limitante."),
    calc("calc-exc", "Exceso", "Con los 2 mol de H₂ (4 g), 0,5 mol de O₂ consumen 1 mol de H₂. ¿Cuántos mol de H₂ sobran?", nums(1), "2 − 1 = 1 mol de H₂ en exceso.", "Resta lo consumido."),
    calc("calc-rend", "Rendimiento", "Si se esperaban 18 g de agua pero se obtienen 15 g, ¿cuál es el rendimiento, en %? (redondea al entero)", nums(83), "15 / 18 · 100 = 83,3 %.", "Real entre teórico."),
    sort("clasifica", "Limitante o exceso", "En una mezcla de 2 mol de H₂ con 0,5 mol de O₂, clasifica cada afirmación.",
      [["li", "Limitante", "rose"], ["ex", "En exceso", "cobalt"]],
      [["El oxígeno (O₂)", "li"], ["El reactivo que se agota primero", "li"], ["El que determina el producto", "li"], ["El hidrógeno (H₂)", "ex"], ["El que queda sin reaccionar", "ex"], ["El que sobra al final", "ex"]],
      "El limitante marca la cantidad de producto.",
    ),
    pick("check", "Rendimiento", "El rendimiento real de una reacción, ¿puede ser mayor que el teórico?",
      "No: el real es igual o menor",
      [["Sí, siempre", "No puede superar al máximo teórico."], ["Solo con catalizador", "El catalizador no cambia el rendimiento teórico."], ["Solo si hay exceso de reactivo", "El exceso no aumenta el producto."]],
      "El teórico es el máximo.",
    ),
  ],
};
