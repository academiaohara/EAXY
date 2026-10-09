# External Topic Exercise Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire the currently seeded external topic exercises, preserve their reusable UI for future authoring, and use the five lessons in 1.º ESO unit 1 as the first concise reference for lesson structure and meaningful checks.

**Architecture:** Keep `TopicExercisesSection`, its route, and the existing internal lesson exercise engine. Make external exercise media optional at the content and view-model boundaries, render only resources that exist, and remove only the current topic-exercise fixtures from the curriculum catalog. Keep lesson controls contextual and explanatory: a control question should make the learner reason about the concept, not guess a trivial arithmetic result.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library, Playwright, GitHub Contents API.

**Spec:** `docs/superpowers/specs/2026-10-09-topic-exercises-media-design.md`

## Global Constraints

- Keep the existing lesson topics and academic scope; when reducing or refining unit 1, do not invent unrelated content.
- Do not delete the general exercise engine or classroom/recommendation persistence.
- Keep the desktop-only product rule.
- Do not add GeoGebra, Manim, or other new dependencies.
- External media is optional and must not create empty controls or broken layout.

## Review Focus

- A legacy exercise with only text/video still renders without requiring an image.
- An exercise with only an image renders an accessible resolution image and no video/text controls.
- A normal YouTube watch URL and an existing embed URL both produce a valid embed source.
- Invalid or non-http(s) media URLs are not embedded.
- A module with no external exercises hides the section and does not break lesson navigation.

### Task 1: Define external exercise media contracts

**Files:**

- Modify: `src/content/types.ts`
- Modify: `src/lib/curriculum/types.ts`
- Create: `src/lib/curriculum/topic-exercise-media.ts`
- Test: `src/tests/unit/curriculum/topic-exercise-media.test.ts`

**Interfaces:**

- Produces `toYouTubeEmbedUrl(url: string): string | null`.
- Produces `isSafeExternalMediaUrl(url: string): boolean`.
- `CurriculumTopicExercise.solutionImageUrl`, `solutionVideoUrl`, and `solutionText` are optional; `statement` remains required.

- [ ] **Step 1: Write failing tests** for safe http(s) URLs, rejected protocols, YouTube watch URLs, youtu.be URLs, embed URLs, and invalid URLs.
- [ ] **Step 2: Run** `npm run test:run -- src/tests/unit/curriculum/topic-exercise-media.test.ts`; expected failure because the helper does not exist.
- [ ] **Step 3: Implement** the URL helpers with the URL constructor, allowing only http(s), converting supported YouTube forms to `https://www.youtube.com/embed/<id>`, and returning null for unsupported input.
- [ ] **Step 4: Update** both content and view-model types so optional resources are represented consistently.
- [ ] **Step 5: Run** the focused test; expected PASS.
- [ ] **Step 6: Commit** `feat: define external exercise media contracts`.

### Task 2: Extend the exercise dialog without removing its design

**Files:**

- Modify: `src/components/learning/topic-exercises-section.tsx`
- Test: `src/tests/unit/learning/topic-exercises-section.test.tsx`

**Interfaces:**

- Consumes `TopicExerciseSummary` with optional `solutionImageUrl`, `solutionVideoUrl`, and `solutionText`.
- Uses `toYouTubeEmbedUrl` and `isSafeExternalMediaUrl` from Task 1.
- Preserves the existing card, dialog, statement, text-solution reveal, and video toggle behavior.

- [ ] **Step 1: Write failing component tests** for conditional image rendering with accessible alt text, image-only content, video URL normalization, missing-resource controls, and invalid URL omission.
- [ ] **Step 2: Run** the focused Vitest file; expected failure because the image/media behavior is absent.
- [ ] **Step 3: Implement** conditional media sections using lazy external `img`, safe normalized iframe source, and optional text solution while preserving existing test IDs where they remain meaningful.
- [ ] **Step 4: Run** the focused test; expected PASS.
- [ ] **Step 5: Commit** `feat: support image and YouTube resolutions`.

### Task 3: Remove current external exercise content from the catalog

**Files:**

- Modify: `src/content/curriculum.ts`
- Modify: `src/lib/curriculum/queries.ts`
- Modify: `src/lib/learning/resolve-practice-path.ts`
- Modify: `src/components/learning/course-topic-view.tsx`
- Modify: `src/content/types.ts` consumers as required by type checking
- Delete: `src/data/topic-exercises/*.ts` only after confirming no remaining imports

**Interfaces:**

- `getTopicPracticeViewModel(moduleId)` returns null when a module has no external exercises.
- Topic pages retain their lesson navigation and render no empty exercise section.
- Concept-based practice and its engine remain untouched.

- [ ] **Step 1: Add/update a curriculum test** asserting that the catalog contains no seeded topic exercises while interactive lessons remain present.
- [ ] **Step 2: Run** `npm run test:run -- src/tests/unit/content/validate-curriculum.test.ts src/tests/unit/learning/resolve-practice-path.test.ts`; expected failure against current fixtures.
- [ ] **Step 3: Remove topic-exercise imports/properties and delete only the now-unused external fixture modules; keep concept exercise data and lesson data.
- [ ] **Step 4: Simplify topic view-model mapping to handle the optional media fields without fabricating data.
- [ ] **Step 5: Run** focused tests and `npm run lint`; expected PASS.
- [ ] **Step 6: Commit** `refactor: remove seeded external topic exercises`.

### Task 4: Update browser coverage and repository documentation

**Files:**

- Modify: `e2e/practice.spec.ts`
- Modify: `e2e/aprender-course.spec.ts` if assertions reference the external section
- Modify: `README.md` or relevant docs only if current commands/behavior are inaccurate

- [ ] **Step 1: Update E2E expectations** so topics without external exercises still expose lessons and the practice entry does not claim seeded topic content.
- [ ] **Step 2: Run** `npm run test:e2e`; expected PASS.
- [ ] **Step 3: Run** `npm run test:run`, `npm run lint`, and `npm run build`; expected PASS.
- [ ] **Step 4: Review the diff** for accidental lesson/content changes and confirm only external topic exercise data/UI contracts changed.
- [ ] **Step 5: Commit** `test: verify external exercise removal and media UI`.

### Task 5: Establish the unit 1 lesson reference

**Files:**

- Modify: `src/data/lessons/sistemas-numeracion-naturales.ts`
- Modify: `src/data/lessons/aproximacion-redondeo-naturales.ts`
- Modify: `src/data/lessons/suma-resta-naturales.ts`
- Modify: `src/data/lessons/multiplicacion-division-naturales.ts`
- Modify: `src/data/lessons/division-orden-operaciones-naturales.ts`
- Test: `src/tests/unit/lesson/theme-one-reference.test.ts`

- [ ] **Step 1: Add a focused contract test** for compact slide counts, continuity of the five lessons, and non-trivial contextual `predict` controls.
- [ ] **Step 2: Reduce repetition** while retaining the main explanations, examples, and existing visual language.
- [ ] **Step 3: Replace simplistic arithmetic multiple-choice checks** with questions about place value, distributivity, remainders, and order of operations.
- [ ] **Step 4: Run the focused lesson tests and review the rendered lesson data.**

### Task 6: Open the pull request

**Files:** none.

- [ ] **Step 1: Compare** the branch against `main` and verify the diff contains no new lesson or invented exercise content.
- [ ] **Step 2: Create** a PR targeting `main` with the audit, scope, test results, and known limitations.
- [ ] **Step 3: Attach** the created PR to this task.
