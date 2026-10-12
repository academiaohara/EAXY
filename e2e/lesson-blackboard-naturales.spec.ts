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

  await expect(page.getByTestId("lesson-definition-box")).toBeVisible();
  await expect(page.getByTestId("naturales-numeracion-sistemas-historia-galeria")).toBeVisible();
  await expect(page.getByRole("group", { name: /Tres sistemas históricos/i })).toBeVisible();
  await expect(page.getByText("Hombre primitivo")).toBeVisible();

  const forward = page.getByTestId("lesson-presenter-forward");
  await expect(forward).toBeEnabled();
  await forward.click();
  await expect(page.getByTestId("naturales-numeracion-sistemas-historia-juego")).toBeVisible();

  const slide1Dot = page.getByTestId("lesson-slide-thumb-1").locator("span.rounded-full").first();
  const slide2Dot = page.getByTestId("lesson-slide-thumb-2").locator("span.rounded-full").first();
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
  await expect(page.getByTestId("naturales-numeracion-decimal-intro")).toBeVisible();
  await expect(forward).toBeEnabled();
  await forward.click();
  await expect(page.getByTestId("naturales-numeracion-contar-diez")).toBeVisible({ timeout: 15_000 });

  await expect(page.getByTestId("naturales-numeracion-contar-diez")).toBeVisible();
  await expect(page.getByTestId("lesson-step-phase")).toHaveCount(0);

  const whiteCard = page.locator('[data-testid="naturales-numeracion-contar-diez"] .bg-white');
  await expect(whiteCard).toHaveCount(0);

  await expect(page.getByTestId("lesson-slides-sidebar")).toBeVisible();
  await page.getByTestId("lesson-slide-thumb-1").hover();
  await page.screenshot({ path: "/opt/cursor/artifacts/lesson-blackboard-contar-diez.png", fullPage: false });
});
