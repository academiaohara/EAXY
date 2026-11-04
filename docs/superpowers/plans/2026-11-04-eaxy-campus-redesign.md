# Eaxy Campus Contemporary Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved «Campus contemporáneo» system to every student-facing Eaxy surface outside the interactive lesson player, with course entry points named only by school year.

**Architecture:** Add one pure course-level grouping module, then move shared visual tokens and navigation into the existing layout primitives. Page work proceeds from shared entry points (Inicio and Aprender) to deeper course surfaces and finally practice, profile, and authentication, preserving current data queries and canonical course/lesson URLs.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Lucide React, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-04-eaxy-campus-redesign-design.md`

## Global Constraints

- Keep `DesktopOnlyGate`; Eaxy remains desktop-only below 768 px and must not gain a mobile menu or mobile-only layout.
- Do not redesign interactive lesson routes, their tutor, steps, tools, animations, or internal exercises.
- Do not reactivate or redesign `/aulas`; do not redesign the internal `/tutor` showcase.
- Include `/practicar/[conceptSlug]`, `/practicar/tema/[moduleId]`, and `/aprender/ejercicio/[exerciseId]` in the redesign.
- Display first-level course choices exactly as `1 ESO`, `2 ESO`, `3 ESO`, `4 ESO`, `1 Bachillerato`, or `2 Bachillerato`; no `º`, subject prefix, or specialization at that level.
- Reveal real variant names only after a duplicated level is opened inline on the subject page; do not add a level route or change canonical course URLs.
- Reuse current dependencies and data queries; add no dependency unless a later verified blocker requires it.
- Preserve local-progress, authenticated-progress, recommendation, empty, and `Próximamente` states.
- Meet WCAG AA contrast, visible keyboard focus, semantic heading order, `aria-current`, and `prefers-reduced-motion` behavior.

## Review Focus

- Duplicate levels such as Matemáticas `4 ESO` and both Bachillerato years must expose every real variant without duplicate first-level cards; Task 1 and Task 5 test this.
- A Supabase course title that does not match the known ESO/Bachillerato pattern must remain reachable rather than disappearing; Task 1 tests the fallback group.
- A level whose courses have no lessons must remain visible as `Próximamente` and must not look actionable; Task 5 tests this.
- Guest and authenticated headers must keep their distinct progress/account actions while sharing navigation; Task 3 tests both states.
- Entering an interactive lesson must still hide the global chrome and retain the board theme after global token changes; Task 8 pins this with E2E coverage.

---

## Planned File Structure

- `src/lib/navigation/course-levels.ts`: sole source of level parsing, ordering, fallback grouping, and variant labels.
- `src/lib/navigation/app-destinations.ts`: sole source of primary header destinations and active-route resolution.
- `src/components/learning/course-level-catalog.tsx`: reusable subject-level year/variant selector.
- `src/components/marketing/home-course-explorer.tsx`: homepage-only subject and year explorer built from the same grouping interface.
- `src/components/auth/auth-shell.tsx`: shared two-zone desktop frame for login and registration.
- Existing layout and learning components keep their current data and interaction responsibilities; this plan changes presentation rather than introducing parallel replacements.

### Task 1: Course level and variant model

**Files:**
- Create: `src/lib/navigation/course-levels.ts`
- Modify: `src/lib/navigation/learning-trail.ts`
- Modify: `src/components/learning/block-outline.tsx`
- Test: `src/tests/unit/navigation/course-levels.test.ts`
- Test: `src/tests/unit/navigation/navigation.test.ts`

**Interfaces:**
- Produces: `CourseLevelKey`, `CourseLevel`, `CourseLevelGroup<T>`, `getCourseLevel(title)`, `formatCourseLevel(title)`, `getCourseVariantLabel(title)`, and `groupCoursesByLevel(courses)`.
- `CourseLevelGroup<T>` contains `{ key, label, stage, order, courses }`; known groups use the six exact labels from Global Constraints and unknown courses get their own fallback group.
- Later tasks consume `formatCourseLevel`, `getCourseVariantLabel`, and `groupCoursesByLevel`; no page may parse level strings independently.

- [ ] **Step 1: Write failing level-model tests**

Add table-driven assertions that:

```ts
expect(formatCourseLevel("Matemáticas 1º ESO")).toBe("1 ESO");
expect(formatCourseLevel("Física 2º Bachillerato")).toBe("2 Bachillerato");
expect(getCourseVariantLabel("Matemáticas 4º ESO (A)")).toBe("Opción A");
expect(getCourseVariantLabel("Matemáticas Aplicadas a las CCSS I (1º Bachillerato)"))
  .toBe("Ciencias Sociales");
