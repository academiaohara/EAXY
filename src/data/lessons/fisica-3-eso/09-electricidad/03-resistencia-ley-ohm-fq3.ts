import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const resistenciaLeyOhmFq3Lesson: InteractiveLesson = {
  slug: "resistencia-ley-ohm-fq3",
  title: "3. Resistencia y ley de Ohm",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Resistencia eléctrica", [
      { kind: "steps", items: [
        "La **resistencia** R de un conductor mide **cuánto se opone al paso de la corriente**. Se mide en **ohmios (Ω)**.",
        "Un **buen conductor** (cobre) tiene poca resistencia; un **aislante**, muchísima.",
        "Las **resistencias** son componentes que se ponen en los circuitos para **limitar la corriente** o producir calor (tostadora, plancha).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ley de Ohm", [
      { kind: "text", text: "Cambia la tensión y la resistencia. ¿Qué intensidad circula?" },
    ], tool("fq3-ley-ohm-explorador"), "visual-top"),
    slide("ohm", "La ley de Ohm", [
      { kind: "steps", items: [
        "**Ley de Ohm**: **V = I · R**, o **I = V / R**.",
        "Con la **misma tensión**, a **más resistencia**, **menos intensidad**.",
        "La gráfica **V–I** de un conductor óhmico es una **recta** que pasa por el origen: su **pendiente** es R.",
        "Se despeja según lo que se busque: **R = V / I**, **V = I · R**.",
      ] },
    ]),
    slide("hilo", "De qué depende la resistencia", [
      { kind: "text", text: "Prueba distintos hilos: material, longitud y sección." },
    ], tool("fq3-resistencia-hilo-explorador"), "visual-top"),
    slide("formula", "Resistencia de un hilo", [
      { kind: "steps", items: [
        "**R = ρ · L / S**: depende del **material** (resistividad ρ), la **longitud** L y la **sección** S.",
        "Más **largo**, más resistencia. Más **grueso**, menos resistencia.",
        "Por eso los cables que llevan mucha corriente son **gruesos** y de **cobre**.",
      ] },
    ]),
    calc("calc-i", "Intensidad", "Una resistencia de 20 Ω se conecta a 12 V. ¿Qué intensidad circula, en A?", nums(0.6), "I = 12 / 20 = 0,6 A.", "I = V/R."),
    calc("calc-r", "Resistencia", "Por un receptor conectado a 9 V pasan 0,3 A. ¿Cuánto vale su resistencia, en Ω?", nums(30), "R = 9 / 0,3 = 30 Ω.", "R = V/I."),
    calc("calc-v", "Tensión", "Por una resistencia de 50 Ω circulan 0,2 A. ¿Qué tensión hay entre sus extremos, en V?", nums(10), "V = 0,2 · 50 = 10 V.", "V = I·R."),
    calc("calc-hilo", "Un hilo de cobre", "Un hilo de cobre (ρ = 0,017 Ω·mm²/m) de 100 m y 1 mm² de sección tiene R = ρ·L/S. ¿Cuántos Ω? (redondea a un decimal)", nums(1.7), "R = 0,017 · 100 / 1 = 1,7 Ω.", "Sustituye en R = ρ·L/S."),
    sort("clasifica", "Efecto sobre la resistencia", "Clasifica cada cambio según aumente o disminuya la resistencia de un hilo.",
      [["au", "Aumenta R", "rose"], ["di", "Disminuye R", "emerald"]],
      [["Duplicar la longitud", "au"], ["Usar un material de mayor resistividad", "au"], ["Reducir la sección a la mitad", "au"], ["Duplicar la sección", "di"], ["Acortar el hilo", "di"], ["Cambiar el hierro por cobre", "di"]],
      "R = ρ·L/S.",
    ),
    pick("check", "Ley de Ohm", "Si se duplica la tensión en una resistencia fija, ¿qué ocurre con la intensidad?",
      "Se duplica",
      [["Se reduce a la mitad", "I = V/R: crece con V."], ["No cambia", "Depende de V."], ["Se cuadruplica", "Es proporcional, no cuadrática."]],
      "I y V son directamente proporcionales.",
    ),
  ],
};
