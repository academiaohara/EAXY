import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planoDiedricoTrazasDt1Lesson: InteractiveLesson = {
  slug: "plano-diedrico-trazas-dt1",
  title: "5. Representación del plano. Trazas y tipos",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un plano por sus trazas", [
      { kind: "steps", items: [
        "Un plano queda definido por **tres puntos**, **dos rectas que se cortan**, **dos paralelas** o **una recta y un punto**. En diédrico se usa casi siempre por sus **trazas**.",
        "La **traza horizontal α₁** es su intersección con el **PH**; la **traza vertical α₂**, con el **PV**.",
        "Las dos trazas **se cortan en un punto de la LT** (salvo que sean paralelas a ella).",
        "Cada traza es una **recta del plano**: α₁ es una recta con cota 0 y α₂, con alejamiento 0.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia las trazas", [
      { kind: "text", text: "Mueve los ángulos de las dos trazas. Mira el tipo de plano y los ángulos que forma con los planos de proyección.", },
    ], tool("dt1-plano-diedrico-explorador", { a: 135, b: 45 }), "visual-top"),
    slide("tipos", "Tipos de plano", [
      { kind: "steps", items: [
        "**Oblicuo**: sus dos trazas son oblicuas a la LT y no es perpendicular a ningún plano.",
        "**Paralelo a la LT**: ambas trazas son **paralelas a la LT**.",
        "**Horizontal** (paralelo al PH): solo tiene traza vertical, **paralela a la LT**. **Frontal** (paralelo al PV): solo tiene traza horizontal, paralela a la LT.",
        "**Proyectante horizontal** (⟂ PH): su traza vertical es **perpendicular a la LT**. **Proyectante vertical** (⟂ PV): su traza horizontal lo es.",
        "**De perfil** (⟂ LT): las dos trazas son perpendiculares a la LT.",
      ] },
    ]),
    calc("calc-ph", "Inclinación del plano", "Un plano cuyas trazas forman 135° y 45° con la LT forma el mismo ángulo con el PH y con el PV. ¿Cuántos grados? (un decimal; cos θ = 1/√3)", nums(54.7, 54.74), "arccos(0,5774) ≈ 54,7°.", "cos θ = 0,5774."),
    calc("calc-proy", "Plano proyectante", "Si la traza vertical de un plano es perpendicular a la LT, el plano es perpendicular a uno de los planos de proyección. ¿Cuántos grados forma con él?", nums(90), "Es perpendicular: 90°.", "Es proyectante horizontal."),
    calc("calc-trazas", "Trazas", "¿Cuántas trazas tiene un plano horizontal (paralelo al PH)?", nums(1), "Solo corta al PV: tiene una traza, la vertical.", "No corta al PH."),
    sort("clasifica-plano", "¿Qué plano es?", "Clasifica según las trazas.",
      [["obl", "Oblicuo", "cobalt"], ["pro", "Proyectante", "amber"], ["par", "Paralelo a un plano o a la LT", "emerald"]],
      [["Las dos trazas oblicuas a la LT", "obl"], ["Traza vertical perpendicular a la LT", "pro"], ["Traza horizontal perpendicular a la LT", "pro"], ["Solo traza vertical, paralela a la LT", "par"], ["Solo traza horizontal, paralela a la LT", "par"], ["Dos trazas paralelas a la LT", "par"]],
      "Las trazas perpendiculares a la LT indican planos proyectantes; las paralelas, planos paralelos.",
    ),
    pick("check-corte", "Dónde se cortan las trazas", "¿Dónde se cortan las dos trazas de un plano oblicuo?",
      "En un punto de la línea de tierra",
      [["En el punto de mayor cota", "No depende de la cota."], ["En el origen del PH", "No hay un origen especial."], ["No se cortan nunca", "Se cortan en la LT, salvo paralelas a ella."]],
      "Ambas trazas están en el plano; la LT es la intersección de PH y PV, así que allí coinciden.",
    ),
  ],
};
