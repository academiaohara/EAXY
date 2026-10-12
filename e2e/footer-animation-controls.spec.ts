import { expect, test } from "@playwright/test";

const LESSON_SLUG = "multiplicacion-division-naturales";
const STORAGE_KEY = "eaxy-local-progress";

function seedLessonStep(stepIndex: number, stepCount = 6) {
  const visitedSteps = Array.from({ length: stepCount }, (_, i) => i <= stepIndex);
  const completedSteps = Array.from({ length: stepCount }, () => false);
  return {
    version: 1,
    lessons: {},
    exercises: {},
    interactiveLessons: {
      [LESSON_SLUG]: {
        stepIndex,
        completedSteps,
        visitedSteps,
        stepAttempts: {},
        completed: false,
        toolState: {},
        updatedAt: Date.now(),
      },
    },
  };
}

async function advanceAnimationToEnd(page: import("@playwright/test").Page) {
  const center = page.getByTestId("lesson-presenter-center");
  const continueBtn = page.getByTestId("lesson-continue-button");
  const play = center.getByRole("button", { name: /Reproducir animación/i });
  if (await play.isVisible().catch(() => false)) {
    await play.click();
  }
  const forward = page.getByTestId("lesson-presenter-forward");
  for (let i = 0; i < 12; i++) {
    if (await continueBtn.isVisible().catch(() => false)) {
      return;
    }
    if (!(await forward.isDisabled())) {
      return;
    }
    const next = center.getByRole("button", { name: "Avanzar un paso" });
    if (await next.evaluate((el) => (el as HTMLButtonElement).disabled)) {
      break;
    }
    await next.click();
  }
  await expect
    .poll(async () => {
      if (await continueBtn.isVisible().catch(() => false)) {
        return true;
      }
      return !(await forward.isDisabled());
    })
    .toBe(true);
}

test("reparto igual — controles al centro y avance con flecha derecha", async ({ page }) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(3) },
  );

  await page.goto(
    `/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/${LESSON_SLUG}`,
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("mul-div-reparto-igual")).toBeVisible({ timeout: 30_000 });

  await expect(page.getByTestId("lesson-presenter-center")).toBeVisible();
  await expect(page.getByTestId("lesson-animation-controls")).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await advanceAnimationToEnd(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-reparto-igual.png", fullPage: false });
});

test("división a mano — controles centrados, no sobre la pizarra SVG", async ({ page }) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(5) },
  );

  await page.goto(
    `/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/${LESSON_SLUG}`,
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("division-mano-chalkboard")).toBeVisible({ timeout: 15_000 });

  const stage = page.locator("[data-testid='lesson-narrate-step']");
  await expect(stage.getByTestId("lesson-animation-controls")).toHaveCount(0);

  await expect(page.getByTestId("lesson-presenter-center")).toBeVisible();
  await advanceAnimationToEnd(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-division-mano.png", fullPage: false });
});
