import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const potenciaRendimientoMotorLesson: InteractiveLesson = {
  slug: "potencia-rendimiento-motor",
  title: "7. Potencia y rendimiento de un motor",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "¿Por qué dividir N entre 2?",
          message: "Porque en un motor de cuatro tiempos solo hay una explosión cada **dos vueltas**. Es como si solo trabajara la mitad del volumen en cada vuelta.",
        },
      ],
      title: "La potencia de un motor",
      blocks: [
        {
          kind: "rule",
          title: "Potencia",
          formula: "P = \\dfrac{N}{2}\\,V_T\\,d_a\\,\\delta\\,Q_c\\,\\eta",
          text: "Con $P$ en kW, $N$ en s⁻¹, $V_T$ la cilindrada total en l, $d_a$ la densidad del aire en kg/l, $\\delta$ el dosado, $Q_c$ el poder calorífico inferior en kJ/kg y $\\eta$ el rendimiento.",
        },
        {
          kind: "steps",
          title: "Cómo leerla",
          items: [
            "$d_a\\,V_T$ es la **masa de aire** que aspira el motor.",
            "Multiplicada por el **dosado** (masa de combustible entre masa de aire) da la masa de combustible quemado.",
            "Por el poder calorífico es la **energía** del combustible; por $\\eta$, la parte aprovechada.",
            "Se divide entre el tiempo que dura la expansión: media vuelta.",
          ],
        },
      ],
      visual: { kind: "tool", tool: "potencia-motor-explorador", params: { a: 3000, b: 2 } },
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Unidades", message: "$N = 3\\,000/60 = 50$ s⁻¹; $d_a = 0{,}0012$ kg/l; $\\delta = 1/14{,}9$; $\\eta = 0{,}3$." }],
      title: "Un motor de gasolina",
      question: "Un motor de cuatro tiempos de $2$ l gira a $3\\,000$ rpm. Quema gasolina (dosado $1/14{,}9$, $Q_c = 43\\,700$ kJ/kg) con $\\eta = 0{,}3$ y aire de $0{,}0012$ kg/l. ¿Qué potencia da, en kW? (un decimal)",
      correctAnswers: ["52,8", "52.8", "53", "52,9", "52.9"],
      explanation: "$P = \\dfrac{50}{2}\\cdot 2\\cdot 0{,}0012\\cdot\\dfrac{1}{14{,}9}\\cdot 43\\,700\\cdot 0{,}3 \\approx 52{,}8$ kW (unos $72$ CV).",
    },
    {
      id: "rendimientos",
      type: "slide",
      help: [
        {
          label: "¿Por qué el volumétrico mejora con la inyección?",
          message: "Con carburador, la mezcla debe pasar por un estrechamiento que ofrece resistencia. Con inyección el aire entra libre y el cilindro se llena más.",
        },
      ],
      title: "Tres rendimientos en uno",
      blocks: [
        {
          kind: "text",
          text: "El término $\\eta$ de la fórmula engloba varios matices:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\eta_{vol}\\ \\text{hasta } 95\\,\\%", label: "volumétrico: cuánto se llena el cilindro" },
            { tex: "\\eta_{t}\\ \\text{hasta } 30\\,\\%\\ (\\text{MEP}),\\ 50\\,\\%\\ (\\text{MEC})", label: "térmico: potencia del motor entre potencia del combustible" },
            { tex: "\\eta_{m}\\ \\approx 85\\text{–}90\\,\\%", label: "mecánico: pérdidas de los órganos auxiliares" },
          ],
        },
        {
          kind: "text",
          text: "El rendimiento térmico incluye las pérdidas de calor y el rendimiento termodinámico del ciclo; el mecánico, el rozamiento de las piezas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "explora-geometria",
      type: "slide",
      help: [
        {
          label: "¿Qué es la cilindrada?",
          message: "El volumen barrido por el pistón en una carrera: la diferencia entre el volumen libre del cilindro en el PMI y el del PMS.",
        },
      ],
      title: "Cilindrada, cámara y relación de compresión",
      blocks: [
        {
          kind: "text",
          text: "La **cilindrada unitaria** es $V_u = \\pi D^2 C/4$. La **cámara de combustión** es el volumen que queda en el PMS: $V_c = V_u/(r-1)$.",
        },
      ],
      visual: { kind: "tool", tool: "cilindrada-explorador", params: { a: 89, b: 79.5, c: 10.5 } },
    },
    {
      id: "check-cilindrada",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasa a cm", message: "$D = 8{,}9$ cm y $C = 7{,}95$ cm: $V_u = \\pi\\cdot 8{,}9^2\\cdot 7{,}95/4$." }],
      title: "Un cilindro",
      question: "Un motor de explosión tiene cilindros de $89$ mm de diámetro y $79{,}5$ mm de carrera. ¿Qué cilindrada tiene cada cilindro, en cm³? (redondea a la unidad)",
      correctAnswers: ["495", "494,6", "494.6", "494,7", "494.7"],
      explanation: "$V_u = \\pi\\cdot 8{,}9^2\\cdot 7{,}95/4 = 494{,}6\\ \\text{cm}^3$.",
    },
    {
      id: "check-camara",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$V_c = V_u/(r-1)$ con $r = 10{,}5$." }],
      title: "Volumen de la cámara",
      question: "Con relación de compresión $10{,}5$ y $494{,}6$ cm³ de cilindrada unitaria, ¿qué volumen tiene la cámara de combustión, en cm³? (un decimal)",
      correctAnswers: ["52,1", "52.1", "52,06", "52.06"],
      explanation: "$V_c = 494{,}6/(10{,}5-1) = 52{,}1$ cm³. Con 6 cilindros, la cilindrada total es $2{,}97$ l.",
    },
    {
      id: "check-trabajo-hora",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Energía", message: "$W = P\\cdot t$ con $P = 20$ kW y $t = 3\\,600$ s." }],
      title: "Trabajo en una hora",
      question: "Un motor Otto desarrolla una potencia útil de $20$ kW. ¿Qué trabajo produce en una hora, en MJ?",
      correctAnswers: ["72", "72 MJ"],
      explanation: "$W = 20\\ \\text{kW}\\cdot 3\\,600\\ \\text{s} = 72\\,000$ kJ $= 72$ MJ.",
    },
    {
      id: "check-trabajo-ciclo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Ciclos por segundo", message: "A $3\\,000$ rpm hay $50$ vueltas/s y un ciclo cada dos vueltas." }],
      title: "Trabajo por ciclo",
      question: "El motor anterior ($20$ kW) gira a $3\\,000$ rpm. ¿Qué trabajo produce por ciclo, en julios?",
      correctAnswers: ["800", "800 J"],
      explanation: "$3\\,000/60/2 = 25$ ciclos por segundo; $20\\,000\\ \\text{J/s}/25 = 800$ J por ciclo.",
    },
    {
      id: "check-diesel-potencia",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Energía por hora", message: "$9{,}5\\ \\text{kg/h}\\cdot 43\\,200\\ \\text{kJ/kg}$ y el $30\\,\\%$ se convierte en trabajo." }],
      title: "Un motor Diesel",
      question: "Un motor Diesel consume $9{,}5$ kg/h de gasóleo ($43\\,200$ kJ/kg) con un rendimiento del $30\\,\\%$. ¿Qué potencia desarrolla, en kW? (un decimal)",
      correctAnswers: ["34,2", "34.2"],
      explanation: "Energía: $9{,}5\\cdot 43\\,200 = 410\\,400$ kJ/h; en trabajo: $0{,}3\\cdot 410\\,400 = 123\\,120$ kJ/h $= 34{,}2$ kW $\\approx 46{,}5$ CV.",
    },
    {
      id: "check-indicada",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Mecánico", message: "$P_{ef} = \\eta_m\\,P_i$." }],
      title: "Potencia indicada",
      question: "La potencia efectiva de un motor es $80$ kW y su rendimiento mecánico es $0{,}75$. ¿Cuál es su potencia indicada, en kW? (un decimal)",
      correctAnswers: ["106,7", "106.7", "107"],
      explanation: "$P_i = P_{ef}/\\eta_m = 80/0{,}75 = 106{,}7$ kW. Es la potencia desarrollada en el ciclo termodinámico, antes de pérdidas mecánicas.",
    },
  ],
};
