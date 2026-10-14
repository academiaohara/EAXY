import { expect, test } from "@playwright/test";

const STORAGE_KEY = "eaxy-local-progress";
const LESSON_POTENCIAS_ID = "a3000000-0000-4000-8000-000000000201";
const LESSON_RAIZ_ID = "a3000000-0000-4000-8000-000000000204";

test("tema 2: dos lecciones en pizarra Manim", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/potencias-y-raices?reiniciar=1",
  );
  await expect(page.getByTestId("course-topic-view")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByTestId(`lesson-link-${LESSON_POTENCIAS_ID}`)).toBeVisible();
  await expect(page.getByTestId(`lesson-link-${LESSON_RAIZ_ID}`)).toBeVisible();
  await expect(page.getByTestId("course-topic-quick-access").getByRole("link")).toHaveCount(2);

  await page.screenshot({
    path: "/opt/cursor/artifacts/tema2-dos-lecciones.png",
    fullPage: false,
  });

  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/potencias-y-raices/leccion/potencias-base-exponente?reiniciar=1",
  );
  await expect(page.getByTestId("lesson-narrate-step")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByTestId("lesson-definition-box")).toBeVisible();
  await expect(page.getByTestId("potencias-base-exponente")).toBeVisible();

  const frame = page.getByTestId("lesson-frame");
  await expect(frame).toHaveClass(/lesson-stage-theme-board/);

  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({ timeout: 25_000 });

  await page.screenshot({
    path: "/opt/cursor/artifacts/tema2-potencias-pizarra.png",
    fullPage: false,
  });

  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/potencias-y-raices/leccion/raiz-cuadrada-naturales?reiniciar=1",
  );
  await expect(page.getByTestId("potencias-raices-raiz-inversa")).toBeVisible({ timeout: 20_000 });
  await page.getByRole("button", { name: "Ver la raíz cuadrada" }).click();
  await page.screenshot({
    path: "/opt/cursor/artifacts/tema2-raiz-pizarra.png",
    fullPage: false,
  });
});
