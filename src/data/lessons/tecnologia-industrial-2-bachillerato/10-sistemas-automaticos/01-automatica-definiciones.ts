import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_10_SUBTITLE } from "@/data/lessons/shared";

export const automaticaDefinicionesLesson: InteractiveLesson = {
  slug: "automatica-definiciones",
  title: "1. La automática: definiciones",
  subtitle: TEMA_TI2_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      help: [{ label: "¿Qué es regular?", message: "Regular es conseguir que una magnitud (temperatura, velocidad, nivel…) se mantenga en el valor que queremos, aunque cambien las condiciones." }],
      title: "El control automático está en todas partes",
      blocks: [
        { kind: "text", text: "El **control automático** es esencial en la industria de procesos (presión, temperatura, humedad), en el maquinado y el armado de piezas… y también en casa y en el coche: desde un tostador hasta un sistema antiaéreo, pasando por una lavadora, el control de velocidad de un motor o el termostato de la vivienda." },
        { kind: "definition", text: "La **teoría de regulación automática** (o **teoría de control**) estudia el comportamiento dinámico de un sistema frente a **órdenes de mando** o **perturbaciones**." },
        { kind: "steps", items: [
          "**Industria**: Tensión de red, composición de un producto, posición de una herramienta",
          "**Vivienda**: Nivel y temperatura del agua, tiempo y potencia del microondas",
          "**Automóvil**: Par de giro del volante, bloqueo de ruedas (ABS), carga de la batería",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-sectores",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa dónde está instalado el sistema: en una fábrica, en una casa o en un vehículo." }],
      title: "¿En qué sector está?",
      question: "Reparte cada sistema por su sector de aplicación.",
      groups: [
        { id: "industria", label: "Industria", tone: "cobalt" },
        { id: "vivienda", label: "Vivienda", tone: "emerald" },
        { id: "automovil", label: "Automóvil", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Torno de control numérico", group: "industria" },
        { id: "b", text: "Reactor químico", group: "industria" },
        { id: "c", text: "Lavavajillas", group: "vivienda" },
        { id: "d", text: "Alarma antirrobo", group: "vivienda" },
        { id: "e", text: "Freno ABS", group: "automovil" },
        { id: "f", text: "Dirección asistida", group: "automovil" },
      ],
      hint: "Fíjate en el lugar donde se instala.",
      explanation: "La tabla del libro agrupa así los sistemas y sus variables controladas.",
    },
    {
      id: "senal",
      type: "slide",
      help: [{ label: "¿Señal o magnitud?", message: "La magnitud es lo que se mide (la temperatura). La señal es la información que la representa (una tensión eléctrica proporcional a ella)." }],
      title: "Señal, proceso y planta",
      blocks: [
        { kind: "definition", text: "**Señal**: información que representa una magnitud física (velocidad, caudal, tensión…) y su evolución, normalmente con el tiempo." },
        { kind: "definition", text: "**Planta o sistema controlado**: zona con componentes o productos que realizan una función y son aptos para una **transferencia de flujo** (material, energía, información o incluso dinero) sobre la que actúa el sistema de control." },
        { kind: "definition", text: "**Proceso**: conjunto de operaciones que van a suceder y que tienen un fin determinado (cambiar una propiedad de un objeto: geometría, estado, dureza, posición…)." },
        { kind: "steps", title: "Una planta de confección", items: [
          "**Entradas**: telas e hilos (material), electricidad (energía), moda (información).",
          "**Salidas**: vestidos (material), chimenea y calor (energía), información.",
        ] },
      ],
      visual: { kind: "anim", scene: "lazo-abierto-cerrado", beatMs: 5600 },
    },
    {
      id: "check-planta",
      type: "predict",
      help: [{ label: "Pista", message: "Es la zona sobre la que actúa el control." }],
      title: "Planta",
      question: "En un sistema de control, la «planta» es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "El sistema o proceso sobre el que se actúa" },
        { id: "mando", label: "El selector que fija el valor deseado", incorrectFeedback: "Eso es el mando o selector de entrada." },
        { id: "fab", label: "Solo una fábrica con chimenea", incorrectFeedback: "Puede ser cualquier sistema: un depósito, un motor, un horno…" },
        { id: "pert", label: "Una señal indeseada", incorrectFeedback: "Esas son las perturbaciones." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La planta es el conjunto controlado: recibe flujos de entrada y produce flujos de salida.",
    },
    {
      id: "check-perturbacion",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en algo que altera la salida sin que lo hayas pedido." }],
      title: "Perturbaciones",
      question: "¿Cuál de estas situaciones es una perturbación en el control de temperatura de una vivienda?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Abrir una ventana con frío en la calle" },
        { id: "mando", label: "Girar el mando del termostato a 22 °C", incorrectFeedback: "Eso es la señal de mando (la consigna deseada)." },
        { id: "captador", label: "El termómetro que mide la habitación", incorrectFeedback: "Es el captador, parte del sistema." },
        { id: "radiador", label: "El radiador que calienta la habitación", incorrectFeedback: "Es el actuador." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Las perturbaciones son señales indeseadas que alteran la salida; esta es externa. El sistema de control debe compensarla.",
    },
  ],
};
