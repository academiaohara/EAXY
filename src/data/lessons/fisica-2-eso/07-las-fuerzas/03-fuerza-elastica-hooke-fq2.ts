import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzaElasticaHookeFq2Lesson: InteractiveLesson = {
  slug: "fuerza-elastica-hooke-fq2",
  title: "3. La fuerza elástica y la ley de Hooke",
  subtitle: FQ2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuerpos elásticos", [
      { kind: "steps", items: [
        "Un cuerpo es **elástico** si, tras ser deformado por una fuerza, **recupera su forma** cuando esta deja de actuar (un muelle, una goma).",
        "Uno es **plástico** si **queda deformado** (plastilina).",
        "La **fuerza elástica** es la que hace un cuerpo para recuperar su forma.",
        "Si se supera el **límite elástico**, el cuerpo queda **deformado para siempre**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Un muelle con pesas", [
      { kind: "text", text: "Cuelga distintas masas de un muelle y mira cuánto se alarga. Cambia el tipo de muelle." },
    ], tool("fq2-muelle-hooke-explorador"), "visual-top"),
    slide("hooke", "La ley de Hooke", [
      { kind: "steps", items: [
        "**Robert Hooke** (siglo XVII): el **alargamiento** de un muelle es **proporcional** a la fuerza que lo estira.",
        "**F = k · Δl**, donde **k** es la **constante elástica** (N/m) y **Δl** el alargamiento (m).",
        "Un **k grande** indica un muelle **duro**; un k pequeño, uno **blando**.",
        "La gráfica **F–Δl** es una **recta** que pasa por el origen; su pendiente es **k**.",
        "El **dinamómetro** se basa en esta ley: un muelle con una escala graduada en newton.",
      ] },
    ]),
    calc("calc-k", "Constante elástica", "Un muelle se alarga 0,05 m con una fuerza de 2,5 N. ¿Cuánto vale k, en N/m?", nums(50), "k = F / Δl = 2,5 / 0,05 = 50 N/m.", "Divide la fuerza entre el alargamiento."),
    calc("calc-dl", "Alargamiento", "Con k = 50 N/m, ¿cuántos metros se alarga con una fuerza de 4 N?", nums(0.08), "Δl = 4 / 50 = 0,08 m.", "Δl = F / k."),
    calc("calc-F", "Fuerza", "Un muelle de k = 200 N/m se estira 0,1 m. ¿Qué fuerza se aplica, en N?", nums(20), "F = 200 · 0,1 = 20 N.", "Multiplica k por el alargamiento."),
    sort("clasifica", "Elástico o plástico", "Clasifica cada material.",
      [["ela", "Se comporta de forma elástica", "cobalt"], ["pla", "Se deforma de forma permanente", "amber"]],
      [["Un muelle (dentro de su límite)", "ela"], ["Una goma elástica", "ela"], ["Una pelota de goma", "ela"], ["La plastilina", "pla"], ["Un clip doblado de más", "pla"], ["Una lata aplastada", "pla"]],
      "Si recupera su forma, es elástico.",
    ),
    pick("check", "Proporcionalidad", "Si se duplica la fuerza sobre un muelle (sin pasar el límite elástico), ¿qué le pasa al alargamiento?",
      "Se duplica",
      [["Se reduce a la mitad", "Es directamente proporcional."], ["No cambia", "Cambia con la fuerza."], ["Se cuadruplica", "No es cuadrático."]],
      "F = k · Δl: Δl es proporcional a F.",
    ),
  ],
};
