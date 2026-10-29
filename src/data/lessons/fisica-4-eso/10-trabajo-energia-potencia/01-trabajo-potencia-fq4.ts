import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const trabajoPotenciaFq4Lesson: InteractiveLesson = {
  slug: "trabajo-potencia-fq4",
  title: "1. Trabajo y potencia",
  subtitle: FQ4_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("trabajo", "Qué es el trabajo", [
      { kind: "steps", items: [
        "En física hay **trabajo** cuando una **fuerza** provoca un **desplazamiento**. Sostener una mochila quieta, aunque canse, **no** es trabajo físico.",
        "Con fuerza constante: **W = F·d·cos θ**, donde θ es el ángulo entre la fuerza y el desplazamiento. Se mide en **julios (J)**: 1 J = 1 N·m.",
        "Si **θ = 0°**, W = F·d (máximo). Si **θ = 90°**, **W = 0**: el peso y la normal no hacen trabajo en un movimiento horizontal.",
        "Si **θ = 180°**, W es **negativo**: la fuerza se opone al movimiento (el rozamiento).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Trabajo y potencia", [
      { kind: "text", text: "Cambia el ángulo de la fuerza. ¿Cuándo el trabajo es máximo? ¿Y nulo? ¿Y negativo?" },
    ], tool("fq4-trabajo-potencia-explorador"), "visual-top"),
    slide("potencia", "La potencia", [
      { kind: "steps", items: [
        "La **potencia** mide lo **rápido** que se realiza un trabajo: **P = W/t**. Unidad: **vatio (W)** = 1 J/s. Múltiplos: kW, MW.",
        "También **P = F·v** (fuerza por velocidad, si F y v son paralelas).",
        "**1 CV** ≈ 735,5 W. Un motor más potente hace el mismo trabajo en **menos tiempo**.",
        "La **energía eléctrica** se mide en **kWh**: 1 kWh = 1000 W · 3600 s = **3,6·10⁶ J**.",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo guiado", [
      { kind: "text", text: "Una grúa sube 200 kg a 10 m de altura en 20 s. La fuerza mínima es el peso: F = 200·10 = 2000 N, en la dirección del desplazamiento (θ = 0°). **W = 2000·10 = 20 000 J**. **P = 20 000/20 = 1000 W = 1 kW**. (Con g = 10 m/s².)" },
    ]),
    calc("calc-w", "Trabajo", "Se empuja una caja con 50 N a lo largo de 8 m en la dirección del movimiento. ¿Qué trabajo se realiza, en J?", nums(400), "W = F·d = 50·8 = 400 J.", "θ = 0°, cos 0° = 1."),
    calc("calc-cos", "Fuerza inclinada", "Una fuerza de 100 N forma 60° con el desplazamiento de 10 m. ¿Qué trabajo hace, en J? (cos 60° = 0,5)", nums(500), "W = 100·10·0,5 = 500 J.", "W = F·d·cos θ."),
    calc("calc-p", "Potencia", "Un motor realiza 6000 J de trabajo en 30 s. ¿Qué potencia tiene, en W?", nums(200), "P = 6000/30 = 200 W.", "P = W/t."),
    calc("calc-kwh", "kWh", "Una estufa de 2 kW funciona 3 horas. ¿Cuántos kWh consume?", nums(6), "E = 2·3 = 6 kWh.", "E = P·t."),
    sort("clasifica", "Signo del trabajo", "¿Cómo es el trabajo de cada fuerza?",
      [["pos", "Positivo", "emerald"], ["neg", "Negativo", "rose"], ["nul", "Nulo", "cobalt"]],
      [["Tu fuerza al empujar una caja que avanza", "pos"], ["El rozamiento sobre una caja que desliza", "neg"], ["La normal sobre una caja que desliza en horizontal", "nul"], ["El peso sobre un cuerpo que cae", "pos"], ["El peso sobre un cuerpo que sube", "neg"], ["La fuerza centrípeta en un MCU", "nul"]],
      "Depende del ángulo: < 90° positivo, 90° nulo, > 90° negativo.",
    ),
    pick("check", "Peso en horizontal", "Un libro se desplaza horizontalmente sobre una mesa. ¿Qué trabajo hace su peso?",
      "Cero, porque el peso es perpendicular al desplazamiento",
      [["Positivo, porque el libro tiene peso", "El ángulo es 90°."], ["Negativo, porque se opone al movimiento", "No se opone: es perpendicular."], ["P·d, siempre", "Depende del ángulo."]],
      "cos 90° = 0.",
    ),
  ],
};
