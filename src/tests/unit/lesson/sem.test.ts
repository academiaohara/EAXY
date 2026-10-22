import { describe, expect, it } from "vitest";
import { anglesSimilar, coneFrustumVolume, fourth, frustumExtra, pyramidFrustumVolume, ratios, realFromPlan, sideRatio } from "@/components/lesson/anim/sem";

describe("escala y razones", () => {
  it("1:10 000 → 1 cm = 100 m; 1:20 000 000 → 1 cm = 200 km", () => {
    expect(realFromPlan(1, 10000) / 100).toBe(100);
    expect(realFromPlan(1, 20000000) / 100000).toBe(200);
    expect(realFromPlan(2, 1500000) / 100000).toBe(30);
  });
  it("1:200: áreas 40 000, volúmenes 8 000 000", () => {
    expect(ratios(200)).toEqual({ length: 200, area: 40000, volume: 8000000 });
  });
  it("proporcionalidad: Alberto/Iván", () => {
    expect(fourth(8, 1.76, 7.5)).toBeCloseTo(1.65);
    expect(fourth(0.67, 1.6, 7.22)).toBeCloseTo(17.2418, 3);
  });
});

describe("triángulos semejantes", () => {
  it("lados proporcionales", () => {
    expect(sideRatio([10, 18, 12], [25, 45, 30])).toBeCloseTo(2.5);
    expect(sideRatio([20, 30, 40], [40, 50, 60])).toBeNull();
    expect(sideRatio([24, 28, 34], [36, 42, 51])).toBeCloseTo(1.5);
  });
  it("ángulos: 58/97 frente a 58/35", () => {
    expect(anglesSimilar([58, 97], [58, 35])).toBe(false);
    expect(anglesSimilar([28, 90], [62, 90])).toBe(true);
    expect(anglesSimilar([30, 40], [40, 30])).toBe(true);
  });
});

describe("troncos", () => {
  it("tronco de cono del libro: 5 881,06 cm³ con x = 6", () => {
    expect(frustumExtra(20, 8, 9)).toBe(6);
    expect(coneFrustumVolume(20, 8, 9)).toBeCloseTo(5881.06, 2);
  });
  it("radios 35 y 20, h = 9", () => {
    expect(coneFrustumVolume(35, 20, 9)).toBeCloseTo(21912.61, 2);
  });
  it("pirámides", () => {
    expect(pyramidFrustumVolume(140, 80, 150)).toBeCloseTo(1860000, 0);
    expect(pyramidFrustumVolume(12, 8, 16)).toBeCloseTo(1621.33, 2);
  });
});
