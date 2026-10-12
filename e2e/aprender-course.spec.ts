import { expect, test, type Page } from "@playwright/test";

const DEMO_COURSE_ID = "a1000000-0000-4000-8000-000000000004";
const DEMO_COURSE_SLUG = "matematicas-4-eso";
const DEMO_MODULE_ID = "a2000000-0000-4000-8000-000000000007";
const DEMO_MODULE_SLUG = "sistemas-de-ecuaciones";
const FIRST_LESSON_ID = "a3000000-0000-4000-8000-000000000701";

async function openAprender(page: Page) {
  await page.goto("/aprender");
  await expect(page.getByTestId("guest-progress-banner")).toBeVisible();
  await expect(page.getByTestId("course-catalog")).toBeVisible();
}

async function openCourseTopic(page: Page) {
  await page.getByTestId(`course-link-${DEMO_COURSE_ID}`).click();
  await expect(page).toHaveURL(new RegExp(`/aprender/curso/${DEMO_COURSE_SLUG}$`));
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(page.getByTestId("course-hero-primary-cta")).toBeVisible();

  await page.getByTestId(`topic-link-${DEMO_MODULE_ID}`).click();
  await expect(page).toHaveURL(
    new RegExp(`/aprender/curso/${DEMO_COURSE_SLUG}/tema/${DEMO_MODULE_SLUG}`),
  );
  await expect(page.getByTestId("course-topic-view")).toBeVisible();
  await expect(page.getByTestId("course-topic-carousel")).toBeVisible();
  await expect(page.getByTestId("course-topic-quick-access")).toBeVisible();
}

async function openFirstLesson(page: Page) {
  await openCourseTopic(page);
  await page.getByTestId(`lesson-link-${FIRST_LESSON_ID}`).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible();
}

test("se puede navegar el catálogo y abrir una lección interactiva sin cuenta", async ({ page }) => {
  await openAprender(page);

  await expect(page.getByTestId("aprender-continue-studying")).toBeVisible();
  await expect(page.getByTestId("aprender-continue-primary-cta")).toBeVisible();

  await openCourseTopic(page);
  await expect(page.getByTestId("topic-carousel-active-number")).toHaveText("01");
  await expect(page.getByTestId("quick-access-next-cta")).toBeVisible();
  await expect(page.getByTestId("breadcrumbs")).toContainText("4º ESO");

  await page.getByTestId(`lesson-link-${FIRST_LESSON_ID}`).click();

  await expect(page).toHaveURL(
    /\/aprender\/curso\/matematicas-4-eso\/tema\/sistemas-de-ecuaciones\/leccion\/ecuaciones-lineales-dos-incognitas$/,
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible();
  await expect(page.getByTestId("lesson-concept-step")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "¿Qué es una ecuación lineal con dos incógnitas?" }),
  ).toBeVisible();
});

test("se consulta el historial del tutor y pide ayuda con botones", async ({ page }) => {
  await openAprender(page);
  await openFirstLesson(page);

  await expect(page.getByTestId("lesson-footer-dock").getByTestId("lesson-tutor")).toHaveCount(0);

  await expect(page.getByTestId("lesson-tutor-bubble")).toBeVisible();
  await expect(page.getByTestId("lesson-tutor-bubble")).toBeHidden({ timeout: 120_000 });

  await page.getByTestId("lesson-tutor-button").click();
  const panel = page.getByTestId("tutor-panel");
  await expect(panel).toBeVisible();
  await expect(panel.getByText("Bolín")).toBeVisible();
  await expect(panel.getByTestId("tutor-panel-log")).toContainText(
    "¿Qué es una ecuación lineal con dos incógnitas?",
  );

  await page.getByTestId("tutor-panel-close").click();
  await expect(panel).toBeHidden();

  await page.getByTestId("lesson-tutor-button").click();
  await expect(panel).toBeVisible();
  await page.getByTestId("tutor-panel-edge-close").click();
  await expect(panel).toBeHidden();

  await page.getByTestId("lesson-help-button").click();
  await expect(page.getByTestId("tutor-help-options")).toBeVisible();
  await expect(page.getByTestId("tutor-help-option-theory")).toBeVisible();

  await page.getByTestId("tutor-help-option-theory").click();
  await expect(page.getByTestId("tutor-help-option-got-it")).toBeVisible();
  await expect(page.getByTestId("tutor-help-option-more")).toBeVisible();

  await page.getByTestId("tutor-help-option-more").click();
  await expect(page.getByTestId("tutor-help-option-restart")).toBeVisible();

  await page.getByTestId("tutor-help-option-close").click();
  await expect(panel).toBeHidden();

  await page.getByTestId("lesson-tutor-button").click();
  await panel.getByTestId("tutor-log-message").filter({ hasText: "es un par de valores" }).click();
  await expect(page.getByTestId("tutor-help-option-concept-solucion")).toBeVisible();
  await page.getByTestId("tutor-help-option-concept-solucion").click();
  await expect(panel.getByTestId("lesson-visual-solution-check")).toBeVisible();

  await page.getByTestId("tutor-help-option-got-it").click();
  await expect(panel).toBeVisible();
  await page.getByTestId("tutor-panel-close").click();

  await page
    .getByTestId("lesson-theory")
    .locator('strong[data-concept="infinitas-soluciones"]')
    .click();
  await expect(panel).toBeVisible();
  await expect(panel.getByTestId("tutor-log-explanation").last()).toContainText("infinitos");
});

test("la lección se ilumina en verde al acertar y en ámbar al fallar", async ({ page }) => {
  await openAprender(page);
  await openFirstLesson(page);

  for (let step = 0; step < 4; step += 1) {
    await page.getByTestId("lesson-continue-button").click();
  }

  const frame = page.getByTestId("lesson-frame");
  await page.getByRole("button", { name: "Ninguna" }).click();
  await page.getByTestId("lesson-check-button").click();
  await expect(frame).toHaveAttribute("data-feedback", "incorrect");
  await expect(page.getByRole("button", { name: "Ayúdame" })).toBeVisible();

  await page.getByRole("button", { name: "Ayúdame" }).click();
  await expect(page.getByTestId("tutor-help-options")).toBeVisible();
});
