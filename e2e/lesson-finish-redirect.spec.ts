import { expect, test } from "@playwright/test";

const LESSON_URL =
  "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales?reiniciar=1";
const STORAGE_KEY = "eaxy-local-progress";

test("al finalizar la lección vuelve al temario sin modal", async ({ page }) => {
  test.setTimeout(120_000);
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(LESSON_URL);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  for (let i = 0; i < 40; i++) {
    if (page.url().includes("/tema/numeros-naturales") && !page.url().includes("/leccion/")) {
      break;
    }

    const feedbackNext = page.getByTestId("lesson-next-button");
    if (await feedbackNext.isVisible().catch(() => false)) {
      await feedbackNext.click();
      await page.waitForTimeout(300);
      continue;
    }

    const skip = page.getByTestId("lesson-skip-button");
    if (await skip.isVisible().catch(() => false)) {
      await skip.click();
      await page.waitForTimeout(300);
      continue;
    }

    const forward = page.getByTestId("lesson-presenter-forward");
    if (await forward.isEnabled().catch(() => false)) {
      await forward.click();
      await page.waitForTimeout(300);
      continue;
    }

    break;
  }

  await expect(page).toHaveURL(/numeros-naturales/, { timeout: 30_000 });
  await expect(page.url()).not.toContain("/leccion/");
  await expect(page.getByTestId("lesson-complete")).toHaveCount(0);
  await expect(page.getByTestId("course-topic-view")).toBeVisible();

  const catalogStatus = await page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as { lessons?: Record<string, string> };
    const entries = Object.entries(parsed.lessons ?? {});
    return entries.find(([id]) => id.length > 0)?.[1] ?? null;
  }, STORAGE_KEY);

  expect(catalogStatus === "completed" || catalogStatus === "incomplete").toBe(true);

  await page.screenshot({
    path: "/opt/cursor/artifacts/lesson-finish-temario-redirect.png",
    fullPage: false,
  });
});
