import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const leyHookeTensionTrabajoLesson: InteractiveLesson = {
  slug: "ley-hooke-tension-trabajo",
  title: "12. Ley de Hooke y tensión de trabajo",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "hooke",
      type: "slide",
      help: [
        {
          label: "¿Por qué «tg α»?",
          message: "Porque $E$ es la pendiente de la recta del diagrama $\\sigma$–$\\varepsilon$: la tangente del ángulo que forma con el eje de deformaciones.",
        },
      ],
      title: "Ley de Hooke",
      blocks: [
        {
          kind: "definition",
          text: "**Ley de Hooke**: las deformaciones producidas en un elemento resistente son **proporcionales** a las tensiones que las producen, dentro del comportamiento elástico.",
        },
        {
          kind: "rule",
          title: "Módulo elástico o de Young",
          formula: "E = \\dfrac{\\sigma}{\\varepsilon} = \\operatorname{tg}\\alpha",
          text: "Es la **pendiente** de la recta OP. Es característico de cada material y se mide en las unidades de $\\sigma$ (N/m², kp/mm²…). Un material con $E$ alto es **rígido**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "ecuacion-fundamental",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale?",
          message: "Sustituyes $\\sigma = F/A_0$ y $\\varepsilon = \\Delta l/l_0$ en $E = \\sigma/\\varepsilon$ y despejas.",
        },
      ],
      title: "Ecuación fundamental de la tracción",
      blocks: [
        {
          kind: "example",
          title: "Sustituimos en E = σ/ε",
          lines: [
            { math: "E = \\dfrac{\\sigma}{\\varepsilon} = \\dfrac{F/A_0}{\\Delta l/l_0}" },
            { math: "E = \\dfrac{F\\,l_0}{A_0\\,\\Delta l}", note: "ecuación fundamental" },
            { math: "\\Delta l = \\dfrac{F\\,l_0}{A_0\\,E}", note: "alargamiento" },
          ],
        },
        {
          kind: "warning",
          text: "Solo vale en la **zona de proporcionalidad**: pasado ese límite, el comportamiento deja de ser lineal.",
        },
      ],
      visual: { kind: "tool", tool: "hooke-explorador", params: { a: 1, b: 20, c: 150 } },
    },
    {
      id: "check-modulo-aluminio",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "Sección: $10\\cdot 10 = 100$ mm². $\\sigma = F/A_0$; $\\varepsilon = \\Delta l/l_0$; $E = \\sigma/\\varepsilon$." }],
      title: "Módulo elástico del aluminio",
      question: "Una barra de aluminio de $200$ mm de longitud y sección cuadrada de $10$ mm de lado soporta una tracción de $12\\,300$ N y se alarga $0{,}34$ mm. ¿Cuánto vale su módulo elástico, en GPa? (un decimal)",
      correctAnswers: ["72,4", "72.4", "72,35", "72.35"],
      explanation: "$\\sigma = 12\\,300/100 = 123$ MPa; $\\varepsilon = 0{,}34/200 = 0{,}0017$. $E = 123/0{,}0017 = 72\\,353$ MPa $\\approx 72{,}4$ GPa.",
    },
    {
      id: "check-diametro",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Despeja la sección", message: "$A_0 = F\\,l_0/(E\\,\\Delta l)$ con $E = 207\\,000$ MPa. Después $D = \\sqrt{4A_0/\\pi}$." }],
      title: "¿Qué diámetro necesita?",
      question: "Una barra cilíndrica de acero ($E = 207\\,000$ MPa) de $500$ mm se somete a $10\\,000$ N. ¿Qué diámetro mínimo, en mm, debe tener para que no se alargue más de $0{,}35$ mm? (un decimal)",
      correctAnswers: ["9,4", "9.4", "9,37", "9.37"],
      explanation: "$A_0 = \\dfrac{10\\,000\\cdot 500}{207\\,000\\cdot 0{,}35} = 69{,}0$ mm²; $D = \\sqrt{4\\cdot 69{,}0/\\pi} \\approx 9{,}4$ mm. La tensión ($145$ MPa) queda por debajo del límite elástico ($310$ MPa).",
    },
    {
      id: "check-laton-fuerza",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Hasta el límite elástico", message: "$F = \\sigma\\cdot A_0$ con $\\sigma = 345$ MPa." }],
      title: "Latón: fuerza máxima",
      question: "Una pieza de latón deja de ser elástica con tensiones superiores a $345$ MPa. ¿Qué fuerza máxima, en kN, puede aplicarse a una probeta de $150$ mm² sin deformación plástica? (dos decimales)",
      correctAnswers: ["51,75", "51.75", "51750"],
      explanation: "$F = 345\\cdot 150 = 51\\,750$ N $= 51{,}75$ kN.",
    },
    {
      id: "check-laton-alargamiento",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Hooke", message: "$\\varepsilon = \\sigma/E$ con $E = 103\\,000$ MPa; $\\Delta l = \\varepsilon\\,l_0$ con $l_0 = 70$ mm." }],
      title: "Latón: alargamiento máximo",
      question: "Con el mismo latón ($E = 103\\,000$ MPa), ¿cuánto puede alargarse como máximo, en mm, una pieza de $70$ mm sin deformación plástica? (dos decimales)",
      correctAnswers: ["0,23", "0.23"],
      explanation: "$\\varepsilon = 345/103\\,000 = 0{,}00335$; $\\Delta l = 0{,}00335\\cdot 70 = 0{,}23$ mm. La longitud máxima es $70{,}23$ mm.",
    },
    {
      id: "tension-trabajo",
      type: "slide",
      help: [
        {
          label: "¿Qué son las fuerzas imprevistas?",
          message: "Cargas que no estaban en el cálculo: golpes, vibraciones, sobrecargas, defectos del material… El coeficiente de seguridad deja un margen para cubrirlas.",
        },
      ],
      title: "Tensión máxima de trabajo",
      blocks: [
        {
          kind: "text",
          text: "Al diseñar una pieza no se la hace trabajar cerca del límite elástico. La norma fija una **tensión máxima de trabajo** $\\sigma_t$, **inferior al límite de proporcionalidad**, que:",
        },
        {
          kind: "steps",
          items: [
            "Evita deformaciones plásticas en el elemento.",
            "Cumple la ley de Hooke.",
            "Deja un margen que asume la aparición de fuerzas imprevistas.",
          ],
        },
        {
          kind: "rule",
          title: "Coeficiente de seguridad n",
          formula: "\\sigma_t = \\dfrac{\\sigma_F}{n}\\qquad \\text{o}\\qquad \\sigma_t = \\dfrac{\\sigma_R}{n}",
          text: "Con $n$ entre $1{,}2$ y $4{,}0$, según el uso de la pieza y la normativa vigente.",
        },
      ],
      visual: { kind: "tool", tool: "tension-trabajo-explorador", params: { a: 1, b: 1.7 } },
    },
    {
      id: "check-fuerza-escalonada",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "El tramo más delgado", message: "La fuerza es la misma en los dos tramos, pero la tensión es mayor donde la sección es menor." }],
      title: "Pieza escalonada",
      question: "Una pieza de acero tiene dos tramos de sección cuadrada, de $50$ mm y de $20$ mm de lado. Su límite elástico es $6\\,200$ kp/cm² y se usa un coeficiente de seguridad de $4$. ¿Qué fuerza máxima, en kp, puede aplicarse?",
      correctAnswers: ["6200", "6 200"],
      explanation: "$\\sigma_t = 6\\,200/4 = 1\\,550$ kp/cm². El tramo crítico es el de $20\\times 20$ mm $= 4$ cm²: $F_{\\max} = 1\\,550\\cdot 4 = 6\\,200$ kp.",
    },
    {
      id: "check-n",
      type: "predict",
      help: [{ label: "Pista", message: "$\\sigma_t = \\sigma_F/n$: si $n$ crece, $\\sigma_t$ baja." }],
      title: "Más seguridad",
      question: "Si en una pieza se aumenta el coeficiente de seguridad de $1{,}5$ a $3$, manteniendo el material:",
      mode: "choice",
      choices: [
        { id: "mitad", label: "La tensión de trabajo se reduce a la mitad: la pieza soporta menos carga pero queda más lejos del fallo" },
        { id: "doble", label: "La tensión de trabajo se duplica", incorrectFeedback: "$n$ está en el denominador: duplicarlo reduce $\\sigma_t$ a la mitad." },
        { id: "igual", label: "No cambia la tensión de trabajo", incorrectFeedback: "$\\sigma_t$ depende directamente de $n$." },
      ],
      correctChoiceId: "mitad",
      shuffleChoices: true,
      explanation: "$\\sigma_t = \\sigma_F/n$: con $n$ doble, $\\sigma_t$ pasa a la mitad.",
    },
  ],
};
