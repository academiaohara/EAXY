/** Slugs retirados del catálogo que redirigen a la lección que los absorbió. */
export const INTERACTIVE_LESSON_SLUG_REDIRECTS: Record<string, string> = {
  "aproximacion-redondeo-naturales": "sistemas-numeracion-naturales",
};

export function resolveInteractiveLessonSlug(slug: string): string {
  return INTERACTIVE_LESSON_SLUG_REDIRECTS[slug] ?? slug;
}
