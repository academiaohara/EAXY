import { expect, test } from "@playwright/test";

test.describe("solo escritorio", () => {
  test("en viewport estrecho muestra el bloqueo y oculta la app", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByTestId("desktop-only-blocker")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeHidden();
  });

  test("en viewport de escritorio la app es usable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.getByTestId("desktop-only-blocker")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
