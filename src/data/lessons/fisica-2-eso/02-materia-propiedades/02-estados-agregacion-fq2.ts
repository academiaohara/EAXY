import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estadosAgregacionFq2Lesson: InteractiveLesson = {
  slug: "estados-agregacion-fq2",
  title: "2. Los estados de agregación",
  subtitle: FQ2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres estados habituales", [
      { kind: "steps", items: [
        "La materia se presenta normalmente en tres **estados de agregación**: **sólido**, **líquido** y **gas**.",
        "Un mismo material puede estar en los tres: el **agua** es hielo, agua líquida o vapor, según la temperatura.",
        "El estado depende de la **temperatura** y de la **presión**.",
        "Se distinguen por la forma, el volumen y la facilidad para **comprimirse** o **fluir**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Compara los tres estados", [
      { kind: "text", text: "Elige un estado y fíjate en la forma, el volumen, la compresibilidad y cómo están las partículas." },
    ], tool("fq2-estados-propiedades-explorador"), "visual-top"),
    slide("props", "Propiedades de cada estado", [
      { kind: "steps", items: [
        "**Sólido**: forma y volumen **fijos**; no se comprime; no fluye.",
        "**Líquido**: volumen **fijo** pero **toma la forma** del recipiente; casi no se comprime; **fluye**.",
        "**Gas**: **sin forma ni volumen propios**: llena todo el recipiente; se **comprime** fácilmente; fluye.",
        "Hay otros estados, como el **plasma** (el del Sol y los rayos) y el **condensado de Bose-Einstein**, pero no son habituales en la vida diaria.",
      ] },
    ]),
    calc("calc-gas", "Gases comprimibles", "Una jeringuilla con 60 mL de aire se comprime hasta 20 mL. ¿Cuántas veces ha disminuido el volumen?", nums(3), "60 / 20 = 3 veces.", "Divide el volumen inicial entre el final."),
    calc("calc-liq", "Líquido casi incomprensible", "Una jeringuilla con 60 mL de agua se aprieta con fuerza. Aunque se aprieta, el volumen casi no cambia. ¿Cuántos mL tendrá aproximadamente?", nums(60), "Los líquidos casi no se comprimen: sigue habiendo 60 mL.", "No cambia apenas."),
    sort("clasifica", "¿Qué estado es?", "Clasifica cada descripción.",
      [["sol", "Sólido", "cobalt"], ["liq", "Líquido", "amber"], ["gas", "Gas", "emerald"]],
      [["Mantiene su forma sin recipiente", "sol"], ["Una piedra", "sol"], ["Toma la forma del recipiente y tiene volumen fijo", "liq"], ["La leche en un vaso", "liq"], ["Ocupa todo el recipiente y se comprime", "gas"], ["El aire de un globo", "gas"]],
      "La forma y el volumen fijos distinguen los sólidos; los líquidos fluyen; los gases se expanden.",
    ),
    pick("check", "Volumen propio", "¿Qué estados de agregación tienen volumen propio (fijo)?",
      "Sólido y líquido",
      [["Solo el sólido", "El líquido también lo tiene."], ["Solo el gas", "El gas ocupa todo el recipiente."], ["Líquido y gas", "El gas no tiene volumen propio."]],
      "Un gas se expande hasta ocupar todo el recipiente; los sólidos y los líquidos mantienen su volumen.",
    ),
  ],
};
