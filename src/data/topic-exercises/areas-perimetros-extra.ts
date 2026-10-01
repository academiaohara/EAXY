import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8013-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Consolidación, problemas y autoevaluación de la unidad 13. */
export const areasPerimetrosTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(16),
    title: "Actividad 6 — figuras compuestas (p. 147)",
    statement:
      "Halla el área y el perímetro de: a) rectángulo $24\\,\\mathrm{m} \\times 5\\,\\mathrm{m}$; b) trapecio con bases $13\\,\\mathrm{m}$ y $25\\,\\mathrm{m}$ y altura $11\\,\\mathrm{m}$.",
    solutionText:
      "a) $A = 120\\,\\mathrm{m}^2$, $P = 58\\,\\mathrm{m}$.\nb) $A = \\dfrac{(13 + 25) \\cdot 11}{2} = 209\\,\\mathrm{m}^2$; el perímetro depende de los lados oblicuos del dibujo.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Cálculo mental — rectángulo y cuadrado (p. 146)",
    statement:
      "a) Rectángulo $4\\,\\mathrm{cm} \\times 2{,}5\\,\\mathrm{cm}$: área. b) Cuadrado de $81\\,\\mathrm{cm}^2$: lado.",
    solutionText: "a) $A = 10\\,\\mathrm{cm}^2$. b) $l = 9\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Cálculo mental — trapecio (p. 147)",
    statement: "Bases $13\\,\\mathrm{cm}$ y $7\\,\\mathrm{cm}$, altura $10\\,\\mathrm{cm}$. ¿Cuál es el área?",
    solutionText: "$A = \\dfrac{(13 + 7) \\cdot 10}{2} = 100\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Consolidación — rectángulo (ej. 8, p. 151)",
    statement: "Altura de un rectángulo de $40\\,\\mathrm{m}^2$ y base $5\\,\\mathrm{m}$.",
    solutionText: "$h = 8\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Consolidación — trapecio (ej. 9, p. 151)",
    statement:
      "Halla el área de un trapecio con bases $12\\,\\mathrm{cm}$ y $20\\,\\mathrm{cm}$ y altura $10\\,\\mathrm{cm}$.",
    solutionText: "$A = \\dfrac{(12 + 20) \\cdot 10}{2} = 160\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Consolidación — trapecio isósceles (ej. 10, p. 151)",
    statement:
      "Trapecio isósceles: bases $26\\,\\mathrm{cm}$ y $14\\,\\mathrm{cm}$, altura $8\\,\\mathrm{cm}$, lados oblicuos $10\\,\\mathrm{cm}$. Perímetro y área.",
    solutionText:
      "$A = \\dfrac{(26 + 14) \\cdot 8}{2} = 160\\,\\mathrm{cm}^2$.\n$P = 26 + 14 + 10 + 10 = 60\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Consolidación — triángulo rectángulo (ej. 11, p. 151)",
    statement:
      "Triángulo rectángulo con lados $15\\,\\mathrm{dm}$, $8\\,\\mathrm{dm}$ y $17\\,\\mathrm{dm}$. Área y altura sobre la hipotenusa.",
    solutionText:
      "$A = \\dfrac{15 \\cdot 8}{2} = 60\\,\\mathrm{dm}^2$.\n$60 = \\dfrac{17 \\cdot a}{2} \\Rightarrow a = \\dfrac{120}{17} \\approx 7{,}06\\,\\mathrm{dm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Consolidación — hexágono (ej. 12, p. 151)",
    statement:
      "Hexágono regular de $6\\,\\mathrm{mm}$ de lado y $5{,}2\\,\\mathrm{mm}$ de apotema. Área y perímetro.",
    solutionText:
      "$P = 36\\,\\mathrm{mm}$.\n$A = \\dfrac{36 \\cdot 5{,}2}{2} = 93{,}6\\,\\mathrm{mm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Polígono irregular — cálculo mental (p. 149)",
    statement:
      "Cuadrilátero irregular con lados $12\\,\\mathrm{m}$, $13\\,\\mathrm{m}$, $5\\,\\mathrm{m}$, $3\\,\\mathrm{m}$ y $4\\,\\mathrm{m}$ (descompuesto en rectángulo $12\\,\\mathrm{m} \\times 4\\,\\mathrm{m}$ y triángulo de base $5\\,\\mathrm{m}$ y altura $3\\,\\mathrm{m}$). Halla área y perímetro.",
    solutionText:
      "$A = 48 + \\dfrac{5 \\cdot 3}{2} = 55{,}5\\,\\mathrm{m}^2$.\n$P = 12 + 13 + 5 + 3 + 4 = 37\\,\\mathrm{m}$ (según el esquema del temario).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Autoevaluación 1a — triángulo (p. 152)",
    statement:
      "Calcula el área y el perímetro de un triángulo con lados $5\\,\\mathrm{cm}$, $7\\,\\mathrm{cm}$ y $12{,}5\\,\\mathrm{cm}$ y altura $10\\,\\mathrm{cm}$ sobre el lado de $12{,}5\\,\\mathrm{cm}$.",
    solutionText:
      "$A = \\dfrac{12{,}5 \\cdot 10}{2} = 62{,}5\\,\\mathrm{cm}^2$.\n$P = 5 + 7 + 12{,}5 = 24{,}5\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Autoevaluación 1e — triángulo (p. 152)",
    statement: "Triángulo con lados $5\\,\\mathrm{cm}$, $6\\,\\mathrm{cm}$ y $4\\,\\mathrm{cm}$. Halla el perímetro.",
    solutionText: "$P = 15\\,\\mathrm{cm}$. (El área requiere la altura correspondiente a una base.)",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Autoevaluación 2 — campo (p. 152)",
    statement:
      "Campo con forma de trapecio: lados paralelos $60\\,\\mathrm{m}$ y $65\\,\\mathrm{m}$, distancia entre ellos $420\\,\\mathrm{m}$, y otros lados $425\\,\\mathrm{m}$ y $25\\,\\mathrm{m}$. Halla el área (como trapecio).",
    solutionText:
      "$A = \\dfrac{(60 + 65) \\cdot 420}{2} = \\dfrac{125 \\cdot 420}{2} = 26\\,250\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Autoevaluación 3 — jardín circular (p. 152)",
    statement:
      "Jardín circular de $16\\,\\mathrm{m}$ de diámetro ($r = 8\\,\\mathrm{m}$). ¿Cuál es el área total con $\\pi \\approx 3{,}14$?",
    solutionText: "$A = \\pi r^2 = 3{,}14 \\cdot 64 = 200{,}96\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
