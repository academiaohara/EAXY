import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const roboticaSimulacionAplicacionesLesson: InteractiveLesson = {
  slug: "robotica-simulacion-aplicaciones",
  title: "10. Simulación, robótica y aplicaciones",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("modelos", "Modelizar y simular", [
      { kind: "definition", text: "Un **modelo** es una descripción simplificada de un sistema (ecuaciones, reglas o un programa). **Simular** es ejecutarlo para ver cómo se comportaría, antes de construirlo o cuando probarlo es caro o peligroso." },
      { kind: "steps", items: [
        "Ventajas: barato, repetible, permite probar casos extremos y fallos.",
        "Límites: el modelo **simplifica** la realidad; hay que validarlo con medidas reales.",
        "Aplicación: probar un algoritmo de control antes de cargarlo en el robot.",
      ] },
    ], undefined, "stack"),
    slide("robot", "Programa un robot", [
      { kind: "text", text: "El robot empieza en la esquina superior izquierda mirando al este. Construye una secuencia de órdenes que lo lleve a la meta verde sin chocar. Ejecuta, observa dónde falla y corrige: es el ciclo programar → probar → depurar." },
    ], tool("robot-cuadricula-explorador", { n: 0 }), "visual-top"),
    slide("robotica", "Qué es un robot", [
      { kind: "steps", items: [
        "Un **robot** es una máquina programable que combina **sensores, controlador y actuadores** para realizar tareas en el mundo físico.",
        "**Manipuladores** (brazos industriales): grados de libertad = articulaciones controlables.",
        "**Móviles**: ruedas u orugas, con sensores de distancia y navegación (aspirador, vehículos de almacén).",
        "**Cobots**: robots colaborativos, con límites de fuerza para trabajar junto a personas.",
      ] },
      { kind: "text", text: "Control básico de movimiento: avanzar, girar, detenerse ante un obstáculo. Se combinan **secuencias**, **condiciones** (si hay obstáculo, gira) y **bucles** (repite hasta llegar)." },
    ]),
    slide("aplicaciones", "Aplicaciones y repercusiones", [
      { kind: "compare",
        left: { title: "Aplicaciones", text: "Domésticas (aspiradores, riego), industriales (soldadura, montaje, logística), medioambientales (vigilancia de incendios, drones de monitorización, clasificación de residuos).", tone: "info" },
        right: { title: "Preguntas abiertas", text: "Fiabilidad y seguridad, responsabilidad en caso de fallo, impacto en el empleo, privacidad (cámaras y sensores), consumo de recursos y energía.", tone: "warn" } },
    ]),
    calc("calc-manhattan", "Distancia recorrida", "El robot avanza $3$ casillas al este, gira a la derecha y avanza $2$ casillas. ¿Cuántas casillas ha recorrido en total?",
      nums(5), "$3 + 2 = 5$ casillas. Los giros no suman recorrido.", "Suma solo los avances."),
    sort("clasifica-orden", "Secuencia, condición o bucle", "Clasifica cada fragmento del programa del robot.",
      [["sec", "Secuencia", "cobalt"], ["con", "Condición", "amber"], ["buc", "Bucle", "emerald"]],
      [["Avanzar, girar a la derecha, avanzar", "sec"], ["Si hay un obstáculo delante, girar", "con"], ["Si la batería baja del 10 %, volver a la base", "con"], ["Repetir «avanzar» 5 veces", "buc"], ["Avanzar mientras no se detecte la pared", "buc"], ["Encender el motor y después el sensor", "sec"]],
      "La secuencia ejecuta órdenes una tras otra; la condición elige; el bucle repite.",
    ),
    pick("check-modelo", "Los límites de la simulación", "El robot funciona en el simulador pero en la realidad se desvía. ¿Qué explicación es más probable?",
      "El modelo simplifica: ignora el deslizamiento de las ruedas, el ruido de los sensores y los retardos reales",
      [["El simulador es inútil", "Es muy útil, pero hay que validarlo y refinar el modelo."], ["Los robots reales nunca siguen el programa", "Lo siguen, pero el entorno real tiene fricción, ruido y tolerancias."], ["El programa tiene un error de sintaxis", "Con error de sintaxis ni habría funcionado en el simulador."]],
      "Un modelo es una aproximación. La validación con medidas reales cierra la diferencia.",
    ),
    slide("proyecto", "Proyecto del tema", [
      { kind: "text", text: "**Proyecto integrador**: diseña un sistema automático sencillo (riego, iluminación o clasificación) con sensores, reglas de control y actuadores simulados, y documenta su lógica." },
      { kind: "steps", title: "Entregable", items: [
        "Descripción del problema, variable controlada y perturbaciones.",
        "Diagrama de bloques con sensor, controlador, actuador y planta.",
        "Reglas de control o tabla de verdad, con umbrales y, si hace falta, histéresis.",
        "Análisis de seguridad: interbloqueos y estado seguro ante fallo.",
        "Resultados de simulación o prueba, y límites del modelo.",
      ] },
    ], undefined, "stack"),
  ],
};
