import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const controladoresProgramablesLesson: InteractiveLesson = {
  slug: "controladores-programables",
  title: "5. Controladores y sistemas programables",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("micro", "Microcontroladores y placas", [
      { kind: "definition", text: "Un **microcontrolador** es un circuito integrado que reúne CPU, memoria y **pines de entrada/salida** para controlar dispositivos. Las **placas de desarrollo** (como Arduino) lo montan con alimentación y conectores listos para usar." },
      { kind: "steps", items: [
        "**Entradas digitales**: leen 0 o 1 (pulsador, final de carrera).",
        "**Entradas analógicas**: leen una tensión de 0 a 5 V como un número 0–1023 (sensor de luz).",
        "**Salidas digitales**: HIGH (5 V) o LOW (0 V): LED, relé, zumbador.",
        "**Salidas PWM**: simulan una tensión variable con pulsos: brillo de un LED, velocidad de un motor.",
      ] },
    ], undefined, "stack"),
    slide("programa", "Programar la conexión entre mundo y programa", [
      { kind: "text", text: "El programa **lee** sensores, **decide** y **escribe** en los actuadores, una y otra vez. En este simulador se ve el efecto de cambiar la luz, el umbral y el tipo de salida." },
    ], tool("placa-virtual-explorador", { a: 300, b: 400, n: 0 }), "visual-top"),
    slide("pwm", "PWM: simular una señal analógica", [
      { kind: "text", text: "La salida PWM alterna entre 0 V y 5 V muy rápido. El **ciclo de trabajo** (porcentaje de tiempo en alto) decide la tensión media: 25 % → 1,25 V de media; 50 % → 2,5 V; 100 % → 5 V." },
      { kind: "formula", tex: "V_{\\text{media}} = D\\cdot V_{cc}" },
      { kind: "text", text: "Con `analogWrite(pin, 0..255)`, un valor 128 equivale a un ciclo de trabajo de aproximadamente el 50 %." },
    ]),
    slide("ciclo", "Estructura de un programa de control", [
      { kind: "steps", items: [
        "**Inicialización** (`setup`): configurar qué pines son entradas y cuáles salidas.",
        "**Bucle principal** (`loop`): se repite indefinidamente: leer → decidir → actuar.",
        "**Temporización**: para esperar o medir tiempos sin bloquear la placa.",
      ] },
      { kind: "warning", title: "Programa y mundo físico", text: "Un fallo del programa tiene efectos físicos: una salida mal activada puede mover un motor. Por eso se prueba primero con LED y valores bajos, y se prevén condiciones de parada." },
    ]),
    calc("calc-adc", "De número a tensión", "Un conversor A/D de 10 bits con referencia de 5 V lee $768$. ¿Qué tensión, en V, hay en la entrada? (2 decimales)",
      nums(3.75, 3.76, 3.754), "$V = 768/1023\\cdot 5 \\approx 3{,}75$ V.", "Proporción de 1023 sobre 5 V."),
    calc("calc-pwm", "Tensión media", "Una salida PWM de $5$ V tiene un ciclo de trabajo del $40\\,\\%$. ¿Cuál es su tensión media en V?",
      nums(2), "$V_{media} = 0{,}40\\cdot 5 = 2$ V.", "D · Vcc."),
    sort("clasifica-pin", "Tipo de pin", "Clasifica cada conexión de la placa.",
      [["ed", "Entrada digital", "cobalt"], ["ea", "Entrada analógica", "amber"], ["sd", "Salida digital", "emerald"], ["pwm", "Salida PWM", "violet"]],
      [["Pulsador", "ed"], ["Final de carrera", "ed"], ["LDR en divisor", "ea"], ["Sensor de temperatura analógico", "ea"], ["Zumbador (suena o no)", "sd"], ["Relé", "sd"], ["Brillo de un LED", "pwm"], ["Velocidad de un motor", "pwm"]],
      "Los pulsadores dan 0/1; los sensores analógicos, un valor continuo; zumbador y relé se activan o no; PWM regula brillo o velocidad.",
    ),
    pick("check-umbral", "Cambiar el comportamiento", "Quieres que la luz se encienda con más luz ambiental que antes. ¿Qué modificas en el programa?",
      "El valor del umbral y/o el sentido de la comparación",
      [["La alimentación de la placa", "No cambia el comportamiento lógico."], ["El nombre de las variables", "Cambiar nombres no altera el funcionamiento."], ["El color del LED", "Es hardware y no cambia cuándo se enciende."]],
      "El comportamiento lo fijan la condición y el umbral: cambiarlos cambia cuándo actúa el sistema sin tocar el hardware.",
    ),
  ],
};
