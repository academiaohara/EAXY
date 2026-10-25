import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const actuadoresElementosSalidaLesson: InteractiveLesson = {
  slug: "actuadores-elementos-salida",
  title: "4. Actuadores y elementos de salida",
  subtitle: TEC1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la señal a la acción", [
      { kind: "definition", text: "Un **actuador** transforma la señal del controlador (de baja potencia) en una **acción física**: movimiento, calor, flujo, luz o sonido." },
      { kind: "steps", items: [
        "**Motor de corriente continua**: giro continuo, velocidad según la tensión.",
        "**Servomotor**: gira a una **posición** determinada con una señal PWM.",
        "**Motor paso a paso**: gira por pasos fijos; posicionamiento preciso sin sensor.",
        "**Relé**: interruptor accionado por una bobina; aísla el circuito de control del de potencia.",
        "**Electroválvula**: abre o cierra el paso de un fluido.",
        "**Actuador lineal / cilindro**: movimiento rectilíneo (eléctrico, neumático o hidráulico).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Prueba tres actuadores", [
      { kind: "text", text: "Cambia entre motor, servo y relé. Observa lo que determina cada uno: la tensión y la carga (motor), el ancho de pulso (servo) y el umbral de activación (relé)." },
    ], tool("actuadores-explorador", { n: 0, a: 9 }), "visual-top"),
    slide("potencia", "Un microcontrolador no puede con todo", [
      { kind: "text", text: "Una salida de microcontrolador entrega unos **20 mA a 5 V** (0,1 W). Un motor o una lámpara de red necesitan mucho más. Entre ambos se interpone una **etapa de potencia**:" },
      { kind: "steps", items: [
        "**Transistor** como conmutador: cargas de CC de hasta varios amperios.",
        "**Relé**: cargas de CA y aislamiento entre circuitos.",
        "**Driver de motor (puente H)**: controla velocidad y sentido de giro.",
      ] },
      { kind: "warning", title: "Diodo de protección", text: "Las bobinas (relés, motores) generan picos de tensión al cortarse la corriente. Se coloca un diodo en paralelo para proteger al transistor." },
    ]),
    slide("limites", "Características y límites", [
      { kind: "steps", items: [
        "**Potencia, velocidad y fuerza** están ligadas: un motor con reductor gira más lento y entrega más par.",
        "Un actuador tiene **límites**: par máximo, corriente de calado, ciclo de trabajo, temperatura.",
        "Los motores de CC **se calan** si la carga iguala su par máximo: la corriente se dispara.",
        "**Tiempo de respuesta**: un pistón neumático es rápido; uno hidráulico, potente y preciso; un motor eléctrico, versátil.",
      ] },
    ]),
    calc("calc-servo", "Ángulo de un servo", "Un servo mueve su eje de $0^\\circ$ a $180^\\circ$ con pulsos de $1$ a $2$ ms. ¿Qué ángulo le corresponde a un pulso de $1{,}75$ ms?",
      nums(135), "Proporción lineal: $(1{,}75 - 1)/(2 - 1)\\cdot 180 = 0{,}75\\cdot 180 = 135^\\circ$.", "Pasa el pulso a una fracción del rango."),
    calc("calc-rele", "Corriente de la carga", "Un relé conmuta una carga de $1\\,150$ W a $230$ V. ¿Qué corriente, en A, circula por su contacto?",
      nums(5), "$I = P/V = 1150/230 = 5$ A, dentro de un contacto de 10 A.", "I = P/V."),
    sort("clasifica-act", "¿Qué actuador usar?", "Elige el actuador más adecuado para cada tarea.",
      [["mot", "Motor de CC", "cobalt"], ["ser", "Servomotor", "amber"], ["val", "Electroválvula", "emerald"], ["rel", "Relé", "violet"]],
      [["Hacer girar un ventilador", "mot"], ["Mover las ruedas de un coche de juguete", "mot"], ["Orientar un brazo robótico a 45°", "ser"], ["Abrir y cerrar una compuerta a un ángulo preciso", "ser"], ["Regar abriendo el paso de agua", "val"], ["Encender una lámpara de 230 V desde 5 V", "rel"]],
      "El motor da giro continuo, el servo da posición, la electroválvula gestiona un fluido y el relé conmuta cargas mayores.",
    ),
    pick("check-calado", "Un motor calado", "Un motor de CC mueve una carga y se atasca por completo. ¿Qué ocurre con la corriente?",
      "Se dispara, porque sin giro no hay fuerza contraelectromotriz que la limite",
      [["Baja a cero", "Al contrario: el motor parado absorbe la corriente máxima."], ["No cambia", "La corriente depende de la fuerza contraelectromotriz, que ha desaparecido."], ["Se invierte", "No cambia de sentido."]],
      "Un motor que gira genera una tensión opuesta que limita la corriente. Parado, solo queda la resistencia del bobinado y la corriente es máxima.",
    ),
  ],
};
