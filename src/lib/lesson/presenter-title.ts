/** Acentúa la parte final del título tras « es » (p. ej. «Multiplicar es repetir grupos»). */
export function formatLessonStepTitle(title: string): string {
  if (title.includes("lesson-step-title-accent")) {
    return title;
  }
  const marker = " es ";
  const index = title.indexOf(marker);
  if (index === -1) {
    return title;
  }
  const head = title.slice(0, index + marker.length);
  const accent = title.slice(index + marker.length).trim();
  if (!accent) {
    return title;
  }
  return `${head}<span class="lesson-step-title-accent">${accent}</span>`;
}
