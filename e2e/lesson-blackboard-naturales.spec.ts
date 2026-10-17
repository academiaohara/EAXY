import { expect, test } from "@playwright/test";

const LESSON_SLUG = "sistemas-numeracion-naturales";
const STORAGE_KEY = "eaxy-local-progress";

test("lección numeración en pizarra sin tarjeta blanca", async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);

  await page.goto(
    `/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/${LESSON_SLUG}?reiniciar=1`,
  );
  await expect(page.getByTestId("interactive-lesson")).toBeVisible({ timeout: 20_000 });

  await expect(page.getByTestId("lesson-slide")).toBeVisible();
  await expect(page.getByText("Los números nacieron para contar").first()).toBeVisible();

  const forward = page.getByTestId("lesson-presenter-forward");
  await expect(forward).toBeEnabled();
  await forward.click();

  // Egipto: animación controlada dentro de la diapositiva.
  const anim = page.getByTestId("lesson-anim");
  await expect(anim).toBeVisible();
  await page.getByRole("button", { name: "Pausar animación" }).click();
  const back = anim.getByRole("button", { name: "Retroceder un paso" });
  while (await back.isEnabled()) {
    await back.click();
  }
  await expect(anim.getByTestId("lesson-anim-caption")).toContainText("Queremos escribir");
  await anim.getByRole("button", { name: "Avanzar un paso" }).click();
  await expect(anim.getByTestId("lesson-anim-caption")).toContainText("millares");

  await forward.click();
  await expect(page.getByText("Roma: sumar… y a veces restar").first()).toBeVisible();
  await forward.click();
  await expect(page.getByTestId("naturales-numeracion-sistemas-historia-juego")).toBeVisible();

  const slide1Dot = page.getByTestId("lesson-slide-thumb-3").locator("span.rounded-full").first();
  const slide2Dot = page.getByTestId("lesson-slide-thumb-4").locator("span.rounded-full").first();
  await expect(slide1Dot).toHaveClass(/bg-emerald-400/);
  await expect(slide2Dot).toHaveClass(/bg-cobalt/);

  // Marcas: 24 = cuatro grupos de cinco y cuatro sueltas.
  const marcas = page.getByTestId("reto-marcas");
  for (let i = 0; i < 4; i += 1) {
    await marcas.getByRole("button", { name: "Añadir un grupo de cinco marcas" }).click();
  }
  for (let i = 0; i < 5; i += 1) {
    await marcas.getByRole("button", { name: "Añadir una marca" }).click();
  }
  await expect(marcas.getByText("Te has pasado de 24. Quita marcas.")).toBeVisible();
  await marcas.getByRole("button", { name: "Quitar una marca" }).click();
  await expect(marcas).toHaveAttribute("data-done", "true");
  await page.screenshot({ path: "/tmp/sistemas-historia-juego.png", fullPage: false });

  // Egipto: vale con 24 unidades, pero el reto pide el mínimo de símbolos.
  const egipto = page.getByTestId("reto-egipcio");
  for (let i = 0; i < 24; i += 1) {
    await egipto.getByRole("button", { name: "Añadir uno (1)" }).click();
  }
  await expect(egipto.getByText(/bastan 6/)).toBeVisible();
  await egipto.getByRole("button", { name: "Borrar todo" }).click();
  for (let i = 0; i < 2; i += 1) {
    await egipto.getByRole("button", { name: "Añadir diez (10)" }).click();
  }
  for (let i = 0; i < 4; i += 1) {
    await egipto.getByRole("button", { name: "Añadir uno (1)" }).click();
  }
  await expect(egipto).toHaveAttribute("data-done", "true");

  // Roma: XXIIII suma 24 pero no es la escritura correcta.
  const roma = page.getByTestId("reto-romano");
  for (const key of ["X", "X", "I", "I", "I", "I"]) {
    await roma.getByRole("button", { name: new RegExp(`^Añadir ${key} `) }).click();
  }
  await expect(roma.getByText(/cuatro letras iguales/)).toBeVisible();
  await roma.getByRole("button", { name: "Borrar la última letra" }).click();
  await roma.getByRole("button", { name: "Borrar la última letra" }).click();
  await roma.getByRole("button", { name: "Borrar la última letra" }).click();
  await roma.getByRole("button", { name: /^Añadir V / }).click();
  await expect(roma).toHaveAttribute("data-done", "true");

  await expect(forward).toBeEnabled();
  await forward.click();
  await expect(page.getByTestId("lesson-slide")).toBeVisible();
  await expect(page.getByText("El sistema decimal: base 10").first()).toBeVisible();
  await expect(page.getByTestId("lesson-step-phase")).toHaveCount(0);

  const whiteCard = page.locator('[data-testid="lesson-slide"] .bg-white');
  await expect(whiteCard).toHaveCount(0);

  await expect(page.getByTestId("lesson-slides-sidebar")).toBeVisible();
  await page.getByTestId("lesson-slide-thumb-1").hover();
  await page.screenshot({ path: "/opt/cursor/artifacts/lesson-blackboard-decimal.png", fullPage: false });
});
