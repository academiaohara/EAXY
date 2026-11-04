import { expect, test } from "@playwright/test";

test("un visitante puede abrir práctica libre", async ({ page }) => {
  await page.goto("/practicar");
  await expect(page).toHaveURL(/\/practicar$/);
  await expect(page.getByTestId("practice-session")).toBeVisible();
  await expect(page.getByTestId("app-nav-practicar")).toHaveAttribute(
    "aria-current",
    "page",
  );
});
