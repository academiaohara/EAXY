import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, tool } from "@/data/lessons/tec1-helpers";

export const planificacionRepartoTareasLesson: InteractiveLesson = {
  slug: "planificacion-reparto-tareas",
  title: "6. Planificación del trabajo y reparto de tareas",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("plan", "Planificar es decidir antes de actuar", [
      { kind: "definition", text: "**Planificar** es decidir qué hay que hacer, en qué orden, quién lo hace, con qué recursos y en cuánto tiempo." },
      { kind: "steps", items: [
        "**Dividir** el proyecto en tareas pequeñas y concretas.",
        "**Ordenar** las tareas: algunas dependen de otras (no se puede pintar antes de lijar).",
        "**Estimar** cuánto dura cada una.",
        "**Asignar** un responsable a cada tarea.",
      ] },
    ], undefined, "stack"),
    slide("roles", "Trabajo en equipo", [
      { kind: "text", text: "En un equipo de taller conviene repartir **roles** que roten cada sesión, para que todos aprendan y todos aporten." },
      { kind: "compare",
        left: { title: "Roles habituales", text: "**Coordinador** (organiza), **secretario** (registra), **responsable de material** (herramientas) y **responsable de seguridad**.", tone: "info" },
        right: { title: "Buenas prácticas", text: "Escuchar, respetar turnos, pedir ayuda a tiempo y reconocer los errores como parte del aprendizaje.", tone: "key" } },
    ]),
    slide("reparto", "Reparte seis tareas entre tres personas", [
      { kind: "text", text: "Pulsa cada tarea para cambiar de responsable. El proyecto no termina hasta que acaba **la persona con más trabajo**." },
    ], tool("reparto-tareas-explorador"), "visual-top"),
    calc("calc-horas", "Reparto equilibrado", "Un proyecto tiene 18 horas de trabajo repartibles entre 3 personas por igual. ¿Cuántas horas le tocan a cada una?",
      nums(6), "18 h ÷ 3 personas = 6 h cada una.", "Divide el total entre el número de personas."),
    calc("calc-duracion", "Tiempo del proyecto", "Alba trabaja 7 h, Bruno 5 h y Carla 4 h, todas a la vez. ¿Cuántas horas tarda el equipo en terminar?",
      nums(7), "Trabajan en paralelo, así que el equipo termina cuando acaba la persona con más horas: 7 h.", "No sumes: trabajan a la vez."),
    pick("check-dependencia", "Orden de tareas", "¿Qué tarea no puede empezar hasta que termine otra?",
      "Pintar la pieza, que debe esperar a que esté lijada",
      [["Redactar la lista de materiales mientras otra persona corta", "Son tareas independientes y se pueden hacer a la vez."], ["Dibujar el boceto mientras se compran tornillos", "Son independientes."], ["Preparar la memoria técnica durante el proyecto", "Se puede ir avanzando en paralelo."]],
      "Cuando una tarea necesita el resultado de otra, no se puede adelantar: hay que respetar la dependencia.",
    ),
  ],
};
