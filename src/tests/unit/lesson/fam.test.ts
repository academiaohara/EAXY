import { describe, expect, it } from "vitest";
import { compound, parabolaCuts, periodsTo, radicalDomain, radicalRange, radicalValue, vertex } from "@/components/lesson/anim/fam";

describe("parábolas", () => {
  it("vértices del libro", () => {
    expect(vertex(1, -6, 6)).toEqual({ x: { n: 3, d: 1 }, y: { n: -3, d: 1 } });
    expect(vertex(1, -2, 3)).toEqual({ x: { n: 1, d: 1 }, y: { n: 2, d: 1 } });
    expect(vertex(-1, -4, 5)).toEqual({ x: { n: -2, d: 1 }, y: { n: 9, d: 1 } });
    expect(vertex(1, 4, -5)).toEqual({ x: { n: -2, d: 1 }, y: { n: -9, d: 1 } });
    expect(vertex(-5, 10, -3)).toEqual({ x: { n: 1, d: 1 }, y: { n: 2, d: 1 } });
  });
  it("cortes con los ejes", () => {
    expect(parabolaCuts(1, 0, -4)).toEqual({ xs: [-2, 2], y0: -4 });
    expect(parabolaCuts(-3, 6, -3).xs).toEqual([1]);
    expect(parabolaCuts(1, 0, 1).xs).toEqual([]);
  });
});

describe("radicales", () => {
  it("√(x−4): dominio [4, ∞); 2√(−x): (−∞, 0]", () => {
    expect(radicalDomain({ a: 1, h: 4, k: 0, mirror: false })).toEqual({ from: 4, to: Infinity });
    expect(radicalDomain({ a: 2, h: 0, k: 0, mirror: true })).toEqual({ from: -Infinity, to: 0 });
    expect(radicalValue({ a: 1, h: 0, k: 2, mirror: false }, 9)).toBe(5);
    expect(radicalValue({ a: 1, h: 4, k: 0, mirror: false }, 3)).toBeNull();
    expect(radicalRange({ a: 1, h: 0, k: -5, mirror: false })).toEqual({ from: -5, to: Infinity });
    expect(radicalValue({ a: 2, h: 0, k: 0, mirror: true }, -4)).toBe(4);
  });
});

describe("variación porcentual compuesta", () => {
  it("alquiler, furgoneta y sueldo", () => {
    expect(compound(450, 5, 5)).toBeCloseTo(574.33, 2);
    expect(compound(20000, -12, 4)).toBeCloseTo(11993.91, 2);
    expect(compound(24000, 10, 10)).toBeCloseTo(62249.82, 2);
  });
  it("tiempo en reducirse a la mitad", () => {
    expect(periodsTo(20000, -12, 10000)).toBe(6);
    expect(periodsTo(100, 0, 200)).toBeNull();
    expect(periodsTo(100, 100, 800)).toBe(3);
  });
});
