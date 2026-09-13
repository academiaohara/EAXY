import { expect, test } from "@playwright/test";

test("alumno ve recomendación y ejercicio sugerido en /practicar", async ({ page }) => {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill("Alumno Recomendaciones E2E");
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

  await page.goto("/practicar");

  await expect(page.getByTestId("recommendation-card")).toBeVisible();
  await expect(page.getByTestId("recommendation-summary")).toContainText(
    "Continúa con la siguiente lección del curso.",
  );
  await expect(page.getByTestId("practice-exercise-panel")).toBeVisible();
  await expect(page.getByTestId("multiple-choice-exercise")).toBeVisible();
});
