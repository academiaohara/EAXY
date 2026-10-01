import type { CurriculumTopicExercise } from "@/content/types";
import { operacionesFraccionesTopicExercisesExtra } from "@/data/topic-exercises/operaciones-fracciones-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8008-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejemplos resueltos y actividades clave del tema «Operaciones con fracciones» (1.º ESO, unidad 8). */
const operacionesFraccionesTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Reducir a común denominador (ej. resuelto, p. 90)",
    statement:
      "Reduce a común denominador $\\frac{1}{4}$ y $\\frac{1}{6}$, tomando $12$ como denominador común.",
    solutionText:
      "$12 : 4 = 3$ → $\\frac{1}{4} = \\frac{3}{12}$.\n$12 : 6 = 2$ → $\\frac{1}{6} = \\frac{2}{12}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "MCM de tres denominadores (ejemplo, p. 90)",
    statement: "Reduce $\\frac{5}{8}$, $\\frac{3}{4}$ y $\\frac{7}{12}$ usando m.c.m.$(8, 4, 12) = 24$.",
    solutionText: "$\\frac{5}{8} = \\frac{15}{24}$, $\\frac{3}{4} = \\frac{18}{24}$, $\\frac{7}{12} = \\frac{14}{24}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Suma con distinto denominador (ej. resuelto, p. 91)",
    statement: "Calcula $\\frac{1}{4} + \\frac{3}{5} - \\frac{1}{10}$.",
    solutionText:
      "m.c.m.$(4, 5, 10) = 20$.\n$\\frac{5}{20} + \\frac{12}{20} - \\frac{2}{20} = \\frac{15}{20} = \\frac{3}{4}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Enteros y fracciones (ej. resuelto, p. 91)",
    statement: "Calcula $2 - \\frac{7}{3} + \\frac{5}{6}$.",
    solutionText:
      "$2 = \\frac{2}{1}$; m.c.m.$(1, 3, 6) = 6$.\n$\\frac{12}{6} - \\frac{14}{6} + \\frac{5}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Manuel — cine y hamburguesa (problema 1, p. 94)",
    statement:
      "Manuel gasta la mitad de su dinero en el cine y un tercio en una hamburguesa. ¿Qué fracción ha gastado? ¿Qué fracción le queda?",
    solutionText:
      "Gastado: $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$.\nQueda: $1 - \\frac{5}{6} = \\frac{1}{6}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Marta — concierto y revista (problema 2, p. 94)",
    statement:
      "Marta gasta la mitad en un concierto y un tercio de lo que le quedaba en una revista. ¿Qué fracción ha gastado? ¿Qué le queda?",
    solutionText:
      "Revista: $\\frac{1}{3} \\cdot \\frac{1}{2} = \\frac{1}{6}$.\nGastado total: $\\frac{1}{2} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}$.\nQueda: $\\frac{1}{3}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Fracción de otra fracción (Ten en cuenta, p. 94)",
    statement: "Calcula $\\frac{3}{4}$ de $\\frac{2}{5}$.",
    solutionText: "$\\frac{3}{4} \\cdot \\frac{2}{5} = \\frac{6}{20} = \\frac{3}{10}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Operación con paréntesis (ej. resuelto, p. 95)",
    statement: "Calcula $\\left(\\frac{2}{5} + \\frac{1}{3}\\right) - \\left(\\frac{1}{2} - \\frac{1}{5}\\right)$.",
    solutionText:
      "Dentro de paréntesis: $\\frac{11}{15}$ y $\\frac{3}{10}$.\n$\\frac{11}{15} - \\frac{3}{10} = \\frac{22}{30} - \\frac{9}{30} = \\frac{13}{30}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Operación combinada (ej. resuelto, p. 95)",
    statement: "Calcula $\\frac{5}{11} \\cdot \\left(\\frac{3}{2} - \\frac{2}{5}\\right)$.",
    solutionText:
      "$\\frac{3}{2} - \\frac{2}{5} = \\frac{11}{10}$.\n$\\frac{5}{11} \\cdot \\frac{11}{10} = \\frac{1}{2}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Multiplicación (act. 4, p. 95)",
    statement: "Multiplica y reduce: a) $\\frac{2}{5} \\cdot \\frac{5}{6}$ b) $\\frac{8}{9} \\cdot \\frac{9}{8}$.",
    solutionText: "a) $\\frac{10}{30} = \\frac{1}{3}$ b) $\\frac{72}{72} = 1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "División (act. 5, p. 95)",
    statement: "Divide y simplifica: a) $\\frac{2}{5} : \\frac{2}{5}$ b) $\\frac{3}{4} : \\frac{1}{2}$.",
    solutionText: "a) $1$ b) $\\frac{3}{4} \\cdot \\frac{2}{1} = \\frac{6}{4} = \\frac{3}{2}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Queso de Rosa (problema 10, p. 96)",
    statement:
      "Rosa compra $\\frac{3}{4}$ kg de queso y regala $\\frac{1}{2}$ kg a su hija. ¿Cuánto se queda?",
    solutionText: "$\\frac{3}{4} - \\frac{1}{2} = \\frac{3}{4} - \\frac{2}{4} = \\frac{1}{4}$ kg.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const operacionesFraccionesTopicExercises: CurriculumTopicExercise[] = [
  ...operacionesFraccionesTopicExercisesBase,
  ...operacionesFraccionesTopicExercisesExtra,
];
