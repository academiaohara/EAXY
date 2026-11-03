import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES } from "@/components/lesson/bench/construcciones-datos";
import type { Construccion, P } from "@/components/lesson/bench/construcciones-datos";

const c = (id: string) => (CONSTRUCCIONES as Record<string, Construccion>)[id].pts;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);

describe("sistema axonométrico isométrico (tema 14)", () => {
  it("escala isométrica: cada medida reducida es 0,816 de la real", () => {
    const k = c("axo-escala-isometrica");
    for (const n of [1, 2, 3, 4]) expect(dist(k.eO, k[`eQ${n}`]) / dist(k.eO, k[`eP${n}`])).toBeCloseTo(Math.cos((35 + 16 / 60) * Math.PI / 180), 2);
  });
  it("proyecciones de un punto: P'' y P''' están en la vertical de L y M, a la altura de P", () => {
    const k = c("axo-proyecciones-punto");
    expect(k.pPdd[0]).toBeCloseTo(k.pL[0], 6);
    expect(k.pPddd[0]).toBeCloseTo(k.pM[0], 6);
    expect(k.pPdd[1] - k.pL[1]).toBeCloseTo(k.pP[1] - k.pPp[1], 6);
  });
  it("óvalo isométrico: los arcos son tangentes (los centros alineados con los puntos de enlace)", () => {
    const k = c("axo-ovalo-isometrico");
    const rad = (a: P, b: P) => dist(a, b);
    expect(rad(k.oC4, k.om3)).toBeCloseTo(rad(k.oC4, k.om2), 6);
    expect(rad(k.oC1, k.om3)).toBeCloseTo(rad(k.oC1, k.om4), 6);
    const col = (a: P, b: P, p: P) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
    expect(col(k.oC4, k.om3, k.oC1)).toBeLessThan(1e-6);
    expect(col(k.oC4, k.om2, k.oC3)).toBeLessThan(1e-6);
  });
});

describe("tema 14: rectas y planos (ampliación)", () => {
  const col = (a: P, b: P, p: P) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
  it("trazas de una recta: T₁ está en t y t', T₂ y T₃ en t, y sus proyecciones en t'", () => {
    const k = c("axo-trazas-recta");
    expect(col(k.aP, k.aQ, k.aT1)).toBeLessThan(1e-6);
    expect(col(k.aPp, k.aQp, k.aT1)).toBeLessThan(1e-6);
    expect(col(k.aP, k.aQ, k.aT2)).toBeLessThan(1e-6);
    expect(col(k.aP, k.aQ, k.aT3)).toBeLessThan(1e-6);
    expect(k.aT2[0]).toBeCloseTo(k.aT2p[0], 6);
    expect(col(k.ao, k.ax, k.aT2p)).toBeLessThan(1e-6);
    expect(col(k.ao, k.ay, k.aT3p)).toBeLessThan(1e-6);
  });
  it("intersección de planos: S₁, S₂ y S₃ están alineados y cada uno en las dos trazas del mismo nombre", () => {
    const k = c("axo-interseccion-planos");
    expect(col(k.iS1, k.iS2, k.iS3)).toBeLessThan(1e-6);
    expect(col(k.iA, k.iB, k.iS1)).toBeLessThan(1e-6);
    expect(col(k.jA, k.jB, k.iS1)).toBeLessThan(1e-6);
    expect(col(k.iA, k.iC, k.iS2)).toBeLessThan(1e-6);
    expect(col(k.jA, k.jC, k.iS2)).toBeLessThan(1e-6);
    expect(col(k.iB, k.iC, k.iS3)).toBeLessThan(1e-6);
    expect(col(k.jB, k.jC, k.iS3)).toBeLessThan(1e-6);
  });
});