```

Assert grouping produces one `4 ESO` group containing A and B in curriculum order, one `1 Bachillerato` group containing Ciencias and Ciencias Sociales, and a separate reachable fallback group for an unknown title.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npm run test:run -- src/tests/unit/navigation/course-levels.test.ts src/tests/unit/navigation/navigation.test.ts`

Expected: FAIL because `course-levels.ts` and the normalized labels do not exist.

- [ ] **Step 3: Implement the pure model**

Define the six ordered levels in `course-levels.ts`. Match both parenthesized and trailing `1º`–`4º` titles, derive only the approved display label, preserve catalog order inside groups, and emit one fallback group per unrecognized course using its existing short title.

- [ ] **Step 4: Route breadcrumbs and content ranges through the model**

Update `learning-trail.ts` so breadcrumbs use `formatCourseLevel` (`1 ESO`, not `1º ESO`) while specialized content-range helpers can continue showing compact numeric ranges where their context requires them. Update `block-outline.tsx` only where it prints a course label.

- [ ] **Step 5: Run tests and type-check the touched model**

Run: `npm run test:run -- src/tests/unit/navigation/course-levels.test.ts src/tests/unit/navigation/navigation.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/navigation/course-levels.ts src/lib/navigation/learning-trail.ts src/components/learning/block-outline.tsx src/tests/unit/navigation/course-levels.test.ts src/tests/unit/navigation/navigation.test.ts
git commit -m "feat: group courses by school year"
```

### Task 2: Visual foundation and shared UI primitives

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/brand-logo.tsx`
- Modify: `src/lib/navigation/subjects.ts`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Test: `src/tests/unit/ui/campus-theme.test.ts`

**Interfaces:**
- Produces CSS variables `--forest`, `--ivory`, `--surface`, `--sun`, `--coral`, `--muted-ink`, and subject accents while preserving the legacy variables consumed by lesson code.
- Produces shared surface, focus, and motion behavior through existing `Button`, `Card`, `Badge`, `Input`, and `Textarea` exports; no new UI library is introduced.

- [ ] **Step 1: Write a failing token contract test**

Read `src/app/globals.css` in the test and assert the root theme defines these exact approved values:

```ts
expect(css).toContain("--forest: #193a32");
expect(css).toContain("--ivory: #f4f3ec");
expect(css).toContain("--surface: #fffdf8");
expect(css).toContain("--sun: #f4c95d");
expect(css).toContain("--coral: #e9785c");
expect(css).toContain("@media (prefers-reduced-motion: reduce)");
```

Also assert the board-stage variables remain present.

- [ ] **Step 2: Run the token test and verify failure**

Run: `npm run test:run -- src/tests/unit/ui/campus-theme.test.ts`

Expected: FAIL on the missing campus tokens.

- [ ] **Step 3: Add the campus tokens without breaking lesson tokens**

Map `--paper`, `--paper-raised`, `--ink`, `--ink-muted`, `--primary`, `--border`, and focus-ring aliases to the new palette. Update `SUBJECT_THEME` to the approved violet, turquoise, coral/orange, and blue identities using literal Tailwind classes. Add reusable background/surface utilities only when repeated classes cannot express the approved design. Keep `.lesson-stage-theme-board` values unchanged and add a reduced-motion rule scoped so it does not disable meaningful lesson state changes.

- [ ] **Step 4: Restyle primitives and brand mark**

Update existing variants rather than adding page-specific button/card clones. Change `BrandLogo` to the round forest `e` mark from direction B, retaining `aria-label="Eaxy, ir al inicio"` and its existing `href` API.

- [ ] **Step 5: Update metadata copy**

Keep the title template and student-facing subject description; remove the obsolete claim that the public product manages classrooms because Aulas is out of scope and disabled.

- [ ] **Step 6: Verify tokens and existing component tests**

Run: `npm run test:run -- src/tests/unit/ui/campus-theme.test.ts src/tests/unit/utils.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/layout/brand-logo.tsx src/lib/navigation/subjects.ts src/components/ui src/tests/unit/ui/campus-theme.test.ts
git commit -m "feat: add campus visual foundation"
```

### Task 3: Unified primary navigation and application shell

**Files:**
- Create: `src/lib/navigation/app-destinations.ts`
- Modify: `src/components/layout/app-nav.tsx`
- Modify: `src/components/layout/app-shell.tsx`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/guest-progress-banner.tsx`
- Test: `src/tests/unit/navigation/app-destinations.test.ts`
- Test: `e2e/home.spec.ts`
- Test: `e2e/progreso.spec.ts`

