import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eleccionSistemaRepresentacionDt2Lesson: InteractiveLesson = {
  slug: "eleccion-sistema-representacion-dt2",
  title: "5. Elegir el sistema de representación",
  subtitle: DT2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cada sistema, una función", [
      { kind: "steps", items: [
        "Ningún sistema es mejor que otro en todo: cada uno **resuelve** un problema distinto.",
        "Se elige según **qué se quiere comunicar**: medidas exactas, forma global, aspecto real o relieve del terreno.",
        "Los criterios habituales son el **número de vistas**, la **conservación de medidas**, el **realismo** y la **facilidad** de trazado.",
        "En un proyecto real se **combinan**: por ejemplo, planos diédricos para construir y perspectivas para presentar.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Qué necesito?", [
      { kind: "text", text: "Elige la necesidad y mira qué sistema conviene y cómo puntúa en realismo, medidas y facilidad." },
    ], tool("dt2-elegir-sistema-explorador"), "visual-top"),
    slide("combinar", "Combinar sistemas", [
      { kind: "steps", items: [
        "**Pieza industrial**: vistas diédricas **acotadas** para fabricar y una **isométrica** para entender la forma.",
        "**Edificio**: planos de **planta, alzado y sección** para construir, **perspectiva cónica** para enseñar al cliente.",
        "**Obra civil**: **planos acotados** para el terreno y **perfiles** (secciones) para calcular el movimiento de tierras.",
        "**Boceto**: **caballera** o **isométrica** a mano alzada para fijar ideas.",
      ] },
    ]),
    calc("calc-n", "Sistemas estudiados", "En los dos cursos de Dibujo Técnico se estudian el diédrico, el axonométrico, la caballera, el cónico y los planos acotados. ¿Cuántos sistemas de representación son?", nums(5), "Cinco sistemas.", "Cuéntalos."),
    calc("calc-v", "Vistas", "El sistema diédrico representa un objeto mediante, como mínimo, ¿cuántas proyecciones?", nums(2), "Planta y alzado: dos proyecciones.", "Sobre dos planos perpendiculares."),
    sort("clasifica", "¿Qué sistema?", "Asocia cada rasgo con su sistema.",
      [["die", "Diédrico", "cobalt"], ["con", "Cónico", "amber"], ["aco", "Planos acotados", "emerald"]],
      [["Dos vistas con medidas exactas", "die"], ["Piezas y planos de construcción", "die"], ["La imagen más realista", "con"], ["No conserva las medidas", "con"], ["La altura se indica con cotas", "aco"], ["Topografía y cubiertas", "aco"]],
      "Medidas: diédrico; realismo: cónico; terreno: acotados.",
    ),
    pick("check", "Presentación", "Para presentar un edificio a un cliente con la imagen más realista, ¿qué sistema eliges?",
      "Cónico",
      [["Diédrico", "Es exacto pero poco intuitivo."], ["Planos acotados", "Es para terreno."], ["Caballera", "Es más esquemática."]],
      "El cónico reproduce lo que vería el ojo.",
    ),
  ],
};
