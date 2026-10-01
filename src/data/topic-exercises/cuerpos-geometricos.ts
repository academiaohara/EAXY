import type { CurriculumTopicExercise } from "@/content/types";
import { cuerposGeometricosTopicExercisesExtra } from "@/data/topic-exercises/cuerpos-geometricos-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8012-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Cuerpos geométricos» (1.º ESO, unidad 12). */
const cuerposGeometricosTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Cubo — caras, aristas y vértices (act. 1, p. 386)",
    statement: "Indica el número de caras, aristas y vértices de un cubo (hexaedro).",
    solutionText: "Caras: $6$. Aristas: $12$. Vértices: $8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Fórmula de Euler en el cubo (act. 8, p. 388)",
    statement:
      "Completa para el hexaedro: caras $C = 6$, vértices $V = 8$, aristas $A = 12$. Calcula $C + V$ y $A + 2$.",
    solutionText: "$C + V = 6 + 8 = 14$. $A + 2 = 12 + 2 = 14$. Se cumple Euler.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Tabla de poliedros regulares (act. 8, p. 388)",
    statement:
      "Completa: tetraedro ($4$ caras, $4$ vértices, $6$ aristas); octaedro ($8$ caras, ¿vértices?, ¿aristas?); icosaedro ($20$ caras, $12$ vértices, ¿aristas?).",
    solutionText:
      "Octaedro: $6$ vértices, $12$ aristas.\nIcosaedro: $30$ aristas.\nEn todos: $C + V = A + 2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Identificar poliedros (act. 7, p. 388)",
    statement:
      "a) ¿Qué poliedro tiene $6$ caras cuadradas?\nb) ¿Qué poliedro tiene $12$ caras pentagonales?\nc) ¿Qué poliedro tiene $20$ caras triangulares?",
    solutionText:
      "a) Hexaedro o cubo.\nb) Dodecaedro.\nc) Icosaedro.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Verdadero o falso (act. 10, p. 388)",
    statement:
      "a) En cualquier poliedro, sus caras son iguales.\nb) El menor número de caras de un poliedro regular es cuatro.\nc) Las caras de un poliedro regular son iguales.",
    solutionText: "a) Falsa. b) Verdadera (tetraedro). c) Verdadera.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Aristas en un vértice (act. 9, p. 388)",
    statement:
      "a) ¿Cómo son las aristas de un poliedro regular?\nb) ¿Cuántas aristas se unen en cada vértice de un cubo?",
    solutionText:
      "a) Todas iguales (misma longitud).\nb) En el cubo concurren $3$ aristas en cada vértice.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Prisma pentagonal — conteo (act. 4-5, p. 391)",
    statement:
      "Un prisma tiene bases pentagonales. Indica: polígono de las bases, número de caras, vértices y aristas.",
    solutionText:
      "Base: pentágono.\nCaras: $5 + 2 = 7$.\nVértices: $2 \\cdot 5 = 10$.\nAristas: $3 \\cdot 5 = 15$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Desarrollo de prisma (act. 6, p. 391)",
    statement:
      "Un desarrollo tiene $2$ hexágonos y $6$ rectángulos. ¿Qué prisma es? ¿Cuántas caras laterales tiene?",
    solutionText: "Es un **prisma hexagonal**. Tiene $6$ caras laterales (rectángulos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Pirámide cuadrangular (act. 10, p. 393)",
    statement:
      "Para una pirámide cuadrangular indica: polígono de la base, número de caras, vértices y aristas.",
    solutionText:
      "Base: cuadrado.\nCaras: $4 + 1 = 5$.\nVértices: $4 + 1 = 5$.\nAristas: $2 \\cdot 4 = 8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Pirámide triangular — conteo",
    statement: "Cuenta caras, vértices y aristas de una pirámide triangular.",
    solutionText: "Caras: $4$. Vértices: $4$. Aristas: $6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Cilindro y cono — elementos (act. 2, p. 394)",
    statement: "Escribe los elementos principales del cilindro y del cono.",
    solutionText:
      "**Cilindro**: dos bases circulares iguales, eje, superficie lateral curva.\n**Cono**: una base circular, vértice (cúspide), generatrices, superficie lateral curva.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Cuerpos de revolución (resumen unidad, p. 385)",
    statement:
      "¿Qué figura plana hay que girar para obtener a) un cilindro b) un cono c) una esfera?",
    solutionText:
      "a) Un **rectángulo** (sobre un lado).\nb) Un **triángulo rectángulo** (sobre un cateto).\nc) Un **semicírculo** (sobre el diámetro).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Esfera — elementos (p. 396)",
    statement: "Nombra los elementos principales de una esfera.",
    solutionText:
      "**Centro**, **radio**, **diámetro**, **superficie curva** y **circunferencia máxima** (corte por el centro).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Dado de parchís (act. 4, p. 387)",
    statement: "Un dado de parchís es un poliedro. ¿Qué poliedro regular es?",
    solutionText: "Es un **hexaedro regular** (cubo): $6$ caras cuadradas iguales.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const cuerposGeometricosTopicExercises: CurriculumTopicExercise[] = [
  ...cuerposGeometricosTopicExercisesBase,
  ...cuerposGeometricosTopicExercisesExtra,
];
