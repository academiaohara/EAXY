import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fundamentosAutomatizacionLesson: InteractiveLesson = {
  slug: "fundamentos-automatizacion",
  title: "1. Fundamentos de la automatización",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es un sistema automático", [
      { kind: "definition", text: "Un **sistema automático** realiza una tarea **sin intervención humana continua**: percibe su entorno mediante sensores, procesa la información con un controlador y actúa mediante actuadores." },
      { kind: "steps", title: "Tres niveles de operación", items: [
        "**Manual**: una persona hace todo el trabajo y toma todas las decisiones (taladro de mano).",
        "**Semiautomático**: la máquina ejecuta parte del ciclo y la persona carga, supervisa o decide (lavadora con programa elegido a mano).",
        "**Automático**: la máquina ejecuta el ciclo completo y reacciona a las condiciones (termostato, línea de montaje robotizada).",
      ] },
    ], undefined, "stack"),
    slide("comparar", "Compara tres fábricas", [
      { kind: "text", text: "Cambia el modo de operación con los mismos operarios y la misma demanda. ¿Qué modo cubre la demanda? ¿Cuál cuesta menos por pieza? ¿Qué pasa si hay una avería?" },
    ], tool("fabrica-modos-explorador", { n: 0, a: 3, b: 250 }), "visual-top"),
    slide("usos", "Automatización doméstica e industrial", [
      { kind: "compare",
        left: { title: "Doméstica", text: "Termostatos, riego programado, persianas con sensor de luz, lavadoras, alarmas, robots aspiradores.", tone: "info" },
        right: { title: "Industrial", text: "Líneas de montaje, robots de soldadura, control de procesos químicos, almacenes automatizados, mecanizado CNC.", tone: "key" } },
    ]),
    slide("ventajas", "Ventajas, límites y riesgos", [
      { kind: "compare",
        left: { title: "Ventajas", text: "Mayor productividad y repetibilidad, menos defectos, trabajo en entornos peligrosos, ahorro de energía, funcionamiento continuo.", tone: "ok" },
        right: { title: "Límites y riesgos", text: "Inversión inicial alta, dependencia de averías y de la energía, necesidad de mantenimiento y de personal cualificado, impacto en el empleo, ciberseguridad.", tone: "warn" } },
      { kind: "warning", title: "Automatizar no siempre compensa", text: "Si la producción es pequeña o muy variable, el coste de la inversión puede no recuperarse. Y una máquina automática falla también de forma automática: hay que prever cómo detenerla con seguridad." },
    ]),
    calc("calc-buenas", "Piezas buenas", "Un proceso automático fabrica $500$ piezas con un $2\\,\\%$ de defectuosas. ¿Cuántas piezas buenas salen?",
      nums(490), "Defectuosas: $0{,}02\\cdot 500 = 10$. Buenas: $500 - 10 = 490$.", "Resta las defectuosas."),
    sort("clasifica-modo", "Manual, semiautomático o automático", "Clasifica cada situación.",
      [["man", "Manual", "cobalt"], ["semi", "Semiautomático", "amber"], ["auto", "Automático", "emerald"]],
      [["Cortar madera con una sierra de mano", "man"], ["Taladro de columna: el operario baja la palanca", "semi"], ["Prensa que el operario carga y arranca con un pulsador", "semi"], ["Termostato que mantiene 21 °C", "auto"], ["Robot que suelda en una cadena de montaje", "auto"], ["Riego que se activa por sensor de humedad", "auto"]],
      "Cuanto más de la decisión y del ciclo ejecuta la máquina, más automático es el sistema.",
    ),
    pick("check-riesgo", "Automatizar con cabeza", "Una pequeña empresa fabrica 20 piezas distintas al mes. ¿Qué es lo más razonable?",
      "Valorar si la inversión se recupera; con tiradas cortas y variadas, quizás compense solo la automatización flexible o parcial",
      [["Automatizarlo todo siempre, porque lo automático es mejor", "El coste y la falta de flexibilidad pueden hacerlo inviable con series cortas."], ["No automatizar nada jamás", "Algunas tareas peligrosas o repetitivas sí compensan."], ["Esperar a que se estropee el trabajo manual", "No es un criterio técnico."]],
      "La decisión depende del volumen, la repetibilidad, la seguridad y el retorno de la inversión.",
    ),
  ],
};
