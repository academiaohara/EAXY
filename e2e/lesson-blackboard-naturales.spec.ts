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

  const contarUno = page.getByRole("button", { name: "Contar uno" });
  for (let i = 0; i < 9; i += 1) {
    await contarUno.click();
  }
  await expect(page.getByText("¡Exacto! Nueve marcas.")).toBeVisible();
  await expect(page.getByRole("tab", { name: /El hombre primitivo/i })).toHaveClass(/bg-emerald-500/);
  await contarUno.click();
  await expect(page.getByText("Te has pasado: quita marcas hasta llegar a 9.")).toBeVisible();
  await page.screenshot({
    path: "/opt/cursor/artifacts/sistemas-historia-tally-over.png",
    fullPage: false,
  });

  const inactiveTab = page.getByRole("tab", { name: /Los egipcios/i });
  await expect(inactiveTab).toBeVisible();
  const tabStyles = await inactiveTab.evaluate((el) => {
    const style = getComputedStyle(el);
    return { color: style.color, backgroundColor: style.backgroundColor };
  });
  expect(tabStyles.backgroundColor).not.toBe("rgb(255, 255, 255)");
  if (tabStyles.color === "rgb(255, 255, 255)") {
    expect(tabStyles.backgroundColor).not.toMatch(/255,\s*255,\s*255/);
  }

  await page.getByTestId("lesson-skip-button").click();
  await expect(page.getByTestId("lesson-slide")).toBeVisible();
  await expect(page.getByText("El sistema decimal: base 10").first()).toBeVisible();
  await expect(page.getByTestId("lesson-step-phase")).toHaveCount(0);

  const whiteCard = page.locator('[data-testid="lesson-slide"] .bg-white');
  await expect(whiteCard).toHaveCount(0);

  await expect(page.getByTestId("lesson-slides-sidebar")).toBeVisible();
  await page.getByTestId("lesson-slide-thumb-1").hover();
  await page.screenshot({ path: "/opt/cursor/artifacts/lesson-blackboard-decimal.png", fullPage: false });
});
