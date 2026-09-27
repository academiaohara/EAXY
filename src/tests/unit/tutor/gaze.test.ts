import { describe, expect, it } from "vitest";
import { clampVector, gazeOffset } from "@/lib/tutor/gaze";

const bounds = { left: 0, top: 0, width: 100, height: 100 };

describe("clampVector", () => {
  it("deja intactos los vectores dentro del límite", () => {
    expect(clampVector(0.3, -0.4, 1)).toEqual({ x: 0.3, y: -0.4 });
  });

  it("recorta manteniendo la dirección", () => {
    const clamped = clampVector(6, 8, 1);

    expect(Math.hypot(clamped.x, clamped.y)).toBeCloseTo(1);
    expect(clamped.x / clamped.y).toBeCloseTo(6 / 8);
  });

  it("no divide por cero", () => {
    expect(clampVector(0, 0, 4)).toEqual({ x: 0, y: 0 });
  });
});

describe("gazeOffset", () => {
  it("no desplaza la pupila cuando el puntero está en el centro", () => {
    expect(
      gazeOffset({ pointerX: 50, pointerY: 50, bounds, maxOffset: 6 }),
    ).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("mira hacia el puntero", () => {
    const offset = gazeOffset({
      pointerX: 400,
      pointerY: -300,
      bounds,
      maxOffset: 6,
    });

    expect(offset.x).toBeGreaterThan(0);
    expect(offset.y).toBeLessThan(0);
  });

  it("nunca supera el desplazamiento máximo", () => {
    const offset = gazeOffset({
      pointerX: 9000,
      pointerY: 9000,
      bounds,
      maxOffset: 6,
    });

    expect(Math.hypot(offset.x, offset.y)).toBeLessThanOrEqual(6.01);
  });

  it("es proporcional mientras el puntero está cerca", () => {
    const near = gazeOffset({
      pointerX: 90,
      pointerY: 50,
      bounds,
      maxOffset: 6,
    });
    const far = gazeOffset({
      pointerX: 130,
      pointerY: 50,
      bounds,
      maxOffset: 6,
    });

    expect(far.x).toBeGreaterThan(near.x);
  });

  it("devuelve el centro si el tutor no tiene tamaño medido", () => {
    expect(
      gazeOffset({
        pointerX: 10,
        pointerY: 10,
        bounds: { left: 0, top: 0, width: 0, height: 0 },
        maxOffset: 6,
      }),
    ).toEqual({ x: 0, y: 0 });
  });
});
