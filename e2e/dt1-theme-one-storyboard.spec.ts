import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });

const COURSE = "dibujo-tecnico-1-bachillerato";
const TOPIC = "historia-fundamentos-geometricos";
const STORAGE_KEY = "eaxy-local-progress";

const LESSONS = [
  ["historia-dibujo-tecnico-campos-dt1", "¿Cómo construimos todos el mismo objeto?"],
  ["geometria-griega-pitagoras-dt1", "¿Cómo sabemos que un método siempre funciona?"],
  ["lugares-geometricos-dt1", "¿Dónde están todos los puntos que cumplen una condición?"],
  ["arco-capaz-dt1", "¿Desde dónde se ve AB con el mismo ángulo?"],
] as const;

for (const [slug, centralQuestion] of LESSONS) {
  test(`${slug}: relato sincronizado y recorrido desbloqueado`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.addInitScript((key) => window.localStorage.removeItem(key), STORAGE_KEY);

    await page.goto(
      `/aprender/curso/${COURSE}/tema/${TOPIC}/leccion/${slug}?reiniciar=1`,
    );
    await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("lesson-step-title")).toHaveText(centralQuestion);

    const storyboard = page.getByTestId("lesson-storyboard");
    await expect(storyboard).toBeVisible();
    await expect(storyboard).toHaveClass(/w-full/);
    const narration = page.getByTestId("lesson-storyboard-narration");
    const firstNarration = (await narration.textContent()) ?? "";

    await storyboard.getByRole("button", { name: "Avanzar un paso" }).click();
    await expect(narration).not.toHaveText(firstNarration);
    await storyboard.getByRole("button", { name: "Retroceder un paso" }).click();
    await expect(narration).toHaveText(firstNarration);

    await page.screenshot({
      path: testInfo.outputPath(`${slug}-storyboard.png`),
      fullPage: false,
    });

    for (let index = 0; index < 5; index += 1) {
      const skip = page.getByTestId("lesson-skip-button");
      if (!(await skip.isVisible())) break;
      await skip.click();
      await expect(page.getByTestId("lesson-step-panel")).toBeVisible();
      if (index === 0) {
        await page.waitForTimeout(500);
        await page.screenshot({
          path: testInfo.outputPath(`${slug}-activity.png`),
          fullPage: false,
        });
      }
    }

    expect(consoleErrors).toEqual([]);
  });
}