**Interfaces:**
- Produces `APP_DESTINATIONS` with `Inicio`, `Aprender`, `Practicar`, and `Mi progreso` and `getActiveAppDestination(pathname): AppDestinationKey | null`.
- `AppNav` continues to accept no props and reads `usePathname`; both public and app headers consume it.

- [ ] **Step 1: Write failing route-resolution tests**

Assert `/` selects Inicio, all `/aprender/**` routes select Aprender, `/practicar/**` selects Practicar, and `/perfil` plus `/progreso` select Mi progreso. Assert `/login`, `/registro`, unknown paths, and `null` do not produce a false active destination. Interactive lesson URLs may still resolve to Aprender because their layout hides the complete chrome.

- [ ] **Step 2: Update E2E expectations before implementation**

Change `home.spec.ts` to expect `app-nav-inicio`, `app-nav-aprender`, `app-nav-practicar`, and `app-nav-progreso` with their canonical hrefs. Extend `progreso.spec.ts` to check the guest profile action remains reachable and the active destination uses `aria-current="page"`.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `npm run test:run -- src/tests/unit/navigation/app-destinations.test.ts`

Expected: FAIL because the destination module does not exist.

- [ ] **Step 4: Implement destination resolution and the shared nav**

Keep primary navigation textual and compact; do not add subject links or a mobile menu. Use `aria-current`, visible focus, and stable `data-testid="app-nav-${key}"` identifiers.

- [ ] **Step 5: Unify `SiteHeader` and `AppShell` composition**

Use the same nav and brand language in both headers while preserving guest/authenticated differences, logout action, profile link, sticky behavior, and the `data-app-chrome` hiding contract on interactive lesson layouts. Restyle the guest banner as a compact integrated notice without changing its copy semantics or `guest-progress-banner` test id.

- [ ] **Step 6: Run navigation checks**

Run: `npm run test:run -- src/tests/unit/navigation/app-destinations.test.ts src/tests/unit/navigation/navigation.test.ts`

Run: `npx playwright test e2e/home.spec.ts e2e/progreso.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/navigation/app-destinations.ts src/components/layout src/tests/unit/navigation/app-destinations.test.ts e2e/home.spec.ts e2e/progreso.spec.ts
git commit -m "feat: unify campus navigation"
```

### Task 4: Homepage as a useful learning entry point

**Files:**
- Create: `src/components/marketing/home-course-explorer.tsx`
- Create: `src/components/marketing/home-continue-card.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/marketing/demo-exercise.tsx`
- Modify: `src/components/marketing/hero-equation.tsx`
- Delete: `src/components/marketing/section-dot-nav.tsx`
- Test: `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `groupCoursesByLevel` and `formatCourseLevel` from Task 1; `getAprenderContinueStudying(studentId)` and `AprenderStudyShortcut` from the existing curriculum layer; shared header/primitives from Tasks 2–3.
- Produces: `HomeCourseExplorer({ courses })`, where `courses` is the existing embedded curriculum course array and links always target canonical subject/course destinations.
- Produces: `HomeContinueCard({ entry })`, where `entry` is the real primary shortcut for the current authenticated/preview context; it is absent when no shortcut exists.

- [ ] **Step 1: Write failing homepage E2E assertions**

Assert the homepage has one H1 containing `Tu siguiente gran idea`, CTA `Elegir mi curso`, sections with accessible names `Materias`, `Cómo funciona`, and `Preguntas frecuentes`, and no `section-dot-nav`. In preview/E2E mode, assert `home-continue-card` links to the real shortcut returned by the curriculum layer. Assert Matemáticas visibly contains `1 ESO`, `4 ESO`, `1 Bachillerato`, and `2 Bachillerato` without `1º` or a repeated `Matemáticas 1` course title.

- [ ] **Step 2: Run the homepage test and verify failure**

Run: `npx playwright test e2e/home.spec.ts --project=chromium`

Expected: FAIL on the new heading/course-explorer assertions.

- [ ] **Step 3: Recompose `page.tsx` around direction B**

Make `page.tsx` async, resolve the existing student id, and request the same continuation data used by Aprender. Build the green campus hero, yellow/coral geometric accents, real continuation card when data exists, primary course CTA otherwise, concrete interactive demonstration, subject/year explorer, distinct explanation sections, FAQ, and final CTA. Keep claims grounded in current functionality. Remove the lateral dot-nav and repeated feature-card filler.

- [ ] **Step 4: Build `HomeCourseExplorer` from real curriculum data**

Show the four subjects with their approved accent/icon and only normalized year pills. A year with multiple variants still appears once; homepage clicks go to the subject page so the inline selector can resolve the variant there.

- [ ] **Step 5: Verify homepage behavior and desktop bounds**

Run: `npx playwright test e2e/home.spec.ts e2e/desktop-only.spec.ts --project=chromium`

Expected: PASS at supported desktop widths and continued blocking below 768 px.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/marketing e2e/home.spec.ts
git commit -m "feat: redesign the Eaxy homepage"
```

