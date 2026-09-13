import { expect, test } from "@playwright/test";

const LINEAR_BASIC_LESSON_ID = "a3000000-0000-4000-8000-000000000001";

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
}

test("alumno navega el curso, practica una lección y la completa", async ({ page }) => {
  await provisionStudentAndLogin(page, "Alumno Curso E2E");

  await page.getByTestId("aprender-course-link").click();
  await expect(page).toHaveURL(/\/aprender\/curso$/);
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(page.getByTestId("course-lesson-link")).toHaveCount(2);

  await page.getByTestId("course-lesson-link").first().click();
  await expect(page).toHaveURL(new RegExp(`/aprender/curso/${LINEAR_BASIC_LESSON_ID}$`));
  await expect(page.getByTestId("lesson-detail")).toBeVisible();
  await expect(page.getByTestId("lesson-video-embed")).toBeVisible();

  await page.getByTestId("lesson-practice-link").click();
  await expect(page).toHaveURL(
    new RegExp(`/aprender/practicar\\?leccion=${LINEAR_BASIC_LESSON_ID}`),
  );

  await page.getByRole("radio", { name: "x = 3" }).check();
  await page.getByTestId("exercise-submit-button").click();
  await expect(page.getByTestId("exercise-feedback")).toContainText("Correcto");

  await page.getByRole("link", { name: "Volver a la lección" }).click();
  await expect(page.getByTestId("lesson-complete-button")).toBeEnabled();
  await page.getByTestId("lesson-complete-button").click();

  await expect(page.getByTestId("lesson-completed-badge")).toBeVisible();
});
