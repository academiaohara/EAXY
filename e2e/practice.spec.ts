import { expect, test } from "@playwright/test";

test("un visitante puede abrir práctica libre", async ({ page }) => {
  await page.goto("/practicar");
  await expect(page).toHaveURL(/\/practicar\/.+/);
  await expect(page.getByTestId("app-nav-practicar")).toHaveAttribute("aria-current", "page");
  await expect(page.getByTestId("app-nav-aprender")).not.toHaveAttribute("aria-current", "page");
});
