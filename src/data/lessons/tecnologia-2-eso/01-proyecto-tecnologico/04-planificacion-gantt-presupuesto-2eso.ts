import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planificacionGanttPresupuesto2esoLesson: InteractiveLesson = {
  slug: "planificacion-gantt-presupuesto-2eso",
  title: "4. Planificación: diagrama de Gantt y presupuesto",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("plan", "Planificar es decidir el orden y el tiempo", [
      { kind: "steps", items: [
        "**Descompón** el proyecto en tareas.",
        "Indica cuánto **dura** cada una y de cuáles **depende** (no se puede construir sin los materiales).",
        "El **diagrama de Gantt** dibuja cada tarea como una barra sobre una línea de tiempo.",
        "El **camino crítico** es la cadena de tareas que determina la duración total.",
      ] },
    ], undefined, "stack"),
    slide("gantt", "Tu diagrama de Gantt", [
      { kind: "text", text: "Cambia la duración de cada tarea y observa cómo cambia la duración total y qué tareas son críticas." },
    ], tool("eso2-gantt-explorador"), "visual-top"),
    slide("presupuesto", "El presupuesto", [
      { kind: "text", text: "Un presupuesto suma el coste de cada material (cantidad × precio unitario) y de otros gastos. Compruébalo con una lista de compra." },
    ], tool("presupuesto-explorador"), "visual-top"),
    slide("equipo", "Reparto de tareas", [
      { kind: "text", text: "En un equipo, cada persona asume tareas según sus capacidades y el tiempo disponible." },
    ], tool("reparto-tareas-explorador"), "visual-top"),
    calc("calc-total", "Duración total", "Investigar (2 días) → Diseñar (3) → Materiales (1) → Construir (4) → Probar (1), todo en cadena. ¿Cuántos días dura el camino?", nums(11), "2 + 3 + 1 + 4 + 1 = 11 días.", "Suma las duraciones de la cadena."),
    calc("calc-pres", "Presupuesto", "Se necesitan 6 listones a 1,50 € y 2 botes de cola a 3 €. ¿Cuánto cuesta el material, en €?", nums(15), "6 · 1,50 + 2 · 3 = 9 + 6 = 15 €.", "Cantidad por precio de cada material y suma."),
    sort("clasifica-tarea", "¿En paralelo o en serie?", "Decide si cada pareja de tareas puede hacerse a la vez.",
      [["par", "Pueden hacerse a la vez", "emerald"], ["ser", "Una depende de la otra", "rose"]],
      [["Escribir la memoria y preparar los materiales", "par"], ["Dibujar el plano y comprar la cola", "par"], ["Un miembro corta y otro lija otra pieza", "par"], ["Comprar madera y cortar la madera", "ser"], ["Construir y probar el prototipo", "ser"], ["Diseñar y construir", "ser"]],
      "Las tareas independientes se pueden repartir; las que dependen unas de otras van en orden.",
    ),
    pick("check-critico", "El camino crítico", "Una tarea del camino crítico se retrasa 2 días. ¿Qué ocurre con el proyecto?",
      "Todo el proyecto se retrasa 2 días, salvo que se recupere tiempo en otra tarea crítica",
      [["Nada, las demás compensan", "En el camino crítico no hay holgura."], ["Se adelanta", "Un retraso nunca adelanta."], ["Se cancela", "Se retrasa, no se cancela."]],
      "En el camino crítico cualquier retraso se traslada a la fecha de entrega.",
    ),
  ],
};
