import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const logaritmosPropiedadesCcss1Lesson: InteractiveLesson = {
  slug: "logaritmos-propiedades-ccss1",
  title: "15. Propiedades de los logaritmos",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        { label: "Demostración", message: "Sea $A = \\log_a x$ y $B = \\log_a y$, es decir, $x = a^A$ e $y = a^B$. Entonces $xy = a^{A+B}$ y por definición $\\log_a(xy) = A + B$." },
      ],
      title: "Producto y cociente",
      blocks: [
        { kind: "rule", title: "Las propiedades vienen de las potencias", text: "Multiplicar potencias de la misma base **suma exponentes**; dividirlas, los **resta**.", formula: "\\log_a(x\\,y) = \\log_a x + \\log_a y \\qquad \\log_a\\dfrac{x}{y} = \\log_a x - \\log_a y" },
      ],
      visual: { kind: "anim", scene: "logaritmo-producto", params: { a: 2, b: 3, c: 2 } },
    },
    {
      id: "potencia-raiz",
      type: "slide",
      help: [{ label: "Raíz", message: "Una raíz es una potencia de exponente fraccionario: $\\sqrt[n]{x} = x^{1/n}$, así que $\\log_a \\sqrt[n]{x} = \\frac{1}{n}\\log_a x$." }],
      title: "Potencia y raíz",
      blocks: [
        { kind: "rule", title: "El exponente baja multiplicando", formula: "\\log_a x^n = n\\,\\log_a x \\qquad \\log_a \\sqrt[n]{x} = \\dfrac{1}{n}\\,\\log_a x" },
        { kind: "example", lines: [
          { math: "\\log_a 2^5 = 5\\log_a 2" },
          { math: "\\log_a \\sqrt[3]{27} = \\dfrac{\\log_a 27}{3}" },
        ] },
        { kind: "warning", text: "No existe una propiedad para la **suma**: $\\log(x + y) \\neq \\log x + \\log y$. Compruébalo en la herramienta de abajo." },
      ],
      visual: { kind: "tool", tool: "log-propiedades-explorador", initial: [10, 8, 5, 3], hint: "Cambia x, y y la base: las tres igualdades se cumplen siempre. La suma, nunca." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Un producto: $5 \\cdot 20 = 100$." }],
      title: "Suma de logaritmos",
      question: "Calcula $\\log 5 + \\log 20$. (solo el número)",
      correctAnswers: ["2"],
      explanation: "$\\log 5 + \\log 20 = \\log(5\\cdot 20) = \\log 100 = 2$.",
    },
    {
      id: "cambio-base",
      type: "slide",
      help: [{ label: "Demostración", message: "Si $y = \\log_a x$ entonces $x = a^y$. Tomando $\\log_b$ en ambos lados: $\\log_b x = y\\log_b a$, de donde $y = \\frac{\\log_b x}{\\log_b a}$." }],
      title: "Cambio de base",
      blocks: [
        { kind: "rule", title: "Para calcular en cualquier base con la calculadora", formula: "\\log_a x = \\dfrac{\\log_b x}{\\log_b a}" },
        { kind: "text", text: "La calculadora solo tiene $\\log$ y $\\ln$. Para otra base se usa esta fórmula." },
        { kind: "example", lines: [
          { math: "\\log_2 13 = \\dfrac{\\ln 13}{\\ln 2} = \\dfrac{2{,}5649}{0{,}6931} \\approx 3{,}7004" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-cambio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$3^1 = 3$ y $3^2 = 9$: el logaritmo de $5$ queda entre $1$ y $2$." }],
      title: "log₃ 5",
      question: "¿Cuánto vale aproximadamente $\\log_3 5$?",
      choices: [
        { id: "a", label: "$1{,}465$" },
        { id: "b", label: "$0{,}683$", incorrectFeedback: "Es el cociente invertido ($\\log 3 / \\log 5$). Va primero el logaritmo del número." },
        { id: "c", label: "$2$", incorrectFeedback: "$3^2 = 9$, mucho mayor que $5$." },
        { id: "d", label: "$1{,}667$", incorrectFeedback: "Es $\\frac{5}{3}$: has dividido los números en vez de sus logaritmos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\log_3 5 = \\dfrac{\\ln 5}{\\ln 3} = \\dfrac{1{,}6094}{1{,}0986} \\approx 1{,}465$.",
    },
    {
      id: "desarrollar",
      type: "slide",
      help: [{ label: "Dos direcciones", message: "Desarrollar es pasar de un logaritmo a varios sumados y restados; agrupar es el camino de vuelta." }],
      title: "Desarrollar y agrupar",
      blocks: [
        { kind: "example", title: "Desarrollar", lines: [
          { math: "\\log_5\\dfrac{a^3 b^2}{c^4} = 3\\log_5 a + 2\\log_5 b - 4\\log_5 c" },
        ] },
        { kind: "example", title: "Agrupar en un solo logaritmo", lines: [
          { math: "2\\log x - \\log y + \\dfrac{1}{2}\\log z = \\log\\dfrac{x^2\\sqrt{z}}{y}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-desarrollo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La raíz cuadrada es exponente $\\frac{1}{2}$ y está en el denominador." }],
      title: "Desarrolla",
      question: "Desarrolla $\\log\\dfrac{x^2}{\\sqrt{y}}$.",
      choices: [
        { id: "a", label: "$2\\log x - \\tfrac{1}{2}\\log y$" },
        { id: "b", label: "$2\\log x + \\tfrac{1}{2}\\log y$", incorrectFeedback: "$\\sqrt{y}$ está dividiendo, así que su término se **resta**." },
        { id: "c", label: "$\\log x^2 - \\log y^2$", incorrectFeedback: "Una raíz cuadrada no es $y^2$ sino $y^{1/2}$." },
        { id: "d", label: "$\\dfrac{2\\log x}{\\log\\sqrt{y}}$", incorrectFeedback: "El logaritmo de un cociente es una **resta**, no un cociente de logaritmos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\log x^2 - \\log y^{1/2} = 2\\log x - \\tfrac{1}{2}\\log y$.",
    },
    {
      id: "aplicaciones",
      type: "slide",
      help: [
        { label: "Escala de Richter", message: "La amplitud de la onda se multiplica por 10 por cada unidad de magnitud; la energía liberada, por unos 31,6, porque $\\log E = 11{,}8 + 1{,}5\\,M$." },
        { label: "pH", message: "$\\text{pH} = -\\log[\\text{H}^+]$, con la concentración en mol/L. Un pH menor que 7 es ácido y mayor que 7, básico." },
      ],
      title: "Para qué sirven: escalas logarítmicas",
      blocks: [
        { kind: "compare",
          left: { title: "Terremotos (Richter)", text: "Por cada punto más, la amplitud ×10 y la energía ≈ ×31,6.", math: ["\\log E = 11{,}8 + 1{,}5\\,M"], tone: "ok" },
          right: { title: "Acidez (pH)", text: "Cada unidad menos de pH es 10 veces más iones H⁺.", math: ["\\text{pH} = -\\log[\\text{H}^+]"], tone: "ok" } },
        { kind: "text", text: "También permiten calcular números enormes: $26^{378}$ da error en la calculadora, pero $\\log 26^{378} = 378\\log 26 \\approx 534{,}86$, luego $26^{378} \\approx 7{,}24\\cdot 10^{534}$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-ph",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$[\\text{H}^+] = 10^{-\\text{pH}}$. Compara $10^{-3}$ con $10^{-5}$." }],
      title: "Comparar pH",
      question: "¿Cuántas veces mayor es la concentración de iones H⁺ en una disolución de pH $3$ que en una de pH $5$? (solo el número)",
      correctAnswers: ["100"],
      explanation: "$\\dfrac{10^{-3}}{10^{-5}} = 10^{2} = 100$. Dos unidades de pH son un factor $100$.",
    },
    {
      id: "check-cifras",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\log 26 \\approx 1{,}41497$. Si $\\log N = 534{,}86$, $N$ tiene $535$ cifras (la parte entera más una)." }],
      title: "Cuántas cifras tiene 26³⁷⁸",
      question: "Sabiendo que $\\log 26 \\approx 1{,}414973$, ¿cuántas cifras tiene el número $26^{378}$? (solo el número)",
      correctAnswers: ["535"],
      explanation: "$\\log 26^{378} = 378 \\cdot 1{,}414973 \\approx 534{,}86$. Un número con $\\log N = 534{,}86$ se escribe $10^{0{,}86}\\cdot 10^{534}$, es decir, $7{,}24\\cdot 10^{534}$, que tiene $535$ cifras.",
    },
  ],
};
