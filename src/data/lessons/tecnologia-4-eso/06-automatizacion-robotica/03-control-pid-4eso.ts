import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const controlPid4esoLesson: InteractiveLesson = {
  slug: "control-pid-4eso",
  title: "3. El controlador PID",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres acciones combinadas", [
      { kind: "steps", items: [
        "**P (proporcional)**: reacciona al error **actual**.",
        "**I (integral)**: acumula el error **pasado**; elimina el error permanente.",
        "**D (derivativa)**: mira cómo **cambia** la medida; frena la acción para evitar pasarse.",
        "El **PID** suma las tres y es el regulador más extendido en la industria (temperatura, velocidad, posición, drones).",
        "**Ajustar** un PID es encontrar Kp, Ki y Kd: pocas ganancias da respuesta lenta, demasiadas hacen oscilar.",
      ] },
    ], undefined, "stack"),
    slide("pi", "Añade la acción integral", [
      { kind: "text", text: "Con PI el error permanente desaparece. Prueba distintos valores de Ki." },
    ], tool("eso4-regulador-explorador", { n: 2 }), "visual-top"),
    slide("pid", "El PID completo", [
      { kind: "text", text: "Prueba el efecto de la acción derivativa. Un exceso puede empeorar la respuesta." },
    ], tool("eso4-regulador-explorador", { n: 3 }), "visual-top"),
    slide("crit", "Cómo se juzga una respuesta", [
      { kind: "steps", items: [
        "**Error permanente**: diferencia final entre consigna y medida.",
        "**Sobreoscilación**: cuánto se pasa de la consigna.",
        "**Tiempo de establecimiento**: lo que tarda en estabilizarse.",
        "Se busca un **compromiso**: rápido, con poca oscilación y sin error final.",
      ] },
    ]),
    calc("calc-pi", "Acción integral", "Con Ki = 0,01 y un error acumulado de 100 °C·min, ¿qué aporta la acción integral? (Ki · acumulado)", nums(1), "0,01 · 100 = 1.", "Multiplica Ki por el acumulado."),
    calc("calc-suma", "Suma de acciones", "P aporta 0,4, I aporta 0,3 y D aporta -0,1. ¿Cuál es la salida del PID?", nums(0.6), "0,4 + 0,3 − 0,1 = 0,6.", "Suma las tres contribuciones."),
    sort("clasifica-pid", "¿Qué acción?", "Relaciona cada efecto con la acción del PID.",
      [["p", "Proporcional", "cobalt"], ["i", "Integral", "amber"], ["d", "Derivativa", "emerald"]],
      [["Responde al error actual", "p"], ["Reacciona más cuanto mayor es el error", "p"], ["Elimina el error permanente", "i"], ["Acumula el error pasado", "i"], ["Frena cuando la medida sube deprisa", "d"], ["Anticipa lo que va a pasar", "d"]],
      "Cada acción corrige un aspecto distinto.",
    ),
    pick("check-int", "Error permanente", "Un regulador P deja siempre 1,5 °C de error. ¿Qué acción se añade para eliminarlo?",
      "La acción integral",
      [["Reducir la consigna", "Es trampa."], ["Aumentar la histéresis", "Eso es del todo-nada."], ["Quitar el sensor", "Dejaría de regular."]],
      "La integral acumula el error hasta que se anula.",
    ),
  ],
};
