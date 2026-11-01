/**
 * Regenerates src/data/lessons/index.ts from curriculum tree + _unlisted.
 * Run: npx tsx scripts/generate-lessons-index.ts
 */
import fs from "node:fs";
import path from "node:path";

import { fullCurriculum as curriculum } from "../src/content/curriculum";

const LESSONS_ROOT = path.join(process.cwd(), "src/data/lessons");

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function relImportPath(interactiveSlug: string, courseSlug: string, moduleOrder: number, moduleSlug: string, lessonOrder: number) {
  return `./${courseSlug}/${pad2(moduleOrder)}-${moduleSlug}/${pad2(lessonOrder)}-${interactiveSlug}`;
}

function exportNameFromSlug(slug: string): string {
  const camel = slug
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
  return `${camel}Lesson`;
}

const entries: { slug: string; exportName: string; importPath: string }[] = [];

for (const course of curriculum.courses) {
  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      const slug = lesson.interactiveSlug;
      if (!slug) continue;
      entries.push({
        slug,
        exportName: exportNameFromSlug(slug),
        importPath: relImportPath(
          slug,
          course.slug,
          courseModule.orderIndex,
          courseModule.slug,
          lesson.orderIndex,
        ),
      });
    }
  }
}

const unlistedDir = path.join(LESSONS_ROOT, "_unlisted");
if (fs.existsSync(unlistedDir)) {
  for (const file of fs.readdirSync(unlistedDir).filter((f) => f.endsWith(".ts"))) {
    const slug = file.replace(/\.ts$/, "");
    if (entries.some((e) => e.slug === slug)) continue;
    entries.push({
      slug,
      exportName: exportNameFromSlug(slug),
      importPath: `./_unlisted/${slug}`,
    });
  }
}

entries.sort((a, b) => a.slug.localeCompare(b.slug));

const importLines = entries.map(
  (e) => `import { ${e.exportName} } from "@/data/lessons/${e.importPath.replace(/^\.\//, "")}";`,
);

const mapLines = entries.map((e) => `  "${e.slug}": ${e.exportName},`);

const content = `${importLines.join("\n")}

export const interactiveLessons = {
${mapLines.join("\n")}
} as const;

export type InteractiveLessonSlug = keyof typeof interactiveLessons;
`;

const outPath = path.join(LESSONS_ROOT, "index.ts");
fs.writeFileSync(outPath, content);
console.log(`Wrote ${outPath} (${entries.length} lessons).`);
