import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const potenciasBaseExponenteLesson: InteractiveLesson = {
  slug: "potencias-base-exponente",
  title: "1. Potencias",
  subtitle: TEMA_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia-definicion",
      type: "narrate",
      help: [
        {
          label: "Dos piezas",
          message: "La base es el número que se repite; el exponente cuenta cuántas veces.",
        },
        {
          label: "Desarrolla una",
          message: "$6^4$ significa $6 \\cdot 6 \\cdot 6 \\cdot 6$: cuatro factores, todos $6$.",
        },
      ],
      title: "Base y exponente",
      definitionBox:
        'Una <mark>potencia</mark> es una forma abreviada de multiplicar un número por sí mismo. El factor que se repite es la <mark>base</mark> y el número de factores iguales, el <mark class="suma">exponente</mark>.',
      module: "potencias",
      scene: "base-exponente",
      potencias: { scene: "base-exponente", base: 6, exponent: 4 },
    },
    {
      id: "potencia-lectura",
      type: "slide",
      help: [
        {
          label: "Potencia no es producto",
          message: "$2^5$ repite el $2$ cinco veces. $2 \\cdot 5$ suma el $2$ cinco veces. Dan resultados muy distintos.",
        },
        {
          label: "Cómo se lee",
          message: "Al cuadrado, al cubo, a la cuarta, a la quinta… El exponente es el nombre de «cuántas veces».",
        },
        {
          label: "Pruébalo con una pequeña",
          message: "$3^2 = 3 \\cdot 3 = 9$. Compara con $3 \\cdot 2 = 6$.",
        },
      ],
      title: "Cómo se lee una potencia (y qué no es)",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "6^2", label: "al cuadrado" },
            { tex: "6^3", label: "al cubo" },
            { tex: "6^4", label: "a la cuarta" },
            { tex: "6^5", label: "a la quinta" },
          ],
        },
        {
          kind: "compare",
          left: {
            title: "Potencia",
            text: "Repite la **base** tantas veces como indique el exponente.",
            math: ["2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32"],
            tone: "ok",
          },
          right: {
            title: "Producto",
            text: "Multiplica dos números distintos.",
            math: ["2 \\cdot 5 = 10"],
            tone: "info",
          },
        },
        {
          kind: "warning",
          title: "Error típico",
          text: "$2^5$ **no** es $2 \\cdot 5$. El exponente dice **cuántos factores** hay, no por cuánto se multiplica la base.",
        },
      ],
    },
    {
      id: "cuadrado-cubo",
      type: "narrate",
      help: [
        {
          label: "¿Por qué «cuadrado» y «cubo»?",
          message: "Porque $a^2$ es el área de un cuadrado de lado $a$ y $a^3$, el volumen de un cubo de arista $a$.",
        },
        {
          label: "Con un lado de $3$",
          message: "Un cuadrado de $3$ por $3$ tiene $9$ cuadraditos. Un cubo de $3 \\times 3 \\times 3$ tiene $27$ cubitos.",
        },
      ],
      title: "Cuadrado y cubo",
      definitionBox:
        "El **cuadrado** es exponente $2$ (área de un cuadrado). El **cubo** es exponente $3$ (volumen de un cubo).",
      module: "potencias",
      scene: "cuadrado-cubo",
      potencias: { scene: "cuadrado-cubo", base: 6 },
    },
    {
      id: "calcular-potencia",
      type: "narrate",
      help: [
        {
          label: "Ve por partes",
          message: "Multiplica de dos en dos y guarda el resultado parcial: $8 \\cdot 8 = 64$, luego $64 \\cdot 8$…",
        },
        {
          label: "Los resultados crecen deprisa",
          message: "Con exponentes pequeños los números ya son grandes: por eso conviene ir ordenado.",
        },
      ],
      title: "Calcular una potencia",
      definitionBox:
        "Salvo casos sencillos, las potencias dan números grandes; conviene ir agrupando multiplicaciones paso a paso.",
      module: "potencias",
      scene: "calcular-potencia",
      potencias: { scene: "calcular-potencia", base: 8, exponent: 5 },
    },
    {
      id: "calculadora-potencia",
      type: "narrate",
      help: [
        {
          label: "¿Cómo introduzco una potencia?",
          message: "Escribe la base, pulsa la tecla de potencia ($x^y$), escribe el exponente y pulsa igual.",
        },
        {
          label: "Comprueba el resultado",
          message: "Calcula la misma potencia a mano con exponente pequeño (por ejemplo $8^2 = 64$) y verifica que la calculadora coincide.",
        },
      ],
      title: "Potencias en la calculadora",
      definitionBox:
        'En la calculadora científica usa la tecla de <mark>potencia</mark> ($x^y$): base, exponente y $=$.',
      module: "potencias",
      scene: "calculadora",
      potencias: { scene: "calculadora", base: 8, exponent: 5 },
    },
    {
      id: "check-potencia",
      type: "predict",
      help: [
        {
          label: "¿Qué hace el exponente?",
          message: "Dice cuántas veces se multiplica la base por sí misma, no por cuánto se multiplica.",
          branches: [
            {
              label: "¿Qué cuenta da $10$?",
              message: "Prueba $2 \\cdot 5$ y $2 + 5$: la que da $10$ es lo que hizo el compañero.",
            },
          ],
        },
        {
          label: "Calcúlalo tú",
          message: "Escribe $2^5$ como un producto de cinco factores iguales y ve multiplicando paso a paso.",
        },
      ],
      title: "Detecta el error",
      question:
        "Un compañero dice que $2^5 = 10$. ¿Qué error ha cometido?",
      mode: "choice",
      choices: [
        {
          id: "producto",
          label: "Ha multiplicado la base por el exponente ($2 \\cdot 5$)",
        },
        {
          id: "suma",
          label: "Ha sumado la base y el exponente ($2 + 5$)",
          incorrectFeedback: "$2 + 5 = 7$, no $10$. Mira de dónde sale el $10$.",
        },
        {
          id: "invertido",
          label: "Ha intercambiado base y exponente ($5^2$)",
          incorrectFeedback: "$5^2 = 25$, no $10$.",
        },
      ],
      correctChoiceId: "producto",
      explanation:
        "$2 \\cdot 5 = 10$ es un producto. La potencia repite el $2$ cinco veces: $2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$.",
    },
    {
      id: "check-cubo",
      type: "predict",
      help: [
        {
          label: "¿Qué es un cm³?",
          message: "Un cubito de $1$ cm de arista. El volumen es cuántos cubitos caben.",
        },
        {
          label: "Cuenta por capas",
          message: "El fondo de la caja es un cuadrado de $4 \\times 4$. ¿Cuántas capas iguales hay hasta llegar a $4$ cm de altura?",
        },
        {
          label: "¿Por qué no $4 \\cdot 3$?",
          message: "Elevar al cubo es multiplicar la base **tres veces** por sí misma, no multiplicarla por $3$.",
        },
      ],
      title: "Un cubo de verdad",
      question:
        "Una caja cúbica mide $4$ cm de arista. ¿Cuántos cubitos de $1$ cm³ caben dentro?",
      mode: "choice",
      choices: [
        { id: "64", label: "$64$" },
        {
          id: "12",
          label: "$12$",
          incorrectFeedback: "$12 = 4 \\cdot 3$ multiplica base por exponente. El cubo es $4^3$.",
        },
        {
          id: "81",
          label: "$81$",
          incorrectFeedback: "$81 = 3^4$: has intercambiado base y exponente.",
        },
      ],
      correctChoiceId: "64",
      explanation:
        "El volumen es $4^3 = 4 \\cdot 4 \\cdot 4 = 64$: una capa de $4 \\cdot 4 = 16$ cubitos, y son $4$ capas.",
    },
  ],
};
