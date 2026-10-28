import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const concentracionDisolucionesFq3Lesson: InteractiveLesson = {
  slug: "concentracion-disoluciones-fq3",
  title: "1. Concentración de una disolución",
  subtitle: FQ3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Soluto, disolvente y disolución", [
      { kind: "steps", items: [
        "Una **disolución** es una mezcla **homogénea** de dos o más sustancias. El **soluto** es lo que se disuelve (en menor cantidad) y el **disolvente** es donde se disuelve (en mayor cantidad, casi siempre agua).",
        "Se dice que una disolución está **concentrada** si tiene mucho soluto y **diluida** si tiene poco. Pero para trabajar hay que dar un **número**.",
        "La **concentración** relaciona la cantidad de **soluto** con la cantidad de **disolución** (soluto + disolvente).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una disolución, varias formas", [
      { kind: "text", text: "Cambia la masa de soluto y el volumen de disolución. Mira cómo se expresa la concentración de varias formas." },
    ], tool("fq3-concentraciones-explorador"), "visual-top"),
    slide("formas", "Formas de expresarla", [
      { kind: "steps", items: [
        "**% en masa** = (g de soluto / g de disolución) · 100.",
        "**% en volumen** = (mL de soluto / mL de disolución) · 100. Se usa con líquidos, como el **grado alcohólico**.",
        "**g/L** = g de soluto / L de disolución.",
        "**Molaridad** M = moles de soluto / L de disolución. Un mol de NaCl son 58,5 g.",
      ] },
    ]),
    calc("calc-pm", "% en masa", "Se disuelven 20 g de sal en 180 g de agua. ¿Cuál es el porcentaje en masa de la disolución? (la disolución pesa 200 g)", nums(10), "20 / 200 · 100 = 10 %.", "La masa de disolución es soluto + disolvente."),
    calc("calc-gl", "g/L", "Se disuelven 15 g de azúcar y se completa hasta 250 mL de disolución. ¿Cuántos g/L son?", nums(60), "15 / 0,25 = 60 g/L.", "Pasa los mL a L."),
    calc("calc-pv", "% en volumen", "Una bebida contiene 40 mL de alcohol en 250 mL de bebida. ¿Cuál es su porcentaje en volumen?", nums(16), "40 / 250 · 100 = 16 %.", "Divide el volumen de soluto entre el de la disolución."),
    calc("calc-m", "Molaridad", "Se disuelven 11,7 g de NaCl (M = 58,5 g/mol) hasta tener 200 mL de disolución. ¿Cuál es su molaridad, en mol/L?", nums(1), "n = 11,7 / 58,5 = 0,2 mol; M = 0,2 / 0,2 L = 1 mol/L.", "Calcula primero los moles."),
    sort("clasifica", "Soluto o disolvente", "En cada disolución, ¿qué es el componente indicado?",
      [["so", "Soluto", "amber"], ["di", "Disolvente", "cobalt"]],
      [["La sal en el agua salada", "so"], ["El azúcar en el café", "so"], ["El alcohol en una bebida de 14 °", "so"], ["El agua en el agua salada", "di"], ["El agua en un refresco", "di"], ["El aire (N₂) en el aire (el componente más abundante)", "di"]],
      "El soluto está en menor proporción y es lo que se disuelve.",
    ),
    pick("check", "Volumen", "Para calcular los g/L de una disolución, ¿qué volumen se usa?",
      "El de la disolución completa",
      [["El del disolvente solo", "No coincide con el volumen final."], ["El del soluto solo", "Es solo una parte."], ["Cualquiera de los dos", "Se usa el de la disolución."]],
      "Concentración = soluto / disolución.",
    ),
  ],
};
