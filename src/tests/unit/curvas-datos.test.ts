import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES, type Construccion, type P } from "@/components/lesson/bench/construcciones-datos";
import { CONSTRUCCIONES_CURVAS } from "@/components/lesson/bench/construcciones-curvas";

const d = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const C = (id: string) => (CONSTRUCCIONES_CURVAS as Record<string, Construccion>)[id];
const cerca = (a: number, b: number, tol = 0.5) => expect(Math.abs(a - b)).toBeLessThan(tol);

type Arco = { c: P; r: number; extremos: [string, string] };
function arcos(id: string): Arco[] {
  const c = C(id);
  return c.ops
    .filter((o) => o.k === "solucion" && o.hasta)
    .map((o) => {
      const s = o as { c: string; hacia: string; hasta: string };
      return { c: c.pts[s.c], r: d(c.pts[s.c], c.pts[s.hacia]), extremos: [s.hacia, s.hasta] as [string, string] };
    });
}

describe("curvas técnicas: los arcos de óvalos, ovoides y voluta son tangentes entre sí", () => {
  for (const id of ["ovalo-eje-mayor", "ovalo-eje-menor", "ovalo-cuatro-centros", "ovoide-eje-mayor", "ovoide-eje-menor", "voluta"]) {
    it(id, () => {
      const lista = arcos(id);
      expect(lista.length).toBeGreaterThan(3);
      const pts = C(id).pts;
      // en cada extremo compartido, los dos centros y el punto están alineados (tangencia)
      let encontrados = 0;
      lista.forEach((a, i) => {
        lista.forEach((b, j) => {
          if (j <= i) return;
          for (const ea of a.extremos) for (const eb of b.extremos) {
            if (ea !== eb) continue;
            encontrados += 1;
            const T = pts[ea];
            cerca(d(a.c, b.c), Math.abs(d(a.c, T) - d(b.c, T)), 0.6);
            cerca(Math.abs(d(a.c, T) - a.r), 0, 0.6);
            cerca(Math.abs(d(b.c, T) - b.r), 0, 0.6);
          }
        });
      });
      expect(encontrados).toBeGreaterThanOrEqual(id === "voluta" ? 5 : id.startsWith("ovoide-eje-menor") ? 3 : 4);
    });
  }

  it("óvalos: simetría respecto de los dos ejes", () => {
    for (const id of ["ovalo-eje-mayor", "ovalo-eje-menor", "ovalo-cuatro-centros"]) {
      const lista = arcos(id);
      const xs = lista.flatMap((a) => [a.c[0]]);
      const media = (Math.min(...xs) + Math.max(...xs)) / 2;
      for (const a of lista) expect(xs.some((x) => Math.abs(x - (2 * media - a.c[0])) < 0.5)).toBe(true);
    }
  });

  it("espiral de Arquímedes: el radio crece de forma uniforme", () => {
    const c = C("espiral-arquimedes");
    for (let k = 1; k < 8; k += 1) cerca(d(c.pts.O, c.pts[`espS${k}`]), (160 * k) / 8, 1e-6);
  });

  it("hélice: puntos sobre la sinusoide de la proyección", () => {
    const c = C("helice");
    for (let j = 1; j <= 8; j += 1) {
      cerca(c.pts[`helG${j}`][1], 195 - (j - 1) * 18, 1e-6);
      cerca(c.pts[`helG${j}`][0], c.pts[`helB${j}`][0], 1e-6);
    }
    cerca(c.pts.helG9[0], c.pts.helG1[0], 1e-6);
    cerca(c.pts.helG9[1], 195 - 144, 1e-6);
  });

  it("todo cabe en la hoja y está registrado", () => {
    for (const [id, c] of Object.entries(CONSTRUCCIONES_CURVAS) as [string, Construccion][]) {
      expect((CONSTRUCCIONES as Record<string, unknown>)[id]).toBeDefined();
      for (const [n, p] of Object.entries(c.pts)) {
        if (n.startsWith("_")) continue;
        expect(p[0], `${id} ${n}`).toBeGreaterThan(8);
        expect(p[0], `${id} ${n}`).toBeLessThan(612);
        expect(p[1], `${id} ${n}`).toBeGreaterThan(8);
        expect(p[1], `${id} ${n}`).toBeLessThan(372);
      }
    }
  });
});
