import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorTrifasicoCampoGiratorioLesson: InteractiveLesson = {
  slug: "motor-trifasico-campo-giratorio",
  title: "10. Motor trifásico: campo giratorio y deslizamiento",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "¿Qué es el entrehierro?",
          message: "La separación de aire entre el estator y el rotor. Tiene que ser pequeña para que el campo pase bien, pero suficiente para que el rotor gire sin rozar.",
        },
      ],
      title: "Estator y rotor",
      blocks: [
        {
          kind: "compare",
          left: { title: "Estator", text: "Parte **fija**: chapas magnéticas aisladas y ranuradas por dentro. Lleva un **devanado trifásico** (tres monofásicos iguales).", tone: "info" },
          right: { title: "Rotor", text: "Parte **móvil**: chapas ranuradas por fuera. Puede ser **jaula de ardilla** (barras en cortocircuito, sin escobillas) o **bobinado**.", tone: "key" },
        },
        {
          kind: "text",
          text: "No tiene escobillas ni colector (en jaula de ardilla): es **robusto y casi sin mantenimiento**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-jaula",
      type: "predict",
      help: [{ label: "Pista", message: "Un rotor de barras cortocircuitadas no necesita contacto eléctrico." }],
      title: "Rotor en jaula de ardilla",
      question: "Un motor trifásico con el rotor en jaula de ardilla:",
      mode: "choice",
      choices: [
        { id: "sin", label: "No tiene escobillas" },
        { id: "tres", label: "Tiene tres pares de escobillas", incorrectFeedback: "Las escobillas son de los motores de corriente continua o de rotor bobinado con anillos." },
        { id: "sinestator", label: "No necesita estator", incorrectFeedback: "El estator crea el campo giratorio: es imprescindible." },
        { id: "forma", label: "Tiene un rotor con forma de jaula, y por eso se llama así" },
      ],
      correctChoiceId: "sin",
      shuffleChoices: true,
      explanation: "Las barras del rotor se cortocircuitan en los extremos y se alimentan por inducción: no hay contacto.",
    },
    {
      id: "campo",
      type: "slide",
      help: [
        {
          label: "¿Por qué tres fases desfasadas 120°?",
          message: "Así la suma de los tres campos tiene módulo constante y su dirección gira de manera uniforme: es lo que mueve el rotor sin necesidad de ningún contacto.",
        },
      ],
      title: "El campo magnético giratorio",
      blocks: [
        {
          kind: "text",
          text: "Tres devanados desfasados $120°$ en el espacio, alimentados con tres corrientes desfasadas $120°$ en el tiempo, crean un campo de **módulo constante que gira**. En cada instante, la suma de los tres campos apunta en una dirección distinta.",
        },
        {
          kind: "rule",
          title: "Velocidad de sincronismo",
          formula: "n_1 = \\dfrac{60\\,f_1}{p}",
          text: "$f_1$ es la frecuencia (50 Hz en Europa) y $p$ el número de pares de polos.",
        },
      ],
      visual: { kind: "anim", scene: "campo-giratorio", beatMs: 4800 },
    },
    {
      id: "asincrono",
      type: "slide",
      help: [
        {
          label: "¿Y los motores síncronos?",
          message: "En un motor **síncrono** el rotor gira exactamente a $n_1$. En el **asíncrono** (el más usado) el rotor siempre va más lento.",
        },
      ],
      title: "El rotor sigue al campo, pero no lo alcanza",
      blocks: [
        {
          kind: "steps",
          items: [
            "El campo giratorio corta los conductores del rotor e **induce** una fem $E_2$ en ellos.",
            "Al estar en cortocircuito, circulan corrientes que crean un campo que reacciona con el del estator: aparece un **par**.",
            "El rotor gira en el mismo sentido que el campo, pero a $n_2 < n_1$: si fueran iguales, no se cortarían líneas y no habría par.",
          ],
        },
        {
          kind: "rule",
          title: "Deslizamiento",
          formula: "d = n_1 - n_2\\qquad S = \\dfrac{n_1 - n_2}{n_1}",
          text: "Absoluto $d$ (rpm) y relativo $S$ (o en %). Normalmente entre el 2 % y el 5 % a plena carga.",
        },
      ],
      visual: { kind: "tool", tool: "velocidad-trifasico-explorador", params: { a: 2, b: 4 } },
    },
    {
      id: "check-ex8",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$n_1 = 60\\cdot 50/p$ con $p = 2$ (4 polos) y $n_2 = n_1(1 - S)$." }],
      title: "Velocidad del rotor",
      question: "Un motor asíncrono de $4$ polos se conecta a $50$ Hz con un deslizamiento del $4\\,\\%$. ¿A qué velocidad gira el rotor? (rpm)",
      correctAnswers: ["1440", "1 440"],
      explanation: "$n_1 = 60\\cdot 50/2 = 1\\,500$ rpm; $n_2 = 1\\,500\\cdot(1 - 0{,}04) = 1\\,440$ rpm.",
    },
    {
      id: "check-ex9",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$8$ polos son $p = 4$ pares: $n_1 = 60\\cdot 50/4 = 750$ rpm. $S = (n_1 - n_2)/n_1$." }],
      title: "Deslizamiento relativo",
      question: "Un motor trifásico de $8$ polos gira a $700$ rpm a potencia nominal ($50$ Hz). ¿Cuál es su deslizamiento relativo? (en %, dos decimales)",
      correctAnswers: ["6,67", "6.67", "6,66", "6.66"],
      explanation: "$n_1 = 750$ rpm; $d = 50$ rpm; $S = 50/750 = 0{,}0667$, es decir, $6{,}67\\,\\%$.",
    },
    {
      id: "check-60hz",
      type: "predict",
      mode: "numeric",
      help: [{ label: "2 polos", message: "Dos polos son $p = 1$ par. $n_1 = 60\\,f/p$." }],
      title: "El mismo motor en otra red",
      question: "Un motor de dos polos gira a $3\\,000$ rpm de sincronismo a $50$ Hz. ¿A cuántas rpm giraría su campo conectado a una red de $60$ Hz?",
      correctAnswers: ["3600", "3 600"],
      explanation: "$n_1 = 60\\cdot 60/1 = 3\\,600$ rpm. Con un deslizamiento del $5\\,\\%$ el rotor giraría a $3\\,420$ rpm.",
    },
    {
      id: "clasifica-partes-ac",
      type: "classify",
      help: [{ label: "Pista", message: "El estator es fijo y lleva el devanado trifásico que crea el campo giratorio." }],
      title: "Estator o rotor",
      question: "Asigna cada elemento.",
      groups: [
        { id: "estator", label: "Estator", tone: "cobalt" },
        { id: "rotor", label: "Rotor", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Devanado trifásico que crea el campo giratorio", group: "estator" },
        { id: "b", text: "Barras de cobre o aluminio cortocircuitadas (jaula)", group: "rotor" },
        { id: "c", text: "Parte fija con chapas ranuradas por dentro", group: "estator" },
        { id: "d", text: "En él se induce la fem por el campo giratorio", group: "rotor" },
      ],
      hint: "El campo giratorio nace en el estator y corta los conductores del rotor.",
      explanation: "El estator crea el campo; en el rotor se induce la corriente.",
    },
  ],
};
