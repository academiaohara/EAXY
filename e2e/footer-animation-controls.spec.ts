import { expect, test } from "@playwright/test";

const LESSON_SLUG = "multiplicacion-division-naturales";
const STORAGE_KEY = "eaxy-local-progress";

function seedLessonStep(stepIndex: number, stepCount = 17) {
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
        stars: 0,
        completed: false,
        toolState: {},
        updatedAt: Date.now(),
      },
    },
  };
}

async function advanceFooterAnimationToEnd(page: import("@playwright/test").Page) {
  const footer = page.getByTestId("lesson-footer-dock");
  const play = footer.getByRole("button", { name: /Reproducir animación/i });
  if (await play.isVisible().catch(() => false)) {
    await play.click();
  }
  await expect(footer.getByTestId("lesson-continue-button")).toBeVisible({ timeout: 20_000 });
}

async function expectFooterControlsBesideSkip(page: import("@playwright/test").Page) {
  const footer = page.getByTestId("lesson-footer-dock");
  await expect(footer.getByRole("group", { name: "Controles de animación" })).toBeVisible({
    timeout: 15_000,
  });

  const continueBtn = footer.getByTestId("lesson-continue-button");
  const skipBtn = footer.getByTestId("lesson-skip-button");
  await expect(continueBtn).toBeVisible();
  await expect(skipBtn).toBeVisible();

  const continueBox = await continueBtn.boundingBox();
  const skipBox = await skipBtn.boundingBox();
  expect(continueBox).not.toBeNull();
  expect(skipBox).not.toBeNull();
  if (continueBox && skipBox) {
    expect(continueBox.x).toBeLessThan(skipBox.x);
    expect(skipBox.x - (continueBox.x + continueBox.width)).toBeLessThan(48);
  }
}

test("multiplicación a mano — controles en el centro del pie y Continuar junto a Saltar", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(8) },
  );

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}`);
  const entryDialog = page.getByTestId("interactive-lesson-entry-dialog");
  await entryDialog.waitFor({ state: "visible", timeout: 15_000 });
  await entryDialog.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("button", { name: /Pizarra de multiplicación/i })).toBeVisible({
    timeout: 30_000,
  });

  await expectFooterControlsBesideSkip(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-mul-mano.png", fullPage: false });
});

test("división a mano — controles en el pie, no sobre la pizarra", async ({ page }) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(11) },
  );

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}`);
  const entryDialog = page.getByTestId("interactive-lesson-entry-dialog");
  await entryDialog.waitFor({ state: "visible", timeout: 15_000 });
  await entryDialog.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });

  const stage = page.locator("[data-testid='lesson-narrate-step']");
  await expect(stage.getByRole("group", { name: "Controles de animación" })).toHaveCount(0);

  await advanceFooterAnimationToEnd(page);
  await expectFooterControlsBesideSkip(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-division-mano.png", fullPage: false });
});
