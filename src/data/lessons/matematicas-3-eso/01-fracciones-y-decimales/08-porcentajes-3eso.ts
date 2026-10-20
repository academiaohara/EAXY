import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const porcentajes3esoLesson: InteractiveLesson = {
  slug: "porcentajes-3eso",
  title: "8. Porcentajes",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Por cada cien",
          message: "El $20\\,\\%$ significa $20$ de cada $100$. En un grupo de $50$ serían $10$.",
        },
        {
          label: "Es una fracción",
          message: "Un porcentaje es una fracción con denominador $100$: $x\\,\\% = \\frac{x}{100}$.",
        },
      ],
      title: "Un porcentaje es una fracción de denominador 100",
      blocks: [
        {
          kind: "definition",
          text: "Un **porcentaje** (o tanto por ciento) indica cuántas partes de cada **100** se toman: $x\\,\\% = \\dfrac{x}{100}$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "20\\,\\% = \\dfrac{20}{100} = 0{,}20", label: "forma decimal" },
            { tex: "5\\,\\% = 0{,}05", label: "dos cifras" },
            { tex: "160\\,\\% = 1{,}6", label: "puede superar 1" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "porcentaje-cuadricula", params: { a: 20 }, hint: "Mueve el porcentaje y observa cuántas casillas de 100 se pintan." },
    },
    {
      id: "calcular-parte",
      type: "slide",
      help: [
        {
          label: "Con el decimal",
          message: "Multiplicar por $0{,}16$ es lo mismo que multiplicar por $16$ y dividir entre $100$.",
        },
        {
          label: "Estimación",
          message: "El $10\\,\\%$ es la décima parte; el $50\\,\\%$, la mitad; el $25\\,\\%$, la cuarta parte.",
        },
      ],
      title: "Calcular el tanto por ciento de una cantidad",
      blocks: [
        {
          kind: "rule",
          text: "Se expresa el porcentaje en **forma decimal** y se multiplica por la cantidad.",
          formula: "x\\,\\%\\ \\text{de}\\ C = C \\cdot \\dfrac{x}{100}",
        },
        {
          kind: "example",
          title: "El 16 % de 5 000",
          lines: [
            { math: "5\\,000 \\cdot 0{,}16 = 800" },
            { math: "\\text{El } 230\\,\\%\\ \\text{de } 5\\,200 = 5\\,200 \\cdot 2{,}3 = 11\\,960" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "porcentaje-mental", params: { a: 200 } },
    },
    {
      id: "hallar-porcentaje",
      type: "slide",
      help: [
        {
          label: "Una fracción primero",
          message: "$800$ de $5\\,000$ es la fracción $\\frac{800}{5\\,000} = 0{,}16$. Pásala a porcentaje multiplicando por $100$.",
        },
        {
          label: "Con regla de tres",
          message: "Si $5\\,000$ es el $100\\,\\%$, ¿qué porcentaje es $800$? $x = 800 \\cdot 100 : 5\\,000$.",
        },
      ],
      title: "Qué tanto por ciento representa una cantidad",
      blocks: [
        {
          kind: "rule",
          text: "Para saber qué porcentaje representa $a$ respecto de un total $C$:",
          formula: "\\text{porcentaje} = \\dfrac{a}{C} \\cdot 100",
        },
        {
          kind: "example",
          title: "800 lectores de El Quijote entre 5 000 personas",
          lines: [
            { math: "\\dfrac{800}{5\\,000} \\cdot 100 = 16\\,\\%" },
          ],
        },
        {
          kind: "warning",
          text: "El total siempre va en el **denominador**: $4\\,230$ respecto de $9\\,000$ es $47\\,\\%$, no $9\\,000$ respecto de $4\\,230$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-parte",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Forma decimal",
          message: "El $60\\,\\%$ es $0{,}60$.",
        },
      ],
      title: "Habitaciones ocupadas",
      question: "En un hotel de $175$ habitaciones están ocupadas el $60\\,\\%$. ¿Cuántas habitaciones están ocupadas? (solo el número)",
      correctAnswers: ["105"],
      explanation: "$175 \\cdot 0{,}60 = 105$ habitaciones.",
    },
    {
      id: "check-porcentaje",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divide y multiplica",
          message: "$\\frac{495}{750} = 0{,}66$. Multiplica por $100$.",
        },
      ],
      title: "Alumnos aprobados",
      question: "En un colegio de $750$ alumnos han aprobado todas las materias $495$. ¿Qué porcentaje es? (solo el número)",
      correctAnswers: ["66"],
      explanation: "$\\frac{495}{750} \\cdot 100 = 66\\,\\%$.",
    },
    {
      id: "check-total",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Una parte",
          message: "Si $124$ socios son el $25\\,\\%$, el $100\\,\\%$ es cuatro veces más.",
        },
      ],
      title: "Socios del club",
      question: "En un club hay $124$ socios que juegan al baloncesto, y son el $25\\,\\%$ del total. ¿Cuántos socios tiene el club? (solo el número)",
      correctAnswers: ["496"],
      explanation: "$124 : 0{,}25 = 496$ socios.",
    },
    {
      id: "check-comision",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Decimal del porcentaje",
          message: "$1{,}5\\,\\% = \\frac{1{,}5}{100} = 0{,}015$.",
        },
      ],
      title: "Comisión inmobiliaria",
      question: "Un agente cobra una comisión del $1{,}5\\,\\%$ sobre un apartamento vendido por $100\\,500$ €. ¿Cuánto cobra? (solo el número, en euros)",
      correctAnswers: ["1507,5", "1507.5", "1507,50"],
      explanation: "$100\\,500 \\cdot 0{,}015 = 1\\,507{,}5$ €.",
    },
  ],
};
