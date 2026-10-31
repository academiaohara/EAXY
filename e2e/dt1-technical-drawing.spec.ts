import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });

const COURSE = "dibujo-tecnico-1-bachillerato";
const TOPIC = "normalizacion-documentacion-grafica";
const cases = [
  ["escalas-numericas-graficas-dt1", "escala", "scale-real-dimension"],
  ["vistas-normalizadas-dt1", "orthographic-sheet", "view-front"],
  ["acotacion-normalizada-dt1", "dimensioning-sheet", "dimension-arrow"],
] as const;

for (const [slug, sheetId, detailId] of cases) {
  test(`${slug}: muestra una lámina técnica coherente`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(
      `/aprender/curso/${COURSE}/tema/${TOPIC}/leccion/${slug}?reiniciar=1`,
    );
    await expect(page.getByTestId("interactive-lesson")).toBeVisible({
      timeout: 30_000,
    });

    for (let step = 0; step < 4; step += 1) {
      if (await page.getByTestId(sheetId).count()) break;
      await page.getByTestId("lesson-skip-button").click();
    }

    await expect(page.getByTestId(sheetId)).toBeVisible();
    if (slug === "vistas-normalizadas-dt1") {
      await page.getByRole("button", { name: "Cubo" }).click();
      await expect(page.getByTestId("view-front")).toHaveAttribute(
        "data-size",
        "40x40",
      );
      await expect(page.getByTestId("view-top")).toHaveAttribute(
        "data-size",
        "40x40",
      );
      await expect(page.getByTestId("view-left")).toHaveAttribute(
        "data-size",
        "40x40",
      );
    }
    await expect(page.getByTestId(detailId).first()).toBeVisible();
    await expect(page.getByTestId("sheet-title-block")).toBeVisible();
    await page.screenshot({
      path: testInfo.outputPath(`${slug}-technical-sheet.png`),
    });
    expect(errors).toEqual([]);
  });
}
