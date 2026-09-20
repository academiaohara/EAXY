import { expect, test } from "@playwright/test";

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

test("Ir a practicar vuelve a /aprender cuando no hay ejercicios disponibles", async ({ page }) => {
  await provisionAndLoginStudent(page);

  await page.getByTestId("aprender-practicar-link").click();
  await expect(page).toHaveURL(/\/aprender$/);
});

test("un concepto inexistente devuelve 404 en /practicar", async ({ page }) => {
  await provisionAndLoginStudent(page);

  await page.goto("/practicar/concepto-inexistente");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});
