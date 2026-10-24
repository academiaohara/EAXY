import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const circuitosTemporizadoresLesson: InteractiveLesson = {
  slug: "circuitos-temporizadores",
  title: "7. Circuitos secuenciales con temporizadores",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "grafos",
      type: "slide",
      help: [{ label: "Dos grafos", message: "Cuando hay un temporizador, normalmente hace falta un grafo para el temporizador y otro para el elemento que él gobierna (una lámpara, otro relé…)." }],
      title: "Grafos con temporizador",
      blocks: [
        { kind: "text", text: "Para diseñar circuitos con temporizadores hay que decidir dos cosas: si el temporizador es **a la conexión** o **a la desconexión**, y si necesita **realimentación** (memoria propia) o no. Cada temporizador se dibuja con un símbolo en el grafo, con su tiempo $T$." },
        { kind: "steps", title: "Se plantean las mismas preguntas", items: [
          "¿Quién da las órdenes de **marcha**?",
          "¿Quién da las órdenes de **paro**?",
        ] },
        { kind: "text", text: "Cuando un elemento no tiene contactos propios (por ejemplo una lámpara de señalización), su grafo es un **monodo**: se conecta cuando se cierra el contacto temporizado del relé y se desconecta cuando este se abre." },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo4",
      type: "slide",
      help: [{ label: "Lámpara", message: "La lámpara H₁ no tiene contactos que realimentar: su estado solo depende del contacto temporizado de KT₁." }],
      title: "Ejemplo 4: encender una lámpara a los 10 s",
      blocks: [
        { kind: "text", text: "Se desea encender una lámpara a los **10 segundos** de accionar el pulsador de marcha $SB_1$, y que se apague al accionar el pulsador de paro NC $SB_2$." },
        { kind: "steps", items: [
          "**Elemento $KT_1$**: lo conecta $SB_1$ y se realimenta con un contacto no temporizado del propio relé. Se desconecta con $SB_2$. Temporizador a la conexión de 10 s.",
          "**Elemento $H_1$**: se conecta cuando pasan los 10 s a través del contacto temporizado de $KT_1$ y se desconecta cuando se abre dicho contacto.",
        ] },
        { kind: "formula", tex: "KT_1 = \\overline{SB_2}\\cdot(SB_1 + KT_1)\\qquad H_1 = KT_1" },
        { kind: "text", text: "En el esquema, $KT_1$ lleva dos contactos: uno **instantáneo** (13-14) para la realimentación y otro **temporizado** (17-18) que cierra a los 10 s y alimenta la lámpara." },
      ],
      arrange: "stack",
    },
    {
      id: "check-ejemplo4",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La lámpara enciende 10 s después de pulsar SB₁ y se apaga cuando se pulsa SB₂." }],
      title: "Cuánto tiempo luce la lámpara",
      question: "En el ejemplo 4 se pulsa $SB_1$ en $t = 0$ y se pulsa el paro $SB_2$ en $t = 25$ s. ¿Cuántos segundos permanece encendida la lámpara?",
      correctAnswers: ["15"],
      explanation: "Se enciende a los 10 s (temporizador a la conexión) y se apaga a los 25 s con $SB_2$: $25 - 10 = 15$ s.",
    },
    {
      id: "ejemplo5",
      type: "slide",
      help: [{ label: "Dos relés", message: "Se usan dos relés auxiliares, KA₁ y KA₂, cada uno con su lámpara y su temporizador." }],
      title: "Ejemplo 5: dos lámparas encadenadas",
      blocks: [
        { kind: "text", text: "Una lámpara $H_1$ debe encenderse al pulsar $SB_1$. Pasados **20 s** se enciende una segunda lámpara $H_2$, que estará activada **30 s**. Transcurrido ese tiempo, las dos lámparas se apagan." },
        { kind: "steps", title: "Ecuaciones (a partir de los grafos)", items: [
          "$KA_1 = \\overline{KT_2}\\cdot(SB_1 + KA_1)$ y $H_1 = KA_1$.",
          "$KT_1 = KA_1$ (temporizador de 20 s).",
          "$KA_2 = KT_1$ y $H_2 = KA_2$.",
          "$KT_2 = KA_2$ (temporizador de 30 s). Su contacto NC abre $KA_1$ a los 50 s.",
        ] },
      ],
      visual: { kind: "anim", scene: "temporizadores-cronograma", beatMs: 6200 },
    },
    {
      id: "check-total",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "H₂ se enciende a los 20 s y debe estar 30 s activa; todo se apaga cuando KT₂ abre KA₁." }],
      title: "Cuándo se apaga todo",
      question: "En el ejemplo 5, ¿a los cuántos segundos de pulsar $SB_1$ se apagan las dos lámparas?",
      correctAnswers: ["50"],
      explanation: "$H_2$ se enciende a los 20 s y luce 30 s: se apaga a los $20 + 30 = 50$ s. En ese instante $KT_2$ abre $KA_1$ y cae todo.",
    },
    {
      id: "explora-secuencia",
      type: "slide",
      help: [{ label: "Explorador", message: "Mueve el instante para ver qué lámparas están encendidas, y cambia los dos temporizadores." }],
      title: "Cambia los tiempos",
      blocks: [{ kind: "text", text: "Ajusta $KT_1$ y $KT_2$ y recorre el tiempo. En el **ejemplo 6** la segunda lámpara sigue encendida hasta que se pulse el paro." }],
      visual: { kind: "tool", tool: "secuencia-reles-explorador" },
    },
    {
      id: "ejemplo6",
      type: "slide",
      help: [{ label: "Diagrama", message: "Siempre ayuda dibujar primero el diagrama de funcionamiento (cronograma) y luego los grafos." }],
      title: "Ejemplo 6: variante con paro de H₂",
      blocks: [
        { kind: "text", text: "Se enciende $H_1$ con un pulsador $SB_1$. A los **20 s** se enciende $H_2$ y a los **30 s** de haberse encendido, $H_1$ **se apaga**. Para desconectar $H_2$ se usa un pulsador de paro NC $SB_2$." },
        { kind: "steps", items: [
          "Primero se dibuja el **diagrama de funcionamiento** (cronograma) con las señales de cada elemento.",
          "Se hace un grafo por cada elemento, indicando quién da las órdenes de marcha y de paro (y los temporizadores).",
          "Se obtienen las ecuaciones y se dibuja el esquema eléctrico.",
        ] },
        { kind: "formula", tex: "KA_1 = \\overline{KT_2}\\cdot(SB_1 + KA_1)\\qquad KA_2 = \\overline{SB_2}\\cdot(KT_1 + KA_2)" },
      ],
      arrange: "stack",
    },
    {
      id: "check-realim",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en cuál de los elementos debe seguir conectado cuando el pulsador deja de actuar." }],
      title: "Qué elemento se realimenta",
      question: "En el ejemplo 4, $KT_1 = \\overline{SB_2}\\cdot(SB_1 + KT_1)$ y $H_1 = KT_1$. ¿Cuál de los dos elementos está **realimentado**?",
      mode: "choice",
      choices: [
        { id: "ok", label: "KT₁: necesita mantenerse conectado tras soltar SB₁" },
        { id: "h", label: "H₁: es el que se enciende", incorrectFeedback: "La lámpara no tiene contactos propios; su estado solo sigue al de KT₁." },
        { id: "ambos", label: "Los dos", incorrectFeedback: "Solo aparece la propia variable en la ecuación de KT₁." },
        { id: "ninguno", label: "Ninguno: se usa un temporizador", incorrectFeedback: "El temporizador no memoriza por sí solo la orden de marcha: hace falta la realimentación." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Solo la ecuación de $KT_1$ contiene a $KT_1$: es el elemento realimentado. $H_1$ es un monodo.",
    },
  ],
};
