import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const fuerzaLorentzConductorLesson: InteractiveLesson = {
  slug: "fuerza-lorentz-conductor",
  title: "3. Fuerza sobre una carga y sobre un conductor",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conductor",
      type: "slide",
      help: [
        {
          label: "¿Y si el conductor es paralelo al campo?",
          message: "Entonces $\\operatorname{sen}\\theta = 0$ y no hay fuerza. El máximo se alcanza cuando el hilo es **perpendicular** al campo.",
        },
      ],
      title: "Fuerza sobre un hilo con corriente",
      blocks: [
        {
          kind: "rule",
          title: "Fuerza sobre un conductor",
          formula: "\\mathbf{F} = I\\,\\mathbf{l}\\times\\mathbf{B}\\qquad F = I\\,l\\,B\\,\\operatorname{sen}\\theta",
          text: "$\\mathbf{F}$ es perpendicular al hilo y al campo. Sentido: el de avance de un **tornillo de rosca derecha** que gira de $\\mathbf{l}$ hacia $\\mathbf{B}$.",
        },
        {
          kind: "example",
          title: "10 A por un hilo de 0,5 m en un campo de 0,2 T, a 30°",
          lines: [
            { math: "F = I\\,l\\,B\\,\\operatorname{sen}\\theta = 10\\cdot 0{,}5\\cdot 0{,}2\\cdot 0{,}5" },
            { math: "F = 0{,}5\\ \\text{N}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-conductor",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$F = I\\,l\\,B\\,\\operatorname{sen}\\theta$ con $\\theta = 90°$." }],
      title: "Un hilo perpendicular al campo",
      question: "Un conductor de $0{,}8$ m con $15$ A se coloca perpendicular a un campo de $0{,}25$ T. ¿Qué fuerza actúa sobre él, en newtons?",
      correctAnswers: ["3"],
      explanation: "$F = 15\\cdot 0{,}8\\cdot 0{,}25\\cdot\\operatorname{sen}90° = 3$ N.",
    },
    {
      id: "check-paralelo",
      type: "predict",
      help: [{ label: "Pista", message: "Mira el factor $\\operatorname{sen}\\theta$." }],
      title: "Hilo paralelo al campo",
      question: "Si un conductor con corriente se coloca **paralelo** a las líneas del campo, la fuerza sobre él es:",
      mode: "choice",
      choices: [
        { id: "cero", label: "Nula" },
        { id: "max", label: "Máxima", incorrectFeedback: "Es máxima cuando es perpendicular." },
        { id: "mitad", label: "La mitad de la máxima", incorrectFeedback: "Solo valdría la mitad con $\\theta = 30°$." },
      ],
      correctChoiceId: "cero",
      shuffleChoices: true,
      explanation: "$\\theta = 0$ implica $\\operatorname{sen}\\theta = 0$ y $F = 0$.",
    },
    {
      id: "lorentz",
      type: "slide",
      help: [
        {
          label: "¿Por qué no hace trabajo?",
          message: "El trabajo es fuerza por desplazamiento por el coseno del ángulo. Como $\\mathbf{F}\\perp\\mathbf{v}$, el coseno es $0$: la energía cinética no cambia.",
        },
      ],
      title: "La fuerza de Lorentz",
      blocks: [
        {
          kind: "text",
          text: "Una corriente es $I = q/t$, así que la fuerza sobre un hilo se puede reescribir para **una sola carga**:",
        },
        {
          kind: "rule",
          title: "Ley de Lorentz",
          formula: "\\mathbf{F} = q\\,\\mathbf{v}\\times\\mathbf{B}\\qquad F = q\\,v\\,B\\,\\operatorname{sen}\\theta",
          text: "La fuerza es **perpendicular** a $\\mathbf{v}$ y a $\\mathbf{B}$. Si $q$ es negativa, el sentido es el contrario.",
        },
        {
          kind: "warning",
          title: "No cambia la velocidad, solo la dirección",
          text: "Como $\\mathbf{F}\\perp\\mathbf{v}$, la fuerza magnética **no realiza trabajo**: no modifica la energía cinética de la partícula.",
        },
      ],
      visual: { kind: "anim", scene: "lorentz-carga", beatMs: 5800 },
    },
    {
      id: "explora-lorentz",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale el radio?",
          message: "La fuerza magnética hace de fuerza centrípeta: $q\\,v\\,B = m\\,v^2/r$, de donde $r = m\\,v/(q\\,B)$.",
        },
      ],
      title: "Radio de la trayectoria",
      blocks: [
        {
          kind: "text",
          text: "Con $\\mathbf{v}\\perp\\mathbf{B}$ la partícula describe una **circunferencia** de radio $r = \\dfrac{m\\,v}{q\\,B}$. Prueba con protones y electrones.",
        },
      ],
      visual: { kind: "tool", tool: "lorentz-explorador", params: { a: 8, b: 2 } },
    },
    {
      id: "check-proton",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Datos", message: "$m_p = 1{,}67\\cdot 10^{-27}$ kg; $q = 1{,}6\\cdot 10^{-19}$ C. $r = m\\,v/(q\\,B)$." }],
      title: "Un protón en un campo de 2 T",
      question: "Un protón entra perpendicularmente con $8\\cdot 10^6$ m/s en un campo de $2$ T. ¿Qué radio tiene su órbita, en cm? (un decimal)",
      correctAnswers: ["4,2", "4.2", "4,18", "4.18"],
      explanation: "$r = \\dfrac{1{,}67\\cdot 10^{-27}\\cdot 8\\cdot 10^6}{1{,}6\\cdot 10^{-19}\\cdot 2} = 0{,}042$ m $= 4{,}2$ cm.",
    },
    {
      id: "check-electron",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$F = q\\,v\\,B$ con $q = 1{,}6\\cdot 10^{-19}$ C." }],
      title: "Fuerza sobre un electrón",
      question: "Un electrón se mueve a $10^6$ m/s perpendicular a un campo de $0{,}5$ T. ¿Qué fuerza sufre? (en unidades de $10^{-14}$ N)",
      correctAnswers: ["8", "8,0", "8.0"],
      explanation: "$F = 1{,}6\\cdot 10^{-19}\\cdot 10^6\\cdot 0{,}5 = 8\\cdot 10^{-14}$ N.",
    },
    {
      id: "check-trabajo",
      type: "predict",
      help: [{ label: "Pista", message: "¿Forma la fuerza algún ángulo con el desplazamiento?" }],
      title: "¿Y la energía?",
      question: "Una partícula cargada entra en un campo magnético uniforme perpendicular a su velocidad. Su energía cinética:",
      mode: "choice",
      choices: [
        { id: "igual", label: "Se mantiene constante, porque la fuerza es perpendicular al desplazamiento" },
        { id: "sube", label: "Aumenta, porque el campo la acelera", incorrectFeedback: "La acelera (cambia la dirección), pero no aumenta su rapidez." },
        { id: "baja", label: "Disminuye, porque el campo la frena", incorrectFeedback: "No hay componente de la fuerza contraria a la velocidad." },
      ],
      correctChoiceId: "igual",
      shuffleChoices: true,
      explanation: "El campo magnético cambia la dirección de la velocidad, no su módulo.",
    },
    {
      id: "clasifica-campos",
      type: "classify",
      help: [{ label: "Pista", message: "Eléctrico: sobre cualquier carga y en la dirección del campo. Magnético: solo sobre cargas en movimiento y perpendicular." }],
      title: "Eléctrico o magnético",
      question: "Asigna cada característica al campo que corresponde.",
      groups: [
        { id: "electrico", label: "Campo eléctrico", tone: "amber" },
        { id: "magnetico", label: "Campo magnético", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Actúa también sobre cargas en reposo", group: "electrico" },
        { id: "b", text: "Solo actúa sobre cargas en movimiento", group: "magnetico" },
        { id: "c", text: "La fuerza tiene la dirección del campo", group: "electrico" },
        { id: "d", text: "La fuerza es perpendicular al campo", group: "magnetico" },
        { id: "e", text: "Puede realizar trabajo sobre la carga", group: "electrico" },
        { id: "f", text: "No cambia la energía cinética de la partícula", group: "magnetico" },
      ],
      hint: "Fíjate en si la velocidad influye y en la dirección de la fuerza.",
      explanation: "Son diferencias fundamentales entre ambos campos.",
    },
  ],
};
