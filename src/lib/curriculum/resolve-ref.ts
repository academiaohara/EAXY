import {
  getCourseById,
  getCourseBySlug,
  getModuleById,
  getModuleBySlug,
} from "@/content";

const CURRICULUM_UUID_PREFIXES = ["a1000000", "a2000000", "a3000000"] as const;

export function isCurriculumUuid(value: string): boolean {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
    return false;
  }
  const prefix = value.slice(0, 8).toLowerCase();
  return CURRICULUM_UUID_PREFIXES.some((candidate) => candidate === prefix);
}

export function resolveCourseRef(ref: string): { id: string; slug: string } | null {
  if (isCurriculumUuid(ref)) {
    const course = getCourseById(ref);
    return course ? { id: course.id, slug: course.slug } : null;
  }

  const course = getCourseBySlug(ref);
  return course ? { id: course.id, slug: course.slug } : null;
}

export function resolveModuleRef(
  courseRef: string,
  moduleRef: string,
): { id: string; slug: string; courseId: string; courseSlug: string } | null {
  const course = resolveCourseRef(courseRef);
  if (!course) {
    return null;
  }

  if (isCurriculumUuid(moduleRef)) {
    const located = getModuleById(moduleRef);
    if (!located || located.course.id !== course.id) {
      return null;
    }
    return {
      id: located.module.id,
      slug: located.module.slug,
      courseId: course.id,
      courseSlug: course.slug,
    };
  }

  const located = getModuleBySlug(course.slug, moduleRef);
  if (!located) {
    return null;
  }

  return {
    id: located.module.id,
    slug: located.module.slug,
    courseId: course.id,
    courseSlug: course.slug,
  };
}
