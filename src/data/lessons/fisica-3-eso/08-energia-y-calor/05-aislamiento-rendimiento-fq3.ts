import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aislamientoRendimientoFq3Lesson: InteractiveLesson = {
  slug: "aislamiento-rendimiento-fq3",
  title: "5. Transferencia de calor, aislamiento y rendimiento",
  subtitle: FQ3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo viaja el calor", [
      { kind: "steps", items: [
        "**Conducción**: de partícula a partícula en un sólido, sin que la materia se desplace. Los **metales** conducen bien; la madera, el plástico o el aire, mal.",
        "**Convección**: el calor se transporta por el **movimiento de un fluido** (el aire caliente sube, el agua caliente sube en una olla).",
        "**Radiación**: transmisión por **ondas electromagnéticas**, sin necesitar medio material (el calor del Sol, de una hoguera).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Aislar una pared", [
      { kind: "text", text: "Cambia el material y el espesor de una pared. ¿Cuánto calor se pierde?" },
    ], tool("fq3-aislamiento-explorador"), "visual-top"),
    slide("aisl", "Aislamiento térmico", [
      { kind: "steps", items: [
        "Un **aislante** tiene **conductividad térmica baja**: lana de roca, poliestireno, corcho, fibra de vidrio, el aire encerrado (doble ventana).",
        "**P = k · A · ΔT / e**: se pierde menos calor con **mayor espesor** y menor **k**.",
        "Aislar bien la vivienda **reduce el gasto** de calefacción y aire acondicionado y las **emisiones de CO₂**.",
      ] },
    ]),
    slide("rend", "Rendimiento y ahorro", [
      { kind: "steps", items: [
        "En toda máquina parte de la energía se **disipa** (casi siempre como calor): **rendimiento = energía útil / energía total · 100**.",
        "Una **bombilla incandescente** aprovecha en luz ~5 %; una **LED**, mucho más. Un **motor de gasolina**, ~25–30 %.",
        "**Ahorrar**: apagar aparatos, usar equipos **eficientes** (clase A), aislar, aprovechar energías **renovables**.",
      ] },
    ]),
    calc("calc-p", "Pérdida de calor", "Una pared de lana de roca (k = 0,04 W/m·°C) de 20 m², 0,1 m de espesor y 20 °C de diferencia pierde P = k·A·ΔT/e. ¿Cuántos W?", nums(160), "P = 0,04 · 20 · 20 / 0,1 = 160 W.", "Sustituye en la fórmula."),
    calc("calc-esp", "Más espesor", "Si se duplica el espesor del aislante, ¿por cuánto se divide la pérdida de calor?", nums(2), "P es inversamente proporcional a e: se divide entre 2.", "P ∝ 1/e."),
    calc("calc-rend", "Rendimiento", "Una máquina consume 500 J y produce 150 J de energía útil. ¿Cuál es su rendimiento, en %?", nums(30), "150 / 500 · 100 = 30 %.", "Útil entre total."),
    calc("calc-ahorro", "Ahorro", "Cambiar una bombilla de 60 W por una LED de 8 W que luce 5 horas al día durante 100 días ahorra en total, en kWh (redondea a un decimal):", nums(26, 26.0), "(60 − 8) W · 500 h = 26 000 Wh = 26 kWh.", "Resta potencias y multiplica por horas."),
    sort("clasifica", "Tipo de transmisión", "Clasifica cada situación según cómo se transmite el calor.",
      [["cd", "Conducción", "amber"], ["cv", "Convección", "cobalt"], ["ra", "Radiación", "rose"]],
      [["Una cuchara de metal se calienta en la sopa", "cd"], ["El mango de una sartén de metal quema", "cd"], ["El aire caliente sube sobre un radiador", "cv"], ["Las corrientes en una olla con agua hirviendo", "cv"], ["El calor del Sol que llega a la Tierra", "ra"], ["El calor que se nota junto a una hoguera sin tocarla", "ra"]],
      "Contacto: conducción; fluido en movimiento: convección; ondas: radiación.",
    ),
    pick("check", "Aislantes", "¿Por qué una chaqueta de plumas abriga?",
      "Porque el aire que queda atrapado en las plumas es mal conductor",
      [["Porque genera calor", "No produce calor, lo retiene."], ["Porque las plumas son muy pesadas", "No es por el peso."], ["Porque refleja el frío", "No existe «frío» que reflejar."]],
      "El aire encerrado es un buen aislante térmico.",
    ),
  ],
};