### Task 5: Aprender, subjects, and inline year/variant selection

**Files:**
- Create: `src/components/learning/course-level-catalog.tsx`
- Modify: `src/app/aprender/page.tsx`
- Modify: `src/app/aprender/materia/[subject]/page.tsx`
- Modify: `src/components/learning/subject-cards.tsx`
- Modify: `src/components/learning/subject-hero.tsx`
- Modify: `src/components/learning/subject-view-tabs.tsx`
- Modify: `src/components/learning/course-catalog.tsx`
- Modify: `src/components/learning/aprender-continue-section.tsx`
- Modify: `src/components/learning/aprender-quick-stats.tsx`
- Modify: `src/components/learning/recommendation-card.tsx`
- Modify: `src/components/learning/block-catalog.tsx`
- Modify: `src/components/learning/block-outline.tsx`
- Test: `src/tests/unit/learning/course-level-catalog.test.tsx`
- Test: `e2e/aprender-course.spec.ts`

**Interfaces:**
- Consumes: `CourseLevelGroup<CourseCatalogEntry>[]` from Task 1.
- Produces: `CourseLevelCatalog({ courses, subject })`; single-course groups render a canonical course link, duplicate groups render a native inline `<details>` variant selector, and unavailable groups render a non-actionable `Próximamente` state.

- [ ] **Step 1: Write failing component tests for all three group states**

Render fixtures and assert:

```ts
expect(screen.getByRole("link", { name: /2 ESO/ })).toHaveAttribute("href", "/aprender/curso/fisica-2-eso");
expect(screen.getAllByText("4 ESO")).toHaveLength(1);
expect(screen.getByText("Opción A")).toBeInTheDocument();
expect(screen.getByText("Opción B")).toBeInTheDocument();
expect(screen.getByText("Próximamente")).toBeInTheDocument();
```

The unavailable fixture must have no course link.

- [ ] **Step 2: Update the E2E catalog journey before implementation**

Change `aprender-course.spec.ts` to navigate Aprender → Matemáticas → `4 ESO` → `Opción A` → course. Assert the first-level year appears once and the course breadcrumb uses `4 ESO` without `º`.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `npm run test:run -- src/tests/unit/learning/course-level-catalog.test.tsx`

Expected: FAIL because `CourseLevelCatalog` does not exist.

- [ ] **Step 4: Implement the catalog and subject page**

Use native disclosure for variants so keyboard and no-JS behavior remain safe. Keep real course descriptions/counts inside the second-level choice only. Replace the old card title/level split in `course-catalog.tsx`; preserve `data-testid="course-link-${course.id}"` on final course links. Apply the same campus surfaces and normalized level labels to the existing Por contenido catalog and block outline without changing their traversal logic.

- [ ] **Step 5: Redesign Aprender and shared learning entry cards**

Keep priority order Continue → Recommendation → Subjects. Restyle, do not change, existing local/authenticated data behavior. Make subject cards show their available normalized years, use approved subject accents, and preserve empty/coming-soon content.

- [ ] **Step 6: Verify component and catalog journeys**

