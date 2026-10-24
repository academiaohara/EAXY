import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const problemasSistemas1bachLesson: InteractiveLesson = {
  slug: "problemas-sistemas-1bach",
  title: "14. Problemas con sistemas lineales",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Una ecuación por dato", message: "Normalmente hay una ecuación por cada afirmación del enunciado. Con tres incógnitas necesitas tres relaciones independientes." }],
      title: "Del enunciado al sistema",
      blocks: [
        { kind: "steps", items: [
          "**Elegir las incógnitas** y decir qué representa cada una (con unidades).",
          "**Traducir** cada dato del enunciado a una ecuación.",
          "**Resolver** el sistema con Gauss.",
          "**Interpretar**: ¿la solución tiene sentido? (sin negativos ni decimales si cuentan objetos o personas) y comprobar en el enunciado.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "precios",
      type: "slide",
      help: [{ label: "Sistema", message: "Con $x$ = bolígrafo, $y$ = cuaderno, $z$ = carpeta: $x + y + z = 6$; $x + 2y = 5$; $y + z = 5$." }],
      title: "Un problema de precios",
      blocks: [
        { kind: "text", text: "Un bolígrafo, un cuaderno y una carpeta cuestan $6$ €. Un bolígrafo y dos cuadernos cuestan $5$ €. Un cuaderno y una carpeta cuestan $5$ €. ¿Cuánto cuesta cada cosa?" },
        { kind: "example", lines: [
          { math: "x + y + z = 6" },
          { math: "x + 2y = 5" },
          { math: "y + z = 5" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 1, 1, 6, 1, 2, 0, 5, 0, 1, 1, 5] } },
    },
    {
      id: "check-carpeta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Del sistema escalonado sale primero $z$. Comprueba con la 3.ª ecuación: $y + z = 5$." }],
      title: "Precio de la carpeta",
      question: "En el problema anterior, ¿cuántos euros cuesta la **carpeta**? (solo el número)",
      correctAnswers: ["3"],
      explanation: "La solución es $x = 1$, $y = 2$, $z = 3$: bolígrafo $1$ €, cuaderno $2$ €, carpeta $3$ €. Comprobación: $1 + 2 + 3 = 6$, $1 + 4 = 5$ y $2 + 3 = 5$ ✓.",
    },
    {
      id: "edades",
      type: "slide",
      help: [{ label: "Reducir", message: "Cuando una ecuación despeja una incógnita (aquí $y = 2x$ y $z = x + 4$), se puede sustituir y resolver con una sola ecuación. Gauss es lo mismo, de forma sistemática." }],
      title: "Un problema de edades",
      blocks: [
        { kind: "text", text: "La suma de las edades de Ana, Luis y Marta es $36$ años. Luis tiene el doble que Ana y Marta tiene $4$ años más que Ana. ¿Cuántos años tiene cada uno?" },
        { kind: "example", title: "x = Ana, y = Luis, z = Marta", lines: [
          { math: "x + y + z = 36" },
          { math: "y = 2x \\quad\\Rightarrow\\quad -2x + y = 0" },
          { math: "z = x + 4 \\quad\\Rightarrow\\quad -x + z = 4" },
        ] },
        { kind: "text", text: "Sustituyendo: $x + 2x + (x + 4) = 36 \\Rightarrow 4x = 32 \\Rightarrow x = 8$. Ana tiene $8$, Luis $16$ y Marta $12$." },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 1, 1, 36, -2, 1, 0, 0, -1, 0, 1, 4] } },
    },
    {
      id: "check-edad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Marta tiene $4$ años más que Ana, que tiene $8$." }],
      title: "Edad de Marta",
      question: "En el problema anterior, ¿cuántos años tiene Marta? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$z = x + 4 = 8 + 4 = 12$. Comprobación: $8 + 16 + 12 = 36$ ✓.",
    },
    {
      id: "check-plantear",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Traduce frase a frase: «el doble» multiplica por 2, «cinco más» suma 5." }],
      title: "Traducir un enunciado",
      question: "Tres números $x$, $y$, $z$ suman $30$. El segundo es el doble del primero y el tercero es $5$ más que el segundo. ¿Qué sistema los describe?",
      choices: [
        { id: "a", label: "$x + y + z = 30,\\quad y = 2x,\\quad z = y + 5$" },
        { id: "b", label: "$x + y + z = 30,\\quad x = 2y,\\quad z = y + 5$", incorrectFeedback: "«El segundo es el doble del primero» es $y = 2x$, no $x = 2y$." },
        { id: "c", label: "$x + y + z = 30,\\quad y = 2x,\\quad z = 5y$", incorrectFeedback: "«$5$ más» es una **suma**: $z = y + 5$, no una multiplicación." },
        { id: "d", label: "$x + y + z = 3,\\quad y = 2x,\\quad z = y + 5$", incorrectFeedback: "La suma de los tres es $30$, no $3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$y = 2x$ y $z = y + 5$ junto con $x + y + z = 30$. Sustituyendo: $x + 2x + 2x + 5 = 30 \\Rightarrow x = 5$, $y = 10$, $z = 15$.",
    },
  ],
};
