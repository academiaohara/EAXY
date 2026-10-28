import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const enlaceIonicoFq3Lesson: InteractiveLesson = {
  slug: "enlace-ionico-fq3",
  title: "2. El enlace iónico",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ceder y ganar", [
      { kind: "steps", items: [
        "Los átomos se unen para alcanzar una **última capa completa** (regla del octeto), como los gases nobles.",
        "En el **enlace iónico**, un **metal** (pocos electrones de valencia) **cede** electrones a un **no metal**, que los **gana**.",
        "Se forman **iones**: un **catión** (+) y un **anión** (−). Las cargas opuestas se **atraen** con fuerza.",
        "Los iones se ordenan en una **red cristalina**, no en moléculas sueltas.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Del sodio al cloro", [
      { kind: "text", text: "Sigue el electrón que pasa del sodio al cloro y la atracción entre los iones." },
    ], anim("fq3-enlace-ionico"), "visual-top"),
    slide("explora", "Combina iones", [
      { kind: "text", text: "Elige un metal y un no metal. ¿Qué fórmula resulta? ¿Cuántos iones de cada tipo?" },
    ], tool("fq3-enlace-ionico-explorador"), "visual-top"),
    slide("formula", "Cómo sale la fórmula", [
      { kind: "steps", items: [
        "El compuesto es **neutro**: la suma de cargas positivas y negativas debe ser **cero**.",
        "**Mg²⁺ + Cl⁻**: hacen falta 2 Cl⁻ por cada Mg²⁺ → **MgCl₂**.",
        "**Al³⁺ + O²⁻**: se cruzan las cargas y se simplifica → **Al₂O₃** (2·3 = 3·2 = 6).",
        "La fórmula expresa la **proporción mínima** de iones: se llama **unidad fórmula**.",
      ] },
    ]),
    calc("calc-ion", "Carga del ion", "El calcio (2 – 8 – 8 – 2) cede sus electrones de valencia. ¿Cuál es la carga del ion Ca? (número, con signo)", nums(2), "Pierde 2 electrones: Ca²⁺.", "Cuántos pierde para quedar con la capa llena."),
    calc("calc-cl", "Cloruros", "¿Cuántos iones Cl⁻ hay por cada ion Mg²⁺ en el MgCl₂?", nums(2), "Hace falta 2·(−1) para compensar +2: 2 Cl⁻.", "La carga total debe ser cero."),
    calc("calc-carga", "Neutralidad", "En el Al₂O₃, la carga positiva total es 2·(+3). ¿Cuánto vale la carga negativa total, en valor absoluto, con 3 iones O²⁻?", nums(6), "3 · 2 = 6: las cargas se compensan.", "Debe igualar la positiva."),
    sort("clasifica", "Catión o anión", "Clasifica cada ion.",
      [["ca", "Catión", "amber"], ["an", "Anión", "cobalt"]],
      [["Na⁺", "ca"], ["Mg²⁺", "ca"], ["Al³⁺", "ca"], ["Cl⁻", "an"], ["O²⁻", "an"], ["S²⁻", "an"]],
      "Los metales forman cationes; los no metales, aniones.",
    ),
    pick("check", "Fórmula", "¿Cuál es la fórmula del compuesto de Na⁺ y O²⁻?",
      "Na₂O",
      [["NaO", "No queda neutro."], ["NaO₂", "Sobran cargas negativas."], ["Na₂O₂", "No es la proporción mínima."]],
      "Dos Na⁺ para compensar un O²⁻.",
    ),
  ],
};
