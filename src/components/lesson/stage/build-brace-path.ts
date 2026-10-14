const BRACE_DEPTH_MIN = 14;
const BRACE_DEPTH_MAX = 18;
const HALF_WIDTH_MIN = 0.55;
const HALF_WIDTH_MAX = 1.45;

function clampDepth(depth: number): number {
  return Math.min(BRACE_DEPTH_MAX, Math.max(BRACE_DEPTH_MIN, depth));
}

function centerPoint(s: number, length: number, depth: number): [number, number] {
  const L = length;
  const D = depth;
  const hook = Math.min(14, L * 0.07);
  const mid = L / 2;

  if (s < 0.11) {
    const t = s / 0.11;
    const ease = 1 - (1 - t) ** 2;
    return [hook * ease, D * 0.78 * (1 - ease)];
  }
  if (s < 0.39) {
    const t = (s - 0.11) / 0.28;
    return [hook + t * (mid - hook * 1.35 - hook), 0];
  }
  if (s < 0.5) {
    const t = (s - 0.39) / 0.11;
    const x0 = mid - hook * 1.35;
    const ease = t * t * (3 - 2 * t);
    return [x0 + ease * (mid - x0), ease * D];
  }
  if (s < 0.61) {
    const t = (s - 0.5) / 0.11;
    const x1 = mid + hook * 1.35;
    const ease = t * t * (3 - 2 * t);
    return [mid + ease * (x1 - mid), D * (1 - ease)];
  }
  if (s < 0.89) {
    const t = (s - 0.61) / 0.28;
    return [mid + hook * 1.35 + t * (L - hook - mid - hook * 1.35), 0];
  }
  const t = (s - 0.89) / 0.11;
  const ease = t * t;
  return [L - hook * (1 - ease), D * 0.78 * ease];
}

function halfWidthAt(s: number): number {
  return HALF_WIDTH_MIN + (HALF_WIDTH_MAX - HALF_WIDTH_MIN) * Math.sin(Math.PI * s) ** 0.72;
}

function tangent(s: number, length: number, depth: number): [number, number] {
  const eps = 0.0025;
  const a = centerPoint(Math.max(0, s - eps), length, depth);
  const b = centerPoint(Math.min(1, s + eps), length, depth);
  return [b[0] - a[0], b[1] - a[1]];
}

/** Misma llave que la horizontal, girada: borde en y=0 → borde en x=depth (menús); punta abajo → punta en x=0 (etiqueta). */
function mapToVerticalCoords(x: number, y: number, depth: number): [number, number] {
  return [depth - y, x];
}

function mapToVerticalTangent(tx: number, ty: number): [number, number] {
  return [-ty, tx];
}

/**
 * Llave caligráfica rellena (grosor variable).
 * - horizontal: borde superior y=0 (menús), punta abajo hacia la etiqueta.
 * - vertical: borde derecho x=depth (menús), punta izquierda hacia la etiqueta (misma pieza, 90°).
 */
export function buildBracePath(
  length: number,
  depth: number,
  orientation: "horizontal" | "vertical" = "horizontal",
): string {
  const L = Math.max(length, 24);
  const D = clampDepth(depth);
  const steps = 80;
  const outer: [number, number][] = [];
  const inner: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const s = i / steps;
    let [x, y] = centerPoint(s, L, D);
    let [tx, ty] = tangent(s, L, D);
    if (orientation === "vertical") {
      [x, y] = mapToVerticalCoords(x, y, D);
      [tx, ty] = mapToVerticalTangent(tx, ty);
    }
    const mag = Math.hypot(tx, ty) || 1;
    const nx = -ty / mag;
    const ny = tx / mag;
    const hw = halfWidthAt(s);
    outer.push([x + nx * hw, y + ny * hw]);
    inner.push([x - nx * hw, y - ny * hw]);
  }

  const fmt = (n: number) => n.toFixed(2);
  let d = `M ${fmt(outer[0][0])} ${fmt(outer[0][1])}`;
  for (let i = 1; i < outer.length; i++) {
    d += ` L ${fmt(outer[i][0])} ${fmt(outer[i][1])}`;
  }
  for (let i = inner.length - 1; i >= 0; i--) {
    d += ` L ${fmt(inner[i][0])} ${fmt(inner[i][1])}`;
  }
  return `${d} Z`;
}

export function braceViewportSize(
  length: number,
  depth: number,
  orientation: "horizontal" | "vertical" = "horizontal",
): { width: number; height: number } {
  const L = Math.max(length, 24);
  const D = clampDepth(depth);
  if (orientation === "vertical") {
    return { width: D + 3, height: L };
  }
  return { width: L, height: D + 3 };
}

export const BRACE_DEPTH_PX = 16;
