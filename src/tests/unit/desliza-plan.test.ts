import { describe, expect, it } from "vitest";
import { planAngulo, planPerp } from "@/components/lesson/bench/desliza-plan";
import { cross, dot, largo, sub, unit } from "@/components/lesson/bench/paralela-plan";
import type { Pt } from "@/components/lesson/bench/geometry";

const rectas: [Pt, Pt][] = [
  [[100, 300], [400, 300]],
  [[100, 300], [400, 150]],
  [[200, 100], [260, 330]],
  [[500, 90], [120, 250]],
  [[150, 150], [330, 330]],
];
const puntos: Pt[] = [[250, 120], [480, 200], [330, 330], [160, 220]];

describe("planPerp: perpendicular con escuadra y cartabón", () => {
  for (const [a, b] of rectas) {
    for (const P of puntos) {
      const u = unit(sub(b, a));
      if (Math.abs(cross(u, sub(P, a))) < 25) continue;
      it(`recta ${a}→${b}, punto ${P}`, () => {
        const plan = planPerp([a, b], P, [P, [P[0] + u[1] * 80, P[1] - u[0] * 80]], []);
        // al llegar, el borde de dibujo es perpendicular a la recta y pasa por P, dentro del borde real
        const [g0, g1] = plan.borde(plan.objetivo);
        const e = sub(g1, g0);
        expect(Math.abs(dot(unit(e), u))).toBeLessThan(1e-6);
        expect(Math.abs(cross(unit(e), sub(P, g0)))).toBeLessThan(1e-6);
        const t = dot(sub(P, g0), e) / dot(e, e);
        expect(t).toBeGreaterThanOrEqual(0.2);
        expect(t).toBeLessThanOrEqual(0.8);
        // la escuadra no gira: el borde conserva su dirección durante el recorrido
        const [h0, h1] = plan.borde(0);
        expect(Math.abs(cross(unit(sub(h1, h0)), unit(e)))).toBeLessThan(1e-6);
        expect(plan.config.contacto as number).toBeGreaterThan(20);
        // desliza en línea recta
        expect(Math.abs(cross(sub(h0, g0), plan.u))).toBeLessThan(1e-6);
        expect(largo(sub(h0, g0))).toBeCloseTo(plan.objetivo, 6);
      });
    }
  }
});

describe("planAngulo: ángulos de 30°, 45° y 60° con un solo instrumento", () => {
  const casos: [number, number, 1 | -1][] = [[0, 30, 1], [0, 60, 1], [0, 45, 1], [70, 60, -1], [40, 60, -1], [180, 30, -1], [-30, 45, 1], [90, 30, 1]];
  for (const [base, obj, signo] of casos) {
    it(`base ${base}°, ángulo ${obj}°, sentido ${signo}`, () => {
      const v: Pt = [250, 200];
      const plan = planAngulo(v, base, obj, signo, 200, []);
      const rad = (d: number) => (d * Math.PI) / 180;
      const bdir: Pt = [Math.cos(rad(base)), -Math.sin(rad(base))];
      const rdir: Pt = [Math.cos(rad(base + signo * obj)), -Math.sin(rad(base + signo * obj))];
      const [g0, g1] = plan.borde(plan.objetivo);
      // el borde de dibujo sale del vértice en la dirección del ángulo pedido
      expect(Math.hypot(g0[0] - v[0], g0[1] - v[1])).toBeLessThan(1e-6);
      expect(dot(unit(sub(g1, g0)), rdir)).toBeCloseTo(1, 6);
      // el instrumento se desliza por la recta base
      const [h0] = plan.borde(0);
      expect(Math.abs(cross(sub(h0, g0), bdir))).toBeLessThan(1e-6);
      expect(largo(sub(h0, g0))).toBeCloseTo(plan.objetivo, 6);
    });
  }
});
