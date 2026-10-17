import { expect, test } from "@playwright/test";

const LESSON_SLUG = "sistemas-numeracion-naturales";
const STORAGE_KEY = "eaxy-local-progress";

test("lección numeración en pizarra con escenas Manim", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(
    `/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/${LESSON_SLUG}?reiniciar=1`,
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  await expect(page.getByTestId("lesson-definition-box")).toBeVisible();
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible();
  await expect(page.getByTestId("sistemas-numeracion-origen-contar-origen-contar")).toBeVisible();

  const whiteCard = page.locator('[data-testid="sistemas-numeracion-origen-contar-origen-contar"] .bg-white');
  await expect(whiteCard).toHaveCount(0);

  for (let i = 0; i < 4; i += 1) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
  }
  const forward = page.getByTestId("lesson-presenter-forward");
  await expect(forward).toBeEnabled({ timeout: 15_000 });

  await page.screenshot({
    path: "/opt/cursor/artifacts/sistemas-numeracion-origen-contar.png",
    fullPage: false,
  });
});
