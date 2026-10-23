import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const durezaBrinellLesson: InteractiveLesson = {
  slug: "dureza-brinell",
  title: "13. Ensayo de dureza Brinell",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "brinell",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se pueden comparar todas las durezas?",
          message: "Cada técnica da un número en una escala distinta. Las durezas medidas por penetración tienen un significado **relativo**: solo se comparan resultados obtenidos con la misma técnica.",
        },
      ],
      title: "Dureza: resistencia a ser penetrado",
      blocks: [
        {
          kind: "definition",
          text: "**Dureza**: la resistencia que ofrece un material a ser **rayado o penetrado** por otro. La propiedad que se determina es la **cohesión**.",
        },
        {
          kind: "steps",
          title: "Ensayo Brinell (UNE 7-422-85)",
          items: [
            "Se comprime una **bola de acero templado** de diámetro $D$ contra el material con una carga $F$ y durante un tiempo.",
            "Se mide el **diámetro $d$ de la huella** que queda.",
            "Se calcula la dureza con la carga y la superficie del casquete.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "brinell-huella", beatMs: 5600 },
    },
    {
      id: "formulas",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale la profundidad f?",
          message: "Del triángulo rectángulo formado por el radio de la bola ($D/2$), la mitad de la huella ($d/2$) y $D/2 - f$: $(D/2)^2 - (d/2)^2 = (D/2 - f)^2$. Se resuelve la ecuación de segundo grado y se elige la solución menor.",
        },
      ],
      title: "De la huella a los grados Brinell",
      blocks: [
        {
          kind: "rule",
          title: "Dureza Brinell",
          formula: "HB = \\dfrac{F}{S}\\qquad S = \\pi\\,D\\,f",
          text: "$F$ en kp (kg), $S$ en mm² y $f$ es la profundidad de la huella.",
        },
        {
          kind: "formula",
          tex: "f = \\dfrac{D - \\sqrt{D^2 - d^2}}{2}\\quad\\Rightarrow\\quad HB = \\dfrac{2F}{\\pi D\\left(D - \\sqrt{D^2 - d^2}\\right)}",
        },
        {
          kind: "example",
          title: "Ejemplo: F = 500 kp, D = 5 mm, d = 2,3 mm",
          lines: [
            { math: "f = \\dfrac{5 - \\sqrt{25 - 5{,}29}}{2} = 0{,}28\\ \\text{mm}" },
            { math: "S = \\pi\\cdot 5\\cdot 0{,}28 = 4{,}40\\ \\text{mm}^2" },
            { math: "HB = 500/4{,}40 \\approx 114" },
          ],
        },
        {
          kind: "text",
          text: "En la práctica se usan **tablas** que dan HB directamente a partir de $d$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "explora-brinell",
      type: "slide",
      help: [
        {
          label: "¿Qué es K?",
          message: "Una constante del material (Tabla 1.8): $30$ para hierros y aceros, $10$ para cobre, bronce y latón, $5$ para aleaciones ligeras y $1{,}5$ para Sn-Pb. Las cargas deben ser proporcionales al cuadrado del diámetro: $P = K\\,D^2$, para que las huellas sean semejantes.",
        },
      ],
      title: "Elige bola, carga y huella",
      blocks: [
        {
          kind: "text",
          text: "Para comparar resultados, la huella debe cumplir $D/4 < d < D/2$. Con un valor medio, $d = 0{,}375\\,D$. Elige el material y la bola, y comprueba la carga recomendada $P = K\\,D^2$.",
        },
      ],
      visual: { kind: "tool", tool: "brinell-explorador", params: { a: 500, b: 2.3 } },
    },
    {
      id: "check-hb-500",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Usa la fórmula", message: "$HB = 2F/\\left[\\pi D (D - \\sqrt{D^2-d^2})\\right]$ con $F = 500$, $D = 5$, $d = 2{,}3$." }],
      title: "Grado Brinell de una pieza",
      question: "En un ensayo Brinell con carga de $500$ kp y bola de $5$ mm, la huella tiene $2{,}3$ mm de diámetro. ¿Cuál es la dureza Brinell? (redondea a la unidad)",
      correctAnswers: ["114", "113,6", "113.6", "113,60", "113.60"],
      explanation: "$f = 0{,}28$ mm; $S = \\pi\\cdot 5\\cdot 0{,}28 = 4{,}40$ mm². $HB = 500/4{,}40 = 113{,}6 \\approx 114$.",
    },
    {
      id: "check-hb-1000",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Otra bola", message: "Ahora $D = 10$ mm, $F = 1\\,000$ kp y $d = 2{,}5$ mm." }],
      title: "Con una bola de 10 mm",
      question: "Se usa una bola de $10$ mm con una carga de $1\\,000$ kp y se obtiene una huella de $2{,}5$ mm. ¿Cuál es la dureza? (redondea a la unidad)",
      correctAnswers: ["200", "200,5", "200.5", "200,49", "200.49"],
      explanation: "$\\sqrt{100 - 6{,}25} = 9{,}68$; $HB = \\dfrac{2\\cdot 1\\,000}{\\pi\\cdot 10\\cdot (10 - 9{,}68)} \\approx 200$.",
    },
    {
      id: "check-huella",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Camino inverso", message: "$S = F/HB$; $f = S/(\\pi D)$; luego $d^2 = 4f(D - f)$." }],
      title: "Diámetro de la huella",
      question: "Una pieza de $300$ HB se ensaya con $500$ kp y bola de $10$ mm. ¿Qué diámetro tiene la huella, en mm? (dos decimales)",
      correctAnswers: ["1,45", "1.45", "1,453", "1.453"],
      explanation: "$S = 500/300 = 1{,}667$ mm²; $f = S/(\\pi D) = 0{,}053$ mm; $d = \\sqrt{4f(D-f)} = \\sqrt{4\\cdot 0{,}053\\cdot 9{,}947} \\approx 1{,}45$ mm.",
    },
    {
      id: "check-carga",
      type: "predict",
      mode: "numeric",
      help: [{ label: "P = K·D²", message: "$K = 30$ para los aceros y $D = 10$ mm." }],
      title: "Carga recomendada",
      question: "Para ensayar un acero con una bola de $10$ mm, ¿qué carga, en kp, recomienda la relación $P = K\\,D^2$ (con $K = 30$)?",
      correctAnswers: ["3000", "3 000"],
      explanation: "$P = 30\\cdot 10^2 = 3\\,000$ kp.",
    },
    {
      id: "check-huella-grande",
      type: "predict",
      help: [{ label: "Pista", message: "$HB = F/S$: con la misma $F$, a mayor $S$, menor dureza." }],
      title: "Huella grande, material blando",
      question: "Con la misma bola y la misma carga, una huella de mayor diámetro indica que el material es:",
      mode: "choice",
      choices: [
        { id: "blando", label: "Más blando: da menor dureza Brinell" },
        { id: "duro", label: "Más duro: da mayor dureza Brinell", incorrectFeedback: "Si fuese más duro, la bola penetraría menos y la huella sería más pequeña." },
        { id: "igual", label: "Igual de duro; el diámetro no importa", incorrectFeedback: "El diámetro de la huella es justo la medida con la que se calcula la dureza." },
      ],
      correctChoiceId: "blando",
      shuffleChoices: true,
      explanation: "Mayor superficie de contacto para la misma carga: $HB = F/S$ baja.",
    },
  ],
};
