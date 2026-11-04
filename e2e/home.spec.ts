import { expect, test } from "@playwright/test";

test("la página principal carga correctamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Eaxy/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Tu siguiente gran idea/ }),
  ).toBeVisible();
  await expect(page.locator('a[href="#materias"]', { hasText: "Elegir mi curso" })).toBeVisible();
});

test("la cabecera de inicio enlaza a las secciones de la app", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("app-nav-inicio")).toHaveAttribute("href", "/");
  await expect(page.getByTestId("app-nav-inicio")).toHaveAttribute("aria-current", "page");
  await expect(page.getByTestId("app-nav-aprender")).toHaveAttribute("href", "/aprender");
  await expect(page.getByTestId("app-nav-practicar")).toHaveAttribute("href", "/practicar");
  await expect(page.getByTestId("app-nav-progreso")).toHaveAttribute("href", "/perfil");
});

test("inicio organiza materias por año sin repetir la asignatura", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("section-dot-nav")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "¿Qué quieres aprender?" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Menos dudas. Más avanzar." })).toBeVisible();
  await expect(page.getByRole("region", { name: "Preguntas frecuentes" })).toBeVisible();

  const matematicas = page.getByTestId("home-subject-matematicas");
  await expect(matematicas.getByText("1 ESO", { exact: true })).toBeVisible();
  await expect(matematicas.getByText("4 ESO", { exact: true })).toBeVisible();
  await expect(matematicas.getByText("1 Bachillerato", { exact: true })).toBeVisible();
  await expect(matematicas.getByText("2 Bachillerato", { exact: true })).toBeVisible();
  await expect(matematicas.getByText(/1º/)).toHaveCount(0);
  await expect(matematicas.getByText(/Matemáticas 1/)).toHaveCount(0);
});

test("inicio muestra un siguiente paso real cuando existe", async ({ page }) => {
  await page.goto("/");

  const card = page.getByTestId("home-continue-card");
  await expect(card).toBeVisible();
  await expect(card.locator('a[href*="/aprender/"]', { hasText: /Empezar|Continuar|Repasar/ })).toBeVisible();
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
