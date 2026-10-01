import type { CurriculumTopicExercise } from "@/content/types";
import { areasPerimetrosTopicExercisesExtra } from "@/data/topic-exercises/areas-perimetros-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8013-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos y actividades clave del tema «Áreas y perímetros» (1.º ESO, unidad 13). */
const areasPerimetrosTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Habitación rectangular (act. 1, p. 146)",
    statement:
      "Calcula el perímetro y el área de una habitación rectangular de dimensiones $6{,}4\\,\\mathrm{m}$ y $3{,}5\\,\\mathrm{m}$.",
    solutionText:
      "$P = 2(6{,}4 + 3{,}5) = 19{,}8\\,\\mathrm{m}$.\n$A = 6{,}4 \\cdot 3{,}5 = 22{,}4\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Lado de un cuadrado (act. 3, p. 146)",
    statement: "¿Cuánto mide el lado de un cuadrado de $225\\,\\mathrm{cm}^2$ de área?",
    solutionText: "$l = \\sqrt{225} = 15\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Altura de un rectángulo (act. 4, p. 146)",
    statement:
      "Halla la altura de un rectángulo de $47\\,\\mathrm{m}^2$ de superficie y $4\\,\\mathrm{m}$ de base.",
    solutionText: "$h = \\dfrac{47}{4} = 11{,}75\\,\\mathrm{m}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Parcela trapecio (act. 7, p. 147)",
    statement:
      "Una parcela cuadrangular tiene dos lados paralelos de $37{,}5\\,\\mathrm{m}$ y $62{,}4\\,\\mathrm{m}$. La distancia entre ellos es $45\\,\\mathrm{m}$. ¿Cuál es su superficie?",
    solutionText:
      "Trapecio: $A = \\dfrac{(37{,}5 + 62{,}4) \\cdot 45}{2} = \\dfrac{99{,}9 \\cdot 45}{2} = 2247{,}75\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Rombo por diagonales (act. 8, p. 147)",
    statement: "Las diagonales de un rombo miden $37\\,\\mathrm{cm}$ y $52\\,\\mathrm{cm}$. Halla su área.",
    solutionText: "$A = \\dfrac{37 \\cdot 52}{2} = 962\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Cuadrado y diagonal (act. 9, p. 147)",
    statement: "La diagonal de un cuadrado mide $15\\,\\mathrm{cm}$. Halla su área.",
    solutionText:
      "Si $d = 15\\,\\mathrm{cm}$, entonces $A = \\dfrac{d^2}{2} = \\dfrac{225}{2} = 112{,}5\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Cálculo mental — paralelogramo (p. 146)",
    statement:
      "Halla el área de un paralelogramo de base $10\\,\\mathrm{cm}$, altura $3{,}2\\,\\mathrm{cm}$ y otro lado $4\\,\\mathrm{cm}$. Si el área es $32\\,\\mathrm{cm}^2$, ¿cuál es la altura sobre el lado de $4\\,\\mathrm{cm}$?",
    solutionText:
      "$A = 10 \\cdot 3{,}2 = 32\\,\\mathrm{cm}^2$.\nSobre el lado de $4\\,\\mathrm{cm}$: $32 = 4 \\cdot h \\Rightarrow h = 8\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Parcela triangular (act. 1, p. 148)",
    statement:
      "Halla el área de una parcela triangular con un lado de $20\\,\\mathrm{m}$ y altura $13\\,\\mathrm{m}$ sobre ese lado.",
    solutionText: "$A = \\dfrac{20 \\cdot 13}{2} = 130\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Triángulo equilátero (act. 3, p. 148)",
    statement:
      "Halla el área de un triángulo equilátero de $40\\,\\mathrm{m}$ de lado y $34{,}64\\,\\mathrm{m}$ de altura.",
    solutionText: "$A = \\dfrac{40 \\cdot 34{,}64}{2} = 692{,}8\\,\\mathrm{m}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Triángulo rectánguno — tres lados (act. 4, p. 148)",
    statement:
      "Triángulo rectángulo con catetos $18\\,\\mathrm{cm}$ y $24\\,\\mathrm{cm}$ e hipotenusa $30\\,\\mathrm{cm}$. a) Calcula su área. b) Altura sobre la hipotenusa.",
    solutionText:
      "a) $A = \\dfrac{18 \\cdot 24}{2} = 216\\,\\mathrm{cm}^2$.\nb) $216 = \\dfrac{30 \\cdot a}{2} \\Rightarrow a = 14{,}4\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Ej. resuelto — catetos 15 y 20 cm (p. 148)",
    statement:
      "Triángulo rectángulo de lados $15\\,\\mathrm{cm}$, $20\\,\\mathrm{cm}$ y $25\\,\\mathrm{cm}$. Calcula el área y la altura sobre la hipotenusa.",
    solutionText:
      "$A = \\dfrac{15 \\cdot 20}{2} = 150\\,\\mathrm{cm}^2$.\n$150 = \\dfrac{25 \\cdot a}{2} \\Rightarrow a = 12\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Ej. resuelto — equilátero 10 cm (p. 148)",
    statement:
      "Halla el área de un triángulo equilátero de lado $10\\,\\mathrm{cm}$ y $8{,}66\\,\\mathrm{cm}$ de altura.",
    solutionText: "$A = \\dfrac{10 \\cdot 8{,}66}{2} = 43{,}3\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Octógono regular (act. 2, p. 149)",
    statement:
      "El lado de un octógono regular mide $15\\,\\mathrm{cm}$ y su apotema $18\\,\\mathrm{cm}$. Halla su área.",
    solutionText:
      "$P = 8 \\cdot 15 = 120\\,\\mathrm{cm}$.\n$A = \\dfrac{P \\cdot a}{2} = \\dfrac{120 \\cdot 18}{2} = 1080\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Hexágono regular (act. 3, p. 149)",
    statement:
      "Hexágono regular con lado $l = 4\\,\\mathrm{cm}$ y apotema $a \\approx 3{,}5\\,\\mathrm{cm}$. Calcula su área.",
    solutionText:
      "$P = 6 \\cdot 4 = 24\\,\\mathrm{cm}$.\n$A = \\dfrac{24 \\cdot 3{,}5}{2} = 42\\,\\mathrm{cm}^2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Corona circular (ej. resuelto I, p. 150)",
    statement:
      "Dos circunferencias concéntricas de radios $5\\,\\mathrm{cm}$ y $3\\,\\mathrm{cm}$ delimitan una corona. Halla su área y el perímetro del recinto (ambas circunferencias). Usa $\\pi \\approx 3{,}14$.",
    solutionText:
      "$A = \\pi(5^2 - 3^2) = 16\\pi \\approx 50{,}26\\,\\mathrm{cm}^2$.\n$P = 2\\pi(5 + 3) = 16\\pi \\approx 50{,}26\\,\\mathrm{cm}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const areasPerimetrosTopicExercises: CurriculumTopicExercise[] = [
  ...areasPerimetrosTopicExercisesBase,
  ...areasPerimetrosTopicExercisesExtra,
];
