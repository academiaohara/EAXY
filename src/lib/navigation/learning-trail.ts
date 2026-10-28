import { getSubject, subjectOfCourse } from "@/lib/navigation/subjects";

export type BreadcrumbItem = {
  label: string;
  /** Sin `href`, el elemento es la página actual. */
  href?: string;
};

export const APRENDER_HOME_HREF = "/aprender";

export function courseHref(courseSlug: string): string {
  return `/aprender/curso/${courseSlug}`;
}

export function topicHref(courseSlug: string, moduleSlug: string): string {
  return `${courseHref(courseSlug)}/tema/${moduleSlug}`;
}

/** Lección interactiva dentro del curso y tema (slug del contenido interactivo). */
export function interactiveLessonHref(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string,
): string {
  return `${topicHref(courseSlug, moduleSlug)}/leccion/${lessonSlug}`;
}

export function courseShortTitle(title: string): string {
  return title.replace(/^(Matemáticas|Física y Química|Física|Química|Tecnología)\s+/i, "").trim() || title;
}

export function stripLessonNumber(title: string): string {
  return title.replace(/^\d+\.\s*/, "");
}

type TrailCourse = { slug: string; title: string };
type TrailTopic = { slug: string; title: string; number?: number };

/** Migas de la zona «Aprender»; el último nivel es siempre la página actual. */
export function buildLearningTrail({
  course,
  topic,
  leaves = [],
}: {
  course?: TrailCourse;
  topic?: TrailTopic;
  leaves?: string[];
}): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Aprender", href: APRENDER_HOME_HREF }];

  if (course) {
    const subject = getSubject(subjectOfCourse(course));
    if (subject) {
      items.push({ label: subject.label, href: subject.href });
    }
    items.push({ label: courseShortTitle(course.title), href: courseHref(course.slug) });
  }

  if (course && topic) {
    const label = topic.number ? `Tema ${topic.number}: ${topic.title}` : topic.title;
    items.push({ label, href: topicHref(course.slug, topic.slug) });
  }

  items.push(...leaves.map((label) => ({ label })));

  if (items.length > 1) {
    items[items.length - 1] = { label: items[items.length - 1].label };
  }

  return items;
}

export function subjectBlocksHref(subjectKey: string): string {
  return `/aprender/materia/${subjectKey}/contenido`;
}

export function blockHref(subjectKey: string, blockSlug: string): string {
  return `${subjectBlocksHref(subjectKey)}/${blockSlug}`;
}
