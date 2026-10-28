import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const corteUnionAcabado2esoLesson: InteractiveLesson = {
  slug: "corte-union-acabado-2eso",
  title: "6. Técnicas de corte, unión y acabado",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("fases", "Tres fases de la fabricación", [
      { kind: "steps", items: [
        "**Corte y conformado**: dar la forma (serrar, limar, taladrar, doblar).",
        "**Unión**: ensamblar las piezas (pegar, atornillar, remachar, soldar).",
        "**Acabado**: proteger y mejorar el aspecto (lijar, pintar, barnizar).",
        "Siempre se hacen en orden: **marcar → sujetar → trabajar → comprobar**.",
      ] },
    ], undefined, "stack"),
    slide("tecnica", "La técnica para cada material", [
      { kind: "text", text: "Elige el material y la operación para ver la técnica habitual y la protección que necesitas." },
    ], tool("eso2-tecnica-taller-explorador"), "visual-top"),
    slide("uniones", "Uniones fijas y desmontables", [
      { kind: "compare",
        left: { title: "Desmontables", text: "**Tornillos**, tuercas, bridas, escuadras. Permiten **reparar o sustituir** una pieza.", tone: "info" },
        right: { title: "Fijas", text: "**Cola**, remaches, **soldadura**. Más resistentes o más ligeras, pero no se separan sin romper.", tone: "key" } },
    ]),
    calc("calc-tornillos", "Cuántos tornillos", "Una estantería tiene 6 uniones y cada una lleva 4 tornillos. ¿Cuántos tornillos hacen falta?", nums(24), "6 · 4 = 24 tornillos.", "Uniones por tornillos por unión."),
    sort("clasifica-operacion", "Corte, unión o acabado", "Clasifica cada herramienta o producto.",
      [["cor", "Corte", "cobalt"], ["uni", "Unión", "amber"], ["aca", "Acabado", "emerald"]],
      [["Serrucho", "cor"], ["Sierra de arco", "cor"], ["Cola blanca", "uni"], ["Tornillos y remaches", "uni"], ["Lija", "aca"], ["Barniz y pintura", "aca"]],
      "Cada herramienta pertenece a una fase: darle forma, ensamblarla o terminarla.",
    ),
    pick("check-orden", "Orden de trabajo", "¿Qué haces primero al cortar una pieza de madera?",
      "Marcar la línea de corte y sujetar bien la pieza",
      [["Cortar directamente", "Sin marcar ni sujetar el corte sale torcido y es peligroso."], ["Pintarla", "El acabado va al final."], ["Unirla a otra", "La unión va después del corte."]],
      "Marcar con precisión y sujetar la pieza dan cortes limpios y seguros.",
    ),
  ],
};
