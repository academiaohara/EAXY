import { expect, test } from "@playwright/test";

const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000001";
const DEMO_EXERCISE_ID = "c1000000-0000-4000-8000-000000000001";

test("el alumno puede navegar el curso desde /aprender", async ({ page }) => {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill("Alumno Curso E2E");
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
  await page.getByTestId(`lesson-link-${DEMO_LESSON_ID}`).click();

  await expect(page).toHaveURL(new RegExp(`/aprender/leccion/${DEMO_LESSON_ID}$`));
  await expect(page.getByTestId("lesson-detail")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ecuaciones de primer grado" })).toBeVisible();

  await page.getByRole("link", { name: "Practicar" }).first().click();
  await expect(page).toHaveURL(new RegExp(`/aprender/ejercicio/${DEMO_EXERCISE_ID}$`));
  await expect(page.getByTestId("exercise-practice")).toBeVisible();
  await expect(page.getByTestId("multiple-choice-exercise")).toBeVisible();
});
