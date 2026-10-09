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
      layout: "stack",
    },
    {
      id: "sistemas-historia",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia",
      title: "Tres maneras de contar",
      layout: "stack",
    },
    {
      id: "decimal-intro",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "decimal-intro",
      title: "El sistema decimal",
      layout: "stack",
    },
    {
      id: "contar-diez",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "contar-diez",
      title: "Contar unidades hasta diez",
      layout: "stack",
    },
  ],
};
