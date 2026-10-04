import { expect, test } from "@playwright/test";

test("multiplicación y división — escenario de entradas", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/multiplicacion-division-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("mul-div-multiplicar-repetido")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });
});

test("multiplicación y división — lección unificada en catálogo", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/multiplicacion-division-naturales");
  await expect(page.getByTestId("interactive-lesson-layout")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("text=Multiplicación y división").first()).toBeVisible();
});

test("orden de operaciones — carga la lección 5", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/division-orden-operaciones-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("text=Orden fijo").first()).toBeVisible();
});
