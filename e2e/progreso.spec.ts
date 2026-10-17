import { expect, test } from "@playwright/test";

test("un visitante puede ver el mapa de conceptos en su perfil", async ({ page }) => {
  await page.goto("/perfil");

  await expect(page.getByRole("heading", { name: "Invitado" })).toBeVisible();
  await expect(page.getByTestId("progreso-guest-notice")).toBeVisible();
});

test("/progreso redirige al perfil", async ({ page }) => {
  await page.goto("/progreso");

  await expect(page).toHaveURL(/\/perfil$/);
});

test("el icono de perfil de la cabecera lleva al progreso", async ({ page }) => {
  await page.goto("/aprender");
  await page.getByTestId("app-profile-link").click();

  await expect(page).toHaveURL(/\/perfil$/);
});
