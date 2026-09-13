import { expect, test } from "@playwright/test";

async function loginAsProvisionedStudent(page: import("@playwright/test").Page) {
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
}

test("alumno navega el curso y marca una lección como completada", async ({ page }) => {
  await loginAsProvisionedStudent(page);

  await page.getByTestId("aprender-curso-link").click();
  await expect(page).toHaveURL(/\/curso$/);
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(page.getByTestId("course-progress-summary")).toHaveText(
    "0 de 3 lecciones completadas",
  );

  await page.getByTestId("course-lesson-link-0").click();
  await expect(page).toHaveURL(/\/curso\/a3000000-0000-4000-8000-000000000001$/);
  await expect(page.getByTestId("lesson-status-started")).toBeVisible();
  await expect(page.getByTestId("lesson-video-embed")).toBeVisible();

  await page.getByTestId("lesson-complete-button").click();
  await expect(page.getByTestId("lesson-status-completed")).toBeVisible();

  await page.goto("/curso");
  await expect(page.getByTestId("course-progress-summary")).toHaveText(
    "1 de 3 lecciones completadas",
  );
});
