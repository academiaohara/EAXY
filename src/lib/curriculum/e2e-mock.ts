import { DEMO_COURSE_ID } from "@/lib/curriculum/constants";
import type { CourseOutline, CourseSummary, LessonDetail } from "@/lib/curriculum/types";
import { deriveLessonProgressStatus } from "@/lib/learning-paths/completion";
import { mockGetLearningPathStatus } from "@/lib/learning-paths/e2e-mock";

const DEMO_MODULE_ID = "a2000000-0000-4000-8000-000000000001";
const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000001";

const DEMO_COURSE: CourseSummary = {
  id: DEMO_COURSE_ID,
  title: "Matemáticas 2º ESO",
  description:
    "Curso de matemáticas de segundo de la ESO. Contenido inicial: ecuaciones de primer grado.",
};

const LESSON_CONCEPT_TITLES = [
  "Ecuaciones lineales básicas",
  "Ecuaciones con paréntesis",
];

export function mockListCourses(): CourseSummary[] {
  return [DEMO_COURSE];
}

export function mockGetCourseOutline(studentId: string, courseId: string): CourseOutline | null {
  if (courseId !== DEMO_COURSE_ID) {
    return null;
  }

  const status = deriveLessonProgressStatus(
    mockGetLearningPathStatus(studentId, DEMO_LESSON_ID),
  );

  return {
    course: DEMO_COURSE,
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
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            conceptCount: 2,
            status,
          },
        ],
      },
    ],
  };
}

export function mockGetLessonDetail(
  studentId: string,
  courseId: string,
  lessonId: string,
): LessonDetail | null {
  if (courseId !== DEMO_COURSE_ID || lessonId !== DEMO_LESSON_ID) {
    return null;
  }

  const status = deriveLessonProgressStatus(
    mockGetLearningPathStatus(studentId, lessonId),
  );

  return {
    id: lessonId,
    title: "Ecuaciones de primer grado",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    moduleTitle: "Ecuaciones",
    courseId,
    courseTitle: DEMO_COURSE.title,
    conceptTitles: LESSON_CONCEPT_TITLES,
    status,
    practiceExerciseId: "c1000000-0000-4000-8000-000000000001",
  };
}

export function mockGetLessonConceptIds(lessonId: string): string[] {
  if (lessonId !== DEMO_LESSON_ID) {
    return [];
  }

  return [
    "b1000000-0000-4000-8000-000000000001",
    "b1000000-0000-4000-8000-000000000002",
  ];
}

export function mockGetLessonsForConcept(conceptId: string): string[] {
  const conceptIds = mockGetLessonConceptIds(DEMO_LESSON_ID);
  if (!conceptIds.includes(conceptId)) {
    return [];
  }

  return [DEMO_LESSON_ID];
}
