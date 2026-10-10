import { expect, test } from "@playwright/test";

test("tutor permanece idle con ojos abiertos mientras habla en numeración", async ({ page }) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/sistemas-numeracion-naturales?reiniciar=1",
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });

  const mascot = page.getByTestId("lesson-tutor-button").getByTestId("tutor-mascot");

  await expect(page.getByTestId("lesson-tutor-bubble")).toBeVisible({ timeout: 10_000 });
  await expect(mascot).toHaveAttribute("data-mood", "idle");
  await expect(mascot).toHaveAttribute("data-mood", "idle", { timeout: 25_000 });
});
