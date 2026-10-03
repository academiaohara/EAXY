import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen y sistemas de numeración",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "origen-contar",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "origen-contar",
      title: "¿De dónde salen los números?",
      content: [
        "Antes de hablar de sumas o de redondeos, conviene recordar para qué inventamos los números.",
      ],
    },
    {
      id: "sistemas-historia",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia",
      title: "Tres maneras de contar",
      layout: "stack",
      content: [
        "En la diapositiva del tema aparecen el **hombre primitivo**, los **egipcios** y los **romanos**.",
        "Los dos primeros son **aditivos**: se van sumando signos. El decimal que usamos hoy es **posicional**: importa el lugar de cada cifra.",
      ],
    },
    {
      id: "decimal-cifras",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "decimal-cifras",
      title: "Nuestro sistema: el decimal",
      layout: "stack",
      content: [
        "Solo necesitamos diez símbolos. El cero indica «no hay unidades en este orden» y nos permite escribir números como $305$.",
      ],
    },
    {
      id: "contar-diez",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "contar-diez",
      title: "Contar hasta diez",
      layout: "visual-first",
      content: [
        "Contar es ir añadiendo **unidades**. Cuando juntas diez, pasas al siguiente orden (decenas).",
      ],
    },
    {
      id: "tabla-35318",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "tabla-posicional",
      title: "La misma cifra, distinto valor",
      layout: "stack",
      content: [
        "En $35\\,318$ hay dos cifras $3$, pero no valen lo mismo: una está en las **decenas de millar** y otra en las **centenas**.",
        "Entre columnas vecinas, cada paso multiplica por $10$.",
      ],
    },
    {
      id: "check-posicional",
      type: "classify",
      title: "Posicional o aditivo",
      question:
        "¿Cada frase describe el sistema decimal (posicional) o un sistema aditivo como el egipcio o el romano?",
      groups: [
        { id: "posicional", label: "Posicional (decimal)", tone: "emerald" },
        { id: "aditivo", label: "Aditivo (egipcio, romano)", tone: "amber" },
      ],
      items: [
        {
          id: "a",
          text: "El valor de una cifra depende de la columna en la que está",
          group: "posicional",
        },
        {
          id: "b",
          text: "En $35\\,318$, el $3$ de la izquierda vale $30\\,000$ y el otro $3$ vale $300$",
          group: "posicional",
        },
        {
          id: "c",
          text: "Diez unidades de un orden forman una del orden superior",
          group: "posicional",
        },
        {
          id: "d",
          text: "Se repiten símbolos y se suman sus valores",
          group: "aditivo",
        },
        {
          id: "e",
          text: "$\\text{XXX} = 10 + 10 + 10 = 30$",
          group: "aditivo",
        },
        {
          id: "f",
          text: "Se van añadiendo marcas o letras hasta completar la cantidad",
          group: "aditivo",
        },
      ],
      hint: "Piensa si importa **dónde** está el signo o solo **cuántos** hay.",
      explanation:
        "En el decimal, la posición fija el valor; en los aditivos, cada símbolo aporta su cantidad y se suma.",
    },
    {
      id: "check-ordenes",
      type: "fill_in_blank",
      title: "Órdenes y equivalencias",
      question: "¿Cuántas decenas hay en $3$ unidades de millar? Escribe solo el número.",
      correctAnswers: ["300", "300 decenas"],
      hint: "Tres unidades de millar son $3000$ unidades. ¿Cuántos grupos de $10$ caben?",
      explanation: "$3000 \\div 10 = 300$ decenas.",
    },
  ],
};
