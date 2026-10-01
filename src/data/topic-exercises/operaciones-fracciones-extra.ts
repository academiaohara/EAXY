import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8008-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Consolidación, problemas y autoevaluación — unidad 8 Operaciones con fracciones. */
export const operacionesFraccionesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(13),
    title: "Reduce a común denominador (act. 3, p. 90)",
    statement:
      "a) $\\frac{1}{2}$ y $\\frac{3}{5}$ b) $\\frac{5}{6}$ y $\\frac{4}{9}$ c) $\\frac{3}{4}$, $\\frac{2}{3}$ y $\\frac{5}{6}$.",
    solutionText:
      "a) m.c.m.$= 10$ → $\\frac{5}{10}$, $\\frac{6}{10}$.\nb) m.c.m.$= 18$ → $\\frac{15}{18}$, $\\frac{8}{18}$.\nc) m.c.m.$= 12$ → $\\frac{9}{12}$, $\\frac{8}{12}$, $\\frac{10}{12}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Suma y resta (act. 2, p. 92)",
    statement:
      "Opera: a) $\\frac{1}{2} + \\frac{1}{5}$ b) $\\frac{5}{6} - \\frac{3}{4}$ c) $\\frac{1}{2} - \\frac{2}{5}$.",
    solutionText:
      "a) $\\frac{7}{10}$ b) $\\frac{10}{12} - \\frac{9}{12} = \\frac{1}{12}$ c) $\\frac{5}{10} - \\frac{4}{10} = \\frac{1}{10}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Con enteros (act. 3, p. 92)",
    statement: "a) $1 + \\frac{1}{5}$ b) $2 - \\frac{5}{3}$.",
    solutionText: "a) $\\frac{6}{5}$ b) $\\frac{6}{3} - \\frac{5}{3} = \\frac{1}{3}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Nuria y el dinero (act. 7, p. 92)",
    statement:
      "Nuria gasta $\\frac{3}{4}$ del dinero en un libro y $\\frac{1}{5}$ en un refresco. ¿Qué parte ha gastado? ¿Qué parte le queda?",
    solutionText:
      "Gastado: $\\frac{3}{4} + \\frac{1}{5} = \\frac{19}{20}$.\nQueda: $1 - \\frac{19}{20} = \\frac{1}{20}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Multiplicación (act. 2, p. 93)",
    statement: "Multiplica: a) $\\frac{2}{5} \\cdot \\frac{3}{4}$ b) $\\frac{5}{7} \\cdot \\frac{7}{5}$.",
    solutionText: "a) $\\frac{6}{20} = \\frac{3}{10}$ b) $1$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Luis y los pasos (act. 4, p. 93)",
    statement: "Luis avanza $\\frac{3}{4}$ m con cada paso. ¿Cuántos metros avanza con $1000$ pasos?",
    solutionText: "$1000 \\cdot \\frac{3}{4} = \\frac{3000}{4} = 750$ m.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "División (act. 7, p. 93)",
    statement: "Divide: a) $\\frac{1}{2} : \\frac{1}{5}$ b) $\\frac{2}{7} : \\frac{3}{4}$.",
    solutionText: "a) $\\frac{5}{2}$ b) $\\frac{8}{21}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Clavo y martillo (act. 8, p. 93)",
    statement:
      "Un clavo penetra $\\frac{3}{4}$ cm con cada martillazo. ¿Cuántos golpes hacen falta para $6$ cm?",
    solutionText: "$6 : \\frac{3}{4} = 6 \\cdot \\frac{4}{3} = 8$ golpes.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Andrea e Iván (act. 1-4, p. 94)",
    statement:
      "Andrea gasta $\\frac{2}{3}$ en vestido y $\\frac{1}{5}$ en pañuelo; le quedan $20\\,€$. Iván gasta $\\frac{2}{3}$ en camisa y $\\frac{1}{5}$ de lo que quedaba en corbata; le quedan $20\\,€$. ¿Cuánto tenía cada uno al principio?",
    solutionText:
      "Andrea: queda $1 - \\frac{2}{3} - \\frac{1}{5} = \\frac{2}{15}$ → total $150\\,€$.\nIván: corbata $\\frac{1}{5} \\cdot \\frac{1}{3} = \\frac{1}{15}$; queda $\\frac{4}{15}$ → total $75\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Canicas de colores (act. 9, p. 95)",
    statement:
      "En una bolsa, $\\frac{1}{4}$ son rojas, $\\frac{1}{3}$ verdes y el resto blancas. ¿Qué fracción son blancas?",
    solutionText: "$1 - \\left(\\frac{1}{4} + \\frac{1}{3}\\right) = 1 - \\frac{7}{12} = \\frac{5}{12}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Tarta de cumpleaños (problema 11, p. 96)",
    statement:
      "Se consume la mitad de una tarta y se aparta $\\frac{1}{4}$ para los abuelos. ¿Qué parte queda para mañana?",
    solutionText:
      "Consumido y apartado: $\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$.\nQueda: $\\frac{1}{4}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Aldea — servicios (problema 12, p. 96)",
    statement:
      "La mitad vive de la agricultura; un tercio, de la ganadería; el resto, de servicios. ¿Qué fracción vive de servicios?",
    solutionText: "$1 - \\left(\\frac{1}{2} + \\frac{1}{3}\\right) = \\frac{1}{6}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Peregrino (problema 13, p. 96)",
    statement:
      "Un peregrino recorre $\\frac{1}{6}$, $\\frac{1}{3}$ y $\\frac{2}{9}$ del camino en tres semanas. ¿Qué fracción queda?",
    solutionText:
      "Recorrido: $\\frac{3}{18} + \\frac{6}{18} + \\frac{4}{18} = \\frac{13}{18}$.\nQueda: $\\frac{5}{18}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Marta — camiseta y mercado (problema 16, p. 96)",
    statement:
      "Marta gasta la mitad en una camiseta, un tercio en el mercado y le quedan $10\\,€$. ¿Cuánto llevaba?",
    solutionText:
      "Gastado: $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$; queda $\\frac{1}{6}$.\n$\\frac{1}{6}$ del total $= 10$ → total $60\\,€$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Listón de madera (problema 17, p. 96)",
    statement:
      "De un listón se corta $\\frac{1}{3}$; después, la mitad de lo que queda. El trozo final mide $40$ cm. ¿Longitud inicial?",
    solutionText:
      "Tras primer corte queda $\\frac{2}{3}$; se corta la mitad → queda $\\frac{1}{3}$ del listón.\n$\\frac{1}{3}$ del listón $= 40$ cm → listón $= 120$ cm.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Autoevaluación — orden y operaciones (p. 96)",
    statement:
      "a) Reduce a común denominador: $\\frac{3}{4}$, $\\frac{5}{6}$, $\\frac{7}{12}$.\nb) Ordena de menor a mayor.\nc) Calcula $\\frac{3}{4} - \\frac{7}{12}$ y $\\frac{2}{5} \\cdot \\frac{3}{4}$.",
    solutionText:
      "a) Denominador $12$: $\\frac{9}{12}$, $\\frac{10}{12}$, $\\frac{7}{12}$.\nb) $\\frac{7}{12} < \\frac{3}{4} < \\frac{5}{6}$.\nc) $\\frac{2}{12} = \\frac{1}{6}$; $\\frac{6}{20} = \\frac{3}{10}$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
