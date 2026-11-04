import { expect, test } from "@playwright/test";

test("expone la paleta Campus como estilos calculados", async ({ page }) => {
  await page.goto("/");

  const palette = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      forest: styles.getPropertyValue("--forest").trim(),
      ivory: styles.getPropertyValue("--ivory").trim(),
      surface: styles.getPropertyValue("--surface").trim(),
      sun: styles.getPropertyValue("--sun").trim(),
      coral: styles.getPropertyValue("--coral").trim(),
      paper: styles.getPropertyValue("--paper").trim(),
      ink: styles.getPropertyValue("--ink").trim(),
    };
  });

  expect(palette).toEqual({
    forest: "#193a32",
    ivory: "#f4f3ec",
    surface: "#fffdf8",
    sun: "#f4c95d",
    coral: "#e9785c",
    paper: "#f4f3ec",
    ink: "#193a32",
  });
});
