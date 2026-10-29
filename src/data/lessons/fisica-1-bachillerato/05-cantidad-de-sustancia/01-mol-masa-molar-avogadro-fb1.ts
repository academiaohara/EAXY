import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const molMasaMolarAvogadroFb1Lesson: InteractiveLesson = {
  slug: "mol-masa-molar-avogadro-fb1",
  title: "1. Mol, masa molar y número de Avogadro",
  subtitle: FB1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("mol", "La cantidad de sustancia", [
      { kind: "steps", items: [
        "La **masa atómica relativa** (A_r) compara la masa de un átomo con 1/12 de la del ¹²C; se expresa en **u**: A_r(O) = 16 u. La **masa molecular** (M_r) es la suma de las de los átomos de la molécula: H₂O → 2·1 + 16 = **18 u**.",
        "El **mol** es la unidad de **cantidad de sustancia (n)**: contiene **6,022·10²³** entidades (átomos, moléculas, iones). Ese número es la **constante de Avogadro N_A** (mol⁻¹).",
        "La **masa molar M** (g/mol) es la masa de un mol: coincide numéricamente con la masa atómica o molecular en u. M(H₂O) = **18 g/mol**; M(NaCl) = 58,5 g/mol.",
        "Para sustancias iónicas o reticulares se habla de **unidades fórmula** (NaCl, SiO₂), no de moléculas.",
      ] },
    ], anim("fb1-mol"), "visual-top"),
    slide("explora", "De la masa a las partículas", [
      { kind: "text", text: "Elige una sustancia y un dato. Mira cómo se pasa de gramos a moles y a nº de partículas y de átomos." },
    ], tool("fb1-mol-masa-explorador"), "visual-top"),
    slide("conv", "Cómo convertir", [
      { kind: "steps", items: [
        "**Masa → moles**: **n = m/M**. **Moles → masa**: **m = n·M**.",
        "**Moles → partículas**: **N = n·N_A**. **Partículas → moles**: **n = N/N_A**.",
        "**Átomos de un elemento** = N de unidades de fórmula × nº de átomos de ese elemento en la fórmula: en 1 mol de H₂O hay 2 mol de H y 1 mol de O.",
        "**Masa de una molécula**: m = M/N_A. Para el agua, 18/6,022·10²³ ≈ **3,0·10⁻²³ g**.",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo completo", [
      { kind: "text", text: "¿Cuántos átomos de oxígeno hay en 9 g de agua? M = 18 g/mol → n = 9/18 = **0,5 mol** de H₂O → N = 0,5·6,022·10²³ = 3,01·10²³ moléculas → cada molécula tiene 1 átomo de O → **3,01·10²³ átomos de O**. Y 0,5 mol de H₂O contienen **1 mol de átomos de H**." },
    ]),
    calc("calc-m", "Masa molar", "¿Cuál es la masa molar del ácido sulfúrico, H₂SO₄, en g/mol? (H 1; S 32; O 16)", nums(98), "2·1 + 32 + 4·16 = 98 g/mol.", "Suma las masas atómicas."),
    calc("calc-n", "Moles", "¿Cuántos moles son 44 g de CO₂? (M = 44 g/mol)", nums(1), "n = 44/44 = 1 mol.", "n = m/M."),
    calc("calc-g", "Masa de 3 mol", "¿Cuántos gramos son 3 mol de NH₃? (M = 17 g/mol)", nums(51), "m = 3·17 = 51 g.", "m = n·M."),
    calc("calc-moleculas", "Moléculas", "¿Cuántas moléculas hay en 0,5 mol de agua? Escribe el resultado en 10²³ (N_A = 6,02·10²³)", nums(3.01, 3), "N = 0,5·6,02·10²³ = 3,01·10²³.", "N = n·N_A."),
    sort("clasifica", "¿Qué magnitud es?", "Clasifica según el tipo de magnitud.",
      [["mas", "Masa", "cobalt"], ["can", "Cantidad de sustancia", "emerald"], ["num", "Número de partículas", "rose"]],
      [["18 g de agua", "mas"], ["2 mol de H₂O", "can"], ["1,2·10²⁴ moléculas", "num"], ["58,5 g de NaCl", "mas"], ["0,5 mol de CO₂", "can"], ["6,022·10²³ átomos de Fe", "num"]],
      "g: masa; mol: cantidad de sustancia; nº: partículas.",
    ),
    pick("check", "Átomos en un mol", "¿En cuál hay más átomos: 1 mol de He o 1 mol de Fe?",
      "Hay los mismos: 6,022·10²³ átomos en cada uno",
      [["En el hierro, porque pesa más", "El mol es un número de partículas, no una masa."], ["En el helio, porque es más ligero", "Ambos tienen N_A átomos."], ["Depende de la temperatura", "No depende de ella."]],
      "1 mol de cualquier sustancia contiene N_A entidades.",
    ),
  ],
};
