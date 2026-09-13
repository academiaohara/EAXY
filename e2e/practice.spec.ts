import { expect, test } from "@playwright/test";

async function provisionAndLoginStudent(page: import("@playwright/test").Page) {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill("Alumno Práctica E2E");
  await page.getByTestId("provision-submit-button").click();

  const firstCard = page.getByTestId("credential-card").first();
  await expect(firstCard).toBeVisible();

  const username = (await firstCard.getByTestId("credential-username").innerText())
    .replace("Usuario:", "")
    .trim();
  const password = (await firstCard.getByTestId("credential-password").innerText())
    .replace("Contraseña:", "")
    .trim();

  await page.goto("/entrar");
  await page.getByTestId("student-login-username").fill(username);
  await page.getByTestId("student-login-password").fill(password);
  await page.getByTestId("student-login-submit").click();

  await expect(page).toHaveURL(/\/aprender$/);
}

test("alumno puede practicar un ejercicio y ver mastery actualizado", async ({ page }) => {
  await provisionAndLoginStudent(page);

  await page.getByTestId("aprender-practicar-link").click();
  await expect(page).toHaveURL(/\/practicar$/);
  await expect(page.getByTestId("practice-session")).toBeVisible();

  await page.locator('input[value="b"]').check();
  await page.getByTestId("exercise-submit-button").click();

  await expect(page.getByTestId("exercise-feedback")).toHaveText(/Correcto/);
  await expect(page.getByTestId("mastery-update")).toContainText("Tu dominio");
  await expect(page.getByTestId("mastery-badge")).toContainText("%");
});
