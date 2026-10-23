/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Auditoría de coherencia de un tema de lecciones (lo que suele olvidarse al crear uno).
 * Uso: npx tsx scripts/review-tema.ts <slug-curso> <slug-tema>
 *   p. ej. npx tsx scripts/review-tema.ts tecnologia-industrial-2-bachillerato sistemas-automaticos
 * Sale con código 1 si hay errores. No sustituye a tsc / vitest / build ni a la revisión visual.
 */
import fs from "node:fs";
import path from "node:path";

import { curriculum } from "../src/content/curriculum";
import { interactiveLessons } from "../src/data/lessons";

const [courseSlug, moduleSlug] = process.argv.slice(2);
if (!courseSlug || !moduleSlug) {
  console.error("Uso: npx tsx scripts/review-tema.ts <slug-curso> <slug-tema>");
  process.exit(2);
}

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");
const registry = read("src/components/lesson/anim/registry.tsx");
const slideTool = read("src/components/lesson/slide/SlideTool.tsx");
const types = read("src/lib/lesson/types.ts");
const docs = read("docs/lessons-slides.md");
const seed = read("supabase/seed.sql");
const indexSrc = read("src/data/lessons/index.ts");

const errors: string[] = [];
const warns: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warns.push(m);

const course = curriculum.courses.find((c) => c.slug === courseSlug);
const mod = course?.modules.find((m) => m.slug === moduleSlug);
if (!course || !mod) {
  console.error(`No existe ${courseSlug}/${moduleSlug} en el currículo.`);
  process.exit(2);
}

// Ids únicos en todo el currículo
const allModuleIds = curriculum.courses.flatMap((c) => c.modules.map((m) => m.id));
if (allModuleIds.filter((i) => i === mod.id).length !== 1) err(`id de módulo repetido: ${mod.id}`);
const allLessonIds = curriculum.courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => l.id)));
const orders = mod.lessons.map((l) => l.orderIndex);
if (orders.some((o, i) => o !== i + 1)) err(`orderIndex de lecciones no correlativo: ${orders.join(",")}`);
if (course.modules.filter((m) => m.orderIndex === mod.orderIndex).length !== 1) err(`orderIndex de módulo repetido: ${mod.orderIndex}`);

const animIds = new Set<string>();
const toolIds = new Set<string>();
const visuals = (steps: { visual?: unknown; blocks?: unknown[] }[]) => {
  for (const s of steps) {
    const v = s.visual as { kind?: string; scene?: string; tool?: string } | undefined;
    if (v?.kind === "anim" && v.scene) animIds.add(v.scene);
    if (v?.kind === "tool" && v.tool) toolIds.add(v.tool);
    for (const b of (s.blocks ?? []) as { kind?: string; scene?: string; tool?: string }[]) {
      if (b.kind === "anim" && b.scene) animIds.add(b.scene);
      if (b.kind === "tool" && b.tool) toolIds.add(b.tool);
    }
  }
};

const folder = `src/data/lessons/${courseSlug}/${String(mod.orderIndex).padStart(2, "0")}-${moduleSlug}`;
if (!fs.existsSync(path.join(process.cwd(), folder))) err(`falta la carpeta ${folder}`);
const seenSlugs = new Set<string>();

