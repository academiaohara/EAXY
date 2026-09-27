import { expect, test, type Page } from "@playwright/test";

const DEMO_COURSE_ID = "a1000000-0000-4000-8000-000000000004";
const FIRST_LESSON_ID = "a3000000-0000-4000-8000-000000000701";

async function loginAsNewStudent(page: Page, name: string) {
  await page.goto("/aulas/e2e-classroom/alumnos");

  await page.getByTestId("student-names-input").fill(name);
  await page.getByTestId("provision-submit-button").click();

  const firstCard = page.getByTestId("credential-card").first();
  await expect(firstCard).toBeVisible();

  const username = await firstCard.getByTestId("credential-username").innerText();
  const password = await firstCard.getByTestId("credential-password").innerText();

  await page.goto("/entrar");
  await page.getByTestId("student-login-username").fill(username.replace("Usuario:", "").trim());
  await page.getByTestId("student-login-password").fill(password.replace("Contraseña:", "").trim());
  await page.getByTestId("student-login-submit").click();

  await expect(page).toHaveURL(/\/aprender$/);
}

async function openFirstLesson(page: Page) {
  await page.getByTestId(`course-link-${DEMO_COURSE_ID}`).click();
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await page.getByTestId(`lesson-link-${FIRST_LESSON_ID}`).click();
  await expect(page.getByTestId("interactive-lesson")).toBeVisible();
}

test("el alumno puede navegar el catálogo y abrir una lección interactiva", async ({ page }) => {
  await loginAsNewStudent(page, "Alumno Curso E2E");

  await expect(page.getByTestId("course-catalog")).toBeVisible();
  await expect(page.getByTestId("recommendation-card")).toBeVisible();

  await page.getByTestId(`course-link-${DEMO_COURSE_ID}`).click();
  await expect(page.getByTestId("course-outline")).toBeVisible();
  await expect(
    page.getByTestId("course-hero").getByText("5 lecciones", { exact: true }),
  ).toBeVisible();

  await page.getByTestId(`lesson-link-${FIRST_LESSON_ID}`).click();

  await expect(page).toHaveURL(/\/aprender\/leccion-interactiva\/ecuaciones-lineales-dos-incognitas$/);
  await expect(page.getByTestId("interactive-lesson")).toBeVisible();
  await expect(page.getByTestId("lesson-concept-step")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "¿Qué es una ecuación lineal con dos incógnitas?" }),
  ).toBeVisible();
});

test("el alumno consulta el historial del tutor y pide ayuda con botones", async ({ page }) => {
  await loginAsNewStudent(page, "Alumno Tutor E2E");
  await openFirstLesson(page);

  // La bola flota sobre la lección, ya no vive en el pie.
  await expect(page.getByTestId("lesson-footer-dock").getByTestId("lesson-tutor")).toHaveCount(0);

  // El tutor deja de hablar y se queda solo: el globo no es permanente.
  await expect(page.getByTestId("lesson-tutor-bubble")).toBeHidden({ timeout: 15_000 });

  // Pulsar la bola abre el historial de lo que el tutor ha dicho.
  await page.getByTestId("lesson-tutor-button").click();
  const panel = page.getByTestId("tutor-panel");
  await expect(panel).toBeVisible();
  await expect(panel.getByTestId("tutor-panel-log")).toContainText(
    "¿Qué es una ecuación lineal con dos incógnitas?",
  );

  await page.getByTestId("tutor-panel-close").click();
  await expect(panel).toBeHidden();

  // El tirador a media altura también cierra el panel.
  await page.getByTestId("lesson-tutor-button").click();
  await expect(panel).toBeVisible();
  await page.getByTestId("tutor-panel-edge-close").click();
  await expect(panel).toBeHidden();

  // Decir que no se entiende abre la ruta de ayuda con opciones, sin escribir nada.
  await page.getByTestId("lesson-help-button").click();
  await expect(page.getByTestId("tutor-help-options")).toBeVisible();
  await expect(page.getByTestId("tutor-help-option-theory")).toBeVisible();

  // Cada explicación pregunta si ya se entiende.
  await page.getByTestId("tutor-help-option-theory").click();
  await expect(page.getByTestId("tutor-help-option-got-it")).toBeVisible();
  await expect(page.getByTestId("tutor-help-option-more")).toBeVisible();

  // Insistir lleva a otra respuesta, no repite la misma explicación.
  await page.getByTestId("tutor-help-option-more").click();
  await expect(page.getByTestId("tutor-help-option-restart")).toBeVisible();

  await page.getByTestId("tutor-help-option-close").click();
  await expect(panel).toBeHidden();
});
