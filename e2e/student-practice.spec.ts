import { expect, test } from "@playwright/test";

async function provisionStudentAndLogin(page: import("@playwright/test").Page, name: string) {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill(name);
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

  return { usernameValue, passwordValue };
}

test("alumno provisionado completa un ejercicio y ve mastery actualizado", async ({ page }) => {
  await provisionStudentAndLogin(page, "Alumno Práctica E2E");

  await page.getByTestId("aprender-practice-link").click();
  await expect(page).toHaveURL(/\/aprender\/practicar$/);
  await expect(page.getByTestId("practice-session")).toBeVisible();

  await page.getByRole("radio", { name: "x = 3" }).check();
  await page.getByTestId("exercise-submit-button").click();

  await expect(page.getByTestId("exercise-feedback")).toContainText("Correcto");
  await expect(page.getByTestId("practice-mastery-update")).toContainText("100%");
  await expect(page.getByTestId("practice-next-button")).toBeVisible();
});

test("alumno provisionado puede iniciar sesión y llega a /aprender", async ({ page }) => {
  await provisionStudentAndLogin(page, "Alumno Login E2E");

  await expect(page.getByRole("heading", { name: "Aprender" })).toBeVisible();
  await expect(page.getByTestId("aprender-practice-link")).toBeVisible();
});
