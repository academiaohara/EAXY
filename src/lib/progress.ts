const STORAGE_KEY = "eaxy-lesson-progress";

export interface LessonProgress {
  completedStepIds: string[];
  currentStepIndex: number;
  completedAt?: string;
}

export type ProgressStore = Record<string, LessonProgress>;

function readStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

function writeStore(store: ProgressStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getLessonProgress(slug: string): LessonProgress | null {
  return readStore()[slug] ?? null;
}

export function saveLessonProgress(slug: string, progress: LessonProgress) {
  const store = readStore();
  store[slug] = progress;
  writeStore(store);
}

export function resetLessonProgress(slug: string) {
  const store = readStore();
  delete store[slug];
  writeStore(store);
}
