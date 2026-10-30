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
  return (
    title
      .replace(
        /^(Matemáticas|Física y Química|Física|Química|Tecnología)\s+/i,
        "",
      )
      .trim() || title
  );
}

/** Ordinal breve que identifica el nivel del curso en tarjetas. */
export function courseLevelLabel(title: string): string {
  return title.match(/([1-4]º)(?=\s|\)|$)/)?.[1] ?? "";
}

/** Evita repetir el nivel cuando el nombre especializado ya distingue el curso con I/II. */
export function courseCardTitle(title: string): string {
  const parenthesizedGrade =
    /^(.*\b(?:I|II))\s+\([1-4]º\s+(?:ESO|Bachillerato)\)$/i.exec(title);
  if (parenthesizedGrade) {
    return parenthesizedGrade[1];
  }

  const trailingGrade =
    /^(.*\b(?:I|II))\s+[1-4]º\s+(?:ESO|Bachillerato)(\s+\([^)]*\))?$/i.exec(
      title,
    );
  if (trailingGrade) {
    return `${trailingGrade[1]}${trailingGrade[2] ?? ""}`;
  }

  return title;
}

/** Intervalo compacto de niveles para una agrupación de contenido. */
export function courseRangeLabel(titles: string[]): string {
  const levels = titles.map(courseLevelLabel).filter(Boolean);
  const first = levels[0];
  const last = levels.at(-1);

  if (!first || !last) {
    return "";
  }
  return first === last ? first : `${first} → ${last}`;
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
  const items: BreadcrumbItem[] = [
    { label: "Aprender", href: APRENDER_HOME_HREF },
  ];

  if (course) {
    const subject = getSubject(subjectOfCourse(course));
    if (subject) {
      items.push({ label: subject.label, href: subject.href });
    }
    items.push({
      label: courseShortTitle(course.title),
      href: courseHref(course.slug),
    });
  }

  if (course && topic) {
    const label = topic.number
      ? `Tema ${topic.number}: ${topic.title}`
      : topic.title;
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
