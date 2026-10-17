import { expect, test } from "@playwright/test";

const URL =
  "/aprender/curso/matematicas-1-eso/tema/potencias-y-raices/leccion/potencias-base-exponente?reiniciar=1";

test("potencias — base y exponente: sin LaTeX crudo y Continuar al final", async ({ page }) => {
  await page.goto(URL);
  await expect(page.getByTestId("potencias-base-exponente")).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText("cdot")).toHaveCount(0);
  await expect(page.getByText("$")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });
});

test("potencias — cuadrado y cubo: sin 'cdot' ni '$' literales", async ({ page }) => {
  await page.goto(URL);
  await page.getByTestId("lesson-presenter-forward").click({ timeout: 30_000 });
  await expect(page.getByTestId("lesson-slide")).toBeVisible();
  await expect(page.getByText("cdot")).toHaveCount(0);
  await expect(page.getByText("$")).toHaveCount(0);
  await page.getByTestId("lesson-presenter-forward").click();
  await expect(page.getByTestId("potencias-cuadrado-cubo")).toBeVisible();
  await expect(page.getByText("cdot")).toHaveCount(0);
  await expect(page.getByText("$")).toHaveCount(0);
});
