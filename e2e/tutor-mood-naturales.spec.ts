import { expect, test } from "@playwright/test";

test("tutor alterna idle y happy mientras habla en la lección de numeración", async ({ page }) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/sistemas-numeracion-naturales?reiniciar=1",
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });

  const mascot = page.getByTestId("lesson-tutor-button").getByTestId("tutor-mascot");

  await expect(mascot).toHaveAttribute("data-mood", "happy", { timeout: 10_000 });
  await expect(page.getByTestId("lesson-tutor-bubble")).toBeVisible();

  await expect(mascot).toHaveAttribute("data-mood", "idle", { timeout: 25_000 });
});
