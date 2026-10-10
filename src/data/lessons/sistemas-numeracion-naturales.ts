import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen y sistemas de numeración",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "origen-contar",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "origen-contar",
      title: "¿De dónde salen los números?",
      definitionBox:
        "Los números naturales surgen por la necesidad de **contar cosas**: llevamos la cuenta con símbolos que representan cantidades.",
      layout: "stack",
    },
    {
      id: "sistemas-historia",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia",
      title: "Tres maneras de contar",
      definitionBox:
        "En sistemas **aditivos** cada signo vale una cantidad fija y **se suman**. En el **decimal**, la **posición** de cada cifra cambia su valor.",
      layout: "stack",
    },
    {
      id: "decimal-intro",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "decimal-intro",
      title: "El sistema decimal",
      definitionBox:
        "Usamos **base 10** con diez dígitos. Es **posicional**: el **0** marca órdenes vacíos y cada salto a la izquierda multiplica por diez.",
      layout: "stack",
    },
    {
      id: "contar-diez",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "contar-diez",
      title: "Contar unidades hasta diez",
      definitionBox:
        "Contar es ir sumando **unidades**. **Diez** unidades forman **una decena** — el primer salto de la numeración posicional.",
      layout: "stack",
    },
  ],
};
