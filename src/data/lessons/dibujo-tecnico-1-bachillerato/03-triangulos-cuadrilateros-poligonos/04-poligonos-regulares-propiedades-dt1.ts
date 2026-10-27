import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poligonosRegularesPropiedadesDt1Lesson: InteractiveLesson = {
  slug: "poligonos-regulares-propiedades-dt1",
  title: "4. Polígonos regulares: propiedades",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Lados y ángulos iguales", [
      { kind: "steps", items: [
        "Un **polígono regular** tiene todos sus lados y todos sus ángulos iguales. Siempre se puede **inscribir** en una circunferencia.",
        "**Ángulo central**: $\\alpha = \\dfrac{360^\\circ}{n}$. **Ángulo interior**: $\\dfrac{180^\\circ (n-2)}{n}$.",
        "**Lado**: $l = 2R\\,\\operatorname{sen}\\dfrac{180^\\circ}{n}$. **Apotema**: $a = R\\,\\cos\\dfrac{180^\\circ}{n}$.",
        "**Área**: $A = \\dfrac{P \\cdot a}{2}$, con $P = n\\,l$ el perímetro.",
        "Número de **diagonales**: $\\dfrac{n(n-3)}{2}$.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cambia el número de lados", [
      { kind: "text", text: "Aumenta n y observa cómo el área se acerca a la del círculo. Prueba el hexágono." },
    ], tool("dt1-poligono-regular-explorador"), "visual-top"),
    slide("casos", "Casos que conviene recordar", [
      { kind: "steps", items: [
        "**Triángulo equilátero**: $l = R\\sqrt{3}$.",
        "**Cuadrado**: $l = R\\sqrt{2}$.",
        "**Hexágono**: $l = R$. Se compone de **6 triángulos equiláteros**.",
        "**Pentágono**: $l = 1{,}176\\,R$. **Decágono**: $l = 0{,}618\\,R$ (la sección áurea del radio).",
        "Si se conoce el **lado**, el radio es $R = \\dfrac{l}{2\\,\\operatorname{sen}(180^\\circ/n)}$.",
      ] },
    ]),
    calc("calc-hex", "Lado del hexágono", "Un hexágono regular está inscrito en una circunferencia de 5 cm de radio. ¿Cuánto mide su lado, en cm?", nums(5), "En el hexágono, l = R = 5 cm.", "Seis triángulos equiláteros."),
    calc("calc-int", "Ángulo interior", "¿Cuánto mide el ángulo interior de un octógono regular, en grados?", nums(135), "180 · 6 / 8 = 135°.", "180(n − 2)/n con n = 8."),
    calc("calc-diag", "Diagonales", "¿Cuántas diagonales tiene un decágono?", nums(35), "10 · 7 / 2 = 35.", "n(n − 3)/2."),
    calc("calc-area", "Área del hexágono", "Un hexágono regular de lado 4 cm. ¿Qué área tiene, en cm²? (6 triángulos equiláteros, un decimal)", nums(41.6, 41.57), "6 · (√3/4) · 16 ≈ 41,57 cm².", "Área del triángulo equilátero: l²√3/4."),
    sort("clasifica-pol", "¿Qué polígono es?", "Asocia cada dato con el polígono.",
      [["tri", "Triángulo (n = 3)", "cobalt"], ["cua", "Cuadrado (n = 4)", "amber"], ["hex", "Hexágono (n = 6)", "emerald"], ["dec", "Decágono (n = 10)", "rose"]],
      [["Ángulo central de 120°", "tri"], ["Lado igual a R√3", "tri"], ["Ángulo central de 90°", "cua"], ["Lado igual a R√2", "cua"], ["Lado igual al radio", "hex"], ["Ángulo interior de 120°", "hex"], ["Ángulo central de 36°", "dec"], ["Lado igual a 0,618 R", "dec"]],
      "El ángulo central 360°/n identifica el polígono.",
    ),
    pick("check-hex", "Teselar", "¿Por qué el hexágono regular rellena el plano sin huecos (como un panal)?",
      "Porque su ángulo interior es 120° y tres encajan en 360°",
      [["Porque tiene seis lados", "El número de lados no basta."], ["Porque su lado es igual al radio", "Eso no decide el encaje."], ["Porque su apotema es entera", "No tiene relación."]],
      "Alrededor de un vértice caben 3 hexágonos: 3 · 120° = 360°.",
    ),
  ],
};
