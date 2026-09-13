import { expect, test } from "@playwright/test";

test("profesor genera accesos y ve tarjetas con credenciales", async ({ page }) => {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await expect(page.getByRole("heading", { name: "Aula de prueba E2E" })).toBeVisible();

  await page.getByTestId("student-names-input").fill("Ana García\nLuis Martínez");
  await page.getByTestId("provision-submit-button").click();

  await expect(page.getByTestId("credential-cards-result")).toBeVisible();
  await expect(page.getByTestId("credential-cards-grid").locator('[data-testid="credential-card"]')).toHaveCount(2);

  const cards = page.getByTestId("credential-card");
  await expect(cards.nth(0).getByTestId("credential-username")).not.toBeEmpty();
  await expect(cards.nth(0).getByTestId("credential-password")).not.toBeEmpty();
  await expect(cards.nth(1).getByTestId("credential-username")).not.toBeEmpty();
  await expect(cards.nth(1).getByTestId("credential-password")).not.toBeEmpty();
});
