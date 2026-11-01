import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const posicionesRectaDiedricoDt1Lesson: InteractiveLesson = {
  slug: "posiciones-recta-diedrico-dt1",
  title: "3. Posiciones particulares de la recta",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Según su posición respecto a los planos", [
      { kind: "steps", items: [
        "Una recta puede ser **paralela** o **perpendicular** a los planos de proyección. De ello depende cómo se ven sus proyecciones.",
        "**Paralela a la LT**: ab y a′b′ son paralelas a la LT.",
        "**Horizontal** (paralela al PH): a′b′ ∥ LT. **Frontal** (paralela al PV): ab ∥ LT.",
        "**Vertical** (⟂ PH): una proyección es un punto. **De punta** (⟂ PV): la otra lo es.",
        "**De perfil**: está en un plano perpendicular a la LT; ab y a′b′ son perpendiculares a la LT.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Recorre las posiciones", [
      { kind: "text", text: "Elige cada posición y compara la longitud real con las de las proyecciones: en verde, las que están en verdadera magnitud." },
    ], tool("dt1-posiciones-recta-explorador"), "visual-top"),
    slide("vm", "Verdadera magnitud", [
      { kind: "steps", items: [
        "Una proyección está en **verdadera magnitud** cuando el segmento es **paralelo** al plano de proyección.",
        "En una recta **horizontal**, **ab** está en verdadera magnitud y su **inclinación** con la LT es el ángulo de la recta con el PV.",
        "En una recta **frontal**, **a′b′** está en verdadera magnitud y su ángulo con la LT es el que forma con el PH.",
        "En una recta **oblicua** ninguna proyección es el segmento real: hay que usar **giros**, **abatimientos** o **cambios de plano** (en Dibujo Técnico II).",
      ] },
    ]),
    calc("calc-vert", "Recta vertical", "Una recta vertical va del punto de cota 1 al de cota 5. ¿Cuánto mide la recta real, en cm?", nums(4), "Es perpendicular al PH: a′b′ está en verdadera magnitud, 5 − 1 = 4 cm.", "La cota varía 4."),
    calc("calc-perfil", "Recta de perfil", "Una recta de perfil va de (alejamiento 1, cota 1) a (alejamiento 4, cota 4) con la misma x. ¿Cuánto mide, en cm? (dos decimales)", nums(4.24, 4.2426), "√(3² + 3²) = √18 ≈ 4,24 cm; cada proyección mide 3 cm.", "Pitágoras con 3 y 3."),
    calc("calc-obl", "Recta oblicua", "Una recta va de A(−3, 1, 1) a B(3, 4, 5) (x, alejamiento, cota). ¿Cuánto mide el segmento AB, en cm? (dos decimales)", nums(7.81, 7.8102), "√(6² + 3² + 4²) = √61 ≈ 7,81 cm.", "Suma los cuadrados de las tres diferencias."),
    sort("clasifica-recta", "¿Qué recta es?", "Clasifica por la pista de sus proyecciones.",
      [["par", "Paralela a un plano", "cobalt"], ["per", "Perpendicular a un plano", "amber"], ["obl", "Oblicua o de perfil", "emerald"]],
      [["a′b′ paralela a la LT y ab inclinada", "par"], ["ab paralela a la LT y a′b′ inclinada", "par"], ["Una proyección es un punto", "per"], ["a′b′ perpendicular a la LT y ab es un punto", "per"], ["ab y a′b′ inclinadas respecto a la LT", "obl"], ["ab y a′b′ perpendiculares a la LT", "obl"]],
      "Las paralelas se reconocen por una proyección paralela a la LT; las perpendiculares, por una proyección que es un punto.",
    ),
    pick("check-punta", "Recta de punta", "En una recta de punta, ¿qué ocurre con la proyección vertical?",
      "Es un punto, porque la recta es perpendicular al PV",
      [["Es perpendicular a la LT", "Eso es la proyección horizontal."], ["Está en verdadera magnitud", "La verdadera magnitud está en ab."], ["Es paralela a la LT", "Eso es de la recta paralela a la LT."]],
      "Todos los puntos de la recta proyectan sobre el PV en el mismo punto.",
    ),
  ],
};
