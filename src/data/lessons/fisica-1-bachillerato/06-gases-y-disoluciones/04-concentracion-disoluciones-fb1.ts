import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const concentracionDisolucionesFb1Lesson: InteractiveLesson = {
  slug: "concentracion-disoluciones-fb1",
  title: "4. Concentración de las disoluciones",
  subtitle: FB1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Disolución, soluto y disolvente", [
      { kind: "steps", items: [
        "Una **disolución** es una **mezcla homogénea** de dos o más sustancias. El **soluto** es la sustancia disuelta (normalmente en menor cantidad) y el **disolvente**, el medio que la disuelve (en las disoluciones acuosas, el agua).",
        "La **concentración** indica la **cantidad de soluto** en una cantidad dada de disolución o de disolvente.",
        "La **solubilidad** es la concentración máxima de soluto en una disolución **saturada** a una temperatura; en general crece con la T en los sólidos y disminuye en los gases.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Calcula la concentración", [
      { kind: "text", text: "Elige un soluto y cambia su masa, el volumen y la densidad. Compara las distintas formas de expresar la concentración." },
    ], tool("fb1-concentracion-explorador"), "visual-top"),
    slide("formas", "Formas de expresar la concentración", [
      { kind: "steps", items: [
        "**Concentración en masa**: g de soluto / L de disolución (g/L).",
        "**Porcentaje en masa**: **(g de soluto / g de disolución)·100**. **Porcentaje en volumen**: (mL de soluto / mL de disolución)·100 (para líquidos, p. ej. 12 % vol de alcohol).",
        "**Molaridad (M)**: **mol de soluto / L de disolución**. **Molalidad (m)**: mol de soluto / kg de disolvente. **Fracción molar**: n_soluto / (n_soluto + n_disolvente).",
        "Con la **densidad** de la disolución (**d = m/V**) se pasa de masa a volumen: **M = (% · d · 10)/M_molar**, con d en g/mL.",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Ejemplo con la densidad", [
      { kind: "text", text: "Un ácido clorhídrico comercial es del **37 %** en masa y tiene densidad **1,19 g/mL**. En 1 L hay 1190 g de disolución, de los cuales 0,37·1190 = **440 g de HCl** → n = 440/36,5 = **12,1 mol**. Molaridad = **12,1 mol/L**. Por eso se dice «HCl 12 M»." },
    ]),
    calc("calc-m", "Molaridad", "Se disuelven 20 g de NaOH (M = 40 g/mol) en agua hasta completar 500 mL. ¿Cuál es la molaridad, en mol/L?", nums(1), "n = 20/40 = 0,5 mol → 0,5/0,5 L = 1 mol/L.", "M = n/V(L)."),
    calc("calc-pct", "Porcentaje en masa", "Se disuelven 10 g de sal en 90 g de agua. ¿Cuál es el porcentaje en masa de la disolución?", nums(10), "10/(10 + 90) = 0,10 → 10 %.", "Masa disolución = 100 g."),
    calc("calc-gl", "g/L", "Una disolución de 250 mL contiene 5 g de soluto. ¿Cuál es su concentración en g/L?", nums(20), "5 g / 0,25 L = 20 g/L.", "g/L = masa / volumen (L)."),
    calc("calc-masa", "Masa de soluto", "¿Cuántos gramos de glucosa (180 g/mol) hay en 200 mL de una disolución 0,5 M?", nums(18), "n = 0,5·0,2 = 0,1 mol → 18 g.", "m = M·V·M_molar."),
    sort("clasifica", "Depende o no de la temperatura", "¿Cambia la concentración al calentar la disolución (el volumen se dilata)?",
      [["dep", "Cambia (depende del volumen)", "rose"], ["nodep", "No cambia (depende solo de masas)", "cobalt"]],
      [["Molaridad", "dep"], ["g/L", "dep"], ["% en masa", "nodep"], ["Molalidad", "nodep"], ["Fracción molar", "nodep"], ["% masa/volumen", "dep"]],
      "Si en la definición aparece el volumen de disolución, depende de la T.",
    ),
    pick("check", "Molaridad", "¿Qué indica una disolución de NaCl 2 M?",
      "Hay 2 mol de NaCl por cada litro de disolución",
      [["Hay 2 g de NaCl por litro", "Serían 2 g/L."], ["Hay 2 mol de NaCl por kg de agua", "Eso es molalidad."], ["El 2 % de la masa es NaCl", "Eso es porcentaje en masa."]],
      "M = mol de soluto por litro de disolución.",
    ),
  ],
};
