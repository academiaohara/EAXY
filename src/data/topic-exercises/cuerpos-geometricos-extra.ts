import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8012-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades adicionales de la unidad 12 (poliedros, prismas, pirámides y cuerpos redondos). */
export const cuerposGeometricosTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(15),
    title: "Tetraedro — Euler (act. 8, p. 388)",
    statement: "En un tetraedro: $C = 4$, $V = 4$, $A = 6$. Comprueba la fórmula de Euler.",
    solutionText: "$4 + 4 = 8$ y $6 + 2 = 8$. Se cumple $C + V = A + 2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Dodecaedro — datos (act. 8, p. 388)",
    statement: "Un dodecaedro regular tiene $12$ caras pentagonales. ¿Cuántos vértices y aristas tiene?",
    solutionText: "Vértices: $20$. Aristas: $30$. ($12 + 20 = 30 + 2$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Prisma cuadrangular — conteo",
    statement: "Indica caras, vértices y aristas de un prisma cuadrangular.",
    solutionText: "Caras: $6$. Vértices: $8$. Aristas: $12$ (como el cubo, pero no todas las caras son cuadrados).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Prisma hexagonal — aristas",
    statement: "¿Cuántas aristas tiene un prisma hexagonal?",
    solutionText: "$3n = 3 \\cdot 6 = 18$ aristas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Pirámide pentagonal — caras",
    statement: "¿Cuántas caras tiene una pirámide pentagonal?",
    solutionText: "$5 + 1 = 6$ caras (base pentagonal + $5$ triángulos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Pirámide hexagonal — vértices",
    statement: "¿Cuántos vértices tiene una pirámide hexagonal?",
    solutionText: "$6 + 1 = 7$ vértices.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Objetos cilíndricos (act. 1, p. 394)",
    statement: "Nombra dos objetos de tu entorno con forma de cilindro y dos con forma de cono.",
    solutionText:
      "Ejemplos: cilindro → lata, tubo, vela; cono → cono de tráfico, chiringuito, cucurucho de helado.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Desarrollos — cilindro o cono (act. 3, p. 394)",
    statement:
      "Un desarrollo plano tiene dos círculos iguales unidos por un rectángulo. ¿A qué cuerpo corresponde?",
    solutionText: "A un **cilindro** (bases circulares + superficie lateral desplegada en rectángulo).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Desarrollo del cono",
    statement: "¿Qué piezas planas forman el desarrollo de un cono?",
    solutionText: "Un **círculo** (base) y un **sector circular** (superficie lateral).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Comparar poliedro y cuerpo redondo",
    statement: "¿Por qué la esfera no es un poliedro?",
    solutionText:
      "Porque no está limitada por caras poligonales planas; tiene una sola superficie curva.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Octaedro — conteo (act. 1, p. 386)",
    statement: "Indica caras, aristas y vértices de un octaedro regular.",
    solutionText: "Caras: $8$. Aristas: $12$. Vértices: $6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Icosaedro — conteo",
    statement: "Indica caras, aristas y vértices de un icosaedro regular.",
    solutionText: "Caras: $20$. Aristas: $30$. Vértices: $12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Prisma triangular — caras laterales",
    statement: "¿Cuántas caras laterales tiene un prisma triangular y qué forma tienen?",
    solutionText: "$3$ caras laterales, cada una es un **paralelogramo**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Euler en prisma pentagonal",
    statement:
      "Un prisma pentagonal tiene $7$ caras, $10$ vértices y $15$ aristas. Comprueba Euler.",
    solutionText: "$7 + 10 = 17$; $15 + 2 = 17$. Se cumple la fórmula.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
