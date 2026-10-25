import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const logicaControlAutomatismosLesson: InteractiveLesson = {
  slug: "logica-control-automatismos",
  title: "7. Lógica de control y automatismos",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("puertas", "Puertas lógicas básicas", [
      { kind: "facts", items: [
        { tex: "S = A\\cdot B", label: "AND: 1 si todas las entradas son 1" },
        { tex: "S = A + B", label: "OR: 1 si alguna entrada es 1" },
        { tex: "S = \\overline{A}", label: "NOT: invierte la entrada" },
      ] },
      { kind: "text", text: "Una **tabla de verdad** lista la salida para todas las combinaciones de entradas: con $n$ entradas hay $2^n$ filas." },
    ], anim("puertas-logicas-basicas"), "split"),
    slide("probar", "Prueba una puerta", [
      { kind: "text", text: "Elige una puerta, cambia sus entradas y comprueba la salida en la tabla de verdad." },
    ], tool("puerta-logica-explorador", { a: 0 }), "visual-top"),
    slide("alarma", "Reto: la lógica de una alarma", [
      { kind: "text", text: "La alarma debe sonar solo si está **armada** y se detecta algo (**puerta, ventana o movimiento**). Prueba las tres reglas: una es correcta y dos tienen fallos. ¿Qué filas de la tabla de verdad los revelan?" },
    ], tool("compuertas-alarma-explorador", { n: 1 }), "visual-top"),
    slide("temporizadores", "Condiciones, temporizadores y secuencias", [
      { kind: "steps", items: [
        "**Condiciones**: combinaciones lógicas de sensores (si A y no B…).",
        "**Temporizadores**: retardo a la conexión (esperar antes de actuar) o a la desconexión (mantener activo un tiempo): luz de escalera, alarma con retardo de salida.",
        "**Secuencias**: etapas que se suceden (el grafo de estados: espera → detecta → actúa → vuelve).",
        "**Estado**: lo que el sistema «recuerda» (alarma armada, motor en marcha) para decidir con más información que solo las entradas actuales.",
      ] },
      { kind: "text", text: "Un automatismo con memoria usa **estados**: no depende solo de las entradas de ahora, sino de qué ha pasado antes." },
    ]),
    calc("calc-filas", "Filas de una tabla de verdad", "Un automatismo tiene $4$ entradas. ¿Cuántas filas tiene su tabla de verdad?",
      nums(16), "$2^4 = 16$ combinaciones.", "2 elevado al número de entradas."),
    calc("calc-suena", "Cuándo suena", "En la alarma $S = A\\cdot(P + V + M)$, ¿en cuántas de las 16 combinaciones de entrada suena la sirena?",
      nums(7), "Se necesita $A = 1$ y al menos una de P, V, M en 1: $2^3 - 1 = 7$ combinaciones.", "Cuenta las combinaciones de P, V, M excepto 000."),
    sort("clasifica-puerta", "¿Qué puerta es?", "Asocia cada frase con la puerta lógica.",
      [["and", "AND", "cobalt"], ["or", "OR", "amber"], ["not", "NOT", "emerald"]],
      [["El motor arranca solo si hay tensión y la puerta está cerrada", "and"], ["Sirena si se abre la puerta o la ventana", "or"], ["El indicador se enciende cuando el depósito NO está lleno", "not"], ["Prensa: dos pulsadores a la vez para accionarla", "and"], ["Luz de emergencia por fallo en cualquiera de las dos líneas", "or"], ["Alarma activa cuando el interruptor de desarmado está en 0", "not"]],
      "AND exige todo a la vez, OR basta con una condición y NOT invierte.",
    ),
    pick("check-seguridad", "Pulsadores de seguridad", "Una prensa debe accionarse con las dos manos (dos pulsadores) para que el operario no pueda meter la mano. ¿Qué puerta combina los pulsadores?",
      "AND: solo actúa si los dos están pulsados",
      [["OR: actúa con que se pulse uno", "Permitiría accionar con una mano libre para meterla en la prensa."], ["NOT: actúa si no se pulsa ninguno", "Se activaría sin pulsar nada."], ["Ninguna: no hace falta lógica", "La lógica es justo lo que impone la seguridad."]],
      "El AND de dos pulsadores obliga a tener ambas manos fuera de la zona peligrosa.",
    ),
  ],
};
