import type { LessonSummary, ModuleSummary } from "@/lib/curriculum/types";

export type LessonProgressStatus = "completed" | "incomplete" | "started" | "available";

export type CourseProgress = {
  totalLessons: number;
  completedLessons: number;
  totalExercises: number;
  percent: number;
};

export type NextLessonRef = {
  lesson: LessonSummary;
  module: ModuleSummary;
  /** Posición del tema en el curso, empezando en 1. */
  moduleNumber: number;
  /** El alumno ya completó todo: la siguiente acción es repasar. */
  isReview: boolean;
};

export function getLessonProgressStatus(lesson: LessonSummary): LessonProgressStatus {
  if (lesson.pathStatus === "completed") {
    return "completed";
  }
  if (lesson.pathStatus === "incomplete") {
    return "incomplete";
  }
  if (lesson.pathStatus === "started") {
    return "started";
  }
  return "available";
}

function percentOf(completed: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.round((completed / total) * 100);
}

export function getModuleProgress(courseModule: ModuleSummary): {
  total: number;
  completed: number;
  percent: number;
} {
  const total = courseModule.lessons.length;
  const completed = courseModule.lessons.filter(
    (lesson) => lesson.pathStatus === "completed",
  ).length;

  return { total, completed, percent: percentOf(completed, total) };
}

export function getCourseProgress(modules: ModuleSummary[]): CourseProgress {
  const lessons = modules.flatMap((courseModule) => courseModule.lessons);
  const completedLessons = lessons.filter((lesson) => lesson.pathStatus === "completed").length;
  const totalExercises = lessons.reduce((sum, lesson) => sum + lesson.exerciseCount, 0);

  return {
    totalLessons: lessons.length,
    completedLessons,
    totalExercises,
    percent: percentOf(completedLessons, lessons.length),
  };
}

/** Lección que se propone al alumno: la empezada, la primera pendiente o un repaso. */
export function findNextLesson(modules: ModuleSummary[]): NextLessonRef | null {
  const withNumber = modules.map((courseModule, index) => ({
    courseModule,
    moduleNumber: index + 1,
  }));

  for (const { courseModule, moduleNumber } of withNumber) {
    const started = courseModule.lessons.find(
      (lesson) => lesson.pathStatus === "started" || lesson.pathStatus === "incomplete",
    );
    if (started) {
      return { lesson: started, module: courseModule, moduleNumber, isReview: false };
    }
  }

  for (const { courseModule, moduleNumber } of withNumber) {
    const pending = courseModule.lessons.find((lesson) => lesson.pathStatus !== "completed");
    if (pending) {
      return { lesson: pending, module: courseModule, moduleNumber, isReview: false };
    }
  }

  for (const { courseModule, moduleNumber } of withNumber) {
    const [first] = courseModule.lessons;
    if (first) {
      return { lesson: first, module: courseModule, moduleNumber, isReview: true };
    }
  }

  return null;
}
