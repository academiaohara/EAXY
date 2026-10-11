import { expect, test } from "@playwright/test";

const LESSON_URL =
  "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales?reiniciar=1";
const STORAGE_KEY = "eaxy-local-progress";

test("botones del rail responden: saltar, retroceder, avanzar y salir", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(LESSON_URL);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  const title = page.getByTestId("lesson-step-title");
  const initialTitle = await title.innerText();

  const skip = page.getByTestId("lesson-skip-button");
  await expect(skip).toBeVisible();
  await skip.click();
  await expect(title).not.toHaveText(initialTitle, { timeout: 10_000 });

  const back = page.getByTestId("lesson-presenter-back");
  await expect(back).toBeEnabled();
  await back.click();
  await expect(title).toHaveText(initialTitle, { timeout: 10_000 });

  const forward = page.getByTestId("lesson-presenter-forward");
  await expect(forward).toBeEnabled({ timeout: 5_000 });
  await forward.click();
  await expect(title).not.toHaveText(initialTitle, { timeout: 10_000 });

  await page.getByTestId("lesson-exit-link").click();
  await expect(page).toHaveURL(/numeros-naturales/, { timeout: 15_000 });

  await page.screenshot({
    path: "/opt/cursor/artifacts/lesson-presenter-buttons-exit.png",
    fullPage: false,
  });
});
