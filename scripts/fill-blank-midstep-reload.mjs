import { chromium } from "@playwright/test";

const url =
  "http://localhost:3000/aprender/leccion-interactiva/sistemas-numeracion-naturales";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });

for (let i = 0; i < 6; i++) {
  await page.getByTestId("interactive-lesson").waitFor();
  const skip = page.getByTestId("lesson-footer-dock").getByRole("button", { name: "Saltar" });
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  } else {
    await page.getByTestId("lesson-continue-button").click();
  }
}

await page.getByTestId("lesson-fill-in-blank").waitFor();
await page.getByTestId("lesson-fill-input").fill("25000");
await page.getByTestId("lesson-check-button").click();
await page.waitForTimeout(300);
await page.reload({ waitUntil: "networkidle" });
await page.getByTestId("lesson-fill-in-blank").waitFor({ timeout: 15000 });

const value = await page.getByTestId("lesson-fill-input").inputValue();
const disabled = await page.getByTestId("lesson-fill-input").isDisabled();
console.log(JSON.stringify({ value, disabled, feedbackFooter: await page.getByTestId("lesson-feedback-footer").isVisible().catch(() => false) }));

await browser.close();
