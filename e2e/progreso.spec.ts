import { expect, test } from "@playwright/test";

test("el alumno puede ver su mapa de conceptos en /progreso", async ({ page }) => {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill("Alumno Progreso E2E");
  await page.getByTestId("provision-submit-button").click();

  const firstCard = page.getByTestId("credential-card").first();
  await expect(firstCard).toBeVisible();

  const username = await firstCard.getByTestId("credential-username").innerText();
  const password = await firstCard.getByTestId("credential-password").innerText();
  const usernameValue = username.replace("Usuario:", "").trim();
  const passwordValue = password.replace("Contraseña:", "").trim();

  await page.goto("/entrar");
  await page.getByTestId("student-login-username").fill(usernameValue);
  await page.getByTestId("student-login-password").fill(passwordValue);
  await page.getByTestId("student-login-submit").click();

  await expect(page).toHaveURL(/\/aprender$/);

  await page.getByRole("navigation").getByRole("link", { name: "Progreso" }).click();
  await expect(page).toHaveURL(/\/progreso$/);
  await expect(page.getByRole("heading", { name: "Progreso" })).toBeVisible();
  await expect(page.getByText("Dominio medio")).toBeVisible();
  await expect(page.getByTestId("mastery-stats")).toBeVisible();
});
