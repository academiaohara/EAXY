# Course Card Hierarchy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify course circles, titles, and content-range labels consistently across all four subjects.

**Architecture:** Add pure presentation helpers beside the existing learning-trail formatters, then consume them from the course and block cards. Stored curriculum names, routes, progress, and subject detection remain unchanged.

**Tech Stack:** TypeScript, React 19, Next.js 16, Tailwind CSS, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-30-course-card-hierarchy-design.md`

## Global Constraints

- Apply the same rules to Matemáticas, Física y Química, Tecnología, and Dibujo Técnico.
- Circles show only `1º`, `2º`, `3º`, or `4º`.
- Content ranges show compact labels such as `1º → 2º`.
- Only specialized titles drop a redundant trailing grade; plain titles such as `Matemáticas 1º ESO` retain it.
- Do not change curriculum data, routes, progress logic, manifests, or dependencies.
- Keep the application desktop-only and preserve each subject's existing theme.

## Review Focus

- Ordinals embedded late in specialized names still become the circle label.
- Parenthesized grades in CCSS titles are removed without losing `I` or `II`.
- Plain subject courses retain their grade in the card title.
- A single-course content block displays one ordinal without an arrow.
- Ranges spanning non-consecutive courses show their actual first and last ordinal.

---

### Task 1: Presentation formatters

**Files:**

- Modify: `src/lib/navigation/learning-trail.ts`
- Test: `src/tests/unit/navigation/navigation.test.ts`

**Interfaces:**

- Produces: `courseLevelLabel(title: string): string`, `courseCardTitle(title: string): string`, and `courseRangeLabel(titles: string[]): string`.

- [x] **Step 1: Write failing table-driven tests**

Cover literal expectations for standard, specialized, parenthesized, single-level, and ranged titles, including `Dibujo Técnico I 1º Bachillerato → { level: "1º", title: "Dibujo Técnico I" }`, `Matemáticas 1º ESO → { level: "1º", title: "Matemáticas 1º ESO" }`, and the range `1º → 2º`.

- [x] **Step 2: Run the navigation test and verify RED**

Run: `npm run test:run -- src/tests/unit/navigation/navigation.test.ts`

Expected: FAIL because the three formatter exports do not exist.

- [x] **Step 3: Implement the three pure formatters**

Extract the first ordinal matching `1º` through `4º`; remove only a trailing grade suffix from titles that already carry a differentiating Roman numeral `I` or `II`; build ranges from the first and last valid ordinal, returning one ordinal when both match.

- [x] **Step 4: Run the navigation test and verify GREEN**

Run: `npm run test:run -- src/tests/unit/navigation/navigation.test.ts`

Expected: PASS.

### Task 2: Course and content card hierarchy

**Files:**

- Modify: `src/components/learning/course-catalog.tsx`
- Modify: `src/components/learning/block-catalog.tsx`

**Interfaces:**

- Consumes: the three formatters from Task 1.

- [x] **Step 1: Replace local string splitting in course cards**

Use `courseLevelLabel(course.title)` in the circle and `courseCardTitle(course.title)` in the heading. Preserve the full stored title as accessible context where useful.

- [x] **Step 2: Replace the verbose block range formatter**

Use `courseRangeLabel(block.courses.map(course => course.title))`, keeping the existing subject-themed badge.

- [x] **Step 3: Refine spacing and typography**

Make the ordinal circle visually stable for all four values, give headings a consistent line height, and keep metadata aligned at the bottom without changing the responsive grid.

- [x] **Step 4: Run focused and static verification**

Run: `npm run test:run -- src/tests/unit/navigation/navigation.test.ts`

Run: `npx tsc --noEmit`

Run: `npx eslint src/lib/navigation/learning-trail.ts src/components/learning/course-catalog.tsx src/components/learning/block-catalog.tsx src/tests/unit/navigation/navigation.test.ts`

Expected: all commands exit 0.

- [x] **Step 5: Run representative UI verification**

Start the existing preview workflow and inspect the course and content views for all four subjects at a desktop viewport. Confirm circles, specialized titles, standard titles, single-level badges, and ranged badges match the spec.

- [x] **Step 6: Run the relevant regression suite**

Run: `npm run test:run`

Expected: all tests pass; report any pre-existing unrelated failures separately.
