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
  const continueBtn = footer.getByTestId("lesson-continue-button");
  const play = footer.getByRole("button", { name: /Reproducir animación/i });
  if (await play.isVisible().catch(() => false)) {
    await play.click();
  }
  for (let i = 0; i < 8; i++) {
    if (await continueBtn.isVisible().catch(() => false)) {
      return;
    }
    const next = footer.getByRole("button", { name: "Avanzar un paso" });
    if (await next.evaluate((el) => (el as HTMLButtonElement).disabled)) {
      break;
    }
    await next.click();
  }
  await expect(continueBtn).toBeVisible({ timeout: 20_000 });
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

test("reparto igual — controles en el centro del pie y Continuar junto a Saltar", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(3) },
  );

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}`);
  const entryDialog = page.getByTestId("interactive-lesson-entry-dialog");
  await entryDialog.waitFor({ state: "visible", timeout: 15_000 });
  await entryDialog.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("mul-div-reparto-igual")).toBeVisible({ timeout: 30_000 });

  await advanceFooterAnimationToEnd(page);
  await expectFooterControlsBesideSkip(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-reparto-igual.png", fullPage: false });
});

test("división a mano — controles en el pie, no sobre la pizarra", async ({ page }) => {
  await page.addInitScript(
    ({ key, payload }) => {
      window.localStorage.setItem(key, JSON.stringify(payload));
    },
    { key: STORAGE_KEY, payload: seedLessonStep(4) },
  );

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}`);
  const entryDialog = page.getByTestId("interactive-lesson-entry-dialog");
  await entryDialog.waitFor({ state: "visible", timeout: 15_000 });
  await entryDialog.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("division-mano-chalkboard")).toBeVisible({ timeout: 15_000 });

  const stage = page.locator("[data-testid='lesson-narrate-step']");
  await expect(stage.getByRole("group", { name: "Controles de animación" })).toHaveCount(0);

  await advanceFooterAnimationToEnd(page);
  await expectFooterControlsBesideSkip(page);
  await page.screenshot({ path: "/opt/cursor/artifacts/footer-division-mano.png", fullPage: false });
});
