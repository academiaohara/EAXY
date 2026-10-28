import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const regulacionTodoNadaProporcional4esoLesson: InteractiveLesson = {
  slug: "regulacion-todo-nada-proporcional-4eso",
  title: "2. Regulación todo-nada y proporcional",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo decide el controlador", [
      { kind: "steps", items: [
        "**Todo-nada (on-off)**: el actuador está encendido o apagado según si la medida está por debajo o por encima de la consigna.",
        "Para no conmutar sin parar se usa una **histéresis**: se enciende por debajo de consigna − h y se apaga por encima de consigna + h.",
        "**Proporcional (P)**: la orden es **proporcional al error**: u = Kp · error. Cuanto más lejos, más potencia.",
        "El proporcional da una acción **suave**, pero se queda con un **error permanente** si Kp es pequeña.",
      ] },
    ], undefined, "stack"),
    slide("onoff", "Regulador todo-nada", [
      { kind: "text", text: "Un termostato todo-nada con histéresis. Cambia la histéresis y observa la oscilación." },
    ], tool("eso4-regulador-explorador", { n: 0 }), "visual-top"),
    slide("p", "Regulador proporcional", [
      { kind: "text", text: "Ahora con un regulador proporcional. Sube la ganancia y mira el error final." },
    ], tool("eso4-regulador-explorador", { n: 1 }), "visual-top"),
    slide("comparar", "Cuál elegir", [
      { kind: "steps", items: [
        "**Todo-nada**: barato y robusto; basta cuando se tolera una oscilación (nevera, calentador de agua).",
        "**Proporcional**: más fino; requiere un actuador regulable (válvula, PWM).",
        "La **histéresis** evita el desgaste del actuador, pero amplía el rango de oscilación.",
      ] },
    ]),
    calc("calc-u", "Salida proporcional", "Con Kp = 0,3 por °C y un error de 2 °C, ¿qué fracción de potencia ordena el regulador? (u = Kp · error)", nums(0.6), "0,3 · 2 = 0,6 (el 60 %).", "Multiplica Kp por el error."),
    calc("calc-sat", "Saturación", "Con Kp = 0,3 por °C y un error de 5 °C, la orden calculada es 1,5. ¿Qué potencia aplica realmente el calefactor (máximo 1)?", nums(1), "Se satura en el máximo: 1 (100 %).", "El actuador no puede dar más del 100 %."),
    sort("clasifica-reg", "Todo-nada o proporcional", "Relaciona cada característica con el regulador.",
      [["tn", "Todo-nada", "amber"], ["pr", "Proporcional", "cobalt"]],
      [["Solo dos estados: ON y OFF", "tn"], ["Usa histéresis", "tn"], ["Oscila alrededor de la consigna", "tn"], ["La potencia depende del error", "pr"], ["Deja un error permanente", "pr"], ["Acción más suave", "pr"]],
      "Cada tipo tiene sus ventajas e inconvenientes.",
    ),
    pick("check-hist", "Histéresis", "¿Para qué sirve la histéresis en un termostato todo-nada?",
      "Para evitar que el actuador conmute continuamente cerca de la consigna",
      [["Para calentar más rápido", "No lo acelera."], ["Para eliminar el error", "Lo amplía."], ["Para ahorrar sensores", "No es su función."]],
      "Reduce las conmutaciones y el desgaste.",
    ),
  ],
};
