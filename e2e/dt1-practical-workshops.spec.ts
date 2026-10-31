import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });
const cases = [
  {
    slug: "historia-dibujo-tecnico-campos-dt1",
    inputs: [
      ["Cota horizontal (mm)", "120"],
      ["Cota vertical (mm)", "60"],
      ["Denominador de escala", "2"],
    ],
    transfer: [
      ["Cota horizontal (mm)", "150"],
      ["Cota vertical (mm)", "50"],
      ["Denominador de escala", "5"],
    ],
  },
  {
    slug: "geometria-griega-pitagoras-dt1",
    inputs: [
      ["Coordenada x de C", "0"],
      ["Coordenada y de C", "3"],
    ],
    transfer: [
      ["Coordenada x de C", "0"],
      ["Coordenada y de C", "6"],
    ],
  },
  {
    slug: "lugares-geometricos-dt1",
    inputs: [
      ["Coordenada x de P", "0"],
      ["Coordenada y de P", "4"],
    ],
    transfer: [
      ["Coordenada x de P", "0"],
      ["Coordenada y de P", "-3"],
    ],
  },
  {
    slug: "arco-capaz-dt1",
    inputs: [
      ["Coordenada x de P", "0"],
      ["Coordenada y de P", "3"],
    ],
    transfer: [
      ["Coordenada x de P", "0"],
      ["Coordenada y de P", "5.2"],
    ],
  },
];

for (const candidate of cases) {
  test(`${candidate.slug}: actuar, corregir, reanudar y transferir`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(
      `/aprender/curso/dibujo-tecnico-1-bachillerato/tema/historia-fundamentos-geometricos/leccion/${candidate.slug}?reiniciar=1`,
    );
    await expect(page.getByTestId("interactive-lesson")).toBeVisible({
      timeout: 30000,
    });
    await page.getByTestId("lesson-skip-button").click();
    const forward = page.getByTestId("lesson-presenter-forward");
    await expect(page.getByTestId("dt1-workshop")).toBeVisible();
    await expect(forward).toBeDisabled();
    for (const [label, value] of candidate.inputs)
      await page.getByLabel(label!).fill(value!);
    await expect(forward).toBeEnabled();
    await page.screenshot({
      path: testInfo.outputPath(`${candidate.slug}-solved.png`),
    });
    await page.getByRole("button", { name: "Reiniciar taller" }).click();
    await expect(forward).toBeDisabled();
    for (const [label, value] of candidate.inputs)
      await page.getByLabel(label!).fill(value!);
    await forward.click();
    await expect(page.getByTestId("dt1-workshop")).toHaveCount(0);
    await page.getByTestId("lesson-presenter-back").click();
    await expect(page.getByTestId("dt1-workshop")).toBeVisible();
    for (const [label, value] of candidate.inputs)
      await expect(page.getByLabel(label!)).toHaveValue(value!);
    await forward.click();
    await expect(page.getByTestId("dt1-workshop")).toHaveCount(0);
    for (let index = 0; index < 3; index += 1) {
      if (await page.getByTestId("dt1-workshop").count()) break;
      const title = await page.getByTestId("lesson-step-title").textContent();
      await page.getByTestId("lesson-skip-button").click();
      await expect(page.getByTestId("lesson-step-title")).not.toHaveText(
        title ?? "",
      );
    }
    await expect(page.getByTestId("dt1-workshop")).toBeVisible();
    for (const [label, value] of candidate.transfer)
      await page.getByLabel(label!).fill(value!);
    await expect(forward).toBeEnabled();
    expect(errors).toEqual([]);
  });
}
