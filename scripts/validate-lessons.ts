import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { curriculumSchema } from "../src/lib/curriculum-schema";
import { lessonIndexSchema, lessonSchema } from "../src/lib/lesson-schema";

const CONTENT_DIR = join(process.cwd(), "content", "math");
const SKIP_FILES = new Set(["index.json", "curriculum.json"]);

function validateLessons(): void {
  let hasErrors = false;

  console.log("Validando contenido en content/math/...\n");

  const curriculumPath = join(CONTENT_DIR, "curriculum.json");
  try {
    const curriculumRaw = readFileSync(curriculumPath, "utf-8");
    const curriculum = curriculumSchema.parse(JSON.parse(curriculumRaw));
    const topicCount = curriculum.courses.reduce(
      (sum, c) => sum + c.topics.length,
      0,
    );
    console.log(
      `✓ curriculum.json — ${curriculum.courses.length} curso(s), ${topicCount} tema(s)`,
    );
  } catch (err) {
    hasErrors = true;
    console.error("✗ curriculum.json — error de validación:", err);
  }

  const indexPath = join(CONTENT_DIR, "index.json");
  try {
    const indexRaw = readFileSync(indexPath, "utf-8");
    const index = lessonIndexSchema.parse(JSON.parse(indexRaw));
    console.log(`✓ index.json — ${index.lessons.length} lección(es) listada(s)`);
  } catch (err) {
    hasErrors = true;
    console.error("✗ index.json — error de validación:", err);
  }

  const files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith(".json") && !SKIP_FILES.has(f),
  );

  for (const file of files) {
    const slug = file.replace(".json", "");
    try {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
      const lesson = lessonSchema.parse(JSON.parse(raw));

      if (lesson.slug !== slug) {
        throw new Error(
          `slug en JSON (${lesson.slug}) no coincide con nombre de archivo (${slug})`,
        );
      }

      const widgetTypes = new Set(
        lesson.steps
          .filter((s) => s.widget)
          .map((s) => s.widget!.type),
      );

      console.log(
        `✓ ${file} — ${lesson.steps.length} pasos, widgets: [${[...widgetTypes].join(", ")}]`,
      );
    } catch (err) {
      hasErrors = true;
      console.error(`✗ ${file} — error:`, err);
    }
  }

  if (hasErrors) {
    console.error("\nValidación fallida.");
    process.exit(1);
  }

  console.log("\nTodas las lecciones son válidas.");
}

validateLessons();
