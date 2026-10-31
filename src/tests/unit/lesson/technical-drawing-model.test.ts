import { describe, expect, it } from "vitest";
import {
  drawingLength,
  linearDimensionGeometry,
  projectSteppedBlock,
} from "@/components/lesson/technical-drawing/model";

describe("modelo de lámina técnica", () => {
  it("proyecta un cubo como tres cuadrados iguales", () => {
    const views = projectSteppedBlock({
      width: 40,
      depth: 40,
      baseHeight: 40,
      topHeight: 0,
      stepWidth: 40,
    });

    expect(views.front.outline).toEqual([
      [0, 0],
      [40, 0],
      [40, 40],
      [0, 40],
    ]);
    expect(views.top.outline).toEqual([
      [0, 0],
      [40, 0],
      [40, 40],
      [0, 40],
    ]);
    expect(views.left.outline).toEqual([
      [0, 0],
      [40, 0],
      [40, 40],
      [0, 40],
    ]);
  });

  it("mantiene las dimensiones correspondientes en una pieza escalonada", () => {
    const views = projectSteppedBlock({
      width: 80,
      depth: 50,
      baseHeight: 20,
      topHeight: 30,
      stepWidth: 40,
    });

    expect(views.front.outline).toContainEqual([40, 50]);
    expect(views.front.size).toEqual([80, 50]);
    expect(views.top.size).toEqual([80, 50]);
    expect(views.left.size).toEqual([50, 50]);
    expect(views.top.visible).toContainEqual([
      [40, 0],
      [40, 50],
    ]);
    expect(views.left.hidden).toEqual([]);
  });

  it.each([
    [120, 1, 2, 60],
    [120, 1, 1, 120],
    [15, 2, 1, 30],
  ])(
    "transforma %s mm a escala %s:%s en %s mm de dibujo",
    (real, numerator, denominator, expected) => {
      expect(drawingLength(real, numerator, denominator)).toBe(expected);
    },
  );

  it("rechaza escalas sin longitudes ni razón positivas", () => {
    expect(drawingLength(-20, 1, 2)).toBeNull();
    expect(drawingLength(20, 0, 2)).toBeNull();
    expect(drawingLength(20, 1, 0)).toBeNull();
  });

  it("calcula auxiliares, línea interrumpida, flechas interiores y cifra real", () => {
    const cota = linearDimensionGeometry({
      from: [20, 80],
      to: [140, 80],
      offset: 32,
      value: 120,
    });

    expect(cota.extensions).toEqual([
      [
        [20, 82],
        [20, 116],
      ],
      [
        [140, 82],
        [140, 116],
      ],
    ]);
    expect(cota.dimensionLines).toEqual([
      [
        [20, 112],
        [73, 112],
      ],
      [
        [87, 112],
        [140, 112],
      ],
    ]);
    expect(cota.arrows).toEqual([
      [
        [20, 112],
        [27, 109],
        [27, 115],
      ],
      [
        [140, 112],
        [133, 109],
        [133, 115],
      ],
    ]);
    expect(cota.label).toEqual({ at: [80, 115], text: "120" });
  });
});
