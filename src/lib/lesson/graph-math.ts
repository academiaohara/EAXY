import type { GraphLine, SystemGraphConfig } from "@/lib/lesson/types";

export type Point2D = { x: number; y: number };

/** Evalúa $y$ para una recta y un valor de $x$ (si existe). */
export function evaluateLineY(line: GraphLine, x: number): number | null {
  if (line.form === "horizontal") {
    return line.y;
  }
  if (line.form === "vertical") {
    return null;
  }
  const { a, b, c } = line;
  if (b === 0) {
    return null;
  }
  return (c - a * x) / b;
}

/** Intersección de dos rectas no verticales/horizontales especiales. */
export function intersectLines(lineA: GraphLine, lineB: GraphLine): Point2D | null {
  if (lineA.form === "vertical" && lineB.form === "horizontal") {
    return { x: lineA.x, y: lineB.y };
  }
  if (lineA.form === "horizontal" && lineB.form === "vertical") {
    return { x: lineB.x, y: lineA.y };
  }
  if (lineA.form === "vertical" && lineB.form === "standard") {
    const x = lineA.x;
    const y = evaluateLineY(lineB, x);
    return y === null ? null : { x, y };
  }
  if (lineB.form === "vertical" && lineA.form === "standard") {
    const x = lineB.x;
    const y = evaluateLineY(lineA, x);
    return y === null ? null : { x, y };
  }
  if (lineA.form === "horizontal" && lineB.form === "standard") {
    const y = lineA.y;
    const { a, b, c } = lineB;
    if (a === 0) return null;
    return { x: (c - b * y) / a, y };
  }
  if (lineB.form === "horizontal" && lineA.form === "standard") {
    const y = lineB.y;
    const { a, b, c } = lineA;
    if (a === 0) return null;
    return { x: (c - b * y) / a, y };
  }
  if (lineA.form !== "standard" || lineB.form !== "standard") {
    return null;
  }

  const det = lineA.a * lineB.b - lineB.a * lineA.b;
  if (Math.abs(det) < 1e-9) {
    return null;
  }

  const x = (lineA.c * lineB.b - lineB.c * lineA.b) / det;
  const y = (lineA.a * lineB.c - lineB.a * lineA.c) / det;
  return { x, y };
}

export function getGraphBounds(config: SystemGraphConfig): {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
} {
  if (
    config.xMin !== undefined &&
    config.xMax !== undefined &&
    config.yMin !== undefined &&
    config.yMax !== undefined
  ) {
    return {
      xMin: config.xMin,
      xMax: config.xMax,
      yMin: config.yMin,
      yMax: config.yMax,
    };
  }

  const points: Point2D[] = [...(config.highlightPoints ?? [])];

  for (const line of config.lines) {
    if (line.form === "horizontal") {
      points.push({ x: 0, y: line.y }, { x: 4, y: line.y });
    } else if (line.form === "vertical") {
      points.push({ x: line.x, y: 0 }, { x: line.x, y: 4 });
    } else {
      for (const x of [-2, 0, 2, 4]) {
        const y = evaluateLineY(line, x);
        if (y !== null) {
          points.push({ x, y });
        }
      }
    }
  }

  if (points.length === 0) {
    return { xMin: -4, xMax: 4, yMin: -4, yMax: 4 };
  }

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const padding = 1;

  return {
    xMin: Math.floor(Math.min(...xs) - padding),
    xMax: Math.ceil(Math.max(...xs) + padding),
    yMin: Math.floor(Math.min(...ys) - padding),
    yMax: Math.ceil(Math.max(...ys) + padding),
  };
}
