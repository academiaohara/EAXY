import { expect, test } from "@playwright/test";

test("el perfil muestra su resumen y marca Mi progreso", async ({ page }) => {
  await page.goto("/perfil");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Dominio medio")).toBeVisible();
  await expect(page.getByTestId("app-nav-progreso")).toHaveAttribute("aria-current", "page");
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
