import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasHomogeneos2bachLesson: InteractiveLesson = {
  slug: "sistemas-homogeneos-2bach",
  title: "10. Sistemas homogéneos",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "propiedad",
      type: "slide",
      help: [{ label: "Rango", message: "La columna añadida en $A^*$ es toda de ceros: no puede aumentar el rango, así que $\\operatorname{rg}(A) = \\operatorname{rg}(A^*)$ siempre." }],
      title: "Siempre tienen solución",
      blocks: [
        { kind: "definition", text: "Un sistema es **homogéneo** si todos sus términos independientes son $0$: $A\\cdot X = O$." },
        { kind: "rule", title: "Solución trivial", text: "Siempre es compatible, porque $x_1 = x_2 = \\dots = x_n = 0$ es solución. La cuestión es si **hay más soluciones**:", formula: "\\begin{cases} \\operatorname{rg}(A) = n & \\Rightarrow \\text{solo la trivial} \\\\ \\operatorname{rg}(A) < n & \\Rightarrow \\text{infinitas soluciones} \\end{cases}" },
        { kind: "text", text: "Con matriz cuadrada, las soluciones no triviales existen **si y solo si $|A| = 0$**." },
      ],
    },
    {
      id: "check-tipos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Un homogéneo nunca es incompatible; mira $|A|$." }],
      title: "Homogéneo con |A| ≠ 0",
      question: "Un sistema homogéneo de $3$ ecuaciones con $3$ incógnitas tiene $|A| = -10$. ¿Cuántas soluciones tiene?",
      choices: [
        { id: "a", label: "Una sola: la trivial $(0, 0, 0)$" },
        { id: "b", label: "Ninguna", incorrectFeedback: "Los homogéneos siempre tienen la solución trivial." },
        { id: "c", label: "Infinitas", incorrectFeedback: "Con $|A| \\neq 0$ el rango es $3 = n$: solución única." },
        { id: "d", label: "Depende de los coeficientes", incorrectFeedback: "Con $|A| \\neq 0$ ya está decidido: solución única." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$|A| \\neq 0$ implica $\\operatorname{rg}(A) = 3 = n$: compatible determinado, y la única solución es la trivial.",
    },
    {
      id: "no-trivial",
      type: "slide",
      help: [{ label: "Resolver", message: "Se escalona y se deja una incógnita libre (parámetro): las demás se expresan en función de ella." }],
      title: "Buscar las soluciones no triviales",
      blocks: [
        { kind: "example", title: "$x - y = 0$, $\\ y - z = 0$, $\\ x - z = 0$", lines: [
          { math: "|A| = 0,\\quad \\operatorname{rg}(A) = 2 < 3", note: "la 3.ª ecuación es la suma de las otras dos" },
          { math: "z = \\lambda \\Rightarrow y = \\lambda,\\ x = \\lambda", note: "soluciones: $(\\lambda, \\lambda, \\lambda)$, una recta por el origen" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, -1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 0, 1], hint: "Está marcado «Homogéneo». Cambia coeficientes: si |A| ≠ 0 la única solución es (0, 0, 0); si el rango baja, aparecen parámetros." },
    },
    {
      id: "check-lambda",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La solución es $(\\lambda, \\lambda, \\lambda)$ y $z = 5$ significa $\\lambda = 5$." }],
      title: "Una solución concreta",
      question: "Con el sistema anterior, ¿cuánto vale $x$ si $z = 5$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "Las soluciones son $(\\lambda, \\lambda, \\lambda)$: si $z = 5$, entonces $x = y = 5$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Si la matriz $A$ es cuadrada: $|A| \\neq 0$ ⟹ solo la trivial; $|A| = 0$ ⟹ infinitas." }],
      title: "¿Solo la solución trivial?",
      question: "Clasifica cada sistema homogéneo $A\\,X = O$ según su matriz $A$.",
      groups: [
        { id: "triv", label: "Solo la solución trivial", tone: "emerald" },
        { id: "inf", label: "Infinitas soluciones", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$", group: "triv" },
        { id: "b", text: "$A = \\begin{pmatrix} 2 & 4 \\\\ 1 & 2 \\end{pmatrix}$", group: "inf" },
        { id: "c", text: "$A = \\begin{pmatrix} 1 & 1 & 3 \\\\ 2 & 3 & 1 \\\\ 3 & 2 & 4 \\end{pmatrix}$", group: "triv" },
        { id: "d", text: "$A = \\begin{pmatrix} 1 & -1 & 0 \\\\ 0 & 1 & -1 \\\\ 1 & 0 & -1 \\end{pmatrix}$", group: "inf" },
        { id: "e", text: "$A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 2 & 2 \\\\ 3 & 3 & 3 \\end{pmatrix}$", group: "inf" },
      ],
      hint: "Calcula $|A|$: (a) $-2$, (b) $0$, (c) $-10$, (d) $0$, (e) $0$.",
    },
    {
      id: "parametro",
      type: "slide",
      help: [{ label: "Valores", message: "Se busca $a$ con $|A| = 0$: son los únicos valores con soluciones no triviales." }],
      title: "Con parámetro: ¿cuándo hay soluciones no triviales?",
      blocks: [
        { kind: "text", text: "En el sistema $a\\,x + y + z = 0$, $\\ x + a\\,y + z = 0$, $\\ x + y + a\\,z = 0$ el determinante es $(a - 1)^2(a + 2)$. Hay soluciones **distintas de la trivial** solo para $a = 1$ y $a = -2$." },
      ],
      visual: { kind: "tool", tool: "sistema-familia-explorador", initial: [2, -2], hint: "Con a = −2 aparecen soluciones no triviales (una recta); con a = 1, un plano. En el resto, solo (0, 0, 0)." },
    },
    {
      id: "check-parametro",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = 1$ las tres ecuaciones son $x + y + z = 0$: una ecuación, $3$ incógnitas." }],
      title: "El caso a = 1",
      question: "En el homogéneo con parámetro, para $a = 1$, ¿de cuántos parámetros depende la solución? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Con $a = 1$ todas las ecuaciones son $x + y + z = 0$: $\\operatorname{rg} = 1$ y $3 - 1 = 2$ parámetros (un plano por el origen).",
    },
  ],
};
