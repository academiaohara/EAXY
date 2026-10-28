import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const correccionFactorPotenciaTi2Lesson: InteractiveLesson = {
  slug: "correccion-factor-potencia-ti2",
  title: "4. Mejorar el factor de potencia",
  subtitle: TECTI2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Por qué compensar", [
      { kind: "steps", items: [
        "Casi todas las cargas industriales (motores, transformadores, fluorescentes) son **inductivas**: tienen **cosφ bajo** y piden mucha corriente reactiva.",
        "Para la misma potencia útil, un cosφ bajo exige **más corriente**: I = P/(V·cosφ).",
        "Más corriente significa **más pérdidas por efecto Joule**, mayor **caída de tensión** y **cables y transformadores más grandes**.",
        "Se **compensa** conectando **condensadores en paralelo** con la carga: aportan la reactiva que piden los motores.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Calcula la batería de condensadores", [
      { kind: "text", text: "Elige la potencia, el cosφ de partida y el deseado. Mira la reactiva que hay que compensar, la capacidad y la corriente que se ahorra." },
    ], tool("ti2-correccion-fp-explorador"), "visual-top"),
    slide("metodo", "El método", [
      { kind: "steps", items: [
        "**1.** Se calculan los ángulos: φ₁ = arccos(cosφ₁), φ₂ = arccos(cosφ₂).",
        "2. La reactiva a compensar es $Q_c$ = P·(tgφ₁ − tgφ₂).",
        "3. La capacidad es C = $Q_c$ / (ω·V²).",
        "**4.** Se comprueba el resultado: la potencia activa no cambia, pero la corriente y la potencia aparente disminuyen.",
        "No se debe **sobrecompensar**: un cosφ capacitivo también es perjudicial.",
      ] },
    ]),
    calc("calc-q0", "Reactiva de partida", "Una carga de 8 kW con cosφ = 0,8 tiene una potencia aparente de 10 kVA. ¿Cuántos kvar de reactiva? (10·0,6)", nums(6), "S·senφ = 10 · 0,6 = 6 kvar.", "Con cosφ = 0,8, senφ = 0,6."),
    calc("calc-c", "Capacidad", "Para llevar el cosφ a 1 con 6 kvar a 230 V y 50 Hz, ¿cuántos µF hacen falta? (6 000/(314,16·230²), redondea a un entero)", nums(361, 361.0), "6 000 / (314,16 · 52 900) ≈ 361 µF.", "C = Q_c / (ω·V²)."),
    calc("calc-i1", "Corriente antes", "Antes de compensar, la carga de 8 kW a 230 V con cosφ = 0,8 consume ¿cuántos A? (8 000/(230·0,8), redondea a un decimal)", nums(43.5, 43.48), "8 000 / 184 ≈ 43,5 A.", "I = P / (V·cosφ)."),
    calc("calc-i2", "Corriente después", "Con cosφ = 1, ¿cuántos A? (8 000/230, redondea a un decimal)", nums(34.8, 34.78), "8 000 / 230 ≈ 34,8 A.", "Ahora toda la corriente es activa."),
    sort("clasifica-comp", "¿Ventaja o error?", "Clasifica cada afirmación sobre la compensación.",
      [["ven", "Es una ventaja", "emerald"], ["err", "Es un error", "rose"]],
      [["Reduce la corriente de la línea", "ven"], ["Disminuye las pérdidas en los cables", "ven"], ["Evita recargos por energía reactiva", "ven"], ["Aumenta la potencia útil del motor", "err"], ["Se hace con bobinas en paralelo", "err"], ["Conviene pasar de cosφ 0,8 a cosφ capacitivo 0,7", "err"]],
      "Compensar reduce la corriente, no aumenta la potencia útil.",
    ),
    pick("check-cond", "Qué se conecta", "¿Qué elemento se conecta en paralelo con una carga inductiva para mejorar su factor de potencia?",
      "Un condensador, que aporta reactiva de signo contrario",
      [["Otra bobina", "Empeoraría el cosφ."], ["Una resistencia", "Aumentaría el consumo sin compensar."], ["Un fusible", "No compensa."]],
      "La reactiva capacitiva compensa la inductiva.",
    ),
  ],
};
