import { expect, test } from "@playwright/test";

test("orden de operaciones — × va antes que + y −", async ({ page }) => {
  await page.goto(
    "/aprender/curso/matematicas-1-eso/tema/numeros-naturales/leccion/division-orden-operaciones-naturales",
  );
  await expect(page.getByTestId("lesson-predict-step")).toBeVisible({ timeout: 30_000 });

  await page.getByRole("button", { name: "Leo" }).click();
  await page.getByTestId("lesson-next-button").click();

  await expect(page.getByTestId("jerarquia-niveles")).toBeVisible({ timeout: 15_000 });
  await page.getByTestId("lesson-presenter-forward").click();

  await expect(page.getByTestId("lesson-explore-step")).toBeVisible({ timeout: 15_000 });
  await expect(page.getByTestId("jerarquia-practica-reducir")).toBeVisible();

  await page.getByTestId("jerarquia-op-5").click();

  await expect(page.getByText("Mismo nivel: de izquierda a derecha.")).not.toBeVisible({
    timeout: 3_000,
  });
  await expect(page.getByTestId("jerarquia-practica-reducir")).toContainText("6", {
    timeout: 5_000,
  });
});
