import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const escalasDibujoLesson: InteractiveLesson = {
  slug: "escalas-dibujo",
  title: "4. Escalas",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando el objeto no cabe en el papel", [
      { kind: "definition", text: "La **escala** es la relación entre una medida del dibujo y la medida real del objeto: $E = \\dfrac{\\text{medida en el dibujo}}{\\text{medida real}}$." },
      { kind: "steps", items: [
        "**Escala natural 1:1**: el dibujo mide igual que el objeto.",
        "**Reducción 1:n** (por ejemplo 1:50): el dibujo es n veces más pequeño. Para casas, coches o mapas.",
        "**Ampliación n:1** (por ejemplo 5:1): el dibujo es n veces mayor. Para piezas muy pequeñas, como un reloj.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Una pared de 6 m en un folio", [
      { kind: "text", text: "Una escala se usa en las dos direcciones: para dibujar se **divide**, para interpretar un plano se **multiplica**." },
    ], anim("escala-reduccion"), "split"),
    slide("regla", "Calcular con escalas", [
      { kind: "rule", title: "Dibujar y leer", formula: "\\text{dibujo} = \\text{real} \\times E \\qquad\\qquad \\text{real} = \\dfrac{\\text{dibujo}}{E}" },
      { kind: "example", title: "Plano a escala 1:50", lines: [{ math: "\\text{pasillo en el plano} = 8\\ \\text{cm}" }, { math: "\\text{real} = 8 \\times 50 = 400\\ \\text{cm} = 4\\ \\text{m}" }] },
      { kind: "warning", title: "Ojo", text: "En un plano **no se miden las cotas con la regla**: se leen las cifras escritas. La escala solo ayuda si falta una medida." },
    ]),
    slide("explora", "¿Cabe en un A4?", [
      { kind: "text", text: "Prueba distintas escalas para una medida real y comprueba si el dibujo cabe en la hoja." },
    ], tool("escala-dibujo-explorador", { n: 4, a: 6000 }), "visual-top"),
    calc("calc-reduccion", "Dibujo a 1:100", "Una casa mide 12 m de largo. ¿Cuántos centímetros medirá en un plano a escala 1:100?",
      nums(12), "12 m = 1200 cm. En el dibujo: 1200 cm ÷ 100 = 12 cm.", "Pasa los metros a centímetros y divide entre 100."),
    calc("calc-ampliacion", "Ampliación 2:1", "Un tornillo mide 25 mm y se dibuja a escala 2:1. ¿Cuántos milímetros mide el dibujo?",
      nums(50), "A escala 2:1 el dibujo es el doble de grande: 25 × 2 = 50 mm.", "Multiplica por 2."),
    pick("check-escala", "Elegir la escala", "Quieres dibujar en un A4 un patio de 15 m de largo. ¿Qué escala es la más razonable?",
      "1:100, porque da un dibujo de 15 cm que cabe en la hoja",
      [["1:1", "Mediría 15 m en el papel: imposible."], ["10:1", "Es una ampliación: haría el dibujo diez veces mayor que el patio."], ["1:2", "Daría 7,5 m de dibujo, mucho más que un folio."]],
      "Una escala de reducción adecuada hace que el dibujo quepa en la hoja con detalle suficiente: 15 m ÷ 100 = 15 cm.",
    ),
  ],
};
