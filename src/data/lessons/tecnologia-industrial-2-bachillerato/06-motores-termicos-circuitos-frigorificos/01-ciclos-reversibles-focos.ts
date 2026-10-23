import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const ciclosReversiblesFocosLesson: InteractiveLesson = {
  slug: "ciclos-reversibles-focos",
  title: "1. Procesos, ciclos y máquinas entre dos focos",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reversible",
      type: "slide",
      help: [
        {
          label: "¿Por qué ningún proceso real es reversible?",
          message: "Porque siempre hay rozamiento, diferencias finitas de temperatura y de presión. Lo reversible es un modelo ideal al que nos aproximamos: sirve para fijar el máximo teórico.",
        },
      ],
      title: "Procesos reversibles e irreversibles",
      blocks: [
        {
          kind: "definition",
          text: "Un proceso es **reversible** si con un cambio **muy pequeño** en el ambiente se puede recorrer su trayectoria a la inversa, pasando por los mismos estados.",
        },
        {
          kind: "text",
          text: "En cada instante, presiones y temperaturas están en equilibrio con el entorno. En la práctica **todos los procesos naturales son irreversibles**: las personas crecen, pero no se puede ir hacia atrás. Si ponemos en contacto dos cuerpos, el caliente enfría y el frío se calienta, nunca al revés.",
        },
        {
          kind: "warning",
          title: "Propiedades de estado",
          text: "Volumen, temperatura o energía interna solo dependen del **estado inicial y final**. El **calor** y el **trabajo** no son propiedades termodinámicas: dependen también del camino.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "camino",
      type: "slide",
      help: [
        {
          label: "¿Y si sigo otro camino?",
          message: "El trabajo es el área bajo la curva en el diagrama $pV$. Al cambiar el camino, cambia el área, aunque los puntos inicial y final sean los mismos.",
        },
      ],
      title: "El trabajo depende del camino",
      blocks: [
        {
          kind: "text",
          text: "Para ir del estado $i$ al $f$ hay infinitos caminos. En cada uno el área bajo la gráfica $pV$, es decir, el trabajo, es diferente.",
        },
        {
          kind: "text",
          text: "Si el estado inicial **coincide** con el final, el proceso es **cerrado** o **ciclo**. Una máquina que produce trabajo de forma continua tiene que recorrer ciclos.",
        },
      ],
      visual: { kind: "anim", scene: "procesos-camino-pv", beatMs: 5600 },
    },
    {
      id: "check-camino",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en qué magnitudes son de estado y cuáles dependen del camino." }],
      title: "Mismo inicio, mismo final",
      question: "Un gas pasa del estado $i$ al estado $f$ por dos caminos distintos. ¿Qué magnitud será necesariamente igual en los dos?",
      mode: "choice",
      choices: [
        { id: "u", label: "La variación de energía interna" },
        { id: "w", label: "El trabajo realizado", incorrectFeedback: "El trabajo es el área bajo la curva y cada camino da un área distinta." },
        { id: "q", label: "El calor intercambiado", incorrectFeedback: "El calor tampoco es una propiedad de estado: depende del camino." },
      ],
      correctChoiceId: "u",
      shuffleChoices: true,
      explanation: "La energía interna es una propiedad de estado, así que $\\Delta U$ solo depende de $i$ y de $f$. El calor y el trabajo dependen del camino.",
    },
    {
      id: "focos",
      type: "slide",
      help: [
        {
          label: "¿Por qué no basta un solo foco?",
          message: "Una máquina que sacara calor del mar y lo convirtiera todo en trabajo, devolviendo cubitos de hielo, no existe: sería imposible por el segundo principio de la termodinámica.",
        },
      ],
      title: "Motor térmico y máquina frigorífica",
      blocks: [
        {
          kind: "text",
          text: "Para que haya calor tiene que haber **dos temperaturas distintas**. Una máquina térmica trabaja entre un foco caliente ($T_c$) y uno frío ($T_f$).",
        },
        {
          kind: "compare",
          left: { title: "Motor térmico", text: "Toma $Q_c$ del caliente, produce $W = Q_c - Q_f$ y cede $Q_f$ al frío.", math: ["\\eta = \\dfrac{W}{Q_c} = 1 - \\dfrac{Q_f}{Q_c}"], tone: "key" },
          right: { title: "Máquina frigorífica", text: "Consume $W$ para sacar $Q_f$ del frío y llevar $Q_c = W + Q_f$ al caliente.", math: ["Q_c = W + Q_f"], tone: "info" },
        },
      ],
      visual: { kind: "anim", scene: "motor-frigorifica-focos", beatMs: 5400 },
    },
    {
      id: "check-rendimiento",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Fórmula", message: "$\\eta = (Q_c - Q_f)/Q_c$." }],
      title: "Rendimiento de un motor",
      question: "Un motor térmico absorbe $500$ kJ del foco caliente y cede $350$ kJ al foco frío. ¿Cuál es su rendimiento, en %?",
      correctAnswers: ["30", "30 %", "30%"],
      explanation: "$W = 500 - 350 = 150$ kJ y $\\eta = 150/500 = 0{,}30$, es decir, $30\\,\\%$.",
    },
    {
      id: "check-unico-foco",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en el segundo principio." }],
      title: "¿Y con un solo foco?",
      question: "¿Podría funcionar un motor que tomara calor de un único foco (por ejemplo, el agua del mar) y lo convirtiera todo en trabajo?",
      mode: "choice",
      choices: [
        { id: "no", label: "No: el segundo principio exige ceder parte del calor a un foco más frío" },
        { id: "si", label: "Sí, siempre que sea muy grande", incorrectFeedback: "El tamaño no importa: es una limitación de principio." },
        { id: "friccion", label: "Sí, si no hubiera rozamientos", incorrectFeedback: "Incluso sin rozamientos haría falta un foco frío." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "Para obtener trabajo neto es imprescindible que el calor pase de un foco caliente a uno frío y ceda una parte $Q_f$.",
    },
    {
      id: "clasifica-maquinas",
      type: "classify",
      help: [{ label: "Pista", message: "El motor produce trabajo con calor que baja de caliente a frío; el frigorífico consume trabajo para subir calor de frío a caliente." }],
      title: "Motor o frigorífico",
      question: "Reparte las descripciones.",
      groups: [
        { id: "motor", label: "Motor térmico", tone: "amber" },
        { id: "frigo", label: "Máquina frigorífica", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Produce trabajo útil", group: "motor" },
        { id: "b", text: "Consume trabajo del compresor", group: "frigo" },
        { id: "c", text: "Cede el calor Q_f al foco frío", group: "motor" },
        { id: "d", text: "Extrae calor Q_f del foco frío", group: "frigo" },
        { id: "e", text: "Una turbina de vapor de una central", group: "motor" },
        { id: "f", text: "La nevera de una cocina", group: "frigo" },
      ],
      hint: "Fíjate en el sentido del calor y en si se produce o se consume trabajo.",
      explanation: "El motor aprovecha el paso de calor del foco caliente al frío; la máquina frigorífica lo invierte a costa de trabajo.",
    },
  ],
};
