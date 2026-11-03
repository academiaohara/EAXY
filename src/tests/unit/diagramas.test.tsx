import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DIAGRAMAS } from "@/components/lesson/anim/diagramas";
import { construirDiagrama } from "@/components/lesson/anim/diagramas/engine";

describe("diagramas animados de teoría", () => {
  const claves = Object.keys(DIAGRAMAS);
  it("hay diagramas definidos", () => {
    expect(claves.length).toBeGreaterThan(90);
  });
  it.each(claves)("%s: tiene pasos con texto y se dibuja en todos ellos", (clave) => {
    const def = DIAGRAMAS[clave]!;
    expect(def.pasos.length).toBeGreaterThanOrEqual(2);
    const b = construirDiagrama(def);
    expect(b.captions).toHaveLength(def.pasos.length);
    def.pasos.forEach((p, i) => {
      expect(p.texto.length, `${clave} paso ${i}`).toBeGreaterThan(10);
      expect(p.items.length, `${clave} paso ${i}`).toBeGreaterThan(0);
      const html = renderToStaticMarkup(<>{b.render(i)}</>);
      expect(html).not.toContain("NaN");
    });
  });
});
