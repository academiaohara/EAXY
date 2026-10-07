import { expect, test } from "@playwright/test";

test("multiplicación y división — escenario de entradas", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/multiplicacion-division-naturales");
  await expect(page.getByTestId("lesson-predict-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("mul-div-multiplicar-entradas")).toBeVisible();
  await expect(page.getByLabel("5 entradas de 8 euros")).toBeVisible();
  await page.getByRole("button", { name: "+1 entrada" }).click();
  await expect(page.getByText("Ahora con")).toBeVisible();
  await page.getByRole("button", { name: "48 euros" }).click();
  await page.getByRole("button", { name: "Comprobar" }).click();
  await expect(page.getByText("¡Correcto!")).toBeVisible();
});

test("multiplicación y división — lección unificada en catálogo", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/multiplicacion-division-naturales");
  await expect(page.getByTestId("interactive-lesson-layout")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("text=Multiplicación y división").first()).toBeVisible();
  await expect(page.getByText("Paso 1 de 14")).toBeVisible();
});

test("orden de operaciones — carga la lección 5", async ({ page }) => {
  await page.goto("/aprender/leccion-interactiva/division-orden-operaciones-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("text=Orden fijo").first()).toBeVisible();
});
