import { expect, test } from "@playwright/test";

test("la página principal carga correctamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Eaxy/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("enlaces de registro y login no devuelven 404", async ({ page }) => {
  await page.goto("/registro");
  await expect(page.getByRole("heading", { name: "Crear cuenta" })).toBeVisible();

  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Acceso docente" })).toBeVisible();
});
