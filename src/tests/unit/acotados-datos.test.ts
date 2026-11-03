import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES } from "@/components/lesson/bench/construcciones-datos";
import type { Construccion, P } from "@/components/lesson/bench/construcciones-datos";

const c = (id: string) => CONSTRUCCIONES[id as keyof typeof CONSTRUCCIONES] as Construccion;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const dot = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[0] - o[0]) + (a[1] - o[1]) * (b[1] - o[1]);

describe("sistema de planos acotados (tema 13)", () => {
  it("graduar: las divisiones son equidistantes sobre r' y la traza está a un intervalo de A'", () => {
    const k = c("acotados-graduar").pts;
    const i = dist(k.nA, k.nB);
    expect(dist(k.nB, k.nC)).toBeCloseTo(i, 6);
    expect(dist(k.nC, k.nD)).toBeCloseTo(i, 6);
    expect(dist(k.nD, k.nE)).toBeCloseTo(i, 6);
    expect(dist(k.nA, k.nT)).toBeCloseTo(i, 6);
  });
  it("plano por su l.m.p.: la distancia de C₀ a la l.m.p. son tres unidades y las horizontales son perpendiculares", () => {
    const k = c("acotados-plano-lmp").pts;
    expect(dist(k.l3, k.Cz)).toBeCloseTo(k.c32[0] - k.c31[0], 6);
    expect(k.hi1[1]).toBe(k.l1[1]);
    expect(k.hi3[1]).toBe(k.l3[1]);
  });
  it("intersección: cada punto P_k está en las dos horizontales (perpendiculares a las l.m.p.)", () => {
    const k = c("acotados-interseccion").pts;
    for (const n of [13, 14, 15]) {
      expect(Math.abs(dot(k[`a${n}`], k[`P${n}`], k.a12) - dot(k[`a${n}`], k[`a${n}`], k.a12)) ).toBeGreaterThanOrEqual(0);
      const ua: P = [k._ta[0] - k.a12[0], k._ta[1] - k.a12[1]];
      const ub: P = [k._tb[0] - k.b12[0], k._tb[1] - k.b12[1]];
      expect((k[`P${n}`][0] - k[`a${n}`][0]) * ua[0] + (k[`P${n}`][1] - k[`a${n}`][1]) * ua[1]).toBeCloseTo(0, 4);
      expect((k[`P${n}`][0] - k[`b${n}`][0]) * ub[0] + (k[`P${n}`][1] - k[`b${n}`][1]) * ub[1]).toBeCloseTo(0, 4);
    }
  });
  it("perfil: la altura de cada punto es la distancia de la escala entre la cota 2 y su cota", () => {
    const k = c("acotados-perfil").pts;
    const cotas = [3, 4, 5, 4, 3];
    cotas.forEach((co, i) => expect(dist(k[`F${i + 1}`], k[`Q${i + 1}`])).toBeCloseTo(dist(k.s2, k[`s${co}`]), 6));
  });
});