Run: `npm run test:run -- src/tests/unit/learning/course-level-catalog.test.tsx src/tests/unit/curriculum/aprender-home.test.ts`

Run: `npx playwright test e2e/aprender-course.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/aprender src/components/learning src/tests/unit/learning/course-level-catalog.test.tsx e2e/aprender-course.spec.ts
git commit -m "feat: redesign learning catalog by year"
```

### Task 6: Course and topic surfaces outside the lesson player

**Files:**
- Modify: `src/components/learning/course-hero.tsx`
- Modify: `src/components/learning/course-math-emblem.tsx`
- Modify: `src/components/learning/course-outline.tsx`
- Modify: `src/components/learning/course-topic-picker.tsx`
- Modify: `src/components/learning/course-topic-carousel.tsx`
- Modify: `src/components/learning/course-topic-quick-access.tsx`
- Modify: `src/components/learning/course-topic-view.tsx`
- Modify: `src/components/learning/learning-path.tsx`
- Modify: `src/components/learning/lesson-path-node.tsx`
- Modify: `src/components/learning/lesson-detail.tsx`
- Modify: `src/components/learning/lesson-detail-with-local-progress.tsx`
- Modify: `src/components/layout/breadcrumbs.tsx`
- Test: `e2e/aprender-course.spec.ts`
- Test: `e2e/lesson-layout-chrome.spec.ts`

**Interfaces:**
- Consumes: normalized level labels from Task 1 and shared surfaces from Task 2.
- Preserves: all existing component props, progress calculation, topic selection, lesson href resolution, and `data-testid` contracts unless the updated E2E test explicitly documents a replacement.

- [ ] **Step 1: Add failing E2E assertions for the redesigned course chrome**

Assert the course H1 uses the normalized level as its primary label, the subject/variant remains available as supporting context, the next-step CTA and progressbar are still present, and topic navigation can open the first interactive lesson.

- [ ] **Step 2: Run the course E2E test and verify failure**

Run: `npx playwright test e2e/aprender-course.spec.ts --project=chromium`

Expected: FAIL on the normalized course heading/presentation assertions.

- [ ] **Step 3: Apply the campus hierarchy to course and topic components**

Use warm surfaces, forest headings, subject accents, restrained progress color, consistent radii, and clearer next-step hierarchy. Restyle the pre-lesson detail and legacy exercise-lesson overview because they remain inside the normal app shell. Keep dense topic selection usable at 768 px without a mobile alternative. Do not import or change any `src/components/lesson/**` file.

- [ ] **Step 4: Normalize visible deep-route labels**

Use `formatCourseLevel` for breadcrumb and course-level presentation. Keep the real course title or variant as secondary text when it is needed to distinguish Ciencias Sociales, Opción B, Tecnología Industrial, or ampliación.

- [ ] **Step 5: Verify course and lesson-boundary behavior**

Run: `npx playwright test e2e/aprender-course.spec.ts e2e/lesson-layout-chrome.spec.ts --project=chromium`

Expected: PASS; the lesson route still hides `[data-app-chrome]`.

- [ ] **Step 6: Commit**

```bash
git add src/components/learning src/components/layout/breadcrumbs.tsx e2e/aprender-course.spec.ts e2e/lesson-layout-chrome.spec.ts
git commit -m "feat: restyle course and topic journeys"
```

### Task 7: Practice, profile, and authentication surfaces

**Files:**
- Create: `src/components/auth/auth-shell.tsx`
- Modify: `src/app/login/page.tsx`
- Modify: `src/app/registro/page.tsx`
- Modify: `src/components/auth/adult-login-form.tsx`
- Modify: `src/components/auth/adult-register-form.tsx`
- Modify: `src/app/perfil/page.tsx`
- Modify: `src/components/learning/progress-stats.tsx`
- Modify: `src/components/learning/concept-map.tsx`
- Modify: `src/components/learning/practice-session.tsx`
- Modify: `src/components/learning/practice-topic-view.tsx`
- Modify: `src/components/learning/exercise-practice.tsx`
- Test: `src/tests/unit/auth/auth-shell.test.tsx`
- Test: `e2e/practice.spec.ts`
- Test: `e2e/progreso.spec.ts`
- Test: `e2e/home.spec.ts`

