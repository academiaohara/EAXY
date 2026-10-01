import { expect, test } from "@playwright/test";

test("un visitante puede ver el mapa de conceptos en /progreso", async ({ page }) => {
  await page.goto("/progreso");

  await expect(page.getByRole("heading", { name: "Progreso" })).toBeVisible();
  await expect(page.getByTestId("progreso-guest-notice")).toBeVisible();
});
