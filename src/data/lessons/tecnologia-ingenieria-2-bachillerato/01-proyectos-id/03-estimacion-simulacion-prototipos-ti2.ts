import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estimacionSimulacionPrototiposTi2Lesson: InteractiveLesson = {
  slug: "estimacion-simulacion-prototipos-ti2",
  title: "3. Planificar con incertidumbre, simular y prototipar",
  subtitle: TECTI2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Estimar no es adivinar", [
      { kind: "steps", items: [
        "Las duraciones de las tareas de I+D son **inciertas**. Una sola cifra engaña: conviene dar un **rango**.",
        "**Estimación a tres puntos (PERT)**: optimista **O**, más probable **M** y pesimista **P**. Duración esperada = **(O + 4·M + P)/6** y desviación típica = **(P − O)/6**.",
        "En tareas en serie, las duraciones esperadas **se suman** y las varianzas también.",
        "Con una distribución aproximadamente normal se calcula la **probabilidad** de terminar antes de un plazo.",
        "Se reserva un **margen** (buffer) para riesgos y se **actualiza** la estimación según avanza el proyecto.",
      ] },
    ], undefined, "stack"),
    slide("pert", "Probabilidad de cumplir el plazo", [
      { kind: "text", text: "Introduce las estimaciones de tres tareas y un plazo. Mira la duración esperada y la probabilidad de cumplirlo." },
    ], tool("ti2-estimacion-pert-explorador"), "visual-top"),
    slide("critico", "El camino crítico", [
      { kind: "text", text: "Cuando las tareas dependen unas de otras, la duración del proyecto la marca el camino crítico." },
    ], tool("eso4-pert-explorador"), "visual-top"),
    slide("sim", "Modelar y simular", [
      { kind: "steps", items: [
        "Un **modelo** es una representación simplificada de un sistema: matemático, geométrico (CAD) o de comportamiento.",
        "La **simulación** lo ejecuta para ver qué pasa antes de construir: resistencia, flujos, circuitos, consumo, procesos.",
        "Un **gemelo digital** es un modelo vinculado a un sistema real mediante sensores, que se actualiza con datos en tiempo real.",
        "Un modelo es tan bueno como sus **hipótesis**: hay que **verificarlo** (¿resuelve bien las ecuaciones?) y **validarlo** (¿representa la realidad?).",
      ] },
    ]),
    slide("proto", "Prototipos", [
      { kind: "steps", items: [
        "Cada prototipo debe **responder una pregunta** (¿encaja?, ¿aguanta?, ¿se entiende?).",
        "Se empieza por prototipos **rápidos y baratos** (maquetas, impresión 3D, simulaciones) y se avanza hacia otros más fieles.",
        "Se **mide** y se compara con las especificaciones, se **documenta** y se **itera**.",
        "El **producto mínimo viable (MVP)** reúne lo imprescindible para probar la idea con usuarios reales.",
      ] },
    ]),
    calc("calc-esp", "Duración esperada", "Una tarea con O = 2, M = 4 y P = 10 días, ¿cuántos días dura de media? ((2 + 4·4 + 10)/6, dos decimales)", nums(4.67, 4.6667), "28 / 6 ≈ 4,67 días.", "Aplica (O + 4M + P)/6."),
    calc("calc-sig", "Desviación", "Para esa tarea, ¿cuánto vale la desviación típica (P − O)/6, en días? (dos decimales)", nums(1.33, 1.3333), "8 / 6 ≈ 1,33 días.", "Rango entre seis."),
    calc("calc-tot", "Tres tareas en serie", "Tres tareas con duraciones esperadas de 4,67, 5,33 y 2,50 días, ¿cuántos días dura el conjunto?", nums(12.5, 12.50), "4,67 + 5,33 + 2,50 = 12,5 días.", "Suma las esperadas."),
    sort("clasifica-proto", "¿Qué pregunta responde?", "Relaciona cada prototipo con lo que permite comprobar.",
      [["for", "Forma y encaje", "cobalt"], ["fun", "Funcionamiento", "amber"], ["usu", "Aceptación del usuario", "emerald"]],
      [["Maqueta de cartón", "for"], ["Pieza impresa en 3D para probar el montaje", "for"], ["Circuito en protoboard", "fun"], ["Prototipo funcional con el mecanismo real", "fun"], ["MVP probado con usuarios", "usu"], ["Prueba piloto en un entorno real", "usu"]],
      "Cada prototipo debe responder una pregunta concreta.",
    ),
    pick("check-valid", "Verificar y validar", "Un modelo resuelve correctamente sus ecuaciones, pero no se ha comparado con ningún ensayo. ¿Qué le falta?",
      "Validación: comprobar con datos reales que representa bien el sistema",
      [["Verificación", "Ya la ha hecho."], ["Más decimales", "No es el problema."], ["Nada, un modelo siempre es válido", "Hay que contrastarlo."]],
      "Verificar es hacerlo bien; validar es hacer lo correcto.",
    ),
  ],
};
