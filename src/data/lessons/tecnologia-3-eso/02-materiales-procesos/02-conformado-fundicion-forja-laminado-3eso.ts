import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conformadoFundicionForjaLaminado3esoLesson: InteractiveLesson = {
  slug: "conformado-fundicion-forja-laminado-3eso",
  title: "2. Procesos de conformado: fundición, forja y laminado",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dar forma al material", [
      { kind: "steps", items: [
        "**Conformado por moldeo (fundición)**: se vierte metal líquido en un molde y se deja solidificar.",
        "**Conformado por deformación**: se deforma el material sin arrancarle trozos: **forja** (golpear), **laminado** (pasar entre rodillos), **extrusión** (empujar por un orificio), **estampación** y **doblado** (chapa).",
        "**Mecanizado**: se **arranca** material con herramientas (torno, fresa, taladro).",
        "Cada proceso sirve para ciertos materiales, formas y cantidades.",
      ] },
    ], undefined, "stack"),
    slide("anim", "La fundición paso a paso", [
      { kind: "text", text: "Observa cómo se fabrica una pieza por fundición en molde de arena." },
    ], anim("eso3-fundicion-molde"), "text-top"),
    slide("calc", "Cuánto metal hace falta", [
      { kind: "text", text: "Calcula el metal que hay que fundir y la medida del modelo para compensar la contracción." },
    ], tool("eso3-fundicion-explorador"), "visual-top"),
    slide("def2", "Deformación plástica", [
      { kind: "steps", items: [
        "**Forja**: se calienta el metal y se golpea o prensa: mejora la estructura interna (herramientas, piezas de motor).",
        "**Laminado**: rodillos reducen el espesor de una pieza: chapas, perfiles, carriles.",
        "**Extrusión**: el material pasa por un orificio con la forma de la sección: perfiles de aluminio y tuberías.",
        "**Doblado y embutición**: se deforma chapa fría con una prensa: carrocerías, latas.",
      ] },
    ]),
    calc("calc-masa", "Metal a fundir", "Una pieza de aluminio (2,7 g/cm³) tiene un volumen de 200 cm³. Con un 30 % extra de bebederos y mazarotas, ¿cuántos kg de aluminio hay que fundir? (200 · 2,7 · 1,3 / 1 000)", nums(0.702, 0.70, 0.7), "200 · 2,7 · 1,3 = 702 g = 0,702 kg.", "Volumen por densidad por 1,3; pasa a kg."),
    calc("calc-modelo", "Medida del modelo", "El bronce se contrae un 1,5 %. Para obtener una pieza de 100 mm, ¿de cuántos mm debe ser el modelo?", nums(101.5), "100 · 1,015 = 101,5 mm.", "Aumenta la medida un 1,5 %."),
    sort("clasifica-proceso", "¿Qué proceso es?", "Relaciona cada situación con el proceso.",
      [["fun", "Fundición", "amber"], ["def", "Deformación", "cobalt"], ["mec", "Mecanizado", "emerald"]],
      [["Verter bronce líquido en un molde", "fun"], ["Piezas con formas complejas y huecos internos", "fun"], ["Aplastar una barra caliente con un martillo pilón", "def"], ["Pasar una plancha entre rodillos", "def"], ["Arrancar viruta con un torno", "mec"], ["Taladrar un agujero", "mec"]],
      "Fundir da forma líquida; deformar la cambia sin arrancar; mecanizar la afina quitando material.",
    ),
    pick("check-fund", "Por qué un modelo mayor", "¿Por qué el modelo de una pieza de fundición se hace algo mayor que la pieza final?",
      "Porque el metal se contrae al enfriarse y solidificar",
      [["Para que sobre material y regalarlo", "No es la razón."], ["Porque la arena lo encoge", "Es el metal el que se contrae."], ["Por estética", "Es una razón física."]],
      "Hay que compensar la contracción para que la pieza salga con la medida correcta.",
    ),
  ],
};
