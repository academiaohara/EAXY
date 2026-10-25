import { describe, expect, it } from "vitest";
import { angleBetween, angleLines, conic, distParallel, distPointLine, dot, intersect, lineFromPoints, lineText, mediatriz, normalizeLine, position, projScalar } from "@/components/lesson/anim/geo";

describe("vectores", () => {
  it("producto escalar y ángulo", () => {
    expect(dot({ x: 2, y: 3 }, { x: -1, y: 4 })).toBe(10);
    expect(angleBetween({ x: 1, y: 0 }, { x: 1, y: 1 })).toBe(45);
    expect(angleBetween({ x: 1, y: 0 }, { x: 0, y: 5 })).toBe(90);
    expect(angleBetween({ x: 1, y: 2 }, { x: -2, y: -4 })).toBe(180);
    expect(angleBetween({ x: 0, y: 0 }, { x: 1, y: 1 })).toBeNull();
  });

  it("proyección escalar", () => {
    expect(projScalar({ x: 3, y: 4 }, { x: 1, y: 0 })).toBe(3);
    expect(projScalar({ x: 3, y: 4 }, { x: 0, y: 0 })).toBeNull();
  });
});

describe("rectas", () => {
  it("recta por dos puntos y su ecuación general", () => {
    const l = normalizeLine(lineFromPoints({ x: 1, y: 2 }, { x: 3, y: 6 })!);
    expect(l).toEqual({ A: 2, B: -1, C: 0 });
    expect(lineText(l)).toBe("2x − y = 0");
    expect(lineFromPoints({ x: 1, y: 1 }, { x: 1, y: 1 })).toBeNull();
  });

  it("posiciones relativas y punto de corte", () => {
    const a = { A: 1, B: 1, C: -4 };
    expect(position(a, { A: 1, B: -1, C: -1 })).toBe("secantes");
    expect(intersect(a, { A: 1, B: -1, C: -1 })).toEqual({ x: 2.5, y: 1.5 });
    expect(position(a, { A: 2, B: 2, C: -3 })).toBe("paralelas");
    expect(position(a, { A: 2, B: 2, C: -8 })).toBe("coincidentes");
    expect(intersect(a, { A: 2, B: 2, C: -3 })).toBeNull();
  });

  it("ángulo entre rectas y perpendiculares", () => {
    expect(angleLines({ A: 1, B: 0, C: 0 }, { A: 0, B: 1, C: 0 })).toBe(90);
    expect(angleLines({ A: 1, B: -1, C: 0 }, { A: 0, B: 1, C: 0 })).toBe(45);
  });

  it("distancia de punto a recta y entre paralelas", () => {
    expect(distPointLine({ x: 2, y: 3 }, { A: 3, B: 4, C: -5 })).toBe(2.6);
    expect(distParallel({ A: 3, B: 4, C: -5 }, { A: 3, B: 4, C: 5 })).toBe(2);
  });

  it("mediatriz de (0,0) y (4,2): 2x + y − 5 = 0 tras normalizar", () => {
    expect(normalizeLine(mediatriz({ x: 0, y: 0 }, { x: 4, y: 2 })!)).toEqual({ A: 2, B: 1, C: -5 });
    expect(mediatriz({ x: 1, y: 1 }, { x: 1, y: 1 })).toBeNull();
  });
});

describe("cónicas", () => {
  it("elipse x²/25 + y²/9 = 1: c = 4, e = 0,8", () => {
    const e = conic("elipse", 5, 3, 0, 0);
    expect(e.c).toBe(4);
    expect(e.e).toBe(0.8);
    expect(e.focus).toEqual([{ x: -4, y: 0 }, { x: 4, y: 0 }]);
  });

  it("elipse vertical tiene los focos sobre el eje y", () => {
    expect(conic("elipse", 3, 5, 0, 0).focus).toEqual([{ x: 0, y: -4 }, { x: 0, y: 4 }]);
  });

  it("hipérbola x²/9 − y²/16 = 1: c = 5, e = 5/3", () => {
    const h = conic("hipérbola", 3, 4, 0, 0);
    expect(h.c).toBe(5);
    expect(h.e).toBeCloseTo(5 / 3, 8);
  });

  it("parábola y² = 8x: foco (2, 0) y directriz x = −2", () => {
    const p = conic("parábola", 4, 0, 0, 0);
    expect(p.focus).toEqual([{ x: 2, y: 0 }]);
    expect(p.extra).toBe("x = -2");
  });
});
