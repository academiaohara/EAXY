import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const nomenclaturaCompuestosFq3Lesson: InteractiveLesson = {
  slug: "nomenclatura-compuestos-fq3",
  title: "6. Nomenclatura de compuestos sencillos",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un lenguaje común", [
      { kind: "steps", items: [
        "La **nomenclatura** es el conjunto de reglas para **nombrar** y **escribir la fórmula** de las sustancias, igual en todo el mundo (normas de la **IUPAC**).",
        "Aquí se ven los compuestos **binarios** (dos elementos) más sencillos.",
        "**Iónicos metal + no metal**: se nombra primero el **anión** acabado en **-uro** (cloruro, sulfuro, fluoruro, nitruro) o **óxido**, y luego **de** y el **metal**.",
        "Ejemplos: **NaCl**, cloruro de sodio; **MgO**, óxido de magnesio; **Al₂S₃**, sulfuro de aluminio.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Constructor de nombres", [
      { kind: "text", text: "Combina un metal y un no metal y comprueba el nombre y la fórmula." },
    ], tool("fq3-nomenclatura-explorador"), "visual-top"),
    slide("cov", "Compuestos covalentes", [
      { kind: "steps", items: [
        "Con dos **no metales** se usan **prefijos**: mono-, di-, tri-, tetra-… (el «mono» del primer elemento suele omitirse).",
        "**CO**: monóxido de carbono · **CO₂**: dióxido de carbono · **SO₃**: trióxido de azufre.",
        "Varios tienen **nombre común**: **H₂O** agua, **NH₃** amoniaco, **CH₄** metano.",
        "El **HCl** disuelto en agua es el **ácido clorhídrico**.",
      ] },
    ]),
    calc("calc-prefijo", "Prefijos", "El CO₂ se llama «dióxido de carbono». ¿Cuántos átomos de oxígeno tiene su molécula?", nums(2), "El prefijo «di» indica 2.", "di = 2."),
    sort("clasifica", "Nombre y fórmula", "Une cada fórmula con su nombre correcto.",
      [["ox", "Óxido de ...", "amber"], ["clo", "Cloruro de ...", "emerald"], ["sul", "Sulfuro de ...", "cobalt"]],
      [["Na₂O", "ox"], ["MgO", "ox"], ["NaCl", "clo"], ["CaCl₂", "clo"], ["K₂S", "sul"], ["Al₂S₃", "sul"]],
      "El anión da el nombre: O²⁻ óxido, Cl⁻ cloruro, S²⁻ sulfuro.",
    ),
    pick("check", "Formular", "¿Cuál es la fórmula del cloruro de calcio?",
      "CaCl₂",
      [["CaCl", "Ca²⁺ necesita dos Cl⁻."], ["Ca₂Cl", "Las cargas no se compensan."], ["Cl₂Ca₂", "No es la proporción mínima."]],
      "Un Ca²⁺ y dos Cl⁻.",
    ),
    pick("check2", "Nombrar", "¿Cómo se llama el Al₂O₃?",
      "Óxido de aluminio",
      [["Aluminuro de oxígeno", "Se nombra primero el anión."], ["Dióxido de aluminio", "Los prefijos son para covalentes."], ["Aluminio oxidado", "No es nomenclatura química."]],
      "Anión (óxido) + de + metal.",
    ),
  ],
};
