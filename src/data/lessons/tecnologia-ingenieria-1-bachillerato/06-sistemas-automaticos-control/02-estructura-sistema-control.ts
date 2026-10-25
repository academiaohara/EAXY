import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estructuraSistemaControlLesson: InteractiveLesson = {
  slug: "estructura-sistema-control",
  title: "2. Estructura de un sistema de control",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("bloques", "Los bloques de un sistema de control", [
      { kind: "steps", items: [
        "**Referencia (consigna)**: el valor deseado de la variable controlada.",
        "**Sensor**: mide la variable real y la convierte en una señal.",
        "**Comparador**: calcula el **error** $e = r - y$.",
        "**Controlador**: decide la acción según el error (microcontrolador, autómata, termostato).",
        "**Actuador**: convierte la orden en una acción física (motor, válvula, resistencia).",
        "**Planta o proceso**: lo que se controla (habitación, depósito, motor).",
      ] },
    ], anim("sistema-control-termostato"), "split"),
    slide("explora", "Recorre distintos sistemas", [
      { kind: "text", text: "Elige un sistema y pulsa cada bloque: ¿qué elemento concreto cumple cada función? Distingue lo que transporta **información** de lo que transporta **energía**." },
    ], tool("bloques-control-explorador", { n: 0 }), "visual-top"),
    slide("flujos", "Información frente a energía", [
      { kind: "compare",
        left: { title: "Señales (información)", text: "Entre sensor, comparador y controlador viajan señales de **baja potencia**: tensiones, números, mensajes.", tone: "info" },
        right: { title: "Energía", text: "El actuador y la planta manejan **energía de potencia**: eléctrica, térmica o mecánica. El controlador no puede mover un motor grande directamente: necesita una etapa de potencia (relé, transistor).", tone: "key" } },
    ]),
    slide("variables", "Variables que hay que distinguir", [
      { kind: "facts", items: [
        { tex: "r", label: "referencia: lo que se desea" },
        { tex: "y", label: "salida: lo que realmente hay" },
        { tex: "e = r - y", label: "error" },
        { tex: "d", label: "perturbación: lo que desvía la salida" },
      ] },
      { kind: "text", text: "Un **diagrama de bloques** representa cada elemento como un bloque y cada señal como una flecha. Se lee de izquierda a derecha y la realimentación vuelve atrás." },
    ]),
    calc("calc-error", "Calcular el error", "La referencia del termostato es $22\\ ^\\circ\\text{C}$ y el sensor mide $19\\ ^\\circ\\text{C}$. ¿Cuánto vale el error $e = r - y$ en °C?",
      nums(3), "$e = 22 - 19 = 3\\ ^\\circ\\text{C}$: falta calor, el controlador debe encender la calefacción.", "e = r − y."),
    sort("clasifica-bloque", "¿Qué bloque es?", "Clasifica los elementos de un riego automático.",
      [["sen", "Sensor", "cobalt"], ["con", "Controlador", "emerald"], ["act", "Actuador", "amber"], ["pla", "Planta", "violet"]],
      [["Sensor de humedad del suelo", "sen"], ["Microcontrolador", "con"], ["Electroválvula", "act"], ["Huerto", "pla"], ["Sensor de lluvia", "sen"], ["Bomba de agua", "act"]],
      "El sensor mide, el controlador decide, el actuador actúa y la planta es el proceso controlado.",
    ),
    pick("check-per", "Una perturbación", "En el control de crucero de un coche, ¿cuál es una perturbación?",
      "Una cuesta que reduce la velocidad",
      [["La velocidad fijada por el conductor", "Esa es la referencia."], ["El sensor de velocidad", "Es parte del sistema (sensor)."], ["El acelerador electrónico", "Es el actuador."]],
      "Las perturbaciones son efectos externos que desvían la salida de la referencia; el controlador debe compensarlos.",
    ),
  ],
};
