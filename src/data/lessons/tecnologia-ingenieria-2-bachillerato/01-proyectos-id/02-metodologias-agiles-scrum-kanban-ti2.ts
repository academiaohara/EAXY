import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const metodologiasAgilesScrumKanbanTi2Lesson: InteractiveLesson = {
  slug: "metodologias-agiles-scrum-kanban-ti2",
  title: "2. Metodologías ágiles: Scrum y Kanban",
  subtitle: TECTI2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Planificar con incertidumbre", [
      { kind: "steps", items: [
        "En una **metodología en cascada** el proyecto se hace por fases cerradas (análisis, diseño, construcción, pruebas). Funciona si los requisitos son estables.",
        "En I+D los requisitos **cambian** y se descubren sobre la marcha. Las **metodologías ágiles** trabajan en **ciclos cortos**, con entregas frecuentes y **realimentación** continua del cliente.",
        "**Manifiesto ágil**: personas e interacciones, producto funcionando, colaboración con el cliente y respuesta al cambio.",
        "Las dos más extendidas son **Scrum** y **Kanban**. Nacieron en el desarrollo de software y la fabricación, pero se usan en proyectos de ingeniería de todo tipo.",
      ] },
    ], undefined, "stack"),
    slide("anim", "El ciclo de Scrum", [
      { kind: "text", text: "Mira cómo se organiza un proyecto con Scrum." },
    ], anim("ti2-ciclo-scrum"), "text-top"),
    slide("roles", "Roles y artefactos de Scrum", [
      { kind: "steps", items: [
        "**Propietario del producto**: representa al cliente y prioriza el backlog.",
        "**Scrum Master**: ayuda al equipo a aplicar el método y elimina obstáculos.",
        "**Equipo de desarrollo**: autoorganizado y multidisciplinar (5–9 personas).",
        "**Artefactos**: backlog del producto, backlog del sprint e **incremento**.",
        "**Definición de «hecho»**: criterios acordados para dar una tarea por terminada.",
      ] },
    ]),
    slide("sprint", "Sprints y velocidad", [
      { kind: "text", text: "La velocidad permite predecir cuántos sprints necesita un proyecto. Cambia el trabajo y la velocidad." },
    ], tool("ti2-sprint-explorador"), "visual-top"),
    slide("kanban", "Kanban: limitar el trabajo en curso", [
      { kind: "text", text: "Un tablero visual con columnas. Limitar el WIP acorta el tiempo que tarda cada tarea en terminar." },
    ], tool("ti2-kanban-explorador"), "visual-top"),
    calc("calc-sprints", "Sprints", "Un backlog de 120 puntos con una velocidad de 20 puntos por sprint, ¿cuántos sprints necesita?", nums(6), "120 / 20 = 6 sprints.", "Backlog entre velocidad."),
    calc("calc-sem", "Duración", "Con sprints de 2 semanas, ¿cuántas semanas dura el proyecto?", nums(12), "6 · 2 = 12 semanas.", "Sprints por duración del sprint."),
    calc("calc-little", "Ley de Little", "Un equipo termina 4 tareas por semana y tiene 12 en curso. ¿Cuántas semanas tarda cada tarea? (12/4)", nums(3), "WIP / ritmo = 12 / 4 = 3 semanas.", "Tareas en curso entre ritmo."),
    calc("calc-wip", "Limitar el WIP", "Si se limita a 4 las tareas en curso con el mismo ritmo, ¿cuántas semanas tarda cada una?", nums(1), "4 / 4 = 1 semana.", "Misma fórmula con el nuevo WIP."),
    sort("clasifica-agil", "¿Scrum o Kanban?", "Relaciona cada característica con la metodología.",
      [["scr", "Scrum", "cobalt"], ["kan", "Kanban", "amber"]],
      [["Sprints de duración fija", "scr"], ["Roles: propietario del producto y Scrum Master", "scr"], ["Planificación y revisión al final de cada sprint", "scr"], ["Flujo continuo sin iteraciones fijas", "kan"], ["Límite de tareas en curso (WIP) por columna", "kan"], ["Se cambia el trabajo cuando se necesita", "kan"]],
      "Scrum se organiza en iteraciones; Kanban, en un flujo continuo.",
    ),
    pick("check-vel", "Para qué sirve la velocidad", "¿Para qué se usa principalmente la velocidad de un equipo en Scrum?",
      "Para predecir cuánto trabajo puede completar en los siguientes sprints",
      [["Para medir quién trabaja más", "No es una medida individual."], ["Para comparar equipos entre sí", "Cada equipo estima distinto."], ["Para cobrar más al cliente", "No es su función."]],
      "Es una herramienta de planificación, no de control.",
    ),
  ],
};
