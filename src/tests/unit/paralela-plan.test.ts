import { describe, expect, it } from "vitest";
import { planParalela, type PlanParalela } from "@/components/lesson/bench/paralela-plan";
import { CARTABON_CORTO, CARTABON_LARGO, ESCUADRA_L, applyPose, type Pt } from "@/components/lesson/bench/geometry";

const dot = (a: Pt, b: Pt) => a[0] * b[0] + a[1] * b[1];
const cross = (a: Pt, b: Pt) => a[0] * b[1] - a[1] * b[0];
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const largo = (a: Pt) => Math.hypot(a[0], a[1]);

/** Vértices del mundo de un triángulo con vértice recto en el origen local. */
function triangulo(pose: ReturnType<PlanParalela["poseEscuadra"]>, k: number, local: Pt[]): Pt[] {
  return local.map((v) => {
    const w = applyPose(pose, v);
    return [pose.x + k * (w[0] - pose.x), pose.y + k * (w[1] - pose.y)] as Pt;
  });
}

const rectas: [Pt, Pt][] = [
  [[100, 300], [400, 300]],
  [[100, 300], [400, 150]],
  [[200, 100], [260, 330]],
  [[500, 90], [120, 250]],
  [[300, 300], [320, 80]],
  [[150, 150], [330, 330]],
];
const puntos: Pt[] = [[250, 120], [480, 200], [60, 60], [330, 330], [560, 330]];

describe("planParalela: colocación física de escuadra y cartabón", () => {
  for (const [a, b] of rectas) {
    for (const P of puntos) {
      const u = (() => {
        const l = largo(sub(b, a));
        return [(b[0] - a[0]) / l, (b[1] - a[1]) / l] as Pt;
      })();
      const d = Math.abs(cross(u, sub(P, a)));
      if (d < 25) continue;
      it(`recta ${a}→${b}, punto ${P}`, () => {
        const plan = planParalela(a, b, [P], { trazos: [[P, [P[0] + u[0] * 120, P[1] + u[1] * 120]]] });
        const sFin = plan.sps[0];
        // el borde de dibujo es paralelo a la recta, está sobre ella al empezar y pasa por P al terminar
        for (const [s, esperada] of [[0, 0], [sFin, d]] as [number, number][]) {
          const [f0, f1] = plan.filo(s);
          const e = sub(f1, f0);
          expect(Math.abs(cross(e, u)) / largo(e)).toBeLessThan(1e-6);
          expect(Math.abs(cross(u, sub(f0, a)))).toBeCloseTo(esperada, 4);
        }
        // P cae dentro del borde real de dibujo, lejos de los extremos
        const [g0, g1] = plan.filo(sFin);
        const t = dot(sub(P, g0), sub(g1, g0)) / dot(sub(g1, g0), sub(g1, g0));
        expect(t).toBeGreaterThanOrEqual(0.1);
        expect(t).toBeLessThanOrEqual(0.9);
        expect(Math.abs(cross(sub(g1, g0), sub(P, g0))) / largo(sub(g1, g0))).toBeLessThan(1e-6);
        // sin giro durante el deslizamiento y con el mismo tamaño
        expect(plan.poseEscuadra(0).rot).toBe(plan.poseEscuadra(sFin).rot);
        expect(plan.poseEscuadra(0).mirror).toBe(plan.poseEscuadra(sFin).mirror);
        // proporciones reales: escuadra 45-45-90 y cartabón 30-60-90 (escalados uniformemente)
        const ke = plan.escala.escuadra;
        const kc = plan.escala.cartabon;
        const te = triangulo(plan.poseEscuadra(sFin), ke, [[0, 0], [ESCUADRA_L, 0], [0, ESCUADRA_L]]);
        expect(largo(sub(te[1], te[0]))).toBeCloseTo(ESCUADRA_L * ke, 4);
        expect(largo(sub(te[2], te[0]))).toBeCloseTo(ESCUADRA_L * ke, 4);
        const tc = triangulo(plan.poseCartabon, kc, [[0, 0], [CARTABON_LARGO, 0], [0, CARTABON_CORTO]]);
        expect(largo(sub(tc[1], tc[0])) / largo(sub(tc[2], tc[0]))).toBeCloseTo(Math.sqrt(3), 6);
        // contacto: el borde de apoyo de la escuadra sigue sobre la guía y solapa con el cartabón en todo el recorrido
        expect(plan.config.contacto).toBeGreaterThan(20);
        // la escuadra desliza en una dirección fija
        const o0 = plan.poseEscuadra(0);
        const o1 = plan.poseEscuadra(sFin);
        const mov: Pt = [o1.x - o0.x, o1.y - o0.y];
        expect(Math.abs(cross(mov, plan.desliza))).toBeLessThan(1e-6);
        expect(largo(mov)).toBeCloseTo(Math.abs(sFin), 6);
      });
    }
  }

  it("no usa siempre la misma combinación de bordes", () => {
    const combos = new Set<string>();
    for (const [a, b] of rectas) for (const P of puntos) {
      const l = largo(sub(b, a));
      if (Math.abs(cross([(b[0] - a[0]) / l, (b[1] - a[1]) / l], sub(P, a))) < 25) continue;
      const c = planParalela(a, b, [P]).config;
      combos.add(`${c.dibujo}-${c.apoyo}-${c.guia}`);
    }
    expect(combos.size).toBeGreaterThan(1);
  });
});
