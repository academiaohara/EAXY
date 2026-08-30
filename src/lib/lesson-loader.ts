import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import {
  lessonIndexSchema,
  lessonSchema,
  type Lesson,
  type LessonIndex,
} from "./lesson-schema";

const CONTENT_DIR = join(process.cwd(), "content", "math");

export function loadLesson(slug: string): Lesson {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  const raw = readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw);
  return lessonSchema.parse(parsed);
}

export function loadLessonIndex(): LessonIndex {
  const indexPath = join(CONTENT_DIR, "index.json");
  const raw = readFileSync(indexPath, "utf-8");
  const parsed = JSON.parse(raw);
  return lessonIndexSchema.parse(parsed);
}

export function getAllLessonSlugs(): string[] {
  const files = readdirSync(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}
