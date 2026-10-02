import { expect, test } from "@playwright/test";

test("la página principal carga correctamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Eaxy/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("la cabecera de inicio enlaza a las secciones de la app", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("app-nav-aprender")).toHaveAttribute("href", "/aprender");
  await expect(page.getByTestId("app-nav-practicar")).toHaveAttribute("href", "/practicar");
  await expect(page.getByTestId("app-nav-progreso")).toHaveAttribute("href", "/progreso");
});

test("los puntos laterales navegan por las secciones de inicio", async ({ page }) => {
  await page.goto("/");

  const dotNav = page.getByTestId("section-dot-nav");
  await expect(dotNav).toBeVisible();
  await expect(page.getByTestId("section-dot-inicio")).toHaveAttribute("aria-current", "location");

  const cursosDot = page.getByTestId("section-dot-cursos");
  await cursosDot.hover();
  await expect(cursosDot.getByText("Cursos").first()).toBeVisible();

  await cursosDot.click();
  await expect(page).toHaveURL(/#cursos$/);
  await expect(cursosDot).toHaveAttribute("aria-current", "location");
});

test("el logo de la app lleva a inicio", async ({ page }) => {
  await page.goto("/aprender");
  await page.getByRole("link", { name: "Eaxy, ir al inicio" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("enlaces de registro y login no devuelven 404", async ({ page }) => {
  await page.goto("/registro");
  await expect(page.getByRole("heading", { name: "Crear cuenta" })).toBeVisible();

  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
});
