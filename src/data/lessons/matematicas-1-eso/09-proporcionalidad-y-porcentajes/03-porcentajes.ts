import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const porcentajesLesson: InteractiveLesson = {
  slug: "porcentajes",
  title: "3. Porcentajes",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  steps: [
    {
      id: "concepto",
      type: "concept",
      title: "Tanto por ciento",
      content: [
        "El símbolo **%** se lee «por ciento»: $20\\%$ = veinte por ciento.",
        "Calcular un tanto por ciento de una cantidad equivale a partir el total en **cien partes** iguales y tomar tantas como indica el número.",
        "**Fórmula:** $a\\% \\text{ de } N = (N : 100) \\cdot a$",
        "También: $a\\% \\text{ de } N = \\frac{a}{100}$ de $N$.",
      ],
    },
    {
      id: "aparcamiento",
      type: "animated_solution",
      title: "Ejemplo — coches rojos en un aparcamiento",
      content: [
        "Hay $300$ coches. El $20\\%$ son rojos. ¿Cuántos coches rojos hay?",
      ],
      frames: [
        {
          caption: "Paquetes de 100:",
          math: "300 : 100 = 3",
        },
        {
          caption: "Veinte de cada paquete:",
          math: "3 \\cdot 20 = 60 \\text{ coches rojos}",
        },
      ],
    },
    {
      id: "fraccion",
      type: "concept",
      title: "Un porcentaje es una fracción",
      content: [
        "$a\\%$ equivale a la fracción $\\frac{a}{100}$.",
        "Ejemplo: $15\\%$ de $80 = \\frac{15}{100}$ de $80 = (80 : 100) \\cdot 15 = 12$.",
        "En la calculadora puedes usar la tecla **%** (por ejemplo $240 \\times 15\\%$).",
      ],
    },
    {
      id: "especiales",
      type: "concept",
      title: "Porcentajes especiales",
      content: [
        "$50\\% = \\frac{1}{2}$ → divide entre $2$.",
        "$25\\% = \\frac{1}{4}$ → divide entre $4$.",
        "$20\\% = \\frac{1}{5}$ → divide entre $5$.",
        "$10\\% = \\frac{1}{10}$ → divide entre $10$.",
        "A partir del $10\\%$ puedes obtener el $5\\%$ (mitad) o el $30\\%$ (triple del $10\\%$), etc.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Atajos mentales",
          items: [
            { title: "50%", math: "N : 2", tone: "cobalt" },
            { title: "25%", math: "N : 4", tone: "emerald" },
            { title: "10%", math: "N : 10", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "ej-resuelto",
      type: "animated_solution",
      title: "Ejercicio resuelto — tienda de balones",
      content: [
        "Una tienda vende el $45\\%$ de los $800$ balones de su almacén. ¿Cuántos ha vendido?",
      ],
      frames: [
        {
          caption: "Cálculo:",
          math: "45\\% \\text{ de } 800 = (800 : 100) \\cdot 45 = 8 \\cdot 45 = 360",
        },
        {
          caption: "Respuesta:",
          math: "360 \\text{ balones vendidos}",
        },
      ],
    },
    {
      id: "check-formula",
      type: "fill_in_blank",
      title: "Practica la fórmula",
      question: "Calcula el $12\\%$ de $380$ (usa coma decimal si hace falta).",
      correctAnswers: ["45,6", "45.6"],
      explanation: "$(380 : 100) \\cdot 12 = 3{,}8 \\cdot 12 = 45{,}6$.",
    },
    {
      id: "check-cuadricula",
      type: "fraction_pick",
      title: "El 25 % en una cuadrícula",
      question: "La cuadrícula tiene $20$ casillas. Colorea el $25\\%$ de ella.",
      shape: "grid",
      numerator: 25,
      denominator: 100,
      parts: 20,
      columns: 5,
      itemLabel: "casilla",
      hint: "$25\\% = \\frac{25}{100}$. ¿Qué fracción sencilla es? Aplícala a las $20$ casillas.",
      explanation: "$25\\% = \\frac{25}{100} = \\frac{1}{4}$, la cuarta parte: $20 : 4 = 5$ casillas.",
    },
    {
      id: "check-mental",
      type: "fill_in_blank",
      title: "Cálculo mental — 25%",
      question: "¿Cuánto es el $25\\%$ de $84$? (solo el número)",
      correctAnswers: ["21"],
      hint: "Como en la cuadrícula, el $25\\%$ es la cuarta parte.",
      explanation: "El $25\\%$ es la cuarta parte: $84 : 4 = 21$.",
    },
  ],
};
