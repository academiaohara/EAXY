/**
 * One-off maintainer script: moves flat lesson files into
 *   src/data/lessons/<curso>/<tema>/NN-<interactiveSlug>.ts
 * driven by src/content/curriculum.ts.
 *
 * Run: npx tsx scripts/relocate-lessons-to-tree.ts
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { fullCurriculum as curriculum } from "../src/content/curriculum";

const LESSONS_ROOT = path.join(process.cwd(), "src/data/lessons");

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function lessonFileName(orderIndex: number, interactiveSlug: string) {
  return `${pad2(orderIndex)}-${interactiveSlug}.ts`;
}

function moduleDirName(orderIndex: number, moduleSlug: string) {
  return `${pad2(orderIndex)}-${moduleSlug}`;
}

type Move = { from: string; to: string };

const moves: Move[] = [];

for (const course of curriculum.courses) {
  for (const courseModule of course.modules) {
    const moduleDir = path.join(
      LESSONS_ROOT,
      course.slug,
      moduleDirName(courseModule.orderIndex, courseModule.slug),
    );
    for (const lesson of courseModule.lessons) {
      const slug = lesson.interactiveSlug;
      if (!slug) continue;
      const from = path.join(LESSONS_ROOT, `${slug}.ts`);
      const to = path.join(moduleDir, lessonFileName(lesson.orderIndex, slug));
      if (!fs.existsSync(from)) {
        console.warn(`skip (missing source): ${slug}.ts`);
        continue;
      }
      moves.push({ from, to });
    }
  }
}

/** Files registered in index but not listed in curriculum. */
const unlisted = [
  "multiplicacion-naturales",
  "numeros-grandes-abreviados",
  "potencias-base-10",
];

for (const slug of unlisted) {
  const from = path.join(LESSONS_ROOT, `${slug}.ts`);
  if (!fs.existsSync(from)) continue;
  const to = path.join(LESSONS_ROOT, "_unlisted", `${slug}.ts`);
  moves.push({ from, to });
}

for (const { from, to } of moves) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (fs.existsSync(to)) {
    throw new Error(`Target already exists: ${to}`);
  }
  execSync(`git mv ${JSON.stringify(from)} ${JSON.stringify(to)}`, { stdio: "inherit" });
}

console.log(`Moved ${moves.length} lesson file(s).`);
