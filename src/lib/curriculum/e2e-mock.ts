import type { CourseOutline, LessonDetail } from "@/lib/curriculum/types";

const DEMO_COURSE_ID = "a1000000-0000-4000-8000-000000000001";
const DEMO_MODULE_ID = "a2000000-0000-4000-8000-000000000001";
const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000001";

const CONCEPT_BASIC = "b1000000-0000-4000-8000-000000000001";
const CONCEPT_PARENTHESES = "b1000000-0000-4000-8000-000000000002";

export function getE2EMockCourseOutline(): CourseOutline {
  return {
    course: {
      id: DEMO_COURSE_ID,
      title: "Matemáticas 2º ESO",
      description:
        "Curso de matemáticas de segundo de la ESO. Contenido inicial: ecuaciones de primer grado.",
    },
    modules: [
      {
        id: DEMO_MODULE_ID,
        title: "Ecuaciones",
        orderIndex: 0,
        lessons: [
          {
            id: DEMO_LESSON_ID,
            title: "Ecuaciones de primer grado",
            orderIndex: 0,
            videoUrl: null,
            exerciseCount: 6,
            pathStatus: "not_started",
            conceptIds: [CONCEPT_BASIC, CONCEPT_PARENTHESES],
          },
        ],
      },
    ],
  };
}

export function getE2EMockLessonDetail(lessonId: string): LessonDetail | null {
  if (lessonId !== DEMO_LESSON_ID) {
    return null;
  }

  return {
    id: DEMO_LESSON_ID,
    title: "Ecuaciones de primer grado",
    orderIndex: 0,
    videoUrl: null,
    exerciseCount: 6,
    pathStatus: "not_started",
    conceptIds: [CONCEPT_BASIC, CONCEPT_PARENTHESES],
    moduleTitle: "Ecuaciones",
    courseTitle: "Matemáticas 2º ESO",
    concepts: [
      {
        id: CONCEPT_BASIC,
        slug: "linear-equations-basic",
        title: "Ecuaciones lineales básicas",
        mastery: 0,
        attemptCount: 0,
      },
      {
        id: CONCEPT_PARENTHESES,
        slug: "linear-equations-parentheses",
        title: "Ecuaciones con paréntesis",
        mastery: 0,
        attemptCount: 0,
      },
    ],
    exercises: [
      {
        id: "c1000000-0000-4000-8000-000000000001",
        type: "multiple_choice",
        difficulty: 1,
        conceptId: CONCEPT_BASIC,
        questionPreview: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
      {
        id: "c1000000-0000-4000-8000-000000000002",
        type: "numeric",
        difficulty: 2,
        conceptId: CONCEPT_BASIC,
        questionPreview: "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
      {
        id: "c1000000-0000-4000-8000-000000000003",
        type: "multiple_choice",
        difficulty: 2,
        conceptId: CONCEPT_BASIC,
        questionPreview: "¿Qué operación debes hacer primero para resolver 4x + 8 = 20?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
      {
        id: "c1000000-0000-4000-8000-000000000004",
        type: "numeric",
        difficulty: 3,
        conceptId: CONCEPT_PARENTHESES,
        questionPreview: "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
      {
        id: "c1000000-0000-4000-8000-000000000005",
        type: "multiple_choice",
        difficulty: 3,
        conceptId: CONCEPT_PARENTHESES,
        questionPreview: "Al resolver 3(x - 2) = 9, ¿cuál es el valor correcto de x?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
      {
        id: "c1000000-0000-4000-8000-000000000006",
        type: "numeric",
        difficulty: 4,
        conceptId: CONCEPT_PARENTHESES,
        questionPreview: "Resuelve: 5(x + 1) - 2x = 14. ¿Cuánto vale x?",
        attemptCount: 0,
        hasCorrectAttempt: false,
      },
    ],
  };
}

export function getE2EMockExercise(exerciseId: string) {
  const lesson = getE2EMockLessonDetail(DEMO_LESSON_ID);
  if (!lesson) {
    return null;
  }

  const exercise = lesson.exercises.find((item) => item.id === exerciseId);
  if (!exercise) {
    return null;
  }

  const contentById: Record<string, unknown> = {
    "c1000000-0000-4000-8000-000000000001": {
      question: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
      options: [
        { id: "a", text: "x = 2" },
        { id: "b", text: "x = 3" },
        { id: "c", text: "x = 4" },
        { id: "d", text: "x = 6" },
      ],
      correctOptionId: "b",
    },
    "c1000000-0000-4000-8000-000000000002": {
      question: "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
      correctAnswer: 5,
    },
    "c1000000-0000-4000-8000-000000000003": {
      question: "¿Qué operación debes hacer primero para resolver 4x + 8 = 20?",
      options: [
        { id: "a", text: "Dividir ambos lados entre 4" },
        { id: "b", text: "Restar 8 a ambos lados" },
        { id: "c", text: "Sumar 8 a ambos lados" },
        { id: "d", text: "Multiplicar ambos lados por 4" },
      ],
      correctOptionId: "b",
    },
    "c1000000-0000-4000-8000-000000000004": {
      question: "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
      correctAnswer: 4,
    },
    "c1000000-0000-4000-8000-000000000005": {
      question: "Al resolver 3(x - 2) = 9, ¿cuál es el valor correcto de x?",
      options: [
        { id: "a", text: "x = 1" },
        { id: "b", text: "x = 3" },
        { id: "c", text: "x = 5" },
        { id: "d", text: "x = 7" },
      ],
      correctOptionId: "c",
    },
    "c1000000-0000-4000-8000-000000000006": {
      question: "Resuelve: 5(x + 1) - 2x = 14. ¿Cuánto vale x?",
      correctAnswer: 3,
      tolerance: 0,
    },
  };

  return {
    id: exercise.id,
    conceptId: exercise.conceptId,
    type: exercise.type,
    content: contentById[exercise.id],
    lessonId: DEMO_LESSON_ID,
    lessonTitle: lesson.title,
  };
}
