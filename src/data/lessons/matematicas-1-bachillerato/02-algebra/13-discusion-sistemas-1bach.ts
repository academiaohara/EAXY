import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const discusionSistemas1bachLesson: InteractiveLesson = {
  slug: "discusion-sistemas-1bach",
  title: "13. Discusión de sistemas",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "criterio",
      type: "slide",
      help: [{ label: "Discutir", message: "Discutir un sistema es explicar razonadamente cuántas soluciones tiene (y, si depende de parámetros, para qué valores de ellos)." }],
      title: "La última ecuación lo decide",
      blocks: [
        { kind: "text", text: "Tras escalonar con Gauss, la **última ecuación** tiene la forma $a\\,z = b$ (o $0 = b$) y decide el tipo de sistema:" },
        { kind: "facts", items: [
          { tex: "a \\neq 0", label: "compatible determinado: solución única" },
          { tex: "0z = 0", label: "compatible indeterminado: infinitas" },
          { tex: "0z = b \\neq 0", label: "incompatible: ninguna" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 2, 1, 3, 2, 1, 3, 1, 3, 3, 4, 5] } },
    },
    {
      id: "indeterminado",
      type: "slide",
      help: [{ label: "Geometría", message: "En el indeterminado de tres ecuaciones, los tres planos comparten una **recta** (o son el mismo plano, si sobran dos ecuaciones)." }],
      title: "Compatible indeterminado: un parámetro",
      blocks: [
        { kind: "text", text: "En $x + 2y + 3z = 4$, $x + 3y - z = -2$, $2x + 5y + 2z = 2$ la 3.ª ecuación es la suma de las otras dos. Tras Gauss queda $0 = 0$ y se toma $z = k$ como parámetro." },
        { kind: "example", lines: [
          { math: "y - 4z = -6 \\Rightarrow y = -6 + 4k" },
          { math: "x = 4 - 2y - 3z = 16 - 11k" },
          { math: "(x, y, z) = (16 - 11k,\\ -6 + 4k,\\ k),\\quad k \\in \\mathbb{R}" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 2, 3, 4, 1, 3, -1, -2, 2, 5, 2, 2] } },
    },
    {
      id: "check-tipo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$0z = 5$ es imposible: ningún valor de $z$ lo cumple." }],
      title: "Clasificar",
      question: "Al escalonar un sistema de tres ecuaciones con tres incógnitas la última ecuación resulta $0 = 5$. El sistema es…",
      choices: [
        { id: "a", label: "incompatible" },
        { id: "b", label: "compatible determinado", incorrectFeedback: "Eso exigiría una última ecuación del tipo $a z = b$ con $a \\neq 0$." },
        { id: "c", label: "compatible indeterminado", incorrectFeedback: "Eso ocurriría con $0 = 0$, que siempre se cumple. $0 = 5$ nunca." },
        { id: "d", label: "No se puede saber", incorrectFeedback: "La última ecuación $0 = 5$ es un absurdo: el sistema no tiene solución." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$0 = 5$ es una contradicción: **incompatible**. Geométricamente, los tres planos no tienen ningún punto común.",
    },
    {
      id: "check-parametro",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $k = 1$ en $x = 16 - 11k$." }],
      title: "Una solución particular",
      question: "El sistema del ejemplo tiene soluciones $(16 - 11k,\\ -6 + 4k,\\ k)$. Para $k = 1$, ¿cuánto vale $x$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$x = 16 - 11\\cdot 1 = 5$. La solución es $(5, -2, 1)$: comprueba en la 1.ª ecuación $5 - 4 + 3 = 4$ ✓.",
    },
    {
      id: "parametro",
      type: "slide",
      help: [{ label: "Valor crítico", message: "Con parámetros, el sistema cambia de tipo justo en los valores que anulan el coeficiente de la última ecuación (aquí $m = 5$)." }],
      title: "Sistemas con parámetros",
      blocks: [
        { kind: "text", text: "Prueba el sistema $x + y + z = 1$, $x + 2y + 3z = 2$, $x + 3y + mz = k$. Al escalonar, la última ecuación es $(m - 5)\\,z = k - 3$." },
        { kind: "facts", items: [
          { tex: "m \\neq 5", label: "compatible determinado" },
          { tex: "m = 5,\\ k = 3", label: "compatible indeterminado" },
          { tex: "m = 5,\\ k \\neq 3", label: "incompatible" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-parametro-explorador", initial: [2, 3], hint: "Pon m = 5 y mueve k: solo con k = 3 hay infinitas soluciones; con cualquier otro k, ninguna." },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Recuerda: tres planos en un punto, tres planos en una recta (o iguales), o sin punto común." }],
      title: "Interpretación geométrica",
      question: "Relaciona cada situación geométrica de los tres planos con el tipo de sistema.",
      groups: [
        { id: "cd", label: "Compatible determinado", tone: "emerald" },
        { id: "ci", label: "Compatible indeterminado", tone: "amber" },
        { id: "inc", label: "Incompatible", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Los tres planos se cortan en un único punto", group: "cd" },
        { id: "b", text: "Los tres planos comparten una recta", group: "ci" },
        { id: "c", text: "Dos planos paralelos y el tercero los corta", group: "inc" },
        { id: "d", text: "Última ecuación $2z = 8$", group: "cd" },
        { id: "e", text: "Última ecuación $0z = 0$", group: "ci" },
        { id: "f", text: "Última ecuación $0z = 3$", group: "inc" },
      ],
      hint: "Dos planos paralelos nunca se cortan, así que no puede haber un punto común a los tres.",
    },
  ],
};
