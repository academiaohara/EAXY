import { expect, test } from "@playwright/test";

test("multiplicación y división — escenario de entradas", async ({ page }) => {
  await page.goto("/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales");
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("mul-div-multiplicar-repetido")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByTestId("lesson-reveal-step")).toBeVisible();
  await expect(page.getByTestId("mul-div-conmutativa-producto")).toBeVisible();
});

test("multiplicación y división — lección unificada en catálogo", async ({ page }) => {
  await page.goto("/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales");
  await expect(page.getByTestId("interactive-lesson-layout")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("text=Multiplicación y división").first()).toBeVisible();
  await expect(page.getByText("Paso 1 de 10")).toBeVisible();
});

test("orden de operaciones — carga la lección 5", async ({ page }) => {
  await page.goto("/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/division-orden-operaciones-naturales");
  await expect(page.getByTestId("lesson-predict-step")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("¿Quién tiene razón?").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Leo" })).toBeVisible();
});
