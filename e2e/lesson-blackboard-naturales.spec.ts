import { expect, test } from "@playwright/test";

const LESSON_SLUG = "sistemas-numeracion-naturales";
const STORAGE_KEY = "eaxy-local-progress";

test("lección numeración en pizarra sin tarjeta blanca", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(`/aprender/leccion-interactiva/${LESSON_SLUG}?reiniciar=1`);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  for (let i = 0; i < 3; i += 1) {
    await page.getByTestId("lesson-continue-button").click();
  }

  await expect(page.getByTestId("naturales-numeracion-contar-diez")).toBeVisible();
  await expect(page.getByTestId("lesson-step-phase")).toHaveCount(0);

  const whiteCard = page.locator('[data-testid="naturales-numeracion-contar-diez"] .bg-white');
  await expect(whiteCard).toHaveCount(0);

  await page.getByTestId("lesson-slides-toggle").click();
  await expect(page.getByTestId("lesson-slides-sidebar")).toBeVisible();
  await page.screenshot({ path: "/opt/cursor/artifacts/lesson-blackboard-contar-diez.png", fullPage: false });

  await page.getByTestId("lesson-slides-sidebar").getByRole("button", { name: "Cerrar panel" }).click();
});
