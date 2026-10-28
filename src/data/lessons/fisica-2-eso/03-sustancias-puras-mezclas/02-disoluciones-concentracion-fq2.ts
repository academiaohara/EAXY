import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disolucionesConcentracionFq2Lesson: InteractiveLesson = {
  slug: "disoluciones-concentracion-fq2",
  title: "2. Disoluciones y concentración",
  subtitle: FQ2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Soluto y disolvente", [
      { kind: "steps", items: [
        "Una **disolución** es una mezcla **homogénea** de dos o más sustancias.",
        "El **soluto** es lo que **se disuelve** (la sal, el azúcar); el **disolvente**, en lo que se disuelve (casi siempre el componente mayoritario, como el agua).",
        "La disolución es **transparente**, no se separa con el tiempo y no se puede **filtrar**.",
        "Hay disoluciones **líquidas** (agua salada), **gaseosas** (aire) y **sólidas** (aleaciones).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuánto soluto hay", [
      { kind: "text", text: "Cambia la masa de sal y la cantidad de agua. Observa cómo cambia la concentración." },
    ], tool("fq2-concentracion-disolucion-explorador"), "visual-top"),
    slide("conc", "Formas de expresar la concentración", [
      { kind: "steps", items: [
        "**% en masa** = masa de soluto / masa de disolución · 100.",
        "**Gramos por litro**: masa de soluto (g) / volumen de disolución (L).",
        "**% en volumen** (para líquidos): volumen de soluto / volumen de disolución · 100.",
        "Cuanto **más soluto** o **menos disolvente**, más **concentrada** está la disolución.",
      ] },
    ]),
    calc("calc-pct", "% en masa", "Se disuelven 20 g de sal en 180 g de agua. ¿Cuál es el % en masa de la disolución?", nums(10), "Masa de disolución = 200 g; 20 / 200 · 100 = 10 %.", "Suma soluto y disolvente antes de dividir."),
    calc("calc-gl", "Gramos por litro", "Se disuelven 15 g de azúcar en agua hasta tener 0,5 L de disolución. ¿Cuál es la concentración, en g/L?", nums(30), "15 / 0,5 = 30 g/L.", "Divide los gramos entre los litros."),
    calc("calc-masa", "Masa de soluto", "Una disolución de 250 g tiene un 8 % en masa de sal. ¿Cuántos gramos de sal contiene?", nums(20), "250 · 8 / 100 = 20 g.", "Calcula el 8 % de 250."),
    sort("clasifica", "Soluto o disolvente", "En una disolución de sal en agua, clasifica cada elemento.",
      [["sol", "Soluto", "cobalt"], ["dis", "Disolvente", "amber"]],
      [["La sal", "sol"], ["El componente que está en menor cantidad", "sol"], ["Lo que se disuelve", "sol"], ["El agua", "dis"], ["El componente mayoritario", "dis"], ["Lo que disuelve", "dis"]],
      "El soluto se disuelve en el disolvente.",
    ),
    pick("check", "Más concentrada", "Si a una disolución de sal se le añade más agua, ¿qué ocurre con su concentración?",
      "Disminuye",
      [["Aumenta", "Hay más disolvente para la misma sal."], ["No cambia", "La proporción cambia."], ["Se duplica", "No es así."]],
      "Hay la misma cantidad de soluto en más disolución: la concentración baja.",
    ),
  ],
};
