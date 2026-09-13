import { expect, test } from "@playwright/test";

async function provisionAndLoginStudent(page: import("@playwright/test").Page) {
  await page.goto("/aulas/e2e-classroom/alumnos");
  await page.getByTestId("student-names-input").fill("Alumno Curso E2E");
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

test("alumno puede navegar el curso y abrir una lección con vídeo", async ({ page }) => {
  await provisionAndLoginStudent(page);

  await page.getByTestId("aprender-curso-link").click();
  await expect(page).toHaveURL(/\/curso\//);
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Matemáticas 2º ESO" })).toBeVisible();

  await page.getByTestId("lesson-link").first().click();
  await expect(page.getByRole("heading", { name: "Ecuaciones de primer grado" })).toBeVisible();
  await expect(page.getByTestId("lesson-video")).toBeVisible();
  await expect(page.getByTestId("lesson-status-badge")).toHaveText("En curso");
  await expect(page.getByTestId("lesson-practice-link")).toBeVisible();
});
