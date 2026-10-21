import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const recocidoNormalizadoRevenidoLesson: InteractiveLesson = {
  slug: "recocido-normalizado-revenido",
  title: "3. Recocido, normalizado y revenido",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ciclos",
      type: "slide",
      help: [
        {
          label: "¿Qué tienen en común?",
          message: "Todos tienen tres partes: calentar hasta una temperatura, mantenerla un tiempo y enfriar. Lo que cambia es cuánto se calienta y a qué velocidad se enfría.",
        },
      ],
      title: "Cuatro ciclos, un mismo esquema",
      blocks: [
        {
          kind: "text",
          text: "Cada tratamiento es una curva temperatura–tiempo. Las líneas de referencia son $A_{c3}$ y $A_{c1}$ (zona de austenización) y $M_s$ y $M_f$ (zona martensítica).",
        },
        {
          kind: "text",
          text: "Pasa por cada ciclo con el reproductor: normalizado, temple, martempering, austempering y revenido.",
        },
      ],
      visual: { kind: "anim", scene: "ciclos-tratamiento", beatMs: 4200 },
    },
    {
      id: "recocido",
      type: "slide",
      help: [
        {
          label: "¿Qué es la acritud?",
          message: "El endurecimiento y pérdida de ductilidad que sufre un metal al deformarlo en frío. El recocido lo ablanda y devuelve la ductilidad.",
        },
      ],
      title: "Recocido y normalizado",
      blocks: [
        {
          kind: "compare",
          left: { title: "Recocido", text: "Calentar a una temperatura determinada y **enfriar lentamente**. Elimina tensiones del temple, aumenta plasticidad, ductilidad y tenacidad. Tres etapas: calentar, mantener, enfriar lento.", tone: "info" },
          right: { title: "Normalizado", text: "Para aceros deformados en frío o por laminación (grano grande e irregular). Se calienta entre **55 y 85 °C** por encima de la temperatura crítica superior y se enfría **al aire**: grano más fino y uniforme.", tone: "key" },
        },
        {
          kind: "steps",
          title: "Variantes del recocido",
          items: [
            "**Recocido total**: aceros de bajo y medio carbono; austenizar a 15–40 °C por encima de $A_3$ o $A_1$ y enfriar lento dentro del horno. Resulta **perlita gruesa**.",
            "**Globulización**: aceros de medio y alto carbono; unas $15$–$25$ h a unos $700$ °C. Da cementita esferoidal: máxima blandura y fácil mecanizado.",
            "**Revenido**: tras el temple, se calienta por debajo de $A_1$ y se enfría más bien rápido. Elimina fragilidad y tensiones, a costa de algo de dureza.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-objetivo",
      type: "classify",
      help: [{ label: "Pista", message: "Si va después del temple, para quitar fragilidad, es revenido. Si afina el grano tras laminar, normalizado." }],
      title: "Cada tratamiento, para su objetivo",
      question: "Relaciona cada objetivo con el tratamiento adecuado.",
      groups: [
        { id: "normalizado", label: "Normalizado", tone: "cobalt" },
        { id: "recocido", label: "Recocido total", tone: "emerald" },
        { id: "revenido", label: "Revenido", tone: "amber" },
        { id: "globulizacion", label: "Globulización", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Uniformar el tamaño de grano de una chapa laminada", group: "normalizado" },
        { id: "b", text: "Ablandar un acero deformado en frío y devolverle ductilidad", group: "recocido" },
        { id: "c", text: "Reducir la fragilidad y las tensiones de una pieza recién templada", group: "revenido" },
        { id: "d", text: "Obtener cementita esferoidal en un acero de alto carbono para mecanizarlo", group: "globulizacion" },
        { id: "e", text: "Calentar 55–85 °C por encima de A₃ y enfriar al aire", group: "normalizado" },
        { id: "f", text: "Calentar por debajo de A₁ tras el temple y enfriar más bien rápido", group: "revenido" },
      ],
      hint: "Mira si va después del temple y cuánto se calienta.",
      explanation: "Cada tratamiento persigue un efecto: normalizado afina grano, recocido ablanda, revenido da tenacidad al templado y la globulización da la máxima blandura.",
    },
    {
      id: "temperaturas",
      type: "slide",
      help: [
        {
          label: "¿Cómo se leen las temperaturas?",
          message: "Dependen del carbono porque la línea $A_3$ baja de 910 °C (hierro puro) hasta 723 °C (0,89 % de C). Para aceros hipereutectoides se toma como referencia $A_1$ o $A_{cm}$.",
        },
      ],
      title: "Temperaturas de cada tratamiento",
      blocks: [
        {
          kind: "text",
          text: "Elige el tratamiento y mueve el carbono: la banda de temperatura sigue a las líneas críticas del diagrama Fe-C.",
        },
      ],
      visual: { kind: "tool", tool: "temperaturas-tratamiento", params: { a: 0.4 } },
    },
    {
      id: "check-normalizado",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Línea A₃", message: "Con $0{,}4\\,\\%$ de C: $A_3 = 910 - \\dfrac{187}{0{,}89}\\cdot 0{,}4 \\approx 826$ °C. Se calienta entre $55$ y $85$ °C por encima." }],
      title: "Temperatura mínima de normalizado",
      question: "Un acero con el $0{,}4\\,\\%$ de C se va a normalizar. Con $A_3 \\approx 826$ °C, ¿cuál es la temperatura mínima de calentamiento (en °C, redondeada a la unidad)?",
      correctAnswers: ["881"],
      explanation: "El normalizado se hace a $A_3 + 55$ °C como mínimo: $826 + 55 = 881$ °C (hasta $911$ °C).",
    },
    {
      id: "check-temple-hipo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Dónde se austeniza", message: "En los aceros hipoeutectoides se calienta unos $50$ °C por encima de la línea $A_3$." }],
      title: "Temperatura de temple",
      question: "Para templar un acero con el $0{,}4\\,\\%$ de C ($A_3 \\approx 826$ °C), ¿a qué temperatura se debe austenizar? (en °C, a la unidad)",
      correctAnswers: ["876"],
      explanation: "Temple continuo de austenización completa: $A_3 + 50 = 876$ °C. En un acero hipereutectoide se calienta $50$ °C por encima de $A_1$ y queda cementita sin disolver.",
    },
    {
      id: "check-recocido-uso",
      type: "predict",
      help: [{ label: "Acritud", message: "El recocido quita los efectos de la deformación en frío." }],
      title: "Cuándo se aplica el recocido",
      question: "Los tratamientos de recocido se utilizan después de:",
      mode: "choice",
      choices: [
        { id: "frio", label: "Una deformación en frío para eliminar la acritud adquirida por el material" },
        { id: "temple", label: "Un temple para eliminar las tensiones porque el exterior enfría más rápido que el interior", incorrectFeedback: "Después del temple se aplica el revenido." },
        { id: "caliente", label: "Una deformación en caliente para conseguir una pieza templada", incorrectFeedback: "El recocido ablanda; no sirve para templar." },
      ],
      correctChoiceId: "frio",
      shuffleChoices: true,
      explanation: "El recocido se usa para eliminar los defectos del conformado en frío: ablanda y ductiliza un metal «agrio».",
    },
  ],
};
