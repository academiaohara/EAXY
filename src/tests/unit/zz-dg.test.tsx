import { writeFileSync } from "node:fs";
import { it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DIAGRAMAS } from "@/components/lesson/anim/diagramas";
import { construirDiagrama } from "@/components/lesson/anim/diagramas/engine";
const pref = (process.env.PREF ?? "d").split(",");
it("dg", () => {
  for (const [k, def] of Object.entries(DIAGRAMAS)) {
    if (!pref.some((p) => k.startsWith(p))) continue;
    const b = construirDiagrama(def);
    const html = `<div style="font:14px sans-serif;margin:4px">${k}</div>` + b.captions.map((_, i) => `<div style="background:#1a2332;width:420px;display:inline-block;margin:2px">${renderToStaticMarkup(<>{b.render(i)}</>)}</div>`).join("");
    writeFileSync(`/tmp/claude-0/-home-user-EAXY/0604d3bd-3d7f-5c2e-aef7-b0e2795ceacf/scratchpad/t12/z-${k}.html`, html);
  }
});
