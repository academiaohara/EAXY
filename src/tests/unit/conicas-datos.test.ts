import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES, type Construccion, type P } from "@/components/lesson/bench/construcciones-datos";
import { CONSTRUCCIONES_CONICAS } from "@/components/lesson/bench/construcciones-conicas";

const d = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const C = (id: string) => (CONSTRUCCIONES_CONICAS as Record<string, Construccion>)[id];
const cerca = (a: number, b: number, tol = 0.5) => expect(Math.abs(a - b)).toBeLessThan(tol);
const dRecta = (p: P, a: P, b: P) => Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / d(a, b);

describe("cónicas: las construcciones cumplen la definición de cada curva", () => {
  it("elipse por puntos: suma de distancias a los focos igual a 2a", () => {
    const c = C("elipse-puntos");
    for (let k = 1; k <= 4; k += 1) cerca(d(c.pts[`M${k}`], c.pts.F) + d(c.pts[`M${k}`], c.pts.Fp), 300);
    cerca(d(c.pts.F, c.pts.C), 150);
  });

  it("elipse por haces, circunferencias y envolventes: puntos sobre la elipse", () => {
    for (const [id, prefijo, n] of [["elipse-haces", "M", 4], ["elipse-circunferencias", "r", 4]] as [string, string, number][]) {
      const c = C(id);
      for (let k = 1; k <= n; k += 1) {
        const p = c.pts[`${prefijo}${k}`];
        cerca(((p[0] - 310) / 150) ** 2 + ((p[1] - 200) / 90) ** 2, 1, 1e-6);
      }
    }
    const c = C("elipse-envolventes");
    const F = c.pts.F;
    const Fp = c.pts.Fp;
    for (let k = 1; k <= 6; k += 1) {
      const L = c.pts[`l${k}`];
      const dF = d(F, L);
      const dFp = dRecta(Fp, c.pts[`_a${k}`], c.pts[`_b${k}`]);
      cerca(dF * dFp, 90 * 90, 1);
    }
  });

  it("hipérbola: diferencia de distancias igual a 2a y tangentes con pies en la circunferencia principal", () => {
    let c = C("hiperbola-puntos");
    for (let k = 1; k <= 3; k += 1) cerca(d(c.pts[`M${k}`], c.pts.F) - d(c.pts[`M${k}`], c.pts.Fp), 120, 1e-6);
    c = C("hiperbola-envolventes");
    for (let k = 1; k <= 6; k += 1) {
      cerca(d(c.pts[`t${k}`], c.pts.O), 60, 1e-6);
      cerca(dRecta(c.pts.Fp, c.pts[`_a${k}`], c.pts[`_b${k}`]), d(c.pts.Fp, c.pts[`t${k}`]), 1e-6);
    }
  });

  it("parábola: equidistancia al foco y a la directriz", () => {
    let c = C("parabola-puntos");
    for (let k = 1; k <= 4; k += 1) cerca(d(c.pts[`P${k}`], c.pts.F), Math.abs(c.pts[`P${k}`][0] - c.pts.A[0]), 1e-6);
    c = C("parabola-vertice-punto");
    for (let k = 1; k <= 4; k += 1) {
      const M = c.pts[`M${k}`];
      // parabola con vértice V y que pasa por P: (y − Vy)² ∝ (x − Vx)
      const kk = (c.pts.P[1] - 200) ** 2 / (c.pts.P[0] - 100);
      cerca((M[1] - 200) ** 2, kk * (M[0] - 100), 1e-6);
    }
    c = C("parabola-envolventes");
    for (let k = 1; k <= 6; k += 1) cerca(dRecta(c.pts.F, c.pts[`_a${k}`], c.pts[`_b${k}`]), d(c.pts.F, c.pts[`t${k}`]), 1e-6);
  });

  it("todo cabe en la hoja y está registrado", () => {
    for (const [id, c] of Object.entries(CONSTRUCCIONES_CONICAS) as [string, Construccion][]) {
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
