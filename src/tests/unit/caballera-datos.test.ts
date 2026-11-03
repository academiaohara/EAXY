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

describe("tema 15: distancias, polígonos, óvalo y elipse ZOY", () => {
  it("distancia XOY: la hipotenusa construida es la distancia real entre N y B", () => {
    const k = c("cab-distancia-xoy");
    const real = Math.hypot(110 - 30, 90 - 20);
    expect(dist(k.dV, k.dW2)).toBeCloseTo(real, 6);
    expect(dist(k.dU, k.dV)).toBeCloseTo(k.a2[0] - k.a1[0], 6);
  });
  it("distancia oblicua: D es la hipotenusa de d₀ y la diferencia de cotas", () => {
    const k = c("cab-distancia-oblicua");
    const d0 = Math.hypot(110 - 30, 90 - 20);
    expect(dist(k.dV2, k.dW3)).toBeCloseTo(Math.hypot(d0, k.h2[0] - k.h1[0]), 6);
  });
  it("seis lados: los vértices están a ±R, ±R/2 y las ordenadas son la mitad de las reales", () => {
    const k = c("cab-seis-lados-xoy");
    expect(dist(k.cO, k.hD)).toBeCloseTo(80, 6);
    expect(k.hC[0] - k.hXr[0]).toBeCloseTo(k.hB[0] - k.hXl[0], 6);
    expect(dist(k.hXr, k.hC)).toBeCloseTo(k.t2[0] - k.t1[0], 6);
  });
  it("cinco lados: cada vértice está en la paralela a Y por su pie y su ordenada es la reducida", () => {
    const k = c("cab-cinco-lados-xoy");
    const pie: Record<number, string> = { 2: "vf1", 3: "vf2", 4: "vf3", 5: "vf4" };
    for (const i of [2, 3, 4, 5]) expect(k[`vP${i}`][0] - k[pie[i]][0]).toBeCloseTo(-(k[`vP${i}`][1] - k[pie[i]][1]), 6);
    expect(dist(k.vf2, k.vP3)).toBeCloseTo(dist(k.vf3, k.vP4), 6);
  });
  it("óvalo: los centros están a la misma distancia de los dos puntos de tangencia de cada arco", () => {
    const k = c("cab-ovalo-xoy");
    expect(dist(k.o1, k.oD)).toBeCloseTo(dist(k.o1, k.oB), 6);
    expect(dist(k.o2, k.oB)).toBeCloseTo(dist(k.o2, k.oC), 6);
    expect(dist(k.o3, k.oC)).toBeCloseTo(dist(k.o3, k.oA), 6);
    expect(dist(k.o4, k.oA)).toBeCloseTo(dist(k.o4, k.oD), 6);
  });
  it("elipse en ZOY: AB vertical de R y CD sobre Y de μR", () => {
    const k = c("cab-circunferencia-zoy");
    expect(dist(k.cO, k.zA)).toBeCloseTo(k.R2[0] - k.R1[0], 6);
    expect(dist(k.cO, k.zC)).toBeCloseTo(k.r2[0] - k.r1[0], 6);
    expect(k.zA[0]).toBe(k.cO[0]);
  });
  it("curva: las abscisas son equidistantes y las ordenadas reducidas", () => {
    const k = c("cab-curva-xoy");
    expect(dist(k.vg1, k.vg2)).toBeCloseTo(k.x2[0] - k.x1[0], 6);
    expect(dist(k.vg2, k.vc2)).toBeCloseTo(k.b2[0] - k.b1[0], 6);
  });
});