for (const lesson of mod.lessons) {
  const slug = lesson.interactiveSlug;
  if (!slug) {
    err(`${lesson.title}: sin interactiveSlug`);
    continue;
  }
  if (seenSlugs.has(slug)) err(`slug repetido: ${slug}`);
  seenSlugs.add(slug);
  if (allLessonIds.filter((i) => i === lesson.id).length !== 1) err(`${slug}: lessonId repetido (${lesson.id})`);
  const file = `${folder}/${String(lesson.orderIndex).padStart(2, "0")}-${slug}.ts`;
  if (!fs.existsSync(path.join(process.cwd(), file))) err(`${slug}: falta ${file} (el nombre debe acabar en el slug)`);
  const data = (interactiveLessons as Record<string, { slug: string; title: string; subtitle?: string; steps: any[] } | undefined>)[slug];
  if (!data) {
    err(`${slug}: no está en src/data/lessons/index.ts (regenera con generate-lessons-index.ts)`);
    continue;
  }
  if (data.slug !== slug) err(`${slug}: el slug interno es ${data.slug}`);
  if (data.title !== lesson.title) warn(`${slug}: el título de la lección ("${data.title}") difiere del del currículo ("${lesson.title}")`);
  if (!data.subtitle) err(`${slug}: sin subtitle`);
  if (data.steps.length < 5) err(`${slug}: solo ${data.steps.length} pasos (mínimo 5)`);
  const ids = data.steps.map((s) => s.id);
  if (new Set(ids).size !== ids.length) err(`${slug}: ids de paso repetidos`);
  visuals(data.steps);
  let practice = 0;
  for (const s of data.steps) {
    if (s.type === "predict" || s.type === "classify") practice += 1;
    if (s.type === "predict" && s.mode !== "numeric") {
      const wrong = (s.choices ?? []).filter((c: any) => c.id !== s.correctChoiceId && !c.incorrectFeedback);
      if (wrong.length) warn(`${slug}/${s.id}: opciones incorrectas sin incorrectFeedback`);
      if (!s.shuffleChoices) warn(`${slug}/${s.id}: sin shuffleChoices`);
    }
    if (!s.help || s.help.length === 0) warn(`${slug}/${s.id}: sin help`);
  }
  if (practice < 2) warn(`${slug}: pocos ejercicios (${practice})`);
  const hasVisual = data.steps.some((s) => s.visual || (s.blocks ?? []).some((b: any) => b.kind === "anim" || b.kind === "tool"));
  if (!hasVisual) err(`${slug}: ninguna animación ni herramienta`);
}

// Registro, tipos y documentación de cada animación y herramienta usadas
for (const id of animIds) {
  if (!new RegExp(`"${id}":\\s*\\(`).test(registry)) err(`animación "${id}" sin registrar en registry.tsx`);
  if (!new RegExp(`\\|\\s*"${id}"`).test(types)) err(`animación "${id}" sin añadir a SlideAnimId (types.ts)`);
  if (!docs.includes(`\`${id}\``)) err(`animación "${id}" sin fila en docs/lessons-slides.md`);
}
for (const id of toolIds) {
  if (!new RegExp(`case "${id}"`).test(slideTool)) err(`herramienta "${id}" sin case en SlideTool.tsx`);
  if (!new RegExp(`\\|\\s*"${id}"`).test(types)) err(`herramienta "${id}" sin añadir a SlideToolId (types.ts)`);
  if (!docs.includes(`\`${id}\``)) err(`herramienta "${id}" sin fila en docs/lessons-slides.md`);
}
// Tests que mencionan cada herramienta
const testDir = path.join(process.cwd(), "src/tests/unit/lesson");
const testSrc = fs.readdirSync(testDir).filter((f) => f.startsWith("slide-tool")).map((f) => fs.readFileSync(path.join(testDir, f), "utf8")).join("\n");
for (const id of toolIds) if (!testSrc.includes(`"${id}"`)) warn(`herramienta "${id}" sin test en src/tests/unit/lesson/slide-tool-*.test.tsx`);

// Seed e índice al día
for (const l of mod.lessons) {
  if (l.interactiveSlug && !indexSrc.includes(`"${l.interactiveSlug}"`) && !indexSrc.includes(l.interactiveSlug)) err(`${l.interactiveSlug}: ausente del índice`);
  if (!seed.includes(l.id)) err(`${l.interactiveSlug}: ${l.id} ausente de supabase/seed.sql (npm run seed:generate)`);
}
// README y test del curso
const readme = fs.existsSync("temp/tecnologia/README.md") ? read("temp/tecnologia/README.md") : "";
if (courseSlug.startsWith("tecnologia-industrial") && !readme.includes(`/${String(mod.orderIndex).padStart(2, "0")}-${moduleSlug}/`)) warn("temp/tecnologia/README.md: sin fila de la unidad");
const courseTest = fs.existsSync("src/tests/unit/data/tecnologia-industrial-lessons.test.tsx") ? read("src/tests/unit/data/tecnologia-industrial-lessons.test.tsx") : "";
if (courseSlug.startsWith("tecnologia-industrial") && !courseTest.includes(`"${moduleSlug}"`)) err("tecnologia-industrial-lessons.test.tsx: falta el tema en la lista de módulos (y el nº total de lecciones)");

console.log(`Tema ${moduleSlug}: ${mod.lessons.length} lecciones, ${animIds.size} animaciones, ${toolIds.size} herramientas.`);
for (const w of warns) console.log(`  aviso: ${w}`);
for (const e of errors) console.log(`  ERROR: ${e}`);
console.log(errors.length ? `${errors.length} errores.` : "Coherencia OK (falta revisar contenido y capturas).");
process.exit(errors.length ? 1 : 0);
