import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planificacionPertCaminoCritico4esoLesson: InteractiveLesson = {
  slug: "planificacion-pert-camino-critico-4eso",
  title: "4. Planificación: tareas dependientes y camino crítico",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ordenar el trabajo", [
      { kind: "steps", items: [
        "Se descompone el proyecto en **tareas** (EDT) y se estima su **duración** y sus **recursos**.",
        "Cada tarea tiene **predecesoras**: no puede empezar hasta que terminen las anteriores.",
        "El método **PERT/CPM** calcula cuándo puede empezar cada tarea y cuánto puede retrasarse (**holgura**).",
        "El **camino crítico** es la cadena más larga: su duración es la del proyecto y sus tareas **no tienen holgura**.",
      ] },
    ], undefined, "stack"),
    slide("pert", "Camino crítico", [
      { kind: "text", text: "Cambia la duración de cada tarea y observa cuándo cambia el camino crítico." },
    ], tool("eso4-pert-explorador"), "visual-top"),
    slide("gantt", "Diagrama de Gantt", [
      { kind: "text", text: "El diagrama de Gantt dibuja cada tarea como una barra sobre el calendario." },
    ], tool("eso2-gantt-explorador"), "visual-top"),
    slide("riesgos", "Gestionar retrasos", [
      { kind: "steps", items: [
        "Un retraso en el **camino crítico** retrasa todo el proyecto; en una tarea con **holgura**, no.",
        "Se puede **acortar** el plazo reasignando personas o trabajando en **paralelo**.",
        "Hay que prever **riesgos** (falta de material, error de diseño) y un **margen** de tiempo.",
        "Se **revisa** el plan cada cierto tiempo y se comparan lo previsto y lo real.",
      ] },
    ]),
    calc("calc-cc", "Duración", "Diseño (3 d) → compra (2 d) → estructura (4 d) → montaje (2 d) → pruebas (2 d) en cadena, y la electrónica (3 d) en paralelo tras el diseño. ¿Cuántos días dura el proyecto?", nums(13), "3 + 2 + 4 + 2 + 2 = 13 días: la electrónica no es crítica.", "Suma el camino más largo."),
    calc("calc-hol", "Holgura", "La electrónica (3 d) puede hacerse mientras se compra (2 d) y se construye la estructura (4 d), que suman 6 d. ¿Cuántos días de holgura tiene la electrónica?", nums(3), "6 − 3 = 3 días.", "Diferencia entre el camino paralelo y la tarea."),
    sort("clasifica-tarea", "¿Crítica o con holgura?", "Con el plan de la lección, clasifica cada tarea.",
      [["cri", "Crítica (sin holgura)", "rose"], ["hol", "Con holgura", "emerald"]],
      [["Diseño", "cri"], ["Compra de materiales", "cri"], ["Construir la estructura", "cri"], ["Montaje", "cri"], ["Pruebas", "cri"], ["Hacer la electrónica", "hol"]],
      "Solo la electrónica puede retrasarse sin afectar a la fecha final.",
    ),
    pick("check-ret", "Un retraso", "La compra de materiales (tarea crítica) se retrasa 2 días. ¿Qué ocurre con el proyecto?",
      "Se retrasa 2 días, salvo que se recupere tiempo en otra tarea crítica",
      [["Nada, el proyecto no cambia", "Está en el camino crítico."], ["Se adelanta", "Un retraso nunca adelanta."], ["Se cancela", "Se retrasa, no se cancela."]],
      "En el camino crítico no hay holgura.",
    ),
  ],
};
