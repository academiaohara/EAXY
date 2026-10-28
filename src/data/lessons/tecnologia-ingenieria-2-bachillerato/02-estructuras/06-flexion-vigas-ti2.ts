import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const flexionVigasTi2Lesson: InteractiveLesson = {
  slug: "flexion-vigas-ti2",
  title: "6. Flexión en vigas: momento flector, tensión y flecha",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando una viga se curva", [
      { kind: "steps", items: [
        "Una viga con cargas perpendiculares a su eje se **curva** (flexiona): una cara se comprime y la opuesta se traccione; la **fibra neutra** no sufre tensión.",
        "En cada sección actúan un **esfuerzo cortante** V y un **momento flector** M. Su variación a lo largo de la viga se representa en los **diagramas de V y de M**.",
        "El momento flector es máximo donde el cortante se anula: $M_{\\mathrm{máx}}$ = P·L/4 (carga puntual central) y **q·L²/8** (carga uniforme), en una viga biapoyada.",
        "La **tensión** de flexión es **σ = M·c/I**, siendo I el **momento de inercia** de la sección y c la distancia a la fibra más alejada.",
        "La **flecha** es el desplazamiento máximo: debe quedar por debajo de un límite (por ejemplo, L/300).",
      ] },
    ], undefined, "stack"),
    slide("tool", "Calcula una viga", [
      { kind: "text", text: "Elige la carga, la luz y la sección. Mira el momento, la tensión y la flecha, y comprueba si cumple." },
    ], tool("ti2-flexion-explorador"), "visual-top"),
    slide("viga", "Comparar con la simulación", [
      { kind: "text", text: "Mira otra herramienta de flexión para comprobar el efecto del canto y de la luz." },
    ], tool("viga-flexion-explorador"), "visual-top"),
    slide("seccion", "Por qué importa el canto", [
      { kind: "steps", items: [
        "La inercia de un rectángulo es **I = b·h³/12**: depende del **cubo del canto**.",
        "Duplicar el canto multiplica la inercia por **8** y reduce la tensión a la **cuarta parte**.",
        "Por eso se usan **perfiles en I (IPE, HEB)**, que concentran el material lejos de la fibra neutra.",
        "El material cercano al eje neutro trabaja poco: se vacía o se elimina.",
      ] },
    ]),
    calc("calc-mmax", "Momento máximo", "Una viga biapoyada de 4 m soporta 20 kN en el centro. ¿Cuánto vale M máximo, en kN·m? (P·L/4)", nums(20), "20 · 4 / 4 = 20 kN·m.", "Carga por luz entre cuatro."),
    calc("calc-q", "Carga uniforme", "Una viga de 6 m con 10 kN/m uniformes, ¿cuánto vale M máximo, en kN·m? (q·L²/8, redondea a un decimal)", nums(45), "10 · 36 / 8 = 45 kN·m.", "q por L al cuadrado entre ocho."),
    calc("calc-i", "Inercia", "Una sección rectangular de 100 × 200 mm, ¿cuántos mm⁴ de inercia tiene? (b·h³/12, en 10⁶ mm⁴, redondea a un entero)", nums(67, 66.7), "100 · 200³ / 12 = 66,7 · 10⁶ mm⁴.", "Aplica b·h³/12."),
    sort("clasifica-flex", "¿Mejora o empeora?", "Decide el efecto sobre la tensión máxima de flexión.",
      [["mej", "Reduce la tensión", "emerald"], ["emp", "Aumenta la tensión", "rose"]],
      [["Aumentar el canto de la viga", "mej"], ["Acortar la luz", "mej"], ["Usar un perfil en I en vez de uno macizo del mismo peso", "mej"], ["Aumentar la carga", "emp"], ["Alargar la luz", "emp"], ["Colocar la viga «de plano» en vez de «de canto»", "emp"]],
      "La tensión crece con M y disminuye con la inercia.",
    ),
    pick("check-flecha", "La flecha", "Se duplica la luz de una viga biapoyada con carga uniforme. ¿Qué ocurre con la flecha?",
      "Se multiplica por 16, porque crece con la cuarta potencia de la luz",
      [["Se duplica", "Crece más que proporcionalmente."], ["Se multiplica por 4", "Eso sería con L²."], ["Queda igual", "Cambia mucho."]],
      "δ = 5·q·L⁴ / (384·E·I).",
    ),
  ],
};
