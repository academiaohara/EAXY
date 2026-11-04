import { expect, test } from "@playwright/test";

const COURSE_ID = "a1000000-0000-4000-8000-000000000004";

test("inicio conduce a 4 ESO, revela sus variantes y conserva la URL del curso", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const aprender = page.getByTestId("app-nav-aprender");
  await aprender.focus();
  await expect(aprender).toBeFocused();

  const matematicas = page.getByTestId("home-subject-matematicas");
  await matematicas.getByRole("link", { name: "4 ESO" }).click();
  await expect(page).toHaveURL(/\/aprender\/materia\/matematicas#4-eso$/);
  await expect(page.getByTestId("app-nav-aprender")).toHaveAttribute(
    "aria-current",
    "page",
  );

  const level = page.getByTestId("course-level-4-eso");
  await level.locator("summary").click();
  await expect(level.getByRole("link", { name: /Opción A/ })).toBeVisible();
  await expect(level.getByRole("link", { name: /Opción B/ })).toBeVisible();

  await page.getByTestId(`course-link-${COURSE_ID}`).click();
  await expect(page).toHaveURL(/\/aprender\/curso\/matematicas-4-eso$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "4 ESO" }),
  ).toBeVisible();
});

test("la lección mantiene la pizarra y oculta el campus global", async ({
  page,
}) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/multiplicacion-division-naturales?reiniciar=1",
  );

  const layout = page.getByTestId("interactive-lesson-layout");
  await expect(layout).toBeVisible({ timeout: 30_000 });
  await expect(page.locator("[data-app-chrome]")).toBeHidden();

  const frame = page.getByTestId("lesson-frame");
  await expect(frame).toHaveClass(/lesson-stage-theme-board/);
  await expect
    .poll(() =>
      frame.evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--stage-surface").trim(),
      ),
    )
    .toBe("#1a2332");
});

for (const width of [768, 1024, 1440, 1920]) {
  test(`el campus permanece dentro del viewport a ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("el bloqueo de escritorio y el movimiento reducido siguen activos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 767, height: 900 });
  await page.goto("/");
  await expect(page.getByTestId("desktop-only-blocker")).toBeVisible();

  await page.setViewportSize({ width: 1024, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/aprender");
  const duration = await page
    .locator(".campus-motion a")
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.01);
});
