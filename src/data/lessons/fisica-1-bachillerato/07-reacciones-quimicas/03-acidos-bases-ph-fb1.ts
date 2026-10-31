import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acidosBasesPhFb1Lesson: InteractiveLesson = {
  slug: "acidos-bases-ph-fb1",
  title: "3. Ácidos, bases y valoraciones",
  subtitle: FB1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("teorias", "Teorías ácido-base", [
      { kind: "steps", items: [
        "**Arrhenius**: un **ácido** libera **H⁺** en agua y una **base** libera **OH⁻** (HCl → H⁺ + Cl⁻; NaOH → Na⁺ + OH⁻).",
        "**Brønsted-Lowry**: un **ácido** es una sustancia que **cede un protón** y una **base** la que lo **acepta**. Tienen su **par conjugado**: HCl/Cl⁻; NH₄⁺/NH₃; H₂O es **anfótera**.",
        "**Propiedades**: los ácidos tienen sabor agrio, corroen metales, enrojecen la col lombarda; las bases son jabonosas, de sabor amargo y azulean la col.",
        "Ácidos y bases **fuertes**: ionizan por completo (HCl, H₂SO₄, HNO₃; NaOH, KOH). **Débiles**: parcialmente (CH₃COOH, HF, NH₃), con constantes **Ka** y **Kb**.",
      ] },
    ], undefined, "stack"),
    slide("explora-ph", "El pH", [
      { kind: "text", text: "Elige un ácido o una base y cambia su concentración. ¿Qué diferencia hay entre uno fuerte y uno débil con la misma concentración?" },
    ], tool("fb1-ph-explorador"), "visual-top"),
    slide("ph", "pH y pOH", [
      { kind: "steps", items: [
        "El agua se autoioniza: **Kw = [H⁺]·[OH⁻] = 10⁻¹⁴** (25 °C). En agua pura [H⁺] = 10⁻⁷ M → pH 7.",
        "**pH = −log[H⁺]**; **pOH = −log[OH⁻]**; **pH + pOH = 14**. pH < 7 ácida; = 7 neutra; > 7 básica.",
        "**Ácido fuerte**: [H⁺] = C. **Base fuerte**: [OH⁻] = C. **Débil**: [H⁺] ≈ √(Ka·C) y **α = [H⁺]/C** (grado de ionización).",
        "Una diferencia de **1 unidad de pH** supone **10 veces** más (o menos) [H⁺].",
      ] },
    ], undefined, "stack"),
    slide("explora-val", "Valoración ácido-base", [
      { kind: "text", text: "Añade NaOH al HCl y observa cómo cambia el pH. ¿Dónde está el punto de equivalencia?" },
    ], tool("fb1-valoracion-explorador"), "visual-top"),
    slide("neu", "Neutralización y valoración", [
      { kind: "steps", items: [
        "**Neutralización**: ácido + base → **sal + agua**: HCl + NaOH → NaCl + H₂O. Iónicamente: **H⁺ + OH⁻ → H₂O**.",
        "**Valoración**: se añade desde una **bureta** una base (o ácido) de concentración conocida a un volumen medido del otro hasta el **punto de equivalencia**, que se detecta con un **indicador** (fenolftaleína, naranja de metilo).",
        "En el equivalente: **moles H⁺ = moles OH⁻** → **Cₐ·Vₐ·(nº de H) = C_b·V_b·(nº de OH)**.",
        "Ejemplo: 25 mL de HCl gastan 20 mL de NaOH 0,1 M → Cₐ = 0,1·20/25 = **0,08 M**.",
      ] },
    ], undefined, "stack"),
    calc("calc-ph", "pH de un ácido fuerte", "¿Cuál es el pH de una disolución de HCl 0,001 M?", nums(3), "pH = −log(10⁻³) = 3.", "[H⁺] = C."),
    calc("calc-oh", "pH de una base fuerte", "¿Cuál es el pH de una disolución de NaOH 0,01 M? (pOH = 2)", nums(12), "pH = 14 − 2 = 12.", "pH + pOH = 14."),
    calc("calc-conc", "[H⁺] desde el pH", "Una disolución tiene pH = 5. ¿Cuál es el exponente de [H⁺] = 10^(−x)? Escribe x.", nums(5), "[H⁺] = 10⁻⁵ M.", "[H⁺] = 10^(−pH)."),
    calc("calc-val", "Concentración del ácido", "Para valorar 20 mL de HCl se gastan 10 mL de NaOH 0,2 M. ¿Cuál es la concentración del HCl, en mol/L?", nums(0.1), "Cₐ = 0,2·10/20 = 0,1 M.", "CₐVₐ = C_bV_b."),
    sort("clasifica", "Ácida, neutra o básica", "Clasifica cada disolución por su pH.",
      [["aci", "Ácida", "rose"], ["neu", "Neutra", "emerald"], ["bas", "Básica", "cobalt"]],
      [["pH = 2", "aci"], ["pH = 6,5", "aci"], ["pH = 7", "neu"], ["Agua pura a 25 °C", "neu"], ["pH = 9", "bas"], ["[OH⁻] = 10⁻² M", "bas"]],
      "pH < 7 ácida; 7 neutra; > 7 básica.",
    ),
    pick("check", "Fuerte y débil", "Dos ácidos tienen la misma concentración 0,1 M: HCl (fuerte) y CH₃COOH (débil). ¿Cuál tiene menor pH?",
      "El HCl, porque se ioniza por completo",
      [["El ácido acético, porque es más débil", "Libera menos H⁺."], ["Tienen el mismo pH", "No: el débil se ioniza parcialmente."], ["Depende del volumen", "El pH depende de la concentración."]],
      "El ácido fuerte aporta toda su concentración como [H⁺].",
    ),
  ],
};
