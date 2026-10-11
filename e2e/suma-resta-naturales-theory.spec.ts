import { expect, test } from "@playwright/test";

const LESSON_URL =
  "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/suma-resta-naturales?reiniciar=1";

test("suma y resta — teoría alineada con el temario", async ({ page }) => {
  await page.goto(LESSON_URL);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  await expect(page.getByText(/El equipo ciclista cuesta en total/i)).toBeVisible();
  for (const label of ["Bici", "Casco", "Maillot", "Culotte"]) {
    await page.getByRole("button", { name: new RegExp(label, "i") }).click();
  }
  await expect(page.locator('[aria-live="polite"]').filter({ hasText: "828" })).toBeVisible();
  await expect(page.getByText(/Equipo completo/i)).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByText(/Disponemos de/i)).toBeVisible();
  await expect(page.getByText("693 €").first()).toBeVisible();
  await expect(page.getByText(/todavía nos faltan/i)).toBeVisible();
  await expect(page.locator('[aria-live="polite"]').filter({ hasText: "135" })).toBeVisible();
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByTestId("piramide-dual-parentesis")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/empaquetan resultados parciales/i)).toBeVisible();
});
