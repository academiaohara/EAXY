import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acidosBasesNeutralizacionFq4Lesson: InteractiveLesson = {
  slug: "acidos-bases-neutralizacion-fq4",
  title: "5. Ácidos, bases y neutralización",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ácidos y bases", [
      { kind: "steps", items: [
        "**Teoría de Arrhenius**: un **ácido** libera iones **H⁺** en agua (HCl → H⁺ + Cl⁻); una **base** libera iones **OH⁻** (NaOH → Na⁺ + OH⁻).",
        "**Propiedades de los ácidos**: sabor agrio, corroen metales (liberan H₂), enrojecen la col lombarda, pH **< 7**. **De las bases**: tacto jabonoso, sabor amargo, pH **> 7**.",
        "**pH = −log [H⁺]**. Una disolución con [H⁺] = 10⁻³ mol/L tiene pH 3. A 25 °C, **pH + pOH = 14**.",
        "**Ácidos fuertes** (HCl, HNO₃, H₂SO₄) y **bases fuertes** (NaOH, KOH) se ionizan **por completo**; los **débiles** (ácido acético, amoniaco), solo en parte.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Valoración ácido-base", [
      { kind: "text", text: "Añade NaOH a un ácido y observa cómo cambia el pH. ¿Dónde está el punto de equivalencia?" },
    ], tool("fq4-neutralizacion-explorador"), "visual-top"),
    slide("neu", "Neutralización", [
      { kind: "steps", items: [
        "**Ácido + base → sal + agua**: HCl + NaOH → NaCl + H₂O. La reacción iónica es **H⁺ + OH⁻ → H₂O**.",
        "**Punto de equivalencia**: los moles de H⁺ y de OH⁻ son iguales: **Cₐ · Vₐ = C_b · V_b** (para ácido y base monopróticos). Con ácido y base fuertes, el pH es **7**.",
        "Un **indicador** (fenolftaleína, papel de pH) cambia de color y avisa del final de la **valoración**.",
        "Aplicaciones: **antiácidos**, tratamiento de **vertidos**, productos de limpieza.",
      ] },
    ]),
    calc("calc-ph", "Cálculo del pH", "Una disolución de HCl 0,01 mol/L está totalmente ionizada. ¿Cuánto vale su pH?", nums(2), "[H⁺] = 10⁻² → pH = 2.", "pH = −log[H⁺]."),
    calc("calc-oh", "pH básico", "Una disolución de NaOH 0,001 mol/L tiene pOH = 3. ¿Cuánto vale su pH?", nums(11), "pH = 14 − 3 = 11.", "pH + pOH = 14."),
    calc("calc-eq", "Equivalencia", "¿Cuántos mL de NaOH 0,1 mol/L neutralizan 25 mL de HCl 0,1 mol/L?", nums(25), "Cₐ·Vₐ = C_b·V_b → V_b = 25 mL.", "Misma concentración, mismo volumen."),
    calc("calc-eq2", "Equivalencia con otra concentración", "¿Cuántos mL de NaOH 0,1 mol/L neutralizan 10 mL de HCl 0,2 mol/L?", nums(20), "0,2·10 = 0,1·V_b → V_b = 20 mL.", "Despeja V_b."),
    sort("clasifica", "Ácido, neutro o básico", "Clasifica cada disolución según su pH.",
      [["ac", "Ácida", "rose"], ["ne", "Neutra", "emerald"], ["ba", "Básica", "cobalt"]],
      [["pH = 2", "ac"], ["pH = 5", "ac"], ["pH = 7", "ne"], ["Agua pura a 25 °C", "ne"], ["pH = 9", "ba"], ["pH = 13", "ba"]],
      "Menor que 7, ácida; mayor que 7, básica.",
    ),
    pick("check", "Neutralización", "¿Qué se obtiene al neutralizar HCl con NaOH?",
      "NaCl y agua",
      [["NaH y ClOH", "No son los productos."], ["Solo agua", "También se forma la sal."], ["Hidrógeno y cloro", "No es una redox."]],
      "Ácido + base → sal + agua.",
    ),
  ],
};