**Interfaces:**
- Produces: `AuthShell({ title, description, children })` with a focused form zone and a restrained branded zone; forms retain their server actions and field names.
- Preserves: practice completion/mastery behavior, `/progreso` → `/perfil` redirect, guest notice, and authentication routes.

- [ ] **Step 1: Write a failing auth-shell component test**

Render `AuthShell` and assert one H1, the supplied description, a link named `Eaxy, ir al inicio`, and an accessible region containing `children`. Do not test decorative class strings.

- [ ] **Step 2: Extend practice/profile E2E expectations**

Assert `/practicar` resolves to a page with shared app navigation and `practice-session`; `/perfil` retains `Invitado`, the guest notice, and three summary statistics; `/login` and `/registro` each show one focused form and no app chrome.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `npm run test:run -- src/tests/unit/auth/auth-shell.test.tsx`

Expected: FAIL because `AuthShell` does not exist.

- [ ] **Step 4: Implement the shared auth frame and restyle forms**

Do not add fields or alter actions. Use the campus mark, ivory/green split composition, clear errors, visible focus, and existing login/registration copy.

- [ ] **Step 5: Restyle profile and practice without changing state logic**

Apply shared surfaces, typography, progress treatment, empty state, and CTA hierarchy. Keep `MasteryBadge`, `ExerciseRenderer`, local/authenticated overview queries, and all completion callbacks unchanged.

- [ ] **Step 6: Verify student utility surfaces**

Run: `npm run test:run -- src/tests/unit/auth/auth-shell.test.tsx`

Run: `npx playwright test e2e/practice.spec.ts e2e/progreso.spec.ts e2e/home.spec.ts --project=chromium`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/auth src/app/login src/app/registro src/app/perfil src/components/learning src/tests/unit/auth/auth-shell.test.tsx e2e/practice.spec.ts e2e/progreso.spec.ts e2e/home.spec.ts
git commit -m "feat: redesign student utility surfaces"
```

### Task 8: Integrated accessibility, lesson-boundary, and visual QA

**Files:**
- Create: `e2e/campus-redesign.spec.ts`
- Modify only if verification finds a defect: files owned by Tasks 2–7

**Interfaces:**
- Consumes all prior task interfaces.
- Produces no new product API; this task pins cross-page behavior and closes verified regressions.

- [ ] **Step 1: Write the integrated E2E journey before final fixes**

Cover these assertions in one serially independent spec:

1. At 1440×1000, header links expose visible focus and the active destination uses `aria-current`.
2. Inicio → Matemáticas → `4 ESO` reveals two variants, then Opción A opens its unchanged canonical course URL.
3. The course can open a topic and interactive lesson.
4. On the interactive lesson, global chrome is hidden, `interactive-lesson-layout` retains `lesson-stage-theme-board`, and board background variables compute to the existing dark theme.
5. With reduced motion enabled, campus page transitions do not animate while actions remain usable.
6. Parameterized checks at 768, 1024, 1440, and 1920 px keep headings, navigation, cards, and CTAs inside the viewport without overlap; at 767 px `DesktopOnlyGate` blocks the app.

- [ ] **Step 2: Run the new spec and record every failure**

Run: `npx playwright test e2e/campus-redesign.spec.ts --project=chromium`

Expected: PASS if earlier tasks are complete; otherwise each failure names a cross-page contract to repair.

- [ ] **Step 3: Fix only observed integration defects**

Keep fixes within the ownership boundaries above. Do not expand scope into Aulas, `/tutor`, or `src/components/lesson/**`.

- [ ] **Step 4: Run static and unit verification**

Run: `npm run lint`

Run: `npm run test:run`

Expected: both exit 0.

- [ ] **Step 5: Run full browser verification**

Run: `npm run test:e2e`

Expected: exit 0 with all Playwright projects passing.

- [ ] **Step 6: Run the production build**

Run: `npm run build`

Expected: exit 0 with all routes compiled, including existing interactive lessons.

- [ ] **Step 7: Inspect the final diff**

Run: `git diff --check HEAD~7..HEAD` (adjust the base to the first implementation commit if commit count differs) and `git status --short`.

Expected: no whitespace errors and only intentional files.

- [ ] **Step 8: Commit integration tests or fixes**

```bash
git add e2e/campus-redesign.spec.ts
git add <only-files-fixed-by-this-task>
git commit -m "test: verify campus redesign journeys"
```
