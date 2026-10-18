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
      help: [
        {
          label: "Cien partes",
          message: "Un tanto por ciento es partir el total en cien partes iguales y tomar tantas como dice el número.",
        },
        {
          label: "Con una cantidad fácil",
          message: "El $20\\%$ de $100$ son $20$. El $20\\%$ de $300$ son tres veces eso: $60$.",
        },
        {
          label: "Dos formas de la fórmula",
          message: "Dividir entre $100$ y multiplicar por $a$ es lo mismo que multiplicar por $\\frac{a}{100}$.",
        },
      ],
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
      help: [
        {
          label: "Paquetes de $100$",
          message: "Con $300$ coches hay tres paquetes de $100$. En cada uno, $20$ son rojos.",
        },
        {
          label: "Comprueba con el atajo",
          message: "El $20\\%$ es una quinta parte: $300 : 5$ da el mismo resultado.",
        },
      ],
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
      help: [
        {
          label: "Porcentaje y fracción son lo mismo",
          message: "$15\\%$ y $\\frac{15}{100}$ son dos formas de escribir el mismo número. La fracción se puede simplificar.",
        },
        {
          label: "¿Y la calculadora?",
          message: "La tecla $\\%$ hace por ti la división entre $100$.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué estos son especiales?",
          message: "Porque son fracciones sencillas: $50\\%$ es la mitad, $25\\%$ un cuarto, $20\\%$ un quinto, $10\\%$ un décimo.",
        },
        {
          label: "Combínalos",
          message: "El $30\\%$ es tres veces el $10\\%$. El $5\\%$ es la mitad del $10\\%$. Con estos atajos calculas casi cualquier porcentaje de cabeza.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué empiezo dividiendo entre $100$?",
          message: "Para saber cuánto vale el $1\\%$. Después multiplicas por $45$ para tomar $45$ de esas partes.",
        },
        {
          label: "Una estimación",
          message: "El $45\\%$ es un poco menos de la mitad. La mitad de $800$ es $400$, así que el resultado debe quedar algo por debajo.",
        },
      ],
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
      help: [
        {
          label: "¿Qué es un $12\\%$?",
          message: "Doce de cada cien. Calcula cuánto es el $1\\%$ de $380$ y toma doce de esos trozos.",
        },
        {
          label: "Descomposición mental",
          message: "El $10\\%$ de un número se obtiene moviendo la coma un lugar. Luego añade el $1\\%$ dos veces.",
          math: ["12\\% = 10\\% + 1\\% + 1\\%"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El $12\\%$ es algo más que el $10\\%$, y el $10\\%$ de $380$ se calcula en un segundo. Tu resultado debe pasar un poco de esa cifra.",
        },
      ],
      title: "Practica la fórmula",
      question: "Calcula el $12\\%$ de $380$ (usa coma decimal si hace falta).",
      correctAnswers: ["45,6", "45.6"],
      explanation: "$(380 : 100) \\cdot 12 = 3{,}8 \\cdot 12 = 45{,}6$.",
    },
    {
      id: "check-cuadricula",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué fracción es el $25\\%$?",
          message: "Veinticinco de cada cien. Simplifica esa fracción: ¿qué parte del total es?",
        },
        {
          label: "Con porcentajes que ya conoces",
          message: "El $50\\%$ es la mitad. El $25\\%$ es la mitad de la mitad.",
        },
      ],
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
      help: [
        {
          label: "¿Cómo lo hago de cabeza?",
          message: "El $25\\%$ es la mitad de la mitad. Parte el número por la mitad y luego otra vez por la mitad.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Un cuarto de $84$ es bastante menos que $84$, y algo más de $20$.",
        },
      ],
      title: "Cálculo mental — 25%",
      question: "¿Cuánto es el $25\\%$ de $84$? (solo el número)",
      correctAnswers: ["21"],
      hint: "Como en la cuadrícula, el $25\\%$ es la cuarta parte.",
      explanation: "El $25\\%$ es la cuarta parte: $84 : 4 = 21$.",
    },
  ],
};
