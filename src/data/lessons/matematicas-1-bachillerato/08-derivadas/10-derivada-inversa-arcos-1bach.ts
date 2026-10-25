import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const derivadaInversaArcos1bachLesson: InteractiveLesson = {
  slug: "derivada-inversa-arcos-1bach",
  title: "10. Derivada de la función inversa y de los arcos",
  subtitle: TEMA_1BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [{ label: "Por qué se invierte", message: "Las gráficas de $f$ y $f^{-1}$ son simétricas respecto de $y = x$: una tangente con pendiente $m$ pasa a otra con pendiente $\\frac{1}{m}$." }],
      title: "La derivada de la inversa",
      blocks: [
        { kind: "rule", title: "Fórmula", formula: "(f^{-1})'(b) = \\dfrac{1}{f'\\big(f^{-1}(b)\\big)}" },
        { kind: "text", text: "Se necesita que $f$ sea derivable e inyectiva y que $f'$ no se anule en el punto." },
      ],
      visual: { kind: "tool", tool: "derivada-inversa-explorador", initial: [0, 20], hint: "Con f(x) = eˣ, la inversa es ln x: (ln)′(2) = 1/f′(ln 2) = 1/2. Las dos tangentes son simétricas respecto de la diagonal." },
    },
    {
      id: "check-ln",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f(x) = e^x$, $f'(x) = e^x$, $f^{-1}(2) = \\ln 2$ y $e^{\\ln 2} = 2$." }],
      title: "Derivada del logaritmo",
      question: "Con $f(x) = e^x$, calcula $(f^{-1})'(2) = (\\ln)'(2)$. (decimal)",
      correctAnswers: ["0,5", "0.5", "1/2"],
      explanation: "$(f^{-1})'(2) = \\dfrac{1}{f'(\\ln 2)} = \\dfrac{1}{e^{\\ln 2}} = \\dfrac{1}{2}$. Es la derivada de $\\ln x$, que vale $\\frac{1}{x}$.",
    },
    {
      id: "check-cbrt",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f(x) = x^3$, $f^{-1}(8) = 2$ y $f'(2) = 12$." }],
      title: "Derivada de la raíz cúbica",
      question: "Con $f(x) = x^3$, calcula $(f^{-1})'(8) = (\\sqrt[3]{x})'(8)$. (fracción)",
      correctAnswers: ["1/12", "0,0833", "0.0833", "0,083", "0.083"],
      explanation: "$f^{-1}(8) = 2$ y $f'(2) = 3\\cdot 4 = 12$, así que $(f^{-1})'(8) = \\dfrac{1}{12}$.",
    },
    {
      id: "arcos",
      type: "slide",
      help: [{ label: "Dominios", message: "Se definen en intervalos donde la función es inyectiva: el seno en $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$, el coseno en $(0, \\pi)$ y la tangente en $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$." }],
      title: "Arco seno, arco coseno y arco tangente",
      blocks: [
        { kind: "facts", items: [
          { tex: "(\\arcsin x)' = \\dfrac{1}{\\sqrt{1 - x^2}}", label: "arco seno" },
          { tex: "(\\arccos x)' = -\\dfrac{1}{\\sqrt{1 - x^2}}", label: "arco coseno" },
          { tex: "(\\arctan x)' = \\dfrac{1}{1 + x^2}", label: "arco tangente" },
        ] },
        { kind: "example", title: "Demostración de (arcsen x)′", lines: [
          { math: "(\\arcsin)'(x) = \\dfrac{1}{\\cos(\\arcsin x)} = \\dfrac{1}{\\sqrt{1 - \\sin^2(\\arcsin x)}} = \\dfrac{1}{\\sqrt{1 - x^2}}" },
        ] },
      ],
      visual: { kind: "tool", tool: "derivada-inversa-explorador", initial: [4, 5], hint: "Con sen x en (−π/2, π/2), la inversa es arcsen: en b = 0,5 vale 1/√(1 − 0,25) ≈ 1,155." },
    },
    {
      id: "check-arctg",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(\\arctan x)' = \\dfrac{1}{1 + x^2}$." }],
      title: "Arco tangente en 1",
      question: "Calcula la derivada de $y = \\arctan x$ en $x = 1$. (decimal)",
      correctAnswers: ["0,5", "0.5", "1/2"],
      explanation: "$\\dfrac{1}{1 + 1^2} = \\dfrac{1}{2} = 0{,}5$.",
    },
    {
      id: "check-cadena-arco",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Con la cadena: $(\\arcsin u)' = \\dfrac{u'}{\\sqrt{1 - u^2}}$ y $u = x^2$." }],
      title: "Arco seno de x²",
      question: "La derivada de $y = \\arcsin(x^2)$ es…",
      choices: [
        { id: "a", label: "$\\dfrac{2x}{\\sqrt{1 - x^4}}$" },
        { id: "b", label: "$\\dfrac{1}{\\sqrt{1 - x^4}}$", incorrectFeedback: "Falta multiplicar por la derivada de $x^2$, que es $2x$." },
        { id: "c", label: "$\\dfrac{2x}{\\sqrt{1 - x^2}}$", incorrectFeedback: "Bajo la raíz va $1 - u^2 = 1 - (x^2)^2 = 1 - x^4$." },
        { id: "d", label: "$\\dfrac{2x}{1 + x^4}$", incorrectFeedback: "Esa es la forma del arco **tangente**; el arco seno lleva una raíz." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(\\arcsin u)' = \\dfrac{u'}{\\sqrt{1 - u^2}}$ con $u = x^2$: $\\dfrac{2x}{\\sqrt{1 - x^4}}$.",
    },
  ],
};
