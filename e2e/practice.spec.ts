import { expect, test } from "@playwright/test";

const PRACTICE_CONCEPT_SLUG = "integers-add-subtract";

async function provisionAndLoginStudent(page: import("@playwright/test").Page) {
  const uniqueName = `Alumno Práctica ${Date.now()}`;

  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill(uniqueName);
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

  await page.goto(`/practicar/${PRACTICE_CONCEPT_SLUG}`);
  await expect(page.getByTestId("practice-session")).toBeVisible();
  await expect(page.getByTestId("multiple-choice-exercise")).toBeVisible();

  await page.locator('input[value="a"]').check();
  await page.getByTestId("exercise-submit-button").click();

  await expect(page.getByTestId("mastery-update")).toContainText("Tu dominio");
  await expect(page.getByTestId("mastery-badge")).toContainText("%");
});

test("Ir a practicar redirige a un concepto concreto", async ({ page }) => {
  await provisionAndLoginStudent(page);

  await page.getByTestId("aprender-practicar-link").click();
  await expect(page).toHaveURL(/\/practicar\/.+/);
  await expect(page.getByTestId("practice-session")).toBeVisible();
});
