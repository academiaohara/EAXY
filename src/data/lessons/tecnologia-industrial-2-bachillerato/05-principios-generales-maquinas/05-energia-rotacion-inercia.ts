import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const energiaRotacionInerciaLesson: InteractiveLesson = {
  slug: "energia-rotacion-inercia",
  title: "5. Energía de rotación y momento de inercia",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ec-rotacion",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale ½ I ω²?",
          message: "Cada partícula de masa $m_i$ a distancia $r_i$ del eje se mueve con $v_i = \\omega\\,r_i$ y tiene $\\tfrac{1}{2}m_i r_i^2\\omega^2$. Se suman todas: $\\tfrac{1}{2}(\\sum m_i r_i^2)\\,\\omega^2$.",
        },
      ],
      title: "Cuando el cuerpo también gira",
      blocks: [
        {
          kind: "text",
          text: "Si un cuerpo gira alrededor de un eje con velocidad angular $\\omega$, importa **cómo está distribuida la masa**: cada trocito tiene velocidad $v = \\omega\\,r$.",
        },
        {
          kind: "rule",
          title: "Momento de inercia",
          formula: "I = \\sum m_i\\,r_i^2 \\;\\;(\\text{kg·m}^2),\\qquad E_c = \\tfrac{1}{2}\\,I\\,\\omega^2",
          text: "Depende del eje de rotación elegido. El **radio de giro** $\\rho = \\sqrt{I/m}$ es la distancia a la que habría que concentrar toda la masa para tener el mismo $I$.",
        },
        {
          kind: "rule",
          title: "Si además se traslada",
          formula: "E_c = \\tfrac{1}{2}\\,m\\,v^2 + \\tfrac{1}{2}\\,I\\,\\omega^2",
        },
      ],
      arrange: "stack",
    },
    {
      id: "carrera",
      type: "slide",
      help: [
        {
          label: "¿Por qué gana el bloque?",
          message: "Porque toda su energía potencial se convierte en energía cinética de traslación. En los demás, parte se «gasta» en hacerlos girar.",
        },
      ],
      title: "¿Quién llega antes?",
      blocks: [
        {
          kind: "text",
          text: "Cuatro cuerpos de igual masa y radio bajan por el mismo plano. Predice el orden de llegada antes de verlo.",
        },
      ],
      visual: { kind: "anim", scene: "rodadura-carrera", beatMs: 5200 },
    },
    {
      id: "check-carrera",
      type: "predict",
      help: [{ label: "Más masa lejos del eje", message: "El aro tiene toda su masa en el borde: el mayor momento de inercia de los tres que ruedan." }],
      title: "El último en llegar",
      question: "De los cuerpos que ruedan sin deslizar (esfera maciza, cilindro macizo y aro, de igual masa y radio), ¿cuál llega el último?",
      mode: "choice",
      choices: [
        { id: "aro", label: "El aro, que tiene el mayor momento de inercia" },
        { id: "esfera", label: "La esfera maciza", incorrectFeedback: "Es la que más corre de las tres, porque tiene el menor momento de inercia." },
        { id: "cilindro", label: "El cilindro macizo", incorrectFeedback: "Llega antes que el aro." },
      ],
      correctChoiceId: "aro",
      shuffleChoices: true,
      explanation: "Con $I = m\\,r^2$ el aro invierte la mitad de la energía en girar y lleva menor velocidad: $a = \\dfrac{g\\sin\\theta}{1 + I/(m r^2)} = 0{,}5\\,g\\sin\\theta$.",
    },
    {
      id: "explora-inercia",
      type: "slide",
      help: [
        {
          label: "¿Cómo se usa la tabla?",
          message: "Para cada forma hay una fórmula: aro $m r^2$; disco o cilindro $\\tfrac{1}{2}m r^2$; esfera maciza $\\tfrac{2}{5}m r^2$; varilla por el centro $\\tfrac{1}{12}m\\ell^2$.",
        },
      ],
      title: "Momentos de inercia",
      blocks: [
        {
          kind: "text",
          text: "Elige la forma y cambia la masa, el radio y la velocidad angular. Observa cómo varían $I$, el radio de giro y la energía cinética de rotación.",
        },
      ],
      visual: { kind: "tool", tool: "momento-inercia", params: { a: 1, b: 2, c: 0.2 } },
    },
    {
      id: "check-inercia-disco",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Disco", message: "$I = \\tfrac{1}{2}\\,m\\,r^2$ con $m = 2$ kg y $r = 0{,}1$ m." }],
      title: "Momento de inercia de un disco",
      question: "¿Cuál es el momento de inercia, en kg·m², de un disco macizo de $2$ kg y $10$ cm de radio respecto de su eje? (con dos decimales)",
      correctAnswers: ["0,01", "0.01"],
      explanation: "$I = \\tfrac{1}{2}\\cdot 2\\cdot 0{,}1^2 = 0{,}01$ kg·m².",
    },
    {
      id: "check-ec-rotacion",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "E_c = ½ I ω²", message: "Con $I = 0{,}01$ kg·m² y $\\omega = 100$ rad/s." }],
      title: "Energía cinética de rotación",
      question: "El disco anterior gira a $100$ rad/s. ¿Qué energía cinética de rotación tiene, en julios? (solo el número)",
      correctAnswers: ["50"],
      explanation: "$E_c = \\tfrac{1}{2}\\cdot 0{,}01\\cdot 100^2 = 50$ J.",
    },
    {
      id: "check-discos",
      type: "predict",
      help: [{ label: "Distribución de la masa", message: "A igual masa y velocidad angular, el momento de inercia crece con el radio al cuadrado." }],
      title: "Dos discos que giran",
      question: "Dos discos de la misma masa y distinto diámetro giran a las mismas revoluciones. Su energía cinética es:",
      mode: "choice",
      choices: [
        { id: "mayor", label: "Mayor en el disco de más diámetro" },
        { id: "igual", label: "Igual en los dos, pues tienen la misma masa y velocidad", incorrectFeedback: "También cuenta cómo se distribuye la masa respecto al eje: $I = \\tfrac{1}{2}m r^2$." },
        { id: "menor", label: "Mayor en el disco de menor diámetro", incorrectFeedback: "Al revés: más radio, más $I$ y más energía." },
      ],
      correctChoiceId: "mayor",
      shuffleChoices: true,
      explanation: "$E_c = \\tfrac{1}{2}I\\omega^2$ con $I = \\tfrac{1}{2}m r^2$: crece con $r^2$.",
    },
  ],
};
