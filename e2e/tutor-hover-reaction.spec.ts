import { expect, test } from "@playwright/test";
import { TUTOR_HOVER_DWELL_MS, TUTOR_HOVER_REACTION_MOODS } from "../src/lib/tutor/hover-reaction";

test("tutor reacciona al quedarse encima un rato", async ({ page }) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/sistemas-numeracion-naturales?reiniciar=1",
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 15_000 });

  const button = page.getByTestId("lesson-tutor-button");
  const mascot = button.getByTestId("tutor-mascot");

  await expect(mascot).toHaveAttribute("data-mood", "idle");

  await button.hover();
  await page.waitForTimeout(TUTOR_HOVER_DWELL_MS + 400);

  const hoverReaction = await button.getAttribute("data-hover-reaction");
  expect(hoverReaction).toBeTruthy();
  expect(TUTOR_HOVER_REACTION_MOODS).toContain(hoverReaction);
  await expect(mascot).toHaveAttribute("data-mood", hoverReaction!);

  await page.mouse.move(0, 0);
  await expect(button).not.toHaveAttribute("data-hover-reaction");
  await expect(mascot).toHaveAttribute("data-mood", "idle");
});
