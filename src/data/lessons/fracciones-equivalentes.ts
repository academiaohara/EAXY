import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesEquivalentesLesson: InteractiveLesson = {
  slug: "fracciones-equivalentes",
  title: "4. Fracciones equivalentes",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "mismo-valor",
      type: "concept",
      title: "Misma porción, distinta escritura",
      content: [
        "Dos fracciones son **equivalentes** si representan la **misma porción** de la unidad (mismo valor numérico).",
        "Por ejemplo $\\frac{1}{4}$ y $\\frac{3}{12}$ valen lo mismo: $1 : 4 = 0{,}25$ y $3 : 12 = 0{,}25$.",
      ],
    },
    {
      id: "propiedad",
      type: "concept",
      title: "Propiedad fundamental",
      content: [
        "Si **multiplicas o divides** numerador y denominador por el **mismo número** (distinto de cero), obtienes una fracción equivalente.",
        "$$\\frac{3}{4} = \\frac{3 \\cdot 5}{4 \\cdot 5} = \\frac{15}{20}$$",
        "$$\\frac{12}{18} = \\frac{12 : 6}{18 : 6} = \\frac{2}{3}$$",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Cadena de equivalencias",
          items: [
            { title: "Amplificar", math: "\\frac{1}{2} = \\frac{6}{12}", tone: "cobalt" },
            { title: "Simplificar", math: "\\frac{3}{6} = \\frac{1}{2}", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "simplificar",
      type: "concept",
      title: "Simplificación",
      content: [
        "**Simplificar** es buscar una fracción equivalente con términos más pequeños, dividiendo por divisores comunes.",
        "Ejemplo: $\\frac{12}{30} = \\frac{6}{15} = \\frac{2}{5}$.",
        "Si no puedes simplificar más, la fracción es **irreducible** (como $\\frac{2}{5}$).",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Simplificar $\\frac{12}{30}$",
          rows: ["12 : 2", "30 : 2", "→ 6 : 3", "15 : 3"],
          operator: "",
          result: "\\frac{2}{5}",
          caption: "También puedes dividir directamente entre $6$.",
        },
      ],
    },
    {
      id: "anim-biblio",
      type: "animated_solution",
      title: "Ejemplo — fracción de libros prestados",
      content: [
        "De $1575$ libros, $630$ están prestados. ¿Qué fracción está prestada? (simplifica).",
      ],
      frames: [
        { caption: "Fracción:", math: "\\frac{630}{1575}" },
        { caption: "Simplificando:", math: "\\frac{630}{1575} = \\frac{210}{525} = \\frac{70}{175} = \\frac{14}{35} = \\frac{2}{5}" },
      ],
    },
    {
      id: "check-equiv",
      type: "multiple_choice",
      title: "¿Equivalentes?",
      question: "¿Son equivalentes $\\frac{3}{5}$ y $\\frac{6}{10}$?",
      options: [
        { id: "a", text: "Sí, porque $3 \\cdot 10 = 5 \\cdot 6$" },
        { id: "b", text: "No, tienen distinto denominador" },
        { id: "c", text: "Solo si simplificas $6/10$" },
      ],
      correctOptionId: "a",
      explanation: "$\\frac{6}{10} = \\frac{3}{5}$; ambas valen $0{,}6$.",
    },
    {
      id: "check-simpl",
      type: "fill_in_blank",
      title: "Simplifica",
      question: "La fracción irreducible equivalente a $\\frac{15}{20}$ es $\\frac{?}{?}$. Escribe solo el numerador.",
      correctAnswers: ["3"],
      hint: "Divide numerador y denominador entre $5$.",
      explanation: "$\\frac{15}{20} = \\frac{3}{4}$.",
    },
  ],
};
