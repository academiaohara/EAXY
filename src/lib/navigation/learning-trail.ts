export type BreadcrumbItem = {
  label: string;
  /** Sin `href`, el elemento es la página actual. */
  href?: string;
};

export const APRENDER_HOME_HREF = "/aprender";

export function courseHref(courseId: string): string {
  return `/aprender/curso/${courseId}`;
}

export function topicHref(courseId: string, moduleId: string): string {
  return `${courseHref(courseId)}/tema/${moduleId}`;
}

export function courseShortTitle(title: string): string {
  return title.replace(/^Matemáticas\s+/i, "").trim() || title;
}

export function stripLessonNumber(title: string): string {
  return title.replace(/^\d+\.\s*/, "");
}

type TrailCourse = { id: string; title: string };
type TrailTopic = { id: string; title: string; number?: number };

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
    items.push({ label: courseShortTitle(course.title), href: courseHref(course.id) });
  }

  if (course && topic) {
    const label = topic.number ? `Tema ${topic.number}: ${topic.title}` : topic.title;
    items.push({ label, href: topicHref(course.id, topic.id) });
  }

  items.push(...leaves.map((label) => ({ label })));

  if (items.length > 1) {
    items[items.length - 1] = { label: items[items.length - 1].label };
  }

  return items;
}
