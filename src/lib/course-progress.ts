import { getLessonProgress } from "./progress";

export type LessonStatus = "locked" | "available" | "in_progress" | "completed";

export function getLessonStatus(
  slug: string,
  isAvailable: boolean,
  isUnlocked: boolean,
): LessonStatus {
  if (!isAvailable) return "locked";
  if (!isUnlocked) return "locked";

  const progress = getLessonProgress(slug);
  if (progress?.completedAt) return "completed";
  if (progress && progress.currentStepIndex > 0) return "in_progress";
  return "available";
}

export function isLessonComplete(slug: string): boolean {
  const progress = getLessonProgress(slug);
  return Boolean(progress?.completedAt);
}

export function isLessonInProgress(slug: string): boolean {
  const progress = getLessonProgress(slug);
  return Boolean(progress && !progress.completedAt && progress.currentStepIndex > 0);
}

export function countCompletedLessons(slugs: string[]): number {
  return slugs.filter(isLessonComplete).length;
}

export function getTopicLessonSlugs(
  topics: Array<{ lessonSlugs: string[] }>,
): string[] {
  return topics.flatMap((t) => t.lessonSlugs);
}

export function isTopicUnlocked(
  topicIndex: number,
  topics: Array<{ lessonSlugs: string[] }>,
): boolean {
  if (topicIndex === 0) return true;

  const previousTopics = topics.slice(0, topicIndex);
  const previousSlugs = getTopicLessonSlugs(previousTopics);

  if (previousSlugs.length === 0) return true;

  return previousSlugs.every(isLessonComplete);
}

export function isLessonUnlocked(
  lessonSlug: string,
  topicIndex: number,
  topics: Array<{ lessonSlugs: string[] }>,
): boolean {
  if (!isTopicUnlocked(topicIndex, topics)) return false;

  const topic = topics[topicIndex];
  const lessonIndex = topic.lessonSlugs.indexOf(lessonSlug);
  if (lessonIndex <= 0) return true;

  const previousSlugs = topic.lessonSlugs.slice(0, lessonIndex);
  if (previousSlugs.length === 0) return true;

  return previousSlugs.every(isLessonComplete);
}

export function getNextLessonSlug(
  currentSlug: string,
  topics: Array<{ lessonSlugs: string[] }>,
): string | null {
  const allSlugs = getTopicLessonSlugs(topics);
  const currentIndex = allSlugs.indexOf(currentSlug);
  if (currentIndex === -1 || currentIndex >= allSlugs.length - 1) return null;
  return allSlugs[currentIndex + 1];
}

export function getLessonProgressPercent(
  slug: string,
  totalSteps: number,
): number {
  const progress = getLessonProgress(slug);
  if (!progress) return 0;
  if (progress.completedAt) return 100;
  if (totalSteps === 0) return 0;
  return Math.round((progress.currentStepIndex / totalSteps) * 100);
}
