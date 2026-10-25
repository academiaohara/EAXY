import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const funcionInversa1bachLesson: InteractiveLesson = {
  slug: "funcion-inversa-1bach",
  title: "11. La función inversa",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Inyectiva", message: "$f$ es **inyectiva** si valores distintos de $x$ tienen imágenes distintas. Se comprueba con la **recta horizontal**: debe cortar la gráfica como mucho una vez." }],
      title: "Deshacer lo que hizo f",
      blocks: [
        { kind: "definition", text: "La **función inversa** $f^{-1}$ **deshace** a $f$: si $f(a) = b$, entonces $f^{-1}(b) = a$. Solo existe si $f$ es **inyectiva**." },
        { kind: "formula", tex: "f^{-1}\\big(f(x)\\big) = x\\qquad f\\big(f^{-1}(x)\\big) = x" },
        { kind: "text", text: "La gráfica de $f^{-1}$ es la de $f$ **reflejada respecto de la recta $y = x$**: el punto $(a, b)$ pasa a $(b, a)$." },
      ],
      visual: { kind: "tool", tool: "inversa-explorador", initial: [0, 2], hint: "Mueve x₀: el punto de f y el de f⁻¹ son simétricos respecto de la diagonal." },
    },
    {
      id: "calculo",
      type: "slide",
      help: [{ label: "Dominio e imagen", message: "El dominio de $f^{-1}$ es el recorrido de $f$ y el recorrido de $f^{-1}$ es el dominio de $f$." }],
      title: "Cómo se calcula",
      blocks: [
        { kind: "steps", items: [
          "Se escribe $y = f(x)$.",
          "Se **intercambian** $x$ e $y$.",
          "Se **despeja** $y$: esa es $f^{-1}(x)$.",
        ] },
        { kind: "example", title: "f(x) = 2x + 3", lines: [
          { math: "y = 2x + 3 \\ \\to\\ x = 2y + 3 \\ \\to\\ y = \\dfrac{x - 3}{2}" },
          { math: "f^{-1}(x) = \\dfrac{x - 3}{2}\\qquad f^{-1}(7) = 2\\ \\text{(porque } f(2) = 7)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-inversa",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$y = x - 1 \\to x = y - 1 \\to y = x + 1$." }],
      title: "Inversa de f(x) = x − 1",
      question: "¿Cuál es la función inversa de $f(x) = x - 1$?",
      choices: [
        { id: "a", label: "$f^{-1}(x) = x + 1$" },
        { id: "b", label: "$f^{-1}(x) = \\dfrac{1}{x - 1}$", incorrectFeedback: "Eso es el **inverso multiplicativo**, $\\frac{1}{f(x)}$, no la función inversa." },
        { id: "c", label: "$f^{-1}(x) = 1 - x$", incorrectFeedback: "Sería la opuesta, $-f(x)$. Deshacer «restar 1» es «sumar 1»." },
        { id: "d", label: "$f^{-1}(x) = x - 1$", incorrectFeedback: "Esa es $f$ misma. La inversa deshace la operación." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$y = x - 1$; intercambiando, $x = y - 1$, y despejando $y = x + 1$.",
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Buscas el $x$ tal que $2x + 3 = 7$, o aplica $f^{-1}(x) = \\frac{x - 3}{2}$." }],
      title: "Un valor de la inversa",
      question: "Si $f(x) = 2x + 3$, ¿cuánto vale $f^{-1}(7)$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$f^{-1}(7) = \\frac{7 - 3}{2} = 2$, porque $f(2) = 7$.",
    },
    {
      id: "invertible",
      type: "slide",
      help: [{ label: "Restringir", message: "$y = x^2$ no es inyectiva, pero si se restringe a $x \\geq 0$ sí lo es y su inversa es $\\sqrt{x}$. Por eso se dice que la raíz es la inversa del cuadrado **solo para números positivos**." }],
      title: "¿Siempre existe? Funciones inyectivas",
      blocks: [
        { kind: "text", text: "$f(x) = x^2$ en todo $\\mathbb{R}$ **no** tiene inversa: $f(2) = f(-2) = 4$ y no se sabría si $f^{-1}(4)$ es $2$ o $-2$. La **recta horizontal** $y = 4$ corta la gráfica dos veces." },
        { kind: "facts", items: [
          { tex: "f(x) = x^2\\ (x \\geq 0)\\ \\leftrightarrow\\ \\sqrt{x}", label: "" },
          { tex: "e^x\\ \\leftrightarrow\\ \\ln x", label: "" },
          { tex: "x^3\\ \\leftrightarrow\\ \\sqrt[3]{x}", label: "" },
        ] },
      ],
      visual: { kind: "tool", tool: "inversa-explorador", initial: [5, 2], hint: "Con f(x) = x² en todo ℝ aparece un punto rojo: dos x distintos con la misma imagen, así que no hay inversa." },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Una función es invertible si una recta horizontal la corta, como mucho, una vez (crece siempre o decrece siempre)." }],
      title: "¿Tiene inversa?",
      question: "Clasifica cada función en todo su dominio.",
      groups: [
        { id: "si", label: "Tiene inversa", tone: "emerald" },
        { id: "no", label: "No tiene inversa", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$f(x) = 3x - 5$", group: "si" },
        { id: "b", text: "$f(x) = x^2$ en $\\mathbb{R}$", group: "no" },
        { id: "c", text: "$f(x) = e^x$", group: "si" },
        { id: "d", text: "$f(x) = x^3$", group: "si" },
        { id: "e", text: "$f(x) = |x|$ en $\\mathbb{R}$", group: "no" },
        { id: "f", text: "$f(x) = \\sin x$ en $\\mathbb{R}$", group: "no" },
      ],
      hint: "$|x|$ y $\\sin x$ repiten valores: $|{-2}| = |2|$ y $\\sin 0 = \\sin\\pi$.",
    },
  ],
};
