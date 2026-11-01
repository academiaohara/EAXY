/**
 * Genera `supabase/seed.sql` a partir de `src/content/curriculum.ts`.
 *
 *   npm run seed:generate
 *
 * El seed asume una base de datos recién migrada (`supabase db reset` lo ejecuta).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { getAllCourses, getOrderedLessons, validateCurriculum } from "../src/content";
import { fullCurriculum as curriculum } from "../src/content/curriculum";

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNullable(value: string | undefined | null): string {
  return value === undefined || value === null ? "null" : sqlString(value);
}

function sqlJson(value: unknown): string {
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

export function generateSeedSql(): string {
  const issues = validateCurriculum(curriculum);
  if (issues.length > 0) {
    const detail = issues.map((issue) => `  - ${issue.path}: ${issue.message}`).join("\n");
    throw new Error(`El currículo tiene errores:\n${detail}`);
  }

  const conceptIdBySlug = new Map(curriculum.concepts.map((concept) => [concept.slug, concept.id]));
  const lines: string[] = [];

  lines.push("-- ARCHIVO GENERADO. No editar a mano: ejecuta `npm run seed:generate`.");
  lines.push("-- Fuente: src/content/curriculum.ts");
  lines.push("");

  lines.push("insert into public.courses (id, slug, title, description) values");
  lines.push(
    getAllCourses(curriculum)
      .map(
        (course) =>
          `  (${sqlString(course.id)}, ${sqlString(course.slug)}, ${sqlString(course.title)}, ${sqlString(course.description)})`,
      )
      .join(",\n") + ";",
  );
  lines.push("");

  const allModules = getAllCourses(curriculum).flatMap((course) =>
    course.modules.map((module) => ({ course, module })),
  );

  if (allModules.length > 0) {
    lines.push("insert into public.modules (id, course_id, slug, title, order_index) values");
    lines.push(
      allModules
        .map(
          ({ course, module }) =>
            `  (${sqlString(module.id)}, ${sqlString(course.id)}, ${sqlString(module.slug)}, ${sqlString(module.title)}, ${module.orderIndex})`,
        )
        .join(",\n") + ";",
    );
    lines.push("");
  }

  const allLessons = getAllCourses(curriculum).flatMap((course) =>
    course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({ module, lesson })),
    ),
  );

  if (allLessons.length > 0) {
    lines.push("insert into public.lessons (id, module_id, title, summary, order_index, video_url) values");
    lines.push(
      allLessons
        .map(
          ({ module, lesson }) =>
            `  (${sqlString(lesson.id)}, ${sqlString(module.id)}, ${sqlString(lesson.title)}, ${sqlString(lesson.summary)}, ${lesson.orderIndex}, ${sqlNullable(lesson.videoUrl)})`,
        )
        .join(",\n") + ";",
    );
    lines.push("");
  }

  if (curriculum.concepts.length > 0) {
    lines.push("insert into public.concepts (id, slug, title, description) values");
    lines.push(
      curriculum.concepts
        .map(
          (concept) =>
            `  (${sqlString(concept.id)}, ${sqlString(concept.slug)}, ${sqlString(concept.title)}, ${sqlString(concept.description)})`,
        )
        .join(",\n") + ";",
    );
    lines.push("");
  }

  const prerequisiteRows = curriculum.concepts.flatMap((concept) =>
    (concept.prerequisites ?? []).map(
      (prerequisite) =>
        `  (${sqlString(concept.id)}, ${sqlString(conceptIdBySlug.get(prerequisite.slug)!)}, ${prerequisite.minMastery})`,
    ),
  );
  if (prerequisiteRows.length > 0) {
    lines.push(
      "insert into public.concept_prerequisites (concept_id, prerequisite_id, min_mastery) values",
    );
    lines.push(prerequisiteRows.join(",\n") + ";");
    lines.push("");
  }

  const lessonConceptRows = getOrderedLessons(curriculum).flatMap((lesson) =>
    lesson.conceptSlugs.map(
      (slug) => `  (${sqlString(lesson.id)}, ${sqlString(conceptIdBySlug.get(slug)!)})`,
    ),
  );

  if (lessonConceptRows.length > 0) {
    lines.push("insert into public.lesson_concepts (lesson_id, concept_id) values");
    lines.push(lessonConceptRows.join(",\n") + ";");
    lines.push("");
  }

  if (curriculum.exercises.length > 0) {
    lines.push("insert into public.exercises (id, concept_id, type, difficulty, content) values");
    lines.push(
      curriculum.exercises
        .map(
          (exercise) =>
            `  (${sqlString(exercise.id)}, ${sqlString(conceptIdBySlug.get(exercise.conceptSlug)!)}, ${sqlString(exercise.type)}, ${exercise.difficulty}, ${sqlJson(exercise.content)})`,
        )
        .join(",\n") + ";",
    );
    lines.push("");
  }

  return lines.join("\n");
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename);

if (isDirectRun) {
  const outputPath = resolve(process.cwd(), "supabase/seed.sql");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, generateSeedSql(), "utf8");
  console.log(`Seed generado en ${outputPath}`);
}
