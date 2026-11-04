export type CourseLevelKey =
  | "1-eso"
  | "2-eso"
  | "3-eso"
  | "4-eso"
  | "1-bachillerato"
  | "2-bachillerato";

export type CourseLevel = {
  key: CourseLevelKey;
  label: string;
  stage: "ESO" | "Bachillerato";
  order: number;
};

export type CourseLevelGroup<T> = {
  key: string;
  label: string;
  stage: CourseLevel["stage"] | "Otros";
  order: number;
  courses: T[];
};

const COURSE_LEVELS: readonly CourseLevel[] = [
  { key: "1-eso", label: "1 ESO", stage: "ESO", order: 0 },
  { key: "2-eso", label: "2 ESO", stage: "ESO", order: 1 },
  { key: "3-eso", label: "3 ESO", stage: "ESO", order: 2 },
  { key: "4-eso", label: "4 ESO", stage: "ESO", order: 3 },
  { key: "1-bachillerato", label: "1 Bachillerato", stage: "Bachillerato", order: 4 },
  { key: "2-bachillerato", label: "2 Bachillerato", stage: "Bachillerato", order: 5 },
];

export function getCourseLevel(title: string): CourseLevel | null {
  const match = title.match(/([1-4])º\s+(ESO|Bachillerato)/i);
  if (!match) {
    return null;
  }

  const stage = match[2]?.toLowerCase() === "eso" ? "eso" : "bachillerato";
  const key = `${match[1]}-${stage}`;
  return COURSE_LEVELS.find((level) => level.key === key) ?? null;
}

export function formatCourseLevel(title: string): string {
  return getCourseLevel(title)?.label ?? title.trim();
}

export function getCourseVariantLabel(title: string): string {
  const option = title.match(/\(([AB])\)\s*$/i)?.[1];
  if (option) {
    return `Opción ${option.toUpperCase()}`;
  }
  if (/matemáticas aplicadas a las CCSS/i.test(title)) {
    return "Ciencias Sociales";
  }
  if (/^Matemáticas\s+[12]º\s+Bachillerato$/i.test(title)) {
    return "Ciencias";
  }

  const parenthesizedLevel = title.replace(
    /\s+\([1-4]º\s+(?:ESO|Bachillerato)\)\s*$/i,
    "",
  );
  const trailingLevel = parenthesizedLevel.match(
    /^(.*?)\s+[1-4]º\s+(?:ESO|Bachillerato)(?:\s+\(([^)]+)\))?\s*$/i,
  );
  if (!trailingLevel) {
    return title.trim();
  }

  const base = trailingLevel[1]?.trim() || title.trim();
  const qualifier = trailingLevel[2]?.trim();
  return qualifier ? `${base} · ${qualifier.toLowerCase()}` : base;
}

export function groupCoursesByLevel<
  T extends { id: string; title: string; orderIndex: number },
>(courses: readonly T[]): CourseLevelGroup<T>[] {
  const groups = new Map<string, CourseLevelGroup<T>>();
  const sorted = [...courses].sort(
    (left, right) =>
      left.orderIndex - right.orderIndex || left.title.localeCompare(right.title, "es"),
  );

  for (const course of sorted) {
    const level = getCourseLevel(course.title);
    const key = level?.key ?? `course:${course.id}`;
    const group = groups.get(key);
    if (group) {
      group.courses.push(course);
      continue;
    }

    groups.set(key, {
      key,
      label: level?.label ?? course.title.trim(),
      stage: level?.stage ?? "Otros",
      order: level?.order ?? 100 + course.orderIndex,
      courses: [course],
    });
  }

  return [...groups.values()].sort(
    (left, right) => left.order - right.order || left.label.localeCompare(right.label, "es"),
  );
}
