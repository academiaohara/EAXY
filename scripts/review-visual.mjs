// Capturas de cada animación (por beat) y herramienta de una lección. Uso:
//   TEMA=<slug-tema> [CURSO=<slug-curso>] [OUT=dir] node scripts/review-visual.mjs <slug-leccion>
// Requiere `npm run dev -- --hostname 127.0.0.1 --port 3000` y mkdir -p $OUT. Genera $OUT/M-<leccion>-s<i>-anim|tool.png.
// Importa playwright-core (viene con @playwright/test); Chromium en /opt/pw-browsers.
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const slug = process.argv[2];
const out = process.env.OUT || "/tmp/review-tema";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(`http://127.0.0.1:3000/aprender/curso/${process.env.CURSO || "tecnologia-industrial-2-bachillerato"}/tema/${process.env.TEMA}/leccion/${slug}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const files = [];
for (let i = 0; i < 20; i++) {
  const anim = page.getByTestId("lesson-anim");
  const tool = page.getByTestId("lesson-tool");
  if (await anim.count()) {
    const pause = page.getByRole("button", { name: "Pausar animación" });
    if (await pause.count()) await pause.click();
    const back = page.getByRole("button", { name: "Retroceder un paso" });
    for (let k = 0; k < 10; k++) { if (await back.isDisabled()) break; await back.click(); await page.waitForTimeout(60); }
    const parts = [];
    for (let b = 0; b < 8; b++) {
      await page.waitForTimeout(1000);
      const f = `${out}/${slug}-s${i}-b${b}.png`;
      await anim.first().screenshot({ path: f });
      parts.push(f);
      const next = page.getByRole("button", { name: "Avanzar un paso" });
      if (await next.isDisabled()) break;
      await next.click();
    }
    const m = `${out}/M-${slug}-s${i}-anim.png`;
    execFileSync("python3", ["-c", `
import sys
from PIL import Image
fs=sys.argv[2:]
ims=[Image.open(f) for f in fs]
w,h=ims[0].size
cols=2 if len(ims)>1 else 1
rows=(len(ims)+cols-1)//cols
sc=0.62
tw,th=int(w*sc),int(h*sc)
M=Image.new("RGB",(tw*cols,th*rows),(0,0,0))
for k,im in enumerate(ims):
    M.paste(im.resize((tw,th)),((k%cols)*tw,(k//cols)*th))
M.save(sys.argv[1])`, m, ...parts]);
    files.push(m);
  } else if (await tool.count()) {
    await page.waitForTimeout(600);
    const f = `${out}/M-${slug}-s${i}-tool.png`;
    await tool.first().screenshot({ path: f });
    files.push(f);
  }
  const cont = page.getByRole("button", { name: "Continuar" });
  const skip = page.getByRole("button", { name: "Saltar paso" });
  if ((await cont.count()) && (await cont.isEnabled())) await cont.click();
  else if ((await skip.count()) && (await skip.isEnabled())) await skip.click();
  else break;
  await page.waitForTimeout(500);
}
console.log(files.join("\n"));
console.log("errors:", errors.length ? errors : "none");
await browser.close();
