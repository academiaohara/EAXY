import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import {
  presentationIndexSchema,
  presentationSchema,
  type Presentation,
  type PresentationIndex,
} from "./presentation-schema";

const CONTENT_DIR = join(process.cwd(), "content", "presentations");
const SKIP_FILES = new Set(["index.json"]);

export function loadPresentation(slug: string): Presentation {
  const filePath = join(CONTENT_DIR, `${slug}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return presentationSchema.parse(JSON.parse(raw));
}

export function loadPresentationIndex(): PresentationIndex {
  const indexPath = join(CONTENT_DIR, "index.json");
  const raw = readFileSync(indexPath, "utf-8");
  return presentationIndexSchema.parse(JSON.parse(raw));
}

export function getAllPresentationSlugs(): string[] {
  const files = readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith(".json") && !SKIP_FILES.has(file))
    .map((file) => file.replace(".json", ""));
}

export function getPresentationForLesson(
  lessonSlug: string,
): PresentationIndex["presentations"][number] | null {
  const index = loadPresentationIndex();
  return index.presentations.find((entry) => entry.lessonSlug === lessonSlug) ?? null;
}
