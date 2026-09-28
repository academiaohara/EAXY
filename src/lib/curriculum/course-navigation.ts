import type { ModuleSummary } from "@/lib/curriculum/types";

export function sortModules(modules: ModuleSummary[]): ModuleSummary[] {
  return [...modules].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function isModuleAccessible(courseModule: ModuleSummary): boolean {
  return (
    courseModule.lessons.length > 0 || (courseModule.topicExercises?.length ?? 0) > 0
  );
}

/** Tema donde continuar: el que tiene una lección empezada o el primero con contenido. */
export function findDefaultModuleId(modules: ModuleSummary[]): string | null {
  const sorted = sortModules(modules);

  for (const courseModule of sorted) {
    if (courseModule.lessons.some((lesson) => lesson.pathStatus === "started")) {
      return courseModule.id;
    }
  }

  for (const courseModule of sorted) {
    if (isModuleAccessible(courseModule)) {
      return courseModule.id;
    }
  }

  return sorted[0]?.id ?? null;
}

export function getModulePosition(
  modules: ModuleSummary[],
  moduleId: string,
): { courseModule: ModuleSummary; index: number; number: number } | null {
  const sorted = sortModules(modules);
  const index = sorted.findIndex((courseModule) => courseModule.id === moduleId);
  if (index < 0) {
    return null;
  }

  return { courseModule: sorted[index], index, number: index + 1 };
}
