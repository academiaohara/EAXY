import { expect, test } from "@playwright/test";

const LESSON_SLUG = "multiplicacion-division-naturales";
const STORAGE_KEY = "eaxy-local-progress";

test("pizarra tipo PowerPoint: título, tutor y controles", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}?reiniciar=1`);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  await expect(page.getByTestId("lesson-progress-bar")).toHaveCount(0);
  await expect(page.getByTestId("lesson-close")).toHaveCount(0);
  await expect(page.getByTestId("lesson-footer-dock")).toHaveCount(0);
  await expect(page.getByTestId("lesson-step-title")).toBeVisible();
  await expect(page.getByTestId("lesson-presenter-rail")).toBeVisible();
  await expect(page.getByTestId("lesson-slides-toggle")).toBeVisible();
  await expect(page.getByTestId("lesson-step-panel")).toBeVisible();
  await expect(page.getByTestId("lesson-tutor")).toBeVisible();

  await page.getByTestId("lesson-slides-toggle").click();
  await expect(page.getByTestId("lesson-slides-sidebar")).toBeVisible();
  await expect(page.getByTestId("lesson-slide-thumb-1")).toBeVisible();
  await page.getByTestId("lesson-slides-toggle").click();
  await expect(page.getByTestId("lesson-slides-sidebar")).toHaveAttribute("aria-hidden", "true");

  const panelBox = await page.getByTestId("lesson-step-panel").boundingBox();
  const frameBox = await page.getByTestId("lesson-frame").boundingBox();
  expect(panelBox).not.toBeNull();
  expect(frameBox).not.toBeNull();
  if (panelBox && frameBox) {
    expect(panelBox.height).toBeGreaterThan(frameBox.height * 0.55);
  }

  await page.screenshot({ path: "/opt/cursor/artifacts/lesson-layout-chrome.png", fullPage: false });
});
