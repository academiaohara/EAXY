import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planificacionGestionProyectosLesson: InteractiveLesson = {
  slug: "planificacion-gestion-proyectos",
  title: "5. Planificación y gestión de proyectos",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Fases, tareas e hitos", [
      { kind: "definition", text: "Planificar es decidir **qué tareas** hay, **cuánto duran**, **en qué orden**, **quién** las hace y **con qué recursos**, antes de empezar." },
      { kind: "steps", items: [
        "**Fase**: bloque grande del proyecto (investigación, diseño, construcción, ensayo, documentación).",
        "**Tarea**: trabajo concreto con duración y responsable.",
        "**Dependencia**: una tarea que no puede empezar hasta que acabe otra.",
        "**Hito**: punto de control sin duración (aprobación del diseño, entrega del prototipo).",
      ] },
    ], undefined, "stack"),
    slide("gantt", "El diagrama de Gantt y el camino crítico", [
      { kind: "text", text: "El **diagrama de Gantt** representa las tareas como barras sobre una escala de tiempo. Las dependencias determinan el **camino crítico**: la cadena de tareas que fija la duración mínima del proyecto." },
      { kind: "rule", title: "Holgura", text: "Tiempo que una tarea puede retrasarse sin mover la fecha final. En el camino crítico la holgura es 0.", formula: "\\text{holgura} = \\text{inicio más tardío} - \\text{inicio más temprano}" },
    ], anim("gantt-camino-critico"), "split"),
    slide("explora", "Reorganiza el plan", [
      { kind: "text", text: "Alarga o acorta tareas y observa qué pasa con la fecha final. Prueba a retrasar *Comprar* y luego *Construir*: solo una de ellas mueve el fin del proyecto." },
    ], tool("gantt-explorador"), "visual-top"),
    slide("recursos", "Presupuesto, recursos y riesgos", [
      { kind: "steps", title: "Qué se planifica además del tiempo", items: [
        "**Presupuesto**: materiales + horas de trabajo + herramientas, con un margen para imprevistos (5–15 %).",
        "**Recursos humanos**: quién puede hacer cada cosa y cuántas horas tiene.",
        "**Riesgos**: qué puede fallar, con qué probabilidad y qué impacto, y qué haremos si ocurre (plan de contingencia).",
        "**Seguimiento**: comparar lo previsto con lo real en cada hito y replanificar.",
      ] },
      { kind: "warning", title: "Riesgo = probabilidad × impacto", text: "Un riesgo poco probable pero catastrófico (que se rompa la única máquina) puede importar más que uno frecuente y leve." },
    ]),
    calc("calc-camino", "Duración del proyecto", "Tareas: A (3 d), B (4 d, tras A), C (2 d, tras A), D (5 d, tras B y C). ¿Cuántos días dura el proyecto como mínimo?",
      nums(12), "Camino A→B→D: $3+4+5=12$ d. Camino A→C→D: $3+2+5=10$ d. La duración la marca el más largo, 12 d; C tiene 2 d de holgura.", "Suma las duraciones de cada camino y quédate con el más largo."),
    calc("calc-presupuesto", "Presupuesto con imprevistos", "Materiales: $85$ €. Mano de obra: $20$ h a $12$ €/h. Se añade un $10\\,\\%$ de margen sobre el total. ¿Presupuesto final en euros?",
      nums(357.5), "Total base: $85 + 20\\cdot 12 = 325$ €. Con el 10 %: $325\\cdot 1{,}10 = 357{,}5$ €.", "Suma primero materiales y horas; el margen se aplica sobre esa suma."),
    pick("check-holgura", "Holgura", "Una tarea tiene 3 días de holgura y se retrasa 2 días. ¿Qué pasa con la fecha final?",
      "No cambia, porque el retraso cabe dentro de la holgura",
      [["Se retrasa 2 días", "Solo ocurre con tareas sin holgura (camino crítico)."], ["Se retrasa 1 día", "La holgura absorbe el retraso entero mientras no se supere."], ["Hay que reiniciar el proyecto", "No: basta con vigilar que no consuma toda la holgura."]],
      "El retraso afecta al proyecto solo si supera la holgura de la tarea. Por eso se vigilan primero las tareas críticas.",
    ),
    sort("clasifica-gestion", "Elementos de la gestión", "Reparte cada ejemplo según el elemento de planificación al que pertenece.",
      [["tarea", "Tarea", "cobalt"], ["hito", "Hito", "emerald"], ["riesgo", "Riesgo", "amber"]],
      [["Mecanizar las piezas del soporte", "tarea"], ["Soldar el bastidor", "tarea"], ["Aprobación del diseño por el equipo", "hito"], ["Entrega del prototipo al profesor", "hito"], ["El proveedor tarda dos semanas más", "riesgo"], ["Se rompe la broca y no hay repuesto", "riesgo"]],
      "Las tareas tienen duración; los hitos son puntos de control; los riesgos son sucesos inciertos con probabilidad e impacto.",
    ),
  ],
};
