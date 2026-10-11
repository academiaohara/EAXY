import { expect, test } from "@playwright/test";

test("distributiva-predict — enunciado de menús y total 56 €", async ({ page }) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales",
  );
  await expect(page.getByTestId("interactive-lesson-layout")).toBeVisible({
    timeout: 30_000,
  });

  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({
    timeout: 25_000,
  });
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByTestId("lesson-reveal-step")).toBeVisible();
  await page.getByRole("button", { name: "Girar el bloque" }).click();
  await expect(page.getByRole("button", { name: "Continuar" })).toBeEnabled({
    timeout: 25_000,
  });
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.getByTestId("lesson-predict-step")).toBeVisible();
  await expect(page.getByText("Dos formas de calcularlo").first()).toBeVisible();
  await expect(page.getByText(/Compras.*menús/i).first()).toBeVisible();
  await page.screenshot({
    path: "/opt/cursor/artifacts/distributiva-predict-menu-step.png",
    fullPage: true,
  });
  const predictStep = page.getByTestId("lesson-predict-step");
  await predictStep.getByTestId("predict-choice-40").click();
  await predictStep.getByTestId("lesson-check-button").click();
  await expect(page.getByText(/Ese solo cuenta los bocadillos/i)).toBeVisible();

  await page.screenshot({
    path: "/opt/cursor/artifacts/distributiva-predict-40-feedback.png",
    fullPage: true,
  });
});
