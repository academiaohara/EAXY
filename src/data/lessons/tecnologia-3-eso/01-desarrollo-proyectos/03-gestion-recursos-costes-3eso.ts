import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gestionRecursosCostes3esoLesson: InteractiveLesson = {
  slug: "gestion-recursos-costes-3eso",
  title: "3. Gestión de recursos: tiempo, materiales y costes",
  subtitle: TECESO3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los recursos de un proyecto", [
      { kind: "steps", items: [
        "**Materiales**: lo que se consume (madera, componentes, filamento).",
        "**Humanos**: las personas y las horas que dedican.",
        "**Técnicos**: máquinas, herramientas y software.",
        "**Económicos**: el dinero disponible (presupuesto).",
        "**Tiempo**: el plazo para terminar.",
        "Gestionarlos es **planificar, medir y ajustar** para cumplir plazo y presupuesto.",
      ] },
    ], undefined, "stack"),
    slide("gantt", "El tiempo", [
      { kind: "text", text: "Reparte las tareas en el tiempo y detecta el camino crítico." },
    ], tool("eso2-gantt-explorador"), "visual-top"),
    slide("coste", "El coste del proyecto", [
      { kind: "text", text: "El coste total suma materiales, mano de obra e indirectos. Después se añade un margen para fijar el precio." },
    ], tool("eso3-coste-proyecto-explorador"), "visual-top"),
    slide("equipo", "El equipo", [
      { kind: "text", text: "Reparte las tareas según capacidades y tiempo disponible." },
    ], tool("reparto-tareas-explorador"), "visual-top"),
    calc("calc-coste", "Coste total", "Materiales 40 €, 20 h de trabajo a 12 €/h y 10 % de indirectos. ¿Coste total, en €? ((40 + 240) · 1,10)", nums(308), "(40 + 240) · 1,10 = 308 €.", "Suma lo directo y aumenta un 10 %."),
    calc("calc-venta", "Precio de venta", "Con ese coste de 308 € y un margen del 20 %, ¿precio de venta, en €? (redondea al entero)", nums(370, 369.6), "308 · 1,20 = 369,6 ≈ 370 €.", "Aumenta el coste un 20 %."),
    sort("clasifica-rec", "¿Qué tipo de recurso?", "Clasifica cada elemento.",
      [["mat", "Material", "amber"], ["hum", "Humano", "emerald"], ["tec", "Técnico", "cobalt"], ["eco", "Económico", "rose"]],
      [["Tableros de contrachapado", "mat"], ["Filamento PLA", "mat"], ["Horas del equipo", "hum"], ["Un profesor de apoyo", "hum"], ["Cortadora láser", "tec"], ["Software de diseño 3D", "tec"], ["Presupuesto de 50 €", "eco"], ["Subvención del centro", "eco"]],
      "Identificar el tipo ayuda a saber qué falta o qué sobra.",
    ),
    pick("check-viab", "Viabilidad", "El coste total supera el presupuesto en un 30 %. ¿Qué hacer primero?",
      "Buscar dónde reducir: materiales más baratos, menos horas o un diseño más simple",
      [["Ignorarlo y seguir", "Se agotará el dinero."], ["Cobrar a los compañeros", "No es una solución de diseño."], ["Cancelar sin analizar", "Primero conviene optimizar."]],
      "Gestionar es ajustar el diseño y los recursos para que el proyecto sea viable.",
    ),
  ],
};
