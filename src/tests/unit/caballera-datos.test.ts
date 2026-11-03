import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES } from "@/components/lesson/bench/construcciones-datos";
import type { Construccion, P } from "@/components/lesson/bench/construcciones-datos";

const c = (id: string) => (CONSTRUCCIONES as Record<string, Construccion>)[id].pts;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const col = (a: P, b: P, p: P) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));

describe("perspectiva caballera (tema 15)", () => {
  it("reducción: el punto del eje Y está a la mitad de la medida real", () => {
    const k = c("cab-reduccion");
    expect(dist(k.cO, k.cY1)).toBeCloseTo((k.y2[0] - k.y1[0]) / 2, 6);
    expect(k.cm[0]).toBeCloseTo((k.y1[0] + k.y2[0]) / 2, 6);
  });
  it("el eje Y forma 45° con X", () => {
    const k = c("cab-ejes");
    const ang = (Math.atan2(k.cY1[1] - k.cO[1], k.cO[0] - k.cY1[0]) * 180) / Math.PI;
    expect(ang).toBeCloseTo(45, 6);
  });
  it("punto: P' P'' P''' y P forman un paralelepípedo de aristas paralelas a los ejes", () => {
    const k = c("cab-punto");
    expect(k.cP1[0] - k.cN[0]).toBeCloseTo(k.cL[0] - k.cO[0], 6);
    expect(k.cP1[1] - k.cN[1]).toBeCloseTo(k.cL[1] - k.cO[1], 6);
    expect(k.cP4[0]).toBeCloseTo(k.cP1[0], 6);
    expect(k.cP4[1] - k.cP1[1]).toBeCloseTo(k.cM[1] - k.cO[1], 6);
    expect(dist(k.cO, k.cL)).toBeCloseTo(Math.hypot(k.y2[0] - k.y1[0], 0), 6);
  });
  it("distancia sobre Y: la verdadera magnitud es el doble de la proyección y está sobre su recta", () => {
    const k = c("cab-distancia-y");
    expect(dist(k.cE, k.cG)).toBeCloseTo(2 * dist(k.cE, k.cF), 6);
    expect(col(k.cE, k.cF, k.cG)).toBeLessThan(1e-6);
  });
  it("triángulo en XOY: A a 40 de B en X y su profundidad reducida", () => {
    const k = c("cab-triangulo-xoy");
    expect(dist(k.cO, k.cXa)).toBeCloseTo(k.w2[0] - k.w1[0], 6);
    expect(dist(k.cXa, k.cAt)).toBeCloseTo(k.y2[0] - k.y1[0], 6);
    expect(col(k.cO, k.cY, k.cAt) > 0).toBe(true);
  });
  it("circunferencia: los diámetros conjugados miden R (en X) y μR (en Y)", () => {
    const k = c("cab-circunferencia-xoy");
    expect(dist(k.cO, k.cD)).toBeCloseTo(k.R2[0] - k.R1[0], 6);
    expect(dist(k.cO, k.cAt)).toBeCloseTo(k.r2[0] - k.r1[0], 6);
    expect(dist(k.cO, k.cAt)).toBeCloseTo(0.5 * dist(k.cO, k.cD), 6);
    expect(k.cPm[0] - k.cD[0]).toBeCloseTo(k.cAt[0] - k.cO[0], 6);
  });
  it("pieza: aristas con las medidas de los datos y la cara frontal vertical", () => {
    const k = c("cab-pieza");
    expect(dist(k.cO, k.kAx)).toBeCloseTo(k.a2[0] - k.a1[0], 6);
    expect(dist(k.cO, k.kAy)).toBeCloseTo(k.b2[0] - k.b1[0], 6);
    expect(dist(k.cO, k.kAz)).toBeCloseTo(k.c2[0] - k.c1[0], 6);
    expect(k.kTxy[0]).toBeCloseTo(k.kXY[0], 6);
  });
});
