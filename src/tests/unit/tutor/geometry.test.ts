import { describe, expect, it } from "vitest";
import {
  buildFurOutline,
  buildFurTexture,
  buildStrayHairs,
  createTutorRandom,
} from "@/lib/tutor/geometry";

const body = { cx: 100, cy: 100, radius: 64 };

function parsePoints(path: string): { x: number; y: number }[] {
  return [...path.matchAll(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map(
    (match) => ({
      x: Number(match[1]),
      y: Number(match[2]),
    }),
  );
}

describe("createTutorRandom", () => {
  it("es determinista para la misma semilla", () => {
    const first = createTutorRandom(42);
    const second = createTutorRandom(42);

    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });

  it("devuelve valores en [0, 1)", () => {
    const random = createTutorRandom(3);

    for (let index = 0; index < 200; index += 1) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("buildFurOutline", () => {
  it("genera un contorno cerrado con dos puntos por mechón", () => {
    const path = buildFurOutline({ ...body, tufts: 12, seed: 7 });

    expect(path.startsWith("M")).toBe(true);
    expect(path.endsWith("Z")).toBe(true);
    expect(parsePoints(path)).toHaveLength(24);
  });

  it("mantiene los puntos cerca del radio del cuerpo", () => {
    const path = buildFurOutline({ ...body, tufts: 48, seed: 7 });

    for (const point of parsePoints(path)) {
      const distance = Math.hypot(point.x - body.cx, point.y - body.cy);
      expect(distance).toBeGreaterThan(body.radius * 0.95);
      expect(distance).toBeLessThan(body.radius * 1.14);
    }
  });

  it("produce el mismo contorno con la misma semilla y otro distinto al cambiarla", () => {
    const options = { ...body, tufts: 24 };

    expect(buildFurOutline({ ...options, seed: 1 })).toBe(
      buildFurOutline({ ...options, seed: 1 }),
    );
    expect(buildFurOutline({ ...options, seed: 1 })).not.toBe(
      buildFurOutline({ ...options, seed: 2 }),
    );
  });
});

describe("buildStrayHairs", () => {
  it("crea la cantidad pedida de pelos que sobresalen del cuerpo", () => {
    const hairs = buildStrayHairs({ ...body, count: 9, seed: 11 });

    expect(hairs).toHaveLength(9);

    for (const hair of hairs) {
      expect(hair.width).toBeGreaterThan(0);
      expect(hair.opacity).toBeGreaterThan(0);
      expect(hair.opacity).toBeLessThanOrEqual(1);

      const points = parsePoints(hair.d);
      expect(points).toHaveLength(3);

      const tip = points[2];
      const distance = Math.hypot(tip.x - body.cx, tip.y - body.cy);
      expect(distance).toBeGreaterThan(body.radius);
      expect(distance).toBeLessThan(body.radius * 1.4);
    }
  });
});

describe("buildFurTexture", () => {
  it("dibuja mechones cortos dentro del cuerpo", () => {
    const strokes = buildFurTexture({ ...body, count: 20, seed: 5 });

    expect(strokes).toHaveLength(20);

    for (const stroke of strokes) {
      for (const point of parsePoints(stroke.d)) {
        const distance = Math.hypot(point.x - body.cx, point.y - body.cy);
        expect(distance).toBeLessThan(body.radius);
      }
      expect(stroke.opacity).toBeLessThan(0.5);
    }
  });
});
