import { expect, test } from "@playwright/test";

const DEMO_COURSE_ID = "a1000000-0000-4000-8000-000000000004";
const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000701";

test("el alumno puede navegar el catálogo y abrir la lección interactiva de 4.º ESO", async ({
  page,
}) => {
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
  await expect(page.getByTestId("course-catalog")).toBeVisible();
  await expect(page.getByTestId("recommendation-card")).toBeVisible();
  await expect(page.getByTestId("recommendation-summary")).toContainText(
    "Continúa con la siguiente lección del curso.",
  );

  await page.getByTestId(`course-link-${DEMO_COURSE_ID}`).click();
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Sistemas de ecuaciones no lineales" }),
  ).toBeVisible();

  await page.getByTestId(`lesson-link-${DEMO_LESSON_ID}`).click();

  await expect(page).toHaveURL(/\/aprender\/leccion-interactiva\/sistemas-no-lineales$/);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Sistemas de ecuaciones no lineales" }),
  ).toBeVisible();
});
