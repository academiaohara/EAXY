import { expect, test } from "@playwright/test";

test("multiplicación naturales — escenario de entradas", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/multiplicacion-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("mul-div-multiplicar-repetido")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });
});

test("división naturales — escenario de reparto", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/division-orden-operaciones-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("mul-div-reparto-igual")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });
});
