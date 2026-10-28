import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const calorTemperaturaEspecificoFq3Lesson: InteractiveLesson = {
  slug: "calor-temperatura-especifico-fq3",
  title: "3. Calor, temperatura y calor específico",
  subtitle: FQ3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Calor y temperatura", [
      { kind: "steps", items: [
        "La **temperatura** mide la **agitación media** de las partículas; se mide en **°C** o en **K** (K = °C + 273).",
        "El **calor** es la **energía que se transfiere** entre dos cuerpos a distinta temperatura: va **del caliente al frío** hasta el **equilibrio térmico**. Se mide en **J** (también en **cal**: 1 cal = 4,18 J).",
        "Un cuerpo no «tiene calor»: tiene **energía interna**; el calor es la energía **en tránsito**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuánto calor hace falta", [
      { kind: "text", text: "Elige un material y calcula la energía necesaria para calentarlo. ¿Qué material se calienta con menos energía?" },
    ], tool("fq3-calor-especifico-explorador"), "visual-top"),
    slide("q", "La ecuación del calor", [
      { kind: "steps", items: [
        "**Q = m · c · ΔT**, con m en kg, ΔT en °C y c el **calor específico** (J/kg·°C).",
        "El agua tiene **c = 4180 J/kg·°C**, un valor muy alto: absorbe mucha energía sin cambiar mucho de temperatura.",
        "**Equilibrio térmico**: al mezclar dos cuerpos, el calor que cede el caliente es igual al que absorbe el frío: **m₁·c₁·(T₁ − Tₑ) = m₂·c₂·(Tₑ − T₂)**. Con el mismo material: **Tₑ = (m₁T₁ + m₂T₂) / (m₁ + m₂)**.",
      ] },
    ]),
    calc("calc-q", "Calentar agua", "¿Cuánto calor hace falta para calentar 2 kg de agua 50 °C? (c = 4180 J/kg·°C), en kJ (redondea a un decimal)", nums(418), "Q = 2 · 4180 · 50 = 418 000 J = 418 kJ.", "Q = m·c·ΔT."),
    calc("calc-fe", "Calentar hierro", "¿Y para calentar 1 kg de hierro 100 °C? (c = 450 J/kg·°C), en kJ", nums(45), "Q = 1 · 450 · 100 = 45 000 J = 45 kJ.", "Usa el calor específico del hierro."),
    calc("calc-t", "Tiempo de calentamiento", "Un calentador de 1000 W aporta 418 kJ al agua. ¿Cuántos segundos tarda?", nums(418), "t = 418 000 J / 1000 W = 418 s.", "t = Q/P."),
    calc("calc-eq", "Temperatura final", "Se mezclan 2 kg de agua a 80 °C con 3 kg de agua a 20 °C. ¿Cuál es la temperatura de equilibrio, en °C?", nums(44), "(2·80 + 3·20) / 5 = 220 / 5 = 44 °C.", "Media ponderada por las masas."),
    sort("clasifica", "Calor o temperatura", "Clasifica cada afirmación.",
      [["ca", "Calor", "rose"], ["te", "Temperatura", "cobalt"]],
      [["Energía que pasa de un cuerpo a otro", "ca"], ["Se mide en julios", "ca"], ["Fluye del cuerpo caliente al frío", "ca"], ["Se mide con un termómetro", "te"], ["Mide la agitación media de las partículas", "te"], ["Se mide en °C o K", "te"]],
      "El calor es energía en tránsito; la temperatura mide agitación.",
    ),
    pick("check", "Calor específico", "El cobre tiene menor calor específico que el agua. Con el mismo calor y la misma masa, ¿qué ocurre?",
      "El cobre sube más de temperatura",
      [["El agua sube más", "Es al revés: el agua necesita más energía."], ["Suben igual", "Depende de c."], ["No sube ninguno", "Ambos suben."]],
      "ΔT = Q/(m·c): menor c, mayor ΔT.",
    ),
  ],
};
