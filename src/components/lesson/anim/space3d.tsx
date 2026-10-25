import type { ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Txt } from "@/components/lesson/anim/primitives";
import type { V3 } from "@/components/lesson/anim/vec3";

/** Proyección del espacio al plano del lienzo: giro `az` alrededor de z y elevación `el` (grados). */
export type Proj3 = (p: V3) => [number, number];

export function makeProj(az: number, el: number, scale: number, cx: number, cy: number): Proj3 {
  const a = (az * Math.PI) / 180;
  const e = (el * Math.PI) / 180;
  return ([x, y, z]) => {
    const xr = x * Math.cos(a) - y * Math.sin(a);
    const yr = x * Math.sin(a) + y * Math.cos(a);
    return [cx + scale * xr, cy - scale * (z * Math.cos(e) + yr * Math.sin(e))];
  };
}

/** Proyección estándar: x hacia el observador (abajo-izquierda), y a la derecha y z hacia arriba. */
export const stdProj = (scale = 38, cx = 400, cy = 250): Proj3 => makeProj(-30, 28, scale, cx, cy);

/** Flecha entre dos puntos 3D con punta rellena y etiqueta opcional. */
export function Arrow3D({ proj, from = [0, 0, 0], to, color = MANIM.blue, label, width = 3.5, dashed = false, labelDx = 8, labelDy = -8, size = 22 }: { proj: Proj3; from?: V3; to: V3; color?: string; label?: ReactNode; width?: number; dashed?: boolean; labelDx?: number; labelDy?: number; size?: number }) {
  const [x1, y1] = proj(from);
  const [x2, y2] = proj(to);
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ux = L === 0 ? 0 : (x2 - x1) / L;
  const uy = L === 0 ? 0 : (y2 - y1) / L;
  const h = Math.min(13, L * 0.4);
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? "6 5" : undefined} />
      {L > 4 ? <polygon points={`${x2},${y2} ${bx - uy * h * 0.45},${by + ux * h * 0.45} ${bx + uy * h * 0.45},${by - ux * h * 0.45}`} fill={color} /> : null}
      {label ? <Txt x={x2 + labelDx} y={y2 + labelDy} size={size} color={color}>{label}</Txt> : null}
    </g>
  );
}

/** Segmento 3D sin punta. */
export function Seg3D({ proj, a, b, color = MANIM.muted, width = 2, dashed = false, opacity = 1 }: { proj: Proj3; a: V3; b: V3; color?: string; width?: number; dashed?: boolean; opacity?: number }) {
  const [x1, y1] = proj(a);
  const [x2, y2] = proj(b);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "6 5" : undefined} strokeLinecap="round" opacity={opacity} />;
}

/** Polígono 3D (cara de una figura). */
export function Poly3D({ proj, pts, color = MANIM.yellow, fillOpacity = 0.2, stroke = true }: { proj: Proj3; pts: V3[]; color?: string; fillOpacity?: number; stroke?: boolean }) {
  return <polygon points={pts.map((p) => proj(p).join(",")).join(" ")} fill={color} fillOpacity={fillOpacity} stroke={stroke ? color : "none"} strokeWidth={2} strokeLinejoin="round" />;
}

/** Punto con etiqueta. */
export function Dot3D({ proj, p, color = MANIM.yellow, label, r = 5.5, dx = 9, dy = -9, size = 22 }: { proj: Proj3; p: V3; color?: string; label?: ReactNode; r?: number; dx?: number; dy?: number; size?: number }) {
  const [x, y] = proj(p);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} />
      {label ? <Txt x={x + dx} y={y + dy} size={size} color={color}>{label}</Txt> : null}
    </g>
  );
}

/** Ejes x, y, z con etiquetas y, opcionalmente, el suelo (plano z = 0) como cuadrícula tenue. */
export function Axes3D({ proj, len = 5, floor = true }: { proj: Proj3; len?: number; floor?: boolean }) {
  const lines: ReactNode[] = [];
  if (floor) {
    for (let i = -len; i <= len; i++) {
      lines.push(<Seg3D key={`fx${i}`} proj={proj} a={[i, -len, 0]} b={[i, len, 0]} color={MANIM.grid} width={i === 0 ? 1.8 : 1} opacity={0.7} />);
      lines.push(<Seg3D key={`fy${i}`} proj={proj} a={[-len, i, 0]} b={[len, i, 0]} color={MANIM.grid} width={i === 0 ? 1.8 : 1} opacity={0.7} />);
    }
  }
  return (
    <g>
      {lines}
      <Arrow3D proj={proj} from={[0, 0, 0]} to={[len + 0.6, 0, 0]} color={MANIM.red} width={2} label="x" size={20} />
      <Arrow3D proj={proj} from={[0, 0, 0]} to={[0, len + 0.6, 0]} color={MANIM.green} width={2} label="y" size={20} />
      <Arrow3D proj={proj} from={[0, 0, 0]} to={[0, 0, len + 0.6]} color={MANIM.blue} width={2} label="z" size={20} />
    </g>
  );
}

/** Caja con aristas paralelas a los ejes entre dos esquinas opuestas (vector en componentes). */
export function Caja3D({ proj, a = [0, 0, 0], b, color = MANIM.muted }: { proj: Proj3; a?: V3; b: V3; color?: string }) {
  const c = (i: number, j: number, k: number): V3 => [i ? b[0] : a[0], j ? b[1] : a[1], k ? b[2] : a[2]];
  const e: [V3, V3][] = [];
  for (const [i, j, k] of [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1]] as [number, number, number][]) {
    if (i === 0) e.push([c(0, j, k), c(1, j, k)]);
    if (j === 0) e.push([c(i, 0, k), c(i, 1, k)]);
    if (k === 0) e.push([c(i, j, 0), c(i, j, 1)]);
  }
  return <g>{e.map(([p, q], n) => <Seg3D key={n} proj={proj} a={p} b={q} color={color} width={1.4} dashed opacity={0.8} />)}</g>;
}
