import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const productosCotidianosAcidosBasesPhFq3Lesson: InteractiveLesson = {
  slug: "productos-cotidianos-acidos-bases-ph-fq3",
  title: "1. Productos químicos cotidianos: ácidos, bases y pH",
  subtitle: FQ3_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "La química en casa", [
      { kind: "steps", items: [
        "En casa hay muchos **productos químicos**: **alimentos**, **medicamentos**, **detergentes**, **cosméticos**, **plásticos**, **combustibles**, **pinturas**.",
        "Muchos son **disoluciones**: la lejía, el vinagre, los refrescos, los productos de limpieza.",
        "Algunos son **ácidos** (vinagre, limón, refrescos) y otros **bases** (jabón, lejía, amoníaco, antiácidos).",
      ] },
    ], undefined, "stack"),
    slide("explora", "La escala de pH", [
      { kind: "text", text: "Recorre sustancias cotidianas y mira dónde están en la escala de pH." },
    ], tool("fq3-escala-ph-explorador"), "visual-top"),
    slide("ph", "Ácidos, bases y pH", [
      { kind: "steps", items: [
        "**Ácidos**: sabor agrio, pH **menor que 7**, corroen metales, dan color **rojo** a la col lombarda.",
        "**Bases**: tacto jabonoso, sabor amargo, pH **mayor que 7**, dan color **verde-azulado** a la col lombarda.",
        "**Neutralización**: un ácido y una base reaccionan y forman una **sal** y **agua** (un antiácido neutraliza el exceso de ácido del estómago).",
        "La escala de pH es **logarítmica**: una unidad menos es **10 veces** más ácido.",
      ] },
    ]),
    calc("calc-veces", "Comparar acidez", "Una disolución de pH 3 frente a otra de pH 5: ¿cuántas veces es más ácida?", nums(100), "Hay 2 unidades de diferencia: 10² = 100 veces.", "Cada unidad es ×10."),
    calc("calc-h", "Concentración de H⁺", "Una disolución tiene pH 4. Su concentración de H⁺ es 10⁻ⁿ mol/L. ¿Cuánto vale n?", nums(4), "[H⁺] = 10⁻⁴ mol/L: n = 4.", "El exponente es el pH."),
    calc("calc-lluvia", "Lluvia", "La lluvia normal tiene pH ≈ 5,6. Si una lluvia ácida tiene pH 4,6, ¿cuántas veces más ácida es?", nums(10), "Una unidad menos de pH: 10 veces más ácida.", "Diferencia de 1 unidad."),
    sort("clasifica", "Ácido, neutro o base", "Clasifica cada sustancia.",
      [["ac", "Ácida (pH < 7)", "rose"], ["ne", "Neutra (pH ≈ 7)", "emerald"], ["ba", "Básica (pH > 7)", "cobalt"]],
      [["Vinagre", "ac"], ["Zumo de limón", "ac"], ["Refresco de cola", "ac"], ["Agua pura", "ne"], ["Jabón", "ba"], ["Lejía", "ba"]],
      "El pH indica la acidez.",
    ),
    pick("check", "Antiácido", "¿Por qué un antiácido alivia el ardor de estómago?",
      "Porque es una base que neutraliza parte del ácido",
      [["Porque es otro ácido más fuerte", "Aumentaría la acidez."], ["Porque disuelve el estómago", "No es cierto."], ["Porque enfría el estómago", "No es una cuestión de temperatura."]],
      "Ácido + base → sal + agua.",
    ),
  ],
};
