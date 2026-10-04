import { chromium } from "@playwright/test";

const url =
  "http://localhost:3000/aprender/leccion-interactiva/sistemas-numeracion-naturales";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.getByTestId("lesson-continue-button").click();
await page.getByTestId("interactive-lesson-entry-dialog").waitFor({ timeout: 5000 }).catch(() => {});
await page.goto(url, { waitUntil: "networkidle" });
const hasDialog = await page.getByTestId("interactive-lesson-entry-dialog").isVisible();
console.log(JSON.stringify({ resumeDialogVisible: hasDialog }));
await browser.close();
